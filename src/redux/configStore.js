import {applyMiddleware, combineReducers, createStore } from "redux";
import {ModalPopUpReducer} from './Reducer/ModalPopUpReducer'
import {LoadingReducer} from "./Reducer/LoadingReducer";
import { UserProfileReducer } from "./Reducer/UserProfileReducer";
import { UserManagementReducer } from "./Reducer/UserManagementReducer";
import { ModalANTDReducer } from "./Reducer/ModalANTDReducer";
import {ProjectManagementReducer  } from "./Reducer/ProjectManagementReducer";
import { ProjectStatusAndCateReducer } from "./Reducer/ProjectStatusAndCateReducer";
import { TaskReducer } from "./Reducer/TaskReducer";
import { CommentReducer } from "./Reducer/CommentReducer";
import { DrawerReducer } from "./Reducer/DrawerReducer";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./Sagas/rootSaga";

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
  //reducer khai báo tại đây
  ModalPopUpReducer,
  LoadingReducer,
  UserProfileReducer,
  UserManagementReducer,
  ModalANTDReducer,
  ProjectManagementReducer,
  DrawerReducer,
  ProjectStatusAndCateReducer,
  TaskReducer,
  CommentReducer
});

const store = createStore(rootReducer,applyMiddleware(middleWareSaga));
middleWareSaga.run(rootSaga);
export default store;
