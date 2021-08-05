export const GET_USER = "GET_USER";
export const GET_USERJSON = "GET_USERJSON";
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";

const SET_USER = "SET_USER";
const SET_USERJSON = "SET_USERJSON";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const SUCESS_DELETE_USER = "SUCESS_DELETE_USER";
const SUCESS_CREATE_USER = "SUCESS_CREATE_USER";
const SELECT_SINGLE_USER = "SELECT_SINGLE_USER";
const SELECT_UPDATE_USER = "SELECT_UPDATE_USER";
const MAIN_UPDATE_USER = "MAIN_UPDATE_USER";
export const deleteUser = (userId) => ({
  type: DELETE_USER,
  userId,
});
export const sucessdeleteUser = (action, id) => ({
  type: SUCESS_DELETE_USER,
  action,
  id,
});
export const getUserjson = (action) => ({
  type: GET_USERJSON,
  action,
});
//CREATE USER
export const createUser = (action) => ({
  type: CREATE_USER,
  action,
});
export const sucessCreateUser = (action) => ({
  type: SUCESS_CREATE_USER,
  action,
});
export const openModalSaga = (action) => ({
  type: OPEN_MODAL,
  action,
});
export const closeModalSaga = (action) => ({
  type: CLOSE_MODAL,
  action,
});
export const setUser = (userList) => ({
  type: SET_USER,
  userList,
});
//UPDATE USER FOR SELECET SINGLE USER
export const selectSingleUserJson = (action) => ({
  type: SELECT_SINGLE_USER,
  action,
});
export const sucessUpdateUser = (action) => ({
  type: UPDATE_USER,
  action,
});
export const UpdateUser = (action) => ({
  type: MAIN_UPDATE_USER,
  action,
});

const initialState = {
  userList: [],
  showModal: false,
  loading: false,
  singleUser: [],
};

const userReducerJson = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const { userList } = action;
      return { ...state, userList };
    case SET_USERJSON:
      const { newuser } = action;
      return { ...state, newuser };
    case OPEN_MODAL:
      return { ...state, showModal: action };
    case CLOSE_MODAL:
      return { ...state, showModal: action, singleUser: [] };
    case SUCESS_DELETE_USER:
      const deleteuserList = state.userList.filter(
        (user) => user.id !== action.id.userId
      );
      return { ...state, userList: deleteuserList };
    case SUCESS_CREATE_USER:
      return {
        ...state,
        userList: [action.action, ...state.userList],
        showModal: false,
      };
    case SELECT_SINGLE_USER:
      const singleUser = state.userList.find(
        (user) => user.id === action.action.id
      );
      return { ...state, singleUser: singleUser };
    case MAIN_UPDATE_USER:
      const updateuserList = state.userList.find(
        (user) => user.id === action.action.id
      );
      console.log(updateuserList,'updateuserList')
      return { ...state };
    default:
      return state;
  }
};
export default userReducerJson;
