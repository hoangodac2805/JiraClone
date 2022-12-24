import { Avatar } from "antd";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_TASK_DETAIL_SAGA,
  SET_DATA_LOADING,
  UPDATE_STATUS_SAGA,
} from "../../../redux/Types/TaskType";
import { GET_ALL_COMMENT_SAGA } from "../../../redux/Types/CommentType";
export default function MainBoard(props) {
  const { projectDetail } = props;
  const dispatch = useDispatch();
      const handleDragEnd = (result) => {
        let { projectId, taskId } = JSON.parse(result.draggableId); //Lấy ra chuỗi sau mỗi lần draggable

      
        let { source, destination } = result;
        if (!result.destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }

     
        dispatch({
          type: UPDATE_STATUS_SAGA,
          content: {
            taskId: taskId,
            statusId: destination.droppableId,
            projectId: projectId,
          },
        });
      };
  const renderCardTaskList = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskListDetail, index) => {
          return (
            <Droppable key={index} droppableId={taskListDetail.statusId}>
              {(provided) => {
                return (
                  <div
                    className="card pb-2"
                    style={{ width: "17rem", height: "auto" }}
                  >
                    <div className="card-header">
                      {taskListDetail.statusName}
                    </div>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                      className="list-group list-group-flush"
                      style={{ height: "100%" }}
                    >
                      {taskListDetail.lstTaskDeTail.map((task, index) => {
                        return (
                          <Draggable
                            key={task.taskId.toString()}
                            index={index}
                            draggableId={JSON.stringify({
                              projectId: task.projectId,
                              taskId: task.taskId,
                            })}
                          >
                            {(provided) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  key={index}
                                  className="list-group-item"
                                  data-toggle="modal"
                                  data-target="#infoModal"
                                  onClick={() => {
                                    dispatch({
                                      type: GET_TASK_DETAIL_SAGA,
                                      taskId: task.taskId,
                                    });
                                    dispatch({
                                      type: GET_ALL_COMMENT_SAGA,
                                      taskId: task.taskId,
                                    });
                                  }}
                                >
                                  <span className="font-weight-bold">
                                    Task ID:
                                  </span>
                                  <span>{task.taskId}</span>
                                  <br></br>
                                  <span className="font-weight-bold">
                                    Task Name:
                                  </span>
                                  {task.taskName}
                                  <div
                                    className="block"
                                    style={{ display: "flex" }}
                                  >
                                    <div className="block-left">
                                      <p className="text-danger">
                                        {task.priorityTask.priority}
                                      </p>
                                    </div>
                                    <div className="block-right">
                                      <div
                                        className="avatar-group"
                                        style={{ display: "flex" }}
                                      >
                                        {task.assigness.map((mem, index) => {
                                          return (
                                            <div className="avatar" key={index}>
                                              <img
                                                src={mem.avatar}
                                                alt={mem.avatar}
                                              />
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  </div>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
 
  return (
    <div className="jira">
      {/* Main Board */}
      <div className="main">
        <div className="header">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb" style={{ backgroundColor: "white" }}>
              <li className="breadcrumb-item">Project</li>
              <li className="breadcrumb-item">CyberLearn</li>
              <li className="breadcrumb-item active" aria-current="page">
                {projectDetail.projectName}
              </li>
            </ol>
          </nav>
        </div>
        <h3> {projectDetail.projectName}</h3>
        <div className="info" style={{ display: "flex" }}>
          <div className="search-block">
            <input className="search" />
            <i className="fa fa-search" />
          </div>
          <div className="avatar-group" style={{ display: "flex" }}>
            <div className="">
              {projectDetail.members?.map((member, index) => {
                return <Avatar key={index} src={member.avatar}></Avatar>;
              })}
            </div>
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Only My Issues
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Recently Updated
          </div>
        </div>
        <div className="content" style={{ display: "flex" }}>
  
          {renderCardTaskList()}
        </div>
      </div>
    </div>
  );
}
