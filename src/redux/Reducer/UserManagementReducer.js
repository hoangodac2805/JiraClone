import {
  GET_ALL_USER_REDUX,
  GET_USER_BY_KEY_REDUX,
  GET_USER_BY_PROJECT_REDUX,
  PUT_USER_EDIT,
} from "../Types/UserManagementType";

const stateDefault = {
  userList: [
    {
      userId: 2318,
      name: "ahih123",
      avatar: "https://ui-avatars.com/api/?name=ahih123",
      email: "ahihi@gmail.com",
      phoneNumber: "82347823",
    },
  ],
  userEdit: {},
  listUserSearch: [],
  listUserByProject: [],
};
export const UserManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_USER_REDUX:
      state.userList = action.userList;
      return { ...state };
    case PUT_USER_EDIT:
      state.userEdit = action.userEdit;
      return { ...state };
    case GET_USER_BY_KEY_REDUX:
      state.listUserSearch = action.listUserSearch;
      return { ...state };
    case GET_USER_BY_PROJECT_REDUX:
      state.listUserByProject = action.listUserByProject;
      return { ...state };
    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
