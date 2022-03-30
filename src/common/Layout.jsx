import React from "react";
import { Layout, Menu } from "antd";
import { BorderOuterOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

function SidebarLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <Menu.Item key="0" icon={<BorderOuterOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<BorderOuterOutlined />}>
            <Link to="/campaigns">Campaign</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        ></Header>
        <Content style={{ margin: "24px 16px 0" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          O Tracker ©2022 Created by Omedia
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SidebarLayout;
