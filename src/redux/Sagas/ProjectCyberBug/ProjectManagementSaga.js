import {

  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { openNotificationWithIcon } from "../../../util/Notification/Notification";

import { CyberBugService } from "../../../services/CyberBugServices";
import {
  ASSIGN_USER_PROJECT_SAGA,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_REDUX,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL_REDUX,
  GET_PROJECT_DETAIL_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
  UPDATE_PROJECT_SAGA,
} from "../../Types/ProjectManagementType";
import {
  STATUS_CODE,
 
} from "../../../util/constants/SettingSystem";
import {} from "lodash";
import { SET_DISPLAY_LOADING } from "../../Types/LoadingType";
import {
  GET_ALL_PROJECT_CATEGORY_REDUX,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../Types/ProjectCategoryType";
import { SET_OPEN_DRAWER } from "../../Types/DrawerType";

function* getAllProjects(action) {
  yield put({
    type: SET_DISPLAY_LOADING,
    status: true,
  });
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllProject();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_REDUX,
        projectList: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("success", "Lấy project thất bại", "");

  }
  yield put({
    type: SET_DISPLAY_LOADING,
    status: false,
  });
}
function* getAllProjectCategory(action) {

  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getAllProjectCategory();
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY_REDUX,
        projectCategory: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Lấy dữ liệu thất bại", "");
   
  }
}
function* createProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.createProject(action.projectInfo);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Thêm project mới thành công", "");

      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      yield put({
        type: SET_OPEN_DRAWER,
        status: false,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Thêm project mới thất bại", "");

  }
}
function* updateProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.updateProject(action.projectInfo);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Update project thành công", "");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
      yield put({
        type: SET_OPEN_DRAWER,
        status: false,
      });
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    }
  } catch (err) {
    openNotificationWithIcon("error", "Update project thất bại", "");
    console.log(err);
  }
}
function* getProjectDetail(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.getProjectDetail(action.projectId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Lấy dữ liệu thành công", "");
      yield put({
        type: GET_PROJECT_DETAIL_REDUX,
        projectDetail: data.content,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Lấy dữ liệu thất bại", "");
    yield put({
      type: GET_PROJECT_DETAIL_REDUX,
      projectDetail: {
        id: 0,
        projectName: "",
        creator: { name: "", id: 0 },
        description: "",
        projectCategory: "",
        alias: "",
        listTask: [],
        members: [],
        success: false,
      },
    });

  }
}
function* deleteProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.deleteProject(action.projectId);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Xoá project thành công", "");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Xoá thất bại!! Vui lòng thử lại", "");
 
  }
}
function* assignUserProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.assignUserProject(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Thêm user thành công", "");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (err) {
    openNotificationWithIcon("error", "Thêm thất bại!! Vui lòng thử lại", "");
   
  }
}
function* removeUserFromProject(action) {
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.removeUserFromProject(action.content);
    });
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Remove user thành công", "");
      yield put({
        type: GET_ALL_PROJECT_SAGA,
      });
    }
  } catch (err) {
    openNotificationWithIcon(
      "error",
      "Remove user thất bại!! Vui lòng thử lại",
      ""
    );
    
  }
}
export function* theodoiGetAllProjects() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjects);
}
export function* theodoiGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
}
export function* theodoiCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}
export function* theodoiGetProjectDetail() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetail);
}
export function* theodoiUpdateProject() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProject);
}
export function* theodoiDeleteProject() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProject);
}
export function* theodoiAssignUserProject() {
  yield takeLatest(ASSIGN_USER_PROJECT_SAGA, assignUserProject);
}
export function* theodoiRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProject);
}
