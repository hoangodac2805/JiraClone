import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { Redirect } from "react-router-dom";
import { message, Popconfirm } from "antd";
import History from "../../History/History";
export default function HeaderManagement() {
  const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN"));
  const confirm = (e) => {
    localStorage.clear();
    History.push("/login");
  };
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h4 className="pt-3">Main User Process</h4>
        </div>
        <div>
          <UserOutlined
            style={{ fontSize: "25px", marginRight: "10px" }}
          ></UserOutlined>
          <span>{userInfo.name}</span>
          <Popconfirm
            title="Bạn có thực sự muốn đăng xuất không?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button className="ml-3">Đăng xuất</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  );
}
