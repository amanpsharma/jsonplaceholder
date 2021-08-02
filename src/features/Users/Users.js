import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Userlist from "./Userlist";
import { getUsers, openModal, closeModal } from "./userSlice";
import Userform from "./Userform";
import Loading from "../../app/components/layouts/Loading";
import Notfound from "../../app/components/layouts/Notfound";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Users = (props) => {
  const dispatch = useDispatch();
  const { userList, showModal, loading, singleUser } = useSelector(
    (state) => state.users
  );
  const [userData, setUserdata] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const classes = useStyles();

  const handleOpen = () => {
    dispatch(openModal(true));
  };

  const handleClose = () => {
    dispatch(closeModal(false));
  };
  const searchUser = (e) => {
    var searchQuery = e.target.value;
    setSearch(searchQuery);
    if (searchQuery !== "") {
      const newUser = userList.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setUserdata(newUser);
    } else {
      setUserdata(userList);
    }
  };
  let searchUserData = search.length < 1 ? userList : userData;
  return loading ? (
    <Loading />
  ) : (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="primary">
          User List
        </Typography>

        <Button variant="outlined" onClick={handleOpen} color="primary">
          Add User
        </Button>
      </div>
      <TextField
        label="Search..."
        variant="outlined"
        name="search"
        value={search}
        onChange={searchUser}
        style={{ display: "flex", marginTop: 10 }}
      />
      {searchUserData.length > 0 ? (
        searchUserData.map((user) => {
          return <Userlist key={Math.random()} user={user} />;
        })
      ) : (
        <Notfound subject="USER NOT FOUND..." />
      )}
      <Modal
        className={classes.modal}
        open={showModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              {singleUser.length === 0 ? "Add User" : "Update User"}
            </h2>
            <Userform />
          </div>
        </Fade>
      </Modal>
      {console.log(props.users.userList,'ssss')}
    </div>
  );
};
const mapStateToProps = state => ({ users: state.users })

const mapDispatchToProps = dispatch => ({
  getUsers(loading) {
    dispatch({ type: 'GET_USERS_REQUEST',loading})
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Users);
