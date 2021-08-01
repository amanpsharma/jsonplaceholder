import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  hasErrors: false,
  userList: [],
  showModal: false,
  userid: "",
  singleUser: [],
};
export const getUsers = createAsyncThunk("users/getUser", async () => {
  return axios
    .get(`${process.env.REACT_APP_BASEURL}users`)
    .then((res) => res.data);
});

export const saveUsers = createAsyncThunk("users/saveUser", async (body) => {
  return axios
    .post(`${process.env.REACT_APP_BASEURL}users`, { body })
    .then((res) => res.data);
});

export const editUsers = createAsyncThunk(
  "users/editUser",
  async (id, body) => {
    return axios
      .put(`${process.env.REACT_APP_BASEURL}users/${id}`, { body })
      .then((res) => res.data);
  }
);

export const deleteUsers = createAsyncThunk("users/deleteUser", async (id) => {
  return axios
    .delete(`${process.env.REACT_APP_BASEURL}users/${id}`)
    .then((res) => res.data);
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showModal = true;
      state.singleUser = [];
    },
    closeModal: (state, action) => {
      state.showModal = false;
      state.singleUser = [];
    },
    selectSingleUsers: (state, action) => {
      state.singleUser = state.userList.find(
        (user) => user.id === action.payload
      );
    },
    editUserSingle: (state, action) => {
      state.userList = state.userList.map((el) =>
        el.id === action.payload.id ? action.payload : el
      );
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.userList = payload;
      state.loading = false;
    },
    [getUsers.rejected]: (state) => {
      state.loading = false;
    },
    [saveUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [saveUsers.fulfilled]: (state, { payload }) => {
      saveUsers(payload);
      state.userList = [payload.body, ...state.userList];
      state.loading = false;
      state.showModal = false;
    },
    [saveUsers.rejected]: (state) => {
      state.loading = false;
    },
    [editUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [editUsers.fulfilled]: (state, action) => {
      console.log(action, "editt");
      // state.userList = state.userList.map((el) =>
      //   el.id === action.payload.id ? action.payload.body : el
      // );
      state.loading = false;
      state.showModal = false;
      state.singleUser = [];
    },
    [deleteUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUsers.fulfilled]: (state, action) => {
      deleteUsers(action.meta.arg);
      state.userList = state.userList.filter(
        (user) => user.id !== action.meta.arg
      );
      state.loading = false;
    },
  },
});

export const { openModal, closeModal, selectSingleUsers, editUserSingle } =
  userSlice.actions;
export default userSlice.reducer;
// state.users.filter((user) => user.id !== action.payload.id);
