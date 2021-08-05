export const GET_POST = "GET_POST";
export const GET_POSTJSON = "GET_POSTJSON";
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";
const SET_POST = "SET_POST";

export const setPost = (action) => ({
  type: SET_POST,
  action,
});
export const getPostjson = (action) => ({
  type: GET_POST,
  action,
});

export const postUser = (postList) => ({
  type: SET_POST,
  postList,
});

const initialState = {
  postList: [],
  showModal: false,
  loading: false,
  singleUser: [],
};

const userReducerJson = (state = initialState, action) => {
  switch (action.type) {
    case SET_POST:
      return { ...state, postList: [...action.action] };
    default:
      return state;
  }
};
export default userReducerJson;
