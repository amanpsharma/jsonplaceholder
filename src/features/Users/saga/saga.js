import { call, put, takeLatest } from "redux-saga/effects";
import {
  setUser,
  DELETE_USER,
  GET_USERJSON,
  sucessdeleteUser,
  CREATE_USER,
  sucessCreateUser,
  sucessUpdateUser,
  UPDATE_USER,
  SELECT_SINGLE_USER,
  UpdateUser,
} from "./reducers";
import axios from "axios";

const requestDeleteUser = (userId) => {
  return axios.delete(`${process.env.REACT_APP_BASEURL}users/${userId.userId}`);
};
const requestGetUser = () => {
  return axios.get(`${process.env.REACT_APP_BASEURL}users`);
};
const requestCreateUser = (action) => {
  console.log(action);
  const body = action.action;
  return axios.post(`${process.env.REACT_APP_BASEURL}users`, {
    body,
  });
};
const requestUpdateUser = (action) => {
  console.log(action.action.id, "updatesisisisi");
  // const {id} = action.action
  console.log(action, "mujjjj");
  const body = action.action;
  return axios.put(
    `${process.env.REACT_APP_BASEURL}users/${action.action.id}`,
    {
      body,
    }
  );
};
export function* handleDeleteUser(userId) {
  try {
    const response = yield call(requestDeleteUser, userId);
    const { data } = response;
    yield put(sucessdeleteUser(data, userId));
  } catch (error) {
    console.log(error);
  }
}
export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;
    yield put(setUser(data));
  } catch (error) {
    console.log(error);
  }
}
export function* handleCreateUser(action) {
  try {
    const response = yield call(requestCreateUser, action);
    yield put(sucessCreateUser(response.data.body));
  } catch (error) {
    console.log(error);
  }
}
export function* handleUpdateUser(action) {
  try {
    const response = yield call(requestUpdateUser, action);
    // console.log(response,'response')
    yield put(UpdateUser(response.data.body));
  } catch (error) {
    console.log(error);
  }
}
export function* watcherSaga() {
  yield takeLatest(DELETE_USER, handleDeleteUser);
  yield takeLatest(GET_USERJSON, handleGetUser);
  yield takeLatest(CREATE_USER, handleCreateUser);
  yield takeLatest(UPDATE_USER, handleUpdateUser);
}
