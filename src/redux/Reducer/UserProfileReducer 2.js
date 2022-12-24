import { POST_USER_INFO } from "../Types/UserProfileType";
const stateDefault = {
  userInfo: {
    name: "",
    email: "",
    phoneNumber: "",
  },
};
export const UserProfileReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case POST_USER_INFO: {
     state.userInfo = action.userInfo
      return { ...state};
    }
    default:
      state = { ...state };
      break;
  }

  return { ...state };
};
