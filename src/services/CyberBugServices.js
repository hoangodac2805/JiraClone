import Axios from "axios";
import { DOMAIN_CYBERBUG, TOKEN } from "../util/constants/SettingSystem";
class cyberBugService {
  constructor() {}

  //User
  signUpCyberBug = (signUpInfo) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/signup`,
      method: "POST",
      data: signUpInfo,
    });
  };
  signInCyberBug = (signInInfo) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/signin`,
      method: "POST",
      data: signInInfo,
    });
  };
  getAllUser = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUser`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  editUser = (userEdit) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/editUser`,
      method: "PUT",
      data: userEdit,
    });
  };
  deleteUser = (userId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/deleteUser?id=${userId}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getUser = (keyword) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUser?keyword=${keyword}
`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getUserByProject = (projectId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Users/getUserByProjectId?idProject=${projectId}
`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //Project
  getAllProject = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getProjectDetail = (projectId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getProjectDetail?id=${projectId}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getAllProjectCategory = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  };

  createProject = (projectInfo) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: projectInfo,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateProject = (projectInfo) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateProject?projectId=${projectInfo.id}`,
      method: "PUT",
      data: projectInfo,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  deleteProject = (projectId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/deleteProject?projectId=${projectId}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  assignUserProject = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/assignUserProject`,
      method: "POST",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  removeUserFromProject = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/removeUserFromProject`,
      method: "POST",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //TASK
  getAllStatus = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Status/getAll`,
      method: "GET",
    });
  };
  getAllTaskType = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/TaskType/getAll`,
      method: "GET",
    });
  };
  getAllPriority = () => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Priority/getAll`,
      method: "GET",
    });
  };
  createTask = (taskInfo) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/createTask`,
      method: "POST",
      data: taskInfo,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  getTaskDetail = (taskId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/getTaskDetail?taskId=${taskId}`,
      method: "GET",

      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //Task edit
  updateStatus = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateStatus`,
      method: "PUT",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updatePriority = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updatePriority`,
      method: "PUT",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateDescription = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateDescription`,
      method: "PUT",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateEstimate = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateEstimate`,
      method: "PUT",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateTimeTracking = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/updateTimeTracking`,
      method: "PUT",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  removeUserFromTask = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/removeUserFromTask
`,
      method: "POST",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  assignUserTask = (content) => {
   
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Project/assignUserTask
`,
      method: "POST",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  //COMMENT
  getAllComment = (taskId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/getAll?taskId=${taskId}`,
      method: "GET",
    });
  };
  insertComment = (content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/insertComment
`,
      method: "POST",
      data: content,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  updateComment = (cmtId, content) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/updateComment?id=${cmtId}&contentComment=${content}`,
      method: "PUT",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
  deleteComment = (cmtId) => {
    return Axios({
      url: `${DOMAIN_CYBERBUG}/Comment/deleteComment?idComment=${cmtId}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}

export const CyberBugService = new cyberBugService();
