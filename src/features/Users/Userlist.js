import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import { openModal, deleteUsers, selectSingleUsers } from "./userSlice";
import {
  deleteUser,
  selectSingleUserJson,
  openModalSaga,
} from "./saga/reducers";
import { Button } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    // maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));
const Userlist = ({ user }) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const selectSingleUser = (user, id) => {
    console.log(user);
    const actionUser = { id, user };
    dispatch(selectSingleUserJson(actionUser));
    dispatch(openModalSaga(true));
  };
  const handleDelete = (id) => {
    // dispatch(deleteUsers(id));
    dispatch(deleteUser(id));
  };
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>{user.username.charAt(0)}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="button">{user.name}</Typography>
            <Typography>{user.username}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.phone}</Typography>
            <Typography>
              {user.address.city},{user.address.street},{user.address.suite},
              <br />
              {user.address.zipcode}
            </Typography>
            <Typography>{user.website}</Typography>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => selectSingleUser(user, user.id)}
              style={{ marginRight: 10 }}
            >
              Edit
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={() => handleDelete(user.id)}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default Userlist;
