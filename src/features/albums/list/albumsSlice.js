import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  hasErrors: false,
  albumList: [],
};
export const getAlbums = createAsyncThunk("post/getAlbums", async () => {
  return axios
    .get(`${process.env.REACT_APP_BASEURL}albums`)
    .then((res) => res.data);
});

export const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    filterAlbumByUser: (state, action) => {
      // const temp = state.albumList;
      // state.albumList = temp.filter((item) => item.userId === action.payload);
    },
  },
  extraReducers: {
    [getAlbums.pending]: (state, action) => {
      state.loading = true;
    },
    [getAlbums.fulfilled]: (state, { payload }) => {
      state.albumList = payload;
      state.loading = false;
    },
    [getAlbums.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

export const { filterAlbumByUser } = albumSlice.actions;
export default albumSlice.reducer;
