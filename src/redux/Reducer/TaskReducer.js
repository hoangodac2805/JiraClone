import {
  GET_ALL_PRIORITY_REDUX,
  GET_ALL_STATUS_REDUX,
  GET_ALL_TASK_TYPE_REDUX,
  GET_TASK_DETAIL_REDUX,
 
} from "../Types/TaskType";

const stateDefault = {
  taskType: [],
  status: [],
  priority: [],
  taskDetailInfo: [],
 
};
export const TaskReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE_REDUX: {
      return { ...state, taskType: action.taskType };
    }
    case GET_ALL_PRIORITY_REDUX: {
      return { ...state, priority: action.priority };
    }
    case GET_ALL_STATUS_REDUX: {
      return { ...state, status: action.status };
    }
    case GET_TASK_DETAIL_REDUX: {
      return { ...state, taskDetailInfo: action.taskDetailInfo };
    }
 
    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
