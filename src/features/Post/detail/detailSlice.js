import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  hasErrors: false,
  postDetailList: [],
  title: "",
};
export const getComment = createAsyncThunk(
  "post/getComment",
  async (postId) => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}comments?postId=${postId}`)
      .then((res) => res.data);
  }
);

export const postDetailSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    getTitle: (state, action) => {
      state.title = action.payload;
      console.log(action);
      localStorage.setItem("title", action.payload.title);
      localStorage.setItem("body", action.payload.body);

      // console.log(state, action);
    },
  },
  extraReducers: {
    [getComment.pending]: (state, action) => {
      state.loading = true;
    },
    [getComment.fulfilled]: (state, action) => {
      state.postDetailList = action.payload;
      localStorage.setItem("postDetails", JSON.stringify(action.payload));
      state.loading = false;
    },
    [getComment.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { getTitle } = postDetailSlice.actions;
export default postDetailSlice.reducer;
