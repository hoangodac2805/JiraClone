import { call, all } from "redux-saga/effects";
import * as UserCyberBug from "./UserCyberBug/UserCyberSaga";
import * as UserManagement from "./UserCyberBug/UserManagementSaga";
import * as ProjectManagement from "./ProjectCyberBug/ProjectManagementSaga";
import * as TaskSaga from "./TaskCyberBug/TaskSaga";
import * as CommentCyberBugSaga from "./CommentCyberBug/CommentCyberBugSaga";
export function* rootSaga() {
  yield all([
    UserCyberBug.theodoiSignUpSaga(),
    UserCyberBug.theodoiSignInSaga(),
    UserManagement.theodoiGetAllUser(),
    UserManagement.theodoiEditUser(),
    UserManagement.theodoiDeleteUser(),
    UserManagement.theodoiGetUserByKey(),
    UserManagement.theodoiGetUserByProject(),
    ProjectManagement.theodoiGetAllProjects(),
    ProjectManagement.theodoiGetAllProjectCategory(),
    ProjectManagement.theodoiCreateProject(),
    ProjectManagement.theodoiGetProjectDetail(),
    ProjectManagement.theodoiUpdateProject(),
    ProjectManagement.theodoiDeleteProject(),
    ProjectManagement.theodoiAssignUserProject(),
    ProjectManagement.theodoiRemoveUserFromProject(),
    TaskSaga.theodoiGetAllPriority(),
    TaskSaga.theodoiGetAllStatus(),
    TaskSaga.theodoiGetAllTaskType(),
    TaskSaga.theodoiCreateTask(),
    TaskSaga.theodoiGetTaskDetail(),
    TaskSaga.theodoiUpdateStatus(),
    TaskSaga.theodoiUpdatePriority(),
    TaskSaga.theodoiUpdateDescription(),
    TaskSaga.theodoiUpdateTimeTracking(),
    TaskSaga.theodoiUpdateEstimate(),
    TaskSaga.theodoiRemoveUserFromTask(),
    TaskSaga.theodoiAssignUserTask(),
    CommentCyberBugSaga.theodoiGetAllComment(),
    CommentCyberBugSaga.theodoiInsertComment(),
    CommentCyberBugSaga.theodoiUpdateComment(),
    CommentCyberBugSaga.theodoiDeleteComment(),
  ]);
}
