import {
  GET_ALL_PROJECT_CATEGORY_REDUX,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../Types/ProjectCategoryType";

const stateDefault = {
  projectCategory: [],
};
export const ProjectStatusAndCateReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY_REDUX: {
      return { ...state, projectCategory: action.projectCategory };
    }

    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
