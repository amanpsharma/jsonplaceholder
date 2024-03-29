import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../app/components/layouts/Loading";
import { getAlbums } from "./albumsSlice";
import { getPhoto, getTitle } from "../detail/photoSlice";
import {
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { List } from "@material-ui/core";
import Notfound from "../../../app/components/layouts//Notfound";
import { getUsers } from "../../Users/userSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const Albums = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { albumList, loading } = useSelector((state) => state.album);
  const { userList } = useSelector((state) => state.users);
  const [search, setSearch] = useState("");
  const [data, setDate] = useState([]);
  const [userId, setUserId] = React.useState("");
  const [userarr, seteserarr] = useState([]);

  useEffect(() => {
    const filtered = [];
    for (var arr in albumList) {
      for (var filter in userList) {
        if (albumList[arr].userId === userList[filter].id) {
          filtered.push({
            id: albumList[arr].id,
            title: albumList[arr].title,
            userName: userList[filter].username,
            userId: userList[filter].id,
          });
        }
      }
    }
    seteserarr(filtered);
  }, [userList, albumList]);

  useEffect(() => {
    dispatch(getAlbums());
    dispatch(getUsers());
  }, [dispatch]);

  const searchUser = (e) => {
    var searchQuery = e.target.value;
    setSearch(searchQuery);
    if (searchQuery !== "") {
      const newUser = userarr.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setDate(newUser);
    } else {
      setDate(userarr);
    }
  };
  let albumData = search.length > 1 ? data : userId > 0 ? data : userarr;

  const albumDetail = (id, title, username) => {
    const getDetailsUser = { title: title, user: username };
    dispatch(getPhoto(id));
    dispatch(getTitle(getDetailsUser));
    history.push(`/photodetails/${id}`);
  };
  const userListSelect =
    userList.length > 0 &&
    userList.map((item) => {
      return {
        id: item.id,
        title: item.username,
      };
    });
  const handleChange = (event) => {
    const value = event.target.value;
    setUserId(value);
    if (value !== "") {
      const searchAlbum = userarr.filter((user) => user.userId === value);
      setDate(searchAlbum);
    } else {
      setDate(userarr);
    }
  };
  return loading ? (
    <Loader />
  ) : (
    <div>
      <Typography variant="h5">ALBUMS </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            label="Search..."
            variant="outlined"
            name="search"
            value={search}
            onChange={searchUser}
            style={{ display: "flex" }}
          />
        </Grid>
        <Grid item xs={6} style={{ display: "grid" }}>
          <FormControl
            variant="outlined"
            // {...(error && { error: true, helperText: error })}
          >
            <InputLabel>UserName</InputLabel>
            <Select
              label="Username"
              value={userId}
              name="userId"
              onChange={handleChange}
            >
              {userListSelect.length > 0 &&
                userListSelect?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.title}
                    </MenuItem>
                  );
                })}
            </Select>
            {/* {error && <FormHelperText>{error}</FormHelperText>} */}
          </FormControl>
        </Grid>
      </Grid>

      {albumData.length > 0 ? (
        albumData.map((item) => {
          return (
            <Paper
              className={classes.paper}
              key={Math.random()}
              onClick={() => {
                albumDetail(item.id, item.title, item.userName);
              }}
              style={{ cursor: "pointer" }}
            >
              <List xl={3}>
                <Typography variant="h6" color="secondary">
                  {item.title}
                </Typography>
                <Typography variant="h6" color="primary">
                  {item.userName}
                </Typography>
              </List>
            </Paper>
          );
        })
      ) : (
        <Notfound subject="ALBUM NOT FOUND SEARCH OTHER ALBUMS..." />
      )}
    </div>
  );
};
export default Albums;
