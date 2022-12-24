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
import ContentUserManagement from "./ContentUserManagement";
import HeaderManagement from "./HeaderManagement";
import { USER_LOGIN } from "../../util/constants/SettingSystem";
import { Redirect } from "react-router-dom";
const { Header, Sider, Content } = Layout;
export default function MainJira() {
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
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <ReconciliationOutlined />,
                  label: "nav 1",
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "nav 3",
                },
              ]}
            />

            {/* {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger text-light",
              onClick: () => setCollapsed(!collapsed),
            }
          )} */}
          </Sider>
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
              }}
            ></Header>
            <Header
              className="site-layout-background"
              style={{ padding: 0, backgroundColor: "#dbdad5" }}
            >
              <HeaderManagement></HeaderManagement>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <ContentUserManagement></ContentUserManagement>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    alert("Vui lòng đăng nhập");
    return <Redirect to="./login"></Redirect>;
  }
}
