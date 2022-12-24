import { SET_DISPLAY_LOADING } from "../Types/LoadingType";
const stateDefault = {
  isLoading: false,
};
export const LoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_DISPLAY_LOADING: {
      return (state = { ...state, isLoading: action.status });
    }

    default:
      state = { ...state };
      break;
  }

  return { ...state };
};
