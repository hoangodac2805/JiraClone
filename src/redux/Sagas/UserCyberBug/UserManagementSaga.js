import {
  delay,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { openNotificationWithIcon } from "../../../util/Notification/Notification";
import { CyberBugService } from "../../../services/CyberBugServices";
import { STATUS_CODE } from "../../../util/constants/SettingSystem";
import {
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  GET_ALL_USER_REDUX,
  GET_ALL_USER_SAGA,
  GET_USER_BY_KEY_REDUX,
  GET_USER_BY_KEY_SAGA,
  GET_USER_BY_PROJECT_REDUX,
  GET_USER_BY_PROJECT_SAGA,
} from "./../../Types/UserManagementType";
import { CLOSE_MODAL_ANTD } from "../../Types/ModalType";
import { SET_DISPLAY_LOADING } from "../../Types/LoadingType";
function* getAllUser(action) {
  yield put({
    type: SET_DISPLAY_LOADING,
    status: true,
  });
  yield delay(100);
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllUser();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_USER_REDUX,
        userList: data.content,
      });
    }
  } catch (err) {

  }
  yield put({
    type: SET_DISPLAY_LOADING,
    status: false,
  });
}
function* editUser(action) {
  let { values, errors } = action.data;
  let validValues = true;
  let validErrors = true;
  for (let key in values) {
    if (values[key] === "") {
      validValues = false;
    }
  }
  for (let key in errors) {
    if (errors[key] !== "") {
      validErrors = false;
    }
  }
  if (validErrors && validValues) {
    try {
      const { data, status } = yield call(() => {
        return CyberBugService.editUser(values);
      });
      if (status === STATUS_CODE.SUCCESS) {
        yield put({
          type: CLOSE_MODAL_ANTD,
        });
        yield put({
          type: GET_ALL_USER_SAGA,
        });
        openNotificationWithIcon(
          "success",
          "Thay đổi thông tin thành công!",
          ""
        );
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    } catch (err) {
      openNotificationWithIcon("error", err.response?.message, "");
   
    }
  } else {
    alert("Thông tin không hợp lệ! vui lòng nhập lại");
  }
}
function* deleteUser(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.deleteUser(action.userId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Xoá người dùng thành công!", "");
      yield put({
        type: GET_ALL_USER_SAGA,
      });
    }
  } catch (err) {

    openNotificationWithIcon("error", "Xoá người dùng không thành công!", "");
  }
}
function* getUserByKey(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getUser(action.keyWord);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_KEY_REDUX,
        listUserSearch: data.content,
      });
    }
  } catch (err) {
   
  }
}
function* getUserByProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getUserByProject(action.projectId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_REDUX,
        listUserByProject: data.content,
      });
    }
  } catch (err) {
    yield put({
      type: GET_USER_BY_PROJECT_REDUX,
      listUserByProject: [],
    });
  
  }
}
export function* theodoiGetAllUser() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUser);
}

export function* theodoiEditUser() {
  yield takeLatest(EDIT_USER_SAGA, editUser);
}
export function* theodoiDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUser);
}
export function* theodoiGetUserByKey() {
  yield takeLatest(GET_USER_BY_KEY_SAGA, getUserByKey);
}
export function* theodoiGetUserByProject() {
  yield takeLatest(GET_USER_BY_PROJECT_SAGA, getUserByProject);
}
