import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import counterReducer from "../features/counter/counterSlice";
import loginReducer from "../features/Users/userSlice";
import postReducer from "../features/Post/list/postSlice";
import commentReducer from "../features/Post/detail/detailSlice";
import albumReducer from "../features/albums/list/albumsSlice";
import photoReducer from "../features/albums/detail/photoSlice";
import newUserReducer from "../features/Users/saga/reducers";
import newpostReducer from '../features/Post/postreducers'
import logger from 'redux-logger'
import rootSaga from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: loginReducer,
    post: postReducer,
    comment: commentReducer,
    album: albumReducer,
    photo: photoReducer,
    newUserReducer,
    newpostReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});
sagaMiddleware.run(rootSaga);

export default store;
