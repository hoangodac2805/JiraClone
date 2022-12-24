import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";

import { USER_LOGIN } from "../../util/constants/SettingSystem";
import { NavLink, Redirect } from "react-router-dom";
const { Header, Sider, Content } = Layout;
export  const JiraTemplate = (propsRoute) => {
      let { Component, ...restRouter } = propsRoute;
  const [collapsed, setCollapsed] = useState(true);
  if (localStorage.getItem(USER_LOGIN)) {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            style={{ paddingTop: "76px" }}
            trigger={null}
            collapsible
            collapsed={collapsed}
          >
            <div className="logo" />
            <li
              style={{
                fontSize: "25px",
                color: "white",
                backgroundColor: "#001529",
                listStyle: "none",
                textAlign: "center",
                paddingBottom: "8px",
              }}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              {collapsed ? (
                <CaretRightOutlined></CaretRightOutlined>
              ) : (
                <CaretLeftOutlined></CaretLeftOutlined>
              )}
            </li>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <ul>
                <li
                  className="mb-3"
                  style={{ textAlign: "center", overflow: "hidden" }}
                >
                  <NavLink
                    className=" d-inline-block w-100 py-2"
                    activeStyle={{ backgroundColor: "#1990ff" }}
                    to="/userManagement"
                  >
                    <UserOutlined
                      className=""
                      style={{ color: "white", fontSize: "25px" }}
                    />
                    {!collapsed ? (
                      <span className="text-light ml-1">User Process</span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
                <li
                  className=" mb-3"
                  style={{ textAlign: "center", overflow: "hidden" }}
                >
                  <NavLink
                    className="d-inline-block w-100 py-2"
                    activeStyle={{ backgroundColor: "#1990ff" }}
                    to="/projectManagement"
                  >
                    <ReconciliationOutlined
                      className=""
                      style={{ color: "white", fontSize: "25px" }}
                    />
                    {!collapsed ? (
                      <span className="text-light ml-1">Project Process</span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              </ul>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
              }}
            ></Header>
            <Component {...propsRoute}></Component>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    alert("Vui lòng đăng nhập");
    return <Redirect to="./login"></Redirect>;
  }
};
