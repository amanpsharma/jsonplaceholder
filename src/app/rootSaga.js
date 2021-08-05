import { all } from "redux-saga/effects";
import { watcherSaga } from "../features/Users/saga/saga";
import { watcherSagaPost } from "../features/Post/postSaga";
function* rootSaga() {
  yield all([watcherSaga(), watcherSagaPost()]);
}
export default rootSaga;
