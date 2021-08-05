import { call, put, takeLatest } from "redux-saga/effects";
import { setPost, GET_POST } from "./postreducers";
import axios from "axios";

const requestGetPost = () => {
  return axios.get(`${process.env.REACT_APP_BASEURL}posts`);
};

export function* handleGetPost(action) {
  try {
    const response = yield call(requestGetPost);
    const { data } = response;
    yield put(setPost(data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherSagaPost() {
  yield takeLatest(GET_POST, handleGetPost);
}
