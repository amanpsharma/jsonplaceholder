import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/Users/userSlice";
import postReducer from "../features/Post/list/postSlice";
import commentReducer from "../features/Post/detail/detailSlice";
import albumReducer from "../features/albums/list/albumsSlice";
import photoReducer from "../features/albums/detail/photoSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: loginReducer,
    post: postReducer,
    comment: commentReducer,
    album: albumReducer,
    photo: photoReducer,
  },
});
