import {
  GET_ALL_PROJECT_REDUX,
  GET_PROJECT_DETAIL_REDUX,
} from "../Types/ProjectManagementType";

const stateDefault = {
  projectList: [],
  projectDetail: {
    id: 0,
    projectName: "",
    creator: { name: "", id: 0 },
    description: "",
    projectCategory: "",
    alias: "",
    listTask: [],
    members: [],
  },
};
export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_REDUX: {
      return { ...state, projectList: action.projectList };
    }

    case GET_PROJECT_DETAIL_REDUX: {
      return { ...state, projectDetail: action.projectDetail };
    }

    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
