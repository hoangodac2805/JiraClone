import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_SAGA } from "../../redux/Types/ProjectManagementType";
import {
  CREATE_TASK_SAGA,
 
} from "../../redux/Types/TaskType";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { GET_USER_BY_PROJECT_SAGA } from "../../redux/Types/UserManagementType";
import { SET_SUBMIT_DRAWER } from "../../redux/Types/DrawerType";
export default function DrawerAddTask() {
  const [flag, setFlag] = useState(true);
  ////

  const handleChangeSelect = (value) => {
    setState({
      ...state,
      listUserAsign: value,
    });
 
  };

  ////

  const dispatch = useDispatch();
  let { taskType, status, priority } = useSelector(
    (state) => state.TaskReducer
  );

  let { projectList } = useSelector((state) => state.ProjectManagementReducer);
  let { listUserByProject } = useSelector(
    (state) => state.UserManagementReducer
  );

  const [state, setState] = useState({
    listUserAsign: [],
    taskName: "",
    description: "",
    statusId: status[0]?.statusId,
    originalEstimate: 1,
    timeTrackingSpent: 1,
    timeTrackingRemaining: 1,
    projectId: projectList[0]?.id,
    typeId: taskType[0]?.id,
    priorityId: priority[0]?.priorityId,
  });
  const handleChange = (e) => {
    let { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
    setFlag(false);
  };
  const handleSubmit = (e) => {
    dispatch({
      type: CREATE_TASK_SAGA,
      taskInfo: state,
    });
  };
  useEffect(() => {
    if (flag === true) {
      dispatch({
        type: GET_ALL_PROJECT_SAGA,
      });
      dispatch({
        type: GET_USER_BY_PROJECT_SAGA,
        projectId: projectList[0]?.id,
      });
      dispatch({
        type: SET_SUBMIT_DRAWER,
        submitAction: handleSubmit,
      });
    } else {
      dispatch({
        type: SET_SUBMIT_DRAWER,
        submitAction: handleSubmit,
      });
    }

    return () => {};
  }, [flag, state]);

  return (
    <div className="container-fluid">
      <form className="row" onSubmit={handleSubmit}>
        <div className="form-group col-3">
          <span className="font-weight-bold">Project</span>
          <select
          
            onChange={(e) => {
              dispatch({
                type: GET_USER_BY_PROJECT_SAGA,
                projectId: e.target.value,
              });
              handleChange(e);
            }}
            className="form-control"
            name="projectId"
          >
            {projectList?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-3">
          <span className="font-weight-bold">Task type</span>
          <select
            onChange={handleChange}
            name="typeId"
            className="form-control"
          >
            {taskType?.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.taskType}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-3">
          <span className="font-weight-bold">Status</span>
          <select
            onChange={handleChange}
            name="statusId"
            className="form-control"
          >
            {status?.map((item, index) => {
              return (
                <option key={index} value={item.statusId}>
                  {item.statusName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group col-3">
          <span className="font-weight-bold">Priority</span>
          <select
            onChange={handleChange}
            name="priorityId"
            className="form-control"
          >
            {priority?.map((item, index) => {
              return (
                <option key={index} value={item.priorityId}>
                  {item.priority}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="form-group col-6">
              <span className="font-weight-bold">Task Name</span>
              <br></br>
              <input
                onChange={handleChange}
                name="taskName"
                value={state.taskName}
                className="form-control"
                type="text"
                placeholder="Task Name"
              ></input>
            </div>
            <div className="form-group col-6">
              <span className="font-weight-bold"> Original Estimate</span>
              <br></br>
              <input
                name="originalEstimate"
                onChange={handleChange}
                value={state.originalEstimate}
                min={0}
                defaultValue={1}
                className="form-control"
                type="number"
                placeholder=""
              ></input>
            </div>
            <div className="form-group col-6">
              <div className="row">
                <div className="col-6 form-group">
                  <span className="font-weight-bold">Time Spending</span>
                  <input
                    name="timeTrackingSpent"
                    type="number"
                    onChange={handleChange}
                    value={state.timeTrackingSpent}
                    className="form-control"
                    min={0}
                  ></input>
                </div>
                <div className="col-6 form-group">
                  <span className="font-weight-bold">Time Remaining</span>
                  <input
                    name="timeTrackingRemaining"
                    value={state.timeTrackingRemaining}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    min={0}
                  ></input>
                </div>
              </div>
            </div>
            <div className="form-group col-6">
              <span className="font-weight-bold">User Assign</span>
              <Select
                mode="tags"
                size="large"
                placeholder="Please select"
                onChange={handleChangeSelect}
                style={{
                  width: "100%",
                }}
                optionFilterProp="label"
                options={listUserByProject?.map((user, index) => {
                  return {
                    label: user.name.toString(),
                    value: user.userId.toString(),
                  };
                })}
              />
            </div>
            <div className="form-group col-6">
              <span className="font-weight-bold">Time Tracking</span>
              <br></br>
              <Slider
                min={0}
                max={
                  Number(state.timeTrackingSpent) +
                  Number(state.timeTrackingRemaining)
                }
                value={Number(state.timeTrackingSpent)}
              />
              <div className="d-flex justify-content-between">
                <span>Time spending ({state.timeTrackingSpent}h)</span>
                <span>Time remaining({state.timeTrackingRemaining}h)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 form-group">
          <span className="font-weight-bold">Description</span>
          <Editor
            apiKey="your-api-key"
            onEditorChange={(editor) => {
              setState({
                ...state,
                description: editor,
              });
            }}
            initialValue=""
            init={{
              height: 350,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
      </form>
    </div>
  );
}
