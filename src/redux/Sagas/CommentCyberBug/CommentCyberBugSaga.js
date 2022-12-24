import {

  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { openNotificationWithIcon } from "../../../util/Notification/Notification";

import { CyberBugService } from "../../../services/CyberBugServices";
import {
    DELETE_COMMENT_SAGA,
  GET_ALL_COMMENT_REDUX,
  GET_ALL_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../Types/CommentType";
import { STATUS_CODE } from "../../../util/constants/SettingSystem";
function* getAllComment(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllComment(action.taskId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_REDUX,
        listComment: data.content,
      });
    }
  } catch (err) {
   
  }
}
function* insertCmt(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.insertComment(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.content.taskId,
      });
    }
  } catch (err) {
   
  }
}
function* updateComment(action) {
 
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateComment(
        action.cmtId,
        action.content,
        action.taskId
      );
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.taskId,
      });
      openNotificationWithIcon("success", "Cập nhật thành công", "");
    }
  } catch (err) {
   
    openNotificationWithIcon("error", "Không thể cập nhật", "");
  }
}
function* deleteComment(action) {
  
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.deleteComment(action.cmtId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENT_SAGA,
        taskId: action.taskId,
      });
      openNotificationWithIcon("success", "Xoá thành công", "");
    }
  } catch (err) {
  
    openNotificationWithIcon("error", "Không thể xoá", "");
  }
}
export function* theodoiGetAllComment() {
  yield takeLatest(GET_ALL_COMMENT_SAGA, getAllComment);
}
export function* theodoiInsertComment() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCmt);
}
export function* theodoiUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateComment);
}
export function* theodoiDeleteComment() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteComment);
}
