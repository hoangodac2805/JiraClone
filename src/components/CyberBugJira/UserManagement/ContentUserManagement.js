import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  DELETE_USER_SAGA,
  GET_ALL_USER_SAGA,
  PUT_USER_EDIT,
} from "../../../redux/Types/UserManagementType";
import { EditOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { OPEN_MODAL_ANTD } from "../../../redux/Types/ModalType";
import FormEditUser from "../../Forms/FormEditUser";

import SignUp from "../../SignUp/SignUp";


export default function ContentUserManagement() {
  const dispatch = useDispatch();

  const { userList } = useSelector((state) => state.UserManagementReducer);
  useEffect(() => {
    dispatch({
      type: GET_ALL_USER_SAGA,
    });

    return () => {};
  }, []);

  const columns = [
    {
      title: "UserID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              onClick={() => {
                dispatch({
                  type: OPEN_MODAL_ANTD,
                  title: "Chỉnh sửa thông tin thành viên",

                  content: <FormEditUser></FormEditUser>,
                });
                dispatch({
                  type: PUT_USER_EDIT,
                  userEdit: record,
                });
              }}
              icon={<EditOutlined></EditOutlined>}
            ></Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_SAGA,
                  userId: record.userId,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                className="btn btn-danger"
                icon={<UserDeleteOutlined></UserDeleteOutlined>}
              ></Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container-fluid">
      <Space
        style={{
          marginBottom: 16,
        }}
      >
     

        <Button
          onClick={() => {
            dispatch({
              type: OPEN_MODAL_ANTD,
              title: "Đăng kí thành viên mới",
              content: <SignUp></SignUp>,
            });
          }}
        >
          Đăng kí thành viên mới
        </Button>
      </Space>
      <Table rowKey={"id"} columns={columns} dataSource={userList} />
    </div>
  );
}
