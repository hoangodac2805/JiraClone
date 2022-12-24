import {
 
  delay,
  takeLatest,
  call,
  put,
} from "redux-saga/effects";
import { openNotificationWithIcon } from "../../../util/Notification/Notification";
import { SIGN_UP_SAGA } from "../../Types/SignUpType";
import { CyberBugService } from "../../../services/CyberBugServices";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../util/constants/SettingSystem";
import { SIGN_IN_SAGA } from "../../Types/SignInType";
import history from "../../../History/History";
import { SET_DISPLAY_LOADING } from "../../Types/LoadingType";
import { POST_USER_INFO } from "../../Types/UserProfileType";
import { CLOSE_MODAL_ANTD } from "../../Types/ModalType";
function* signUp(action) {
  let { values, errors } = action.signUpInfo;
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
    yield put({
      type: SET_DISPLAY_LOADING,
      status: true,
    });
    yield delay(200);
    try {
      const { data, status } = yield call(() => {
        return CyberBugService.signUpCyberBug(values);
      });
      yield put({
        type: CLOSE_MODAL_ANTD,
      });
      if (status === STATUS_CODE.SUCCESS) {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
       alert('Đăng kí thành công!')
      }
    } catch (err) {
      openNotificationWithIcon("error", err.response.data.message, "");
    }
    yield put({
      type: SET_DISPLAY_LOADING,
      status: false,
    });
  } else {
    openNotificationWithIcon("error", "Thông tin không hợp lệ", "");
  }
}
function* signIn(action) {
  yield put({
    type: SET_DISPLAY_LOADING,
    status: true,
  });
  yield delay(300);
  try {
    const { data, status } = yield call(() => {
      return CyberBugService.signInCyberBug(action.signInInfo);
    });
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem(TOKEN, data.content.accessToken);
      localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));
      openNotificationWithIcon("success", "Đăng nhập thành công", "");
      yield put({
        type: POST_USER_INFO,
        userInfo: data.content,
      });
      history.push("/profile");
    }
  } catch (err) {
    openNotificationWithIcon("error", err.response.data.message, "");
  }
  yield put({
    type: SET_DISPLAY_LOADING,
    status: false,
  });
}
export function* theodoiSignUpSaga() {
  yield takeLatest(SIGN_UP_SAGA, signUp);
}
export function* theodoiSignInSaga() {
  yield takeLatest(SIGN_IN_SAGA, signIn);
}
