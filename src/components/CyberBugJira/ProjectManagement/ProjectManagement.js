import React, { useEffect, useRef, useState } from "react";
import { message, Popconfirm } from "antd";
import {
  Avatar,
  Button,
  Popover,
  Space,
  Table,
  Drawer,
  Tag,
  AutoComplete,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ASSIGN_USER_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL_SAGA,
  REMOVE_USER_FROM_PROJECT_SAGA,
} from "../../../redux/Types/ProjectManagementType";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { SET_OPEN_DRAWER } from "../../../redux/Types/DrawerType";
import DrawerAddProject from "../../Drawer/DrawerAddProject";
import DrawerEditProject from "../../Drawer/DrawerEditProject";
import { GET_USER_BY_KEY_SAGA } from "../../../redux/Types/UserManagementType";
import { NavLink } from "react-router-dom";
import DrawerAddTask from "../../Drawer/DrawerAddTask";
import { GET_ALL_PRIORITY_SAGA, GET_ALL_STATUS_SAGA, GET_ALL_TASK_TYPE_SAGA } from "../../../redux/Types/TaskType";
export default function ProjectManagement() {
  const dispatch = useDispatch();
  const { projectList } = useSelector(
    (state) => state.ProjectManagementReducer
  );

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
      dispatch({
        type: GET_ALL_PRIORITY_SAGA,
      });
      dispatch({
        type: GET_ALL_TASK_TYPE_SAGA,
      });
      dispatch({
        type: GET_ALL_STATUS_SAGA,
      });
    return () => {};
  }, []);

  ///
  const { listUserSearch } = useSelector(
    (state) => state.UserManagementReducer
  );
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  /////
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Project Name",
      key: "projectName",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return <NavLink to={`/projectDetail/${record.id}`}>{text}</NavLink>;
      },
    },
    {
      title: "Category Name",
      key: "categoryName",
      dataIndex: "categoryName",
    },
    {
      title: "Creator",
      key: "creator",
      render: (text, record, index) => {
        return (
          <Tag color="green" key={index}>
            {record.creator.name}
          </Tag>
        );
      },
    },
    {
      title: "Member",
      key: "member",
      render: (text, record, index) => {
        return (
          <div key={index}>
            {record.members?.slice(0, 3).map((item, index) => {
              return (
                <Popover
                  key={index}
                  placement="leftTop"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <Avatar src={item.avatar}></Avatar>
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <Popconfirm
                                    title={`Are you sure to remove ${item.name} from this project?`}
                                    onConfirm={() => {
                                      dispatch({
                                        type: REMOVE_USER_FROM_PROJECT_SAGA,
                                        content: {
                                          projectId: record.id,
                                          userId: item.userId,
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
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                  title="Member List"
                >
                  <Avatar key={index} src={item.avatar}></Avatar>
                </Popover>
              );
            })}
            {record.members?.length > 3 ? "..." : ""}
            <Popover
              content={() => {
                return (
                  <AutoComplete
                    style={{
                      width: 200,
                    }}
                    placeholder="UserName"
                    options={listUserSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(value, option) => {
                      setValue(option.label);
                      dispatch({
                        type: ASSIGN_USER_PROJECT_SAGA,
                        content: {
                          projectId: record.id,
                          userId: Number(option.value),
                        },
                      });
                    }}
                    onSearch={() => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: GET_USER_BY_KEY_SAGA,
                          keyWord: value,
                        });
                      }, 300);
                    }}
                  />
                );
              }}
              title="Add user"
            >
              <Button
                shape="circle"
                icon={<UserAddOutlined></UserAddOutlined>}
              ></Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <div>
            <Button
              onClick={() => {
                dispatch({
                  type: SET_OPEN_DRAWER,
                  status: true,
                  title: "Edit Project",
                  placement: "right",
                  component: <DrawerEditProject></DrawerEditProject>,
                });
                dispatch({
                  type: GET_PROJECT_DETAIL_SAGA,
                  projectId: record.id,
                });
              }}
              icon={<EditOutlined></EditOutlined>}
            ></Button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_PROJECT_SAGA,
                  projectId: record.id,
                });
              }}
              // onCancel={}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="text-danger"
                icon={<DeleteOutlined></DeleteOutlined>}
              ></Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="container-fluid py-3">
      <div className="container">
        <h4>Project Process</h4>
      </div>

      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          onClick={() => {
            dispatch({
              type: SET_OPEN_DRAWER,
              status: true,
              title: "Add a new project",
              component: <DrawerAddProject></DrawerAddProject>,
              placement: "right",
            });
          }}
        >
          Thêm project mới
        </Button>
        <Button
          onClick={() => {
            dispatch({
              type: SET_OPEN_DRAWER,
              status: true,
              title: "Thêm task mới",
              component: <DrawerAddTask></DrawerAddTask>,
              placement:'top'
            });
          }}
        >
          Thêm task mới
        </Button>
      </Space>
      <Table columns={columns} dataSource={projectList} onChange={onChange} />
    </div>
  );
}
