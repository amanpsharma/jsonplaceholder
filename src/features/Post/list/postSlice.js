import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  hasErrors: false,
  postList: [],
};
export const getPosts = createAsyncThunk("post/getUsers", async () => {
  return axios
    .get(`${process.env.REACT_APP_BASEURL}posts`)
    .then((res) => res.data);
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    post: (state, action) => {},
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, { payload }) => {
      state.postList = payload;
      state.loading = false;
    },
    [getPosts.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { post } = postSlice.actions;
export default postSlice.reducer;
