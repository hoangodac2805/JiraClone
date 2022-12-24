import { GET_ALL_COMMENT_REDUX } from "../Types/CommentType";

const stateDefault = {
  listComment: [],
};
export const CommentReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_COMMENT_REDUX: {
      return { ...state, listComment: action.listComment };
    }
    default:
      break;
  }
  return { ...state };
};
