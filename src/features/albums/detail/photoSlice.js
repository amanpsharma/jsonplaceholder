import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  hasErrors: false,
  photoDetailList: [],
  title: "",
};
export const getPhoto = createAsyncThunk(
  "post/getPhoto",
  async (albumId) => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}photos?albumId=${albumId}`)
      .then((res) => res.data);
  }
);

export const photoDetailSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    getTitle: (state, action) => {
      console.log(action)
      state.title = action.payload;
      localStorage.setItem("photoTitle", action.payload.title);
      localStorage.setItem("user", action.payload.user);
    },
  },
  extraReducers: {
    [getPhoto.pending]: (state, action) => {
      state.loading = true;
    },
    [getPhoto.fulfilled]: (state, action) => {
      state.photoDetailList = action.payload;
      localStorage.setItem("photoDetails", JSON.stringify(action.payload));
      state.loading = false;
    },
    [getPhoto.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { getTitle } = photoDetailSlice.actions;
export default photoDetailSlice.reducer;
