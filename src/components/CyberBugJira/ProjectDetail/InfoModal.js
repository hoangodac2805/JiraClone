import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import parse from "html-react-parser";
import { PlayCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { AutoComplete, Avatar, Button, Popconfirm } from "antd";
import {
  ASSIGN_USER_TASK,
  GET_ALL_PRIORITY_SAGA,
  GET_ALL_STATUS_SAGA,
  GET_ALL_TASK_TYPE_SAGA,
  REMOVE_USER_FROM_TASK,
  UPDATE_DESCRIPTION_SAGA,
  UPDATE_ESTIMATE_SAGA,
  UPDATE_PRIORITY_SAGA,
  UPDATE_STATUS_SAGA,
  UPDATE_TIME_TRACKING_SAGA,
} from "../../../redux/Types/TaskType";
import { USER_LOGIN } from "../../../util/constants/SettingSystem";
import {
  DELETE_COMMENT_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../../redux/Types/CommentType";

export default function InfoModal() {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem(USER_LOGIN));

  //USE SELECTOR
  let { listComment } = useSelector((state) => state.CommentReducer);

  let { taskDetailInfo } = useSelector((state) => state.TaskReducer);
  let {  status, priority } = useSelector(
    (state) => state.TaskReducer
  );
  let { listUserByProject } = useSelector(
    (state) => state.UserManagementReducer
  );

  //USE STATE

  const [editorDes, setEditorDes] = useState(taskDetailInfo.description);
  const [editDescription, setEditDescription] = useState(false);
  const [insertCmt, setInsertCmt] = useState({
    status: false,
    content: "",
  });
  const [changeCmt, setChangeCmt] = useState({
    cmtId: -1,
    content: "",
  });

  const [userSearch, setUserSearch] = useState("");

  //FUNCTION
  const renderTimeTracking = () => {
    let progressbar = Math.round(
      (Number(taskDetailInfo.timeTrackingSpent) /
        (Number(taskDetailInfo.timeTrackingRemaining) +
          Number(taskDetailInfo.timeTrackingSpent))) *
        100
    );

    return (
      <div style={{ display: "flex" }}>
        <i className="fa fa-clock" />
        <div style={{ width: "100%" }}>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressbar}%` }}
              aria-valuenow={taskDetailInfo.timeTrackingSpent}
              aria-valuemin={0}
              aria-valuemax={
                Number(taskDetailInfo.timeTrackingRemaining) +
                Number(taskDetailInfo.timeTrackingSpent)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p className="logged">
              {taskDetailInfo.timeTrackingSpent}h spending
            </p>
            <p className="estimate-time">
              {taskDetailInfo.timeTrackingRemaining}h remaining
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderDescription = () => {
    if (editDescription) {
      return (
        <div className="py-3">
          <Editor
            onEditorChange={(content) => {
              setEditorDes(content);
            }}
            tinymceScriptSrc={
              process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
            initialValue={taskDetailInfo.description}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
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
          <button
            onClick={() => {
              dispatch({
                type: UPDATE_DESCRIPTION_SAGA,

                content: {
                  taskId: taskDetailInfo.taskId,
                  description: editorDes,
                },
                projectId: taskDetailInfo.projectId,
              });
            }}
            className="btn btn-success m-2"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setEditDescription(!editDescription);
            }}
            className="btn btn-warning"
          >
            Close
          </button>
        </div>
      );
    } else {
      return <div> {parse(`${taskDetailInfo.description}`)}</div>;
    }
  };
  const renderInsertComment = () => {
    if (insertCmt.status) {
      return (
        <div>
          <Editor
            onEditorChange={(content) => {
              setInsertCmt({
                ...insertCmt,
                content: content,
              });
            }}
            tinymceScriptSrc={
              process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
            initialValue={insertCmt.content}
            init={{
              height: 200,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
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
          <div className="d-flex justify-content-between">
            <Button
              onClick={() => {
                dispatch({
                  type: INSERT_COMMENT_SAGA,
                  content: {
                    taskId: taskDetailInfo.taskId,
                    contentComment: insertCmt.content,
                  },
                });
                setInsertCmt({
                  ...insertCmt,
                  content: "",
                });
              }}
              className="text-primary"
            >
              Insert
            </Button>
            <Button
              onClick={() => {
                setInsertCmt({
                  ...insertCmt,
                  status: false,
                });
              }}
              className="text-warning"
            >
              Close
            </Button>
          </div>
        </div>
      );
    } else {
      return "";
    }
  };

  //USE EFFECTS
  useEffect(() => {
    dispatch({
      type: GET_ALL_PRIORITY_SAGA,
    });
    dispatch({
      type: GET_ALL_STATUS_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });

    return () => {};
  }, []);

  return (
    <div>
      <div
        className="modal fade"
        id="infoModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="infoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-info">
          <div className="modal-content">
            <div className="modal-header">
              <div className="task-title">
                <i className="fa fa-bookmark" />
                <span>TASK-{taskDetailInfo?.taskId}</span>
              </div>
              <div style={{ display: "flex" }} className="task-click">
                <div>
                  <i className="fab fa-telegram-plane" />
                  <span style={{ paddingRight: 20 }}>Give feedback</span>
                </div>
                <div>
                  <i className="fa fa-link" />
                  <span style={{ paddingRight: 20 }}>Copy link</span>
                </div>
                <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-8">
                    <p className="issue">
                      This is an issue of type:{" "}
                      {taskDetailInfo?.taskTypeDetail?.taskType}.
                    </p>
                    {/* Description */}
                    <div className="description my-4">
                      <p>Description:</p>

                      {renderDescription()}
                      {editDescription ? (
                        ""
                      ) : (
                        <Button
                          onClick={() => {
                            setEditDescription(!editDescription);
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                    {/* Comment */}
                    <div className="comment">
                      <h6>Comment</h6>
                      <div
                        className="block-comment"
                        style={{ display: "flex" }}
                      >
                        <div className="avatar">
                          <img src={currentUser.avatar} alt />
                        </div>
                        <div className="input-comment">
                          {renderInsertComment()}
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              click
                              <Button
                                onClick={() => {
                                  setInsertCmt({
                                    ...insertCmt,
                                    status: true,
                                  });
                                }}
                                className="mx-2"
                                type="dashed"
                                icon={<PlayCircleOutlined />}
                              ></Button>
                              to comment
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="lastest-comment">
                        {listComment?.map((item, index) => {
                          return (
                            <div key={index} className="comment-item">
                              <div
                                className="display-comment"
                                style={{ display: "flex" }}
                              >
                                <div className="avatar">
                                  <Avatar src={item.user.avatar}></Avatar>
                                </div>
                                <div>
                                  <p
                                    style={{
                                      marginBottom: 5,
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.user.name}
                                  </p>
                                  {item.id === changeCmt.cmtId ? (
                                    <div>
                                      <Editor
                                        onEditorChange={(content) => {
                                          setChangeCmt({
                                            ...changeCmt,
                                            content: content,
                                          });
                                        }}
                                        tinymceScriptSrc={
                                          process.env.PUBLIC_URL +
                                          "/tinymce/tinymce.min.js"
                                        }
                                        initialValue={item.contentComment}
                                        init={{
                                          height: 200,
                                          menubar: false,
                                          plugins: [
                                            "advlist",
                                            "autolink",
                                            "lists",
                                            "link",
                                            "image",
                                            "charmap",
                                            "anchor",
                                            "searchreplace",
                                            "visualblocks",
                                            "code",
                                            "fullscreen",
                                            "insertdatetime",
                                            "media",
                                            "table",
                                            "preview",
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
                                      <div className="d-flex">
                                        <Button
                                          onClick={() => {
                                            dispatch({
                                              type: UPDATE_COMMENT_SAGA,
                                              taskId: taskDetailInfo.taskId,
                                              cmtId: item.id,
                                              content: changeCmt.content,
                                            });
                                            setChangeCmt({
                                              ...changeCmt,
                                              cmtId: -1,
                                            });
                                          }}
                                        >
                                          Change
                                        </Button>
                                        <Button
                                          onClick={() => {
                                            setChangeCmt({
                                              ...changeCmt,
                                              cmtId: -1,
                                            });
                                          }}
                                          className="text-warning"
                                        >
                                          Close
                                        </Button>
                                      </div>
                                    </div>
                                  ) : //  {${item.contentComment.length > 100} ?  parse(`${item.contentComment.substr(0,100)}`) : parse(`${item.contentComment}`) }
                                  item.contentComment.length > 100 ? (
                                    parse(
                                      `${item.contentComment.substr(0, 100)}...`
                                    )
                                  ) : (
                                    parse(`${item.contentComment}`)
                                  )}

                                  <div>
                                    <a
                                      onClick={() => {
                                        setChangeCmt({
                                          cmtId: item.id,

                                          content: item.contentComment,
                                        });
                                      }}
                                      style={{ color: "#929398" }}
                                    >
                                      Edit
                                    </a>
                                    •
                                    <Popconfirm
                                      title="Are you sure to delete this comment?"
                                      onConfirm={() => {
                                        dispatch({
                                          type: DELETE_COMMENT_SAGA,
                                          taskId: taskDetailInfo.taskId,
                                          cmtId: item.id,
                                        });
                                      }}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <a style={{ color: "#929398" }}>Delete</a>
                                    </Popconfirm>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    {/* Status */}
                    <div className="status">
                      <h6>STATUS</h6>
                      <select
                        onChange={(e) => {
                          dispatch({
                            type: UPDATE_STATUS_SAGA,
                            content: {
                              taskId: taskDetailInfo.taskId,
                              statusId: e.target.value,
                            },
                            projectId: taskDetailInfo.projectId,
                          });
                        }}
                        className="custom-select"
                      >
                        {status?.map((item, index) => {
                          if (item.statusId === taskDetailInfo.statusId) {
                            return (
                              <option
                                key={index}
                                selected
                                value={item.statusId}
                              >
                                {item.statusName}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={item.statusId}>
                                {item.statusName}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    {/* assignees */}
                    <div className="assignees">
                      <h6>ASSIGNEES</h6>
                      <div style={{ display: "flex" }}>
                        <div style={{ display: "flex" }} className="item">
                          <div className="avatar">
                            {taskDetailInfo.assigness?.map((item, index) => {
                              return (
                                <div key={index}>
                                  <Avatar src={item.avatar}></Avatar>
                                  <span style={{ fontSize: "10px" }}>
                                    {item.name}
                                  </span>
                                  <Popconfirm
                                    title="Are you sure to remove this user?"
                                    onConfirm={() => {
                                      dispatch({
                                        type: REMOVE_USER_FROM_TASK,
                                        projectId: taskDetailInfo.projectId,
                                        content: {
                                          taskId: taskDetailInfo.taskId,
                                          userId: item.id,
                                        },
                                      });
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <Button
                                      shape="circle"
                                      className="text-danger"
                                      icon={<DeleteOutlined></DeleteOutlined>}
                                    ></Button>
                                  </Popconfirm>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <AutoComplete
                            options={listUserByProject
                              ?.filter((user) => {
                                let index = taskDetailInfo.assigness?.findIndex(
                                  (us) => us.id === user.userId
                                );
                                if (index !== -1) {
                                  return false;
                                }
                                return true;
                              })
                              .map((user, index) => {
                                return {
                                  label: user.name,
                                  value: user.userId,
                                };
                              })}
                            style={{
                              width: 100,
                            }}
                            placeholder="input name"
                            value={userSearch}
                            onChange={(text) => {
                              setUserSearch(text);
                            }}
                            onSelect={(value, option) => {
                              setUserSearch(option.label);
                              let data = {
                                taskId: taskDetailInfo.taskId,
                                userId: value,
                              };
                              console.log(data);
                              dispatch({
                                type: ASSIGN_USER_TASK,
                                content: data,
                                projectId: taskDetailInfo.projectId,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* priority */}
                    <div className="priority mt-2" style={{ marginBottom: 20 }}>
                      <h6>PRIORITY</h6>

                      <select
                        onChange={(e) => {
                          dispatch({
                            type: UPDATE_PRIORITY_SAGA,
                            content: {
                              taskId: taskDetailInfo.taskId,
                              priorityId: e.target.value,
                            },
                            projectId: taskDetailInfo.projectId,
                          });
                        }}
                      >
                        {priority?.map((item, index) => {
                          if (item.priorityId === taskDetailInfo.priorityId) {
                            return (
                              <option
                                key={index}
                                selected
                                value={item.priorityId}
                              >
                                {item.priority}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={item.priorityId}>
                                {item.priority}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </div>
                    {/* estimate */}
                    <div className="estimate">
                      <h6>ORIGINAL ESTIMATE (HOURS)</h6>

                      <input
                        value={taskDetailInfo.originalEstimate}
                        onChange={(e) => {
                          dispatch({
                            type: UPDATE_ESTIMATE_SAGA,
                            content: {
                              taskId: taskDetailInfo.taskId,
                              originalEstimate: e.target.value,
                            },
                            projectId: taskDetailInfo.projectId,
                          });
                        }}
                        className="estimate-hours"
                        type="number"
                      ></input>
                    </div>

                    {/* time-tracking */}
                    <div className="time-tracking">
                      <div>
                        <h6>TIME TRACKING</h6>
                        <div className="d-flex">
                          <div className="form-group">
                            <span>Time spent</span>
                            <input
                              onChange={(e) => {
                                dispatch({
                                  type: UPDATE_TIME_TRACKING_SAGA,
                                  content: {
                                    taskId: taskDetailInfo.taskId,
                                    timeTrackingSpent: e.target.value,
                                    timeTrackingRemaining:
                                      taskDetailInfo.timeTrackingRemaining,
                                  },
                                });
                              }}
                              min={0}
                              value={taskDetailInfo.timeTrackingSpent}
                              className="form-control"
                              type="number"
                              name="timeTrackingSpent"
                            ></input>
                          </div>
                          <div className="form-group">
                            <span>Time remaining</span>
                            <input
                              onChange={(e) => {
                                dispatch({
                                  type: UPDATE_TIME_TRACKING_SAGA,
                                  content: {
                                    taskId: taskDetailInfo.taskId,
                                    timeTrackingSpent:
                                      taskDetailInfo.timeTrackingSpent,
                                    timeTrackingRemaining: e.target.value,
                                  },
                                });
                              }}
                              min={0}
                              value={taskDetailInfo.timeTrackingRemaining}
                              className="form-control"
                              type="number"
                              name="timeTrackingRemaining"
                            ></input>
                          </div>
                        </div>
                      </div>
                      {renderTimeTracking()}
                    </div>
                    <div style={{ color: "#929398" }}>
                      Create at a month ago
                    </div>
                    <div style={{ color: "#929398" }}>
                      Update at a few seconds ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
