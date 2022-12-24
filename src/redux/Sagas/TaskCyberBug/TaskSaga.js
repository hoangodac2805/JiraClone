import {
 
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { openNotificationWithIcon } from "../../../util/Notification/Notification";
import Axios from "axios";
import history from "../../../History/History";
import { CyberBugService } from "../../../services/CyberBugServices";
import { STATUS_CODE } from "../../../util/constants/SettingSystem";
import {
  ASSIGN_USER_TASK,
  CREATE_TASK_SAGA,
  GET_ALL_PRIORITY_REDUX,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_REDUX,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_REDUX,
  GET_ALL_TASK_TYPE_SAGA,
  GET_TASK_DETAIL_REDUX,
  GET_TASK_DETAIL_SAGA,
  REMOVE_USER_FROM_TASK,
  UPDATE_DESCRIPTION_SAGA,
  UPDATE_ESTIMATE_SAGA,
  UPDATE_PRIORITY_SAGA,
  UPDATE_STATUS_SAGA,
  UPDATE_TIME_TRACKING_SAGA,
} from "../../Types/TaskType";
import { SET_OPEN_DRAWER } from "../../Types/DrawerType";
import { GET_PROJECT_DETAIL_SAGA } from "../../Types/ProjectManagementType";
import { DELETE_COMMENT_SAGA } from "../../Types/CommentType";
function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllTaskType();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_TASK_TYPE_REDUX,
        taskType: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Không thể lấy được taskType", "");
  
  }
}
function* getAllPriority(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllPriority();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PRIORITY_REDUX,
        priority: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Không thể lấy được priority", "");
   
  }
}
function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllStatus();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS_REDUX,
        status: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Không thể lấy được status", "");
   
  }
}
function* createTask(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.createTask(action.taskInfo);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Đã tạo thành công", "");
      yield put({
        type: SET_OPEN_DRAWER,
        status: false,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Không thể tạo được task", "");
   
  }
}
function* getTaskDetail(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getTaskDetail(action.taskId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_REDUX,
        taskDetailInfo: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Không thể tạo được task", "");
    console.log(err);
  }
}
//UPDATE_TASK
function* updateStatus(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateStatus(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.content.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
   
  }
}
function* updatePriority(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updatePriority(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
   
  }
}
function* updateDescription(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateDescription(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
    
  }
}
function* updateTimeTracking(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateTimeTracking(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
  
  }
}
function* updateEstimate(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateEstimate(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
    
  }
}

function* removeUserFromTask(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.removeUserFromTask(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot update", "");
  
  }
}
function* assignUserTask(action) {  
 
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.assignUserTask(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: action.content.taskId,
      });
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: action.projectId,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Cannot assign", "");
   
  }
}

export function* theodoiGetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
export function* theodoiGetAllPriority() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPriority);
}
export function* theodoiGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}
export function* theodoiCreateTask() {
  yield takeLatest(CREATE_TASK_SAGA, createTask);
}
export function* theodoiGetTaskDetail() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetail);
}
//update task
export function* theodoiUpdateStatus() {
  yield takeLatest(UPDATE_STATUS_SAGA, updateStatus);
}
export function* theodoiUpdatePriority() {
  yield takeLatest(UPDATE_PRIORITY_SAGA, updatePriority);
}
export function* theodoiUpdateDescription() {
  yield takeLatest(UPDATE_DESCRIPTION_SAGA, updateDescription);
}
export function* theodoiUpdateTimeTracking() {
  yield takeLatest(UPDATE_TIME_TRACKING_SAGA, updateTimeTracking);
}
export function* theodoiUpdateEstimate() {
  yield takeLatest(UPDATE_ESTIMATE_SAGA, updateEstimate);
}
export function* theodoiRemoveUserFromTask() {
  yield takeLatest(REMOVE_USER_FROM_TASK, removeUserFromTask);
}
export function* theodoiAssignUserTask() {
  yield takeLatest(ASSIGN_USER_TASK, assignUserTask);
}
