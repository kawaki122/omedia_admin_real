import React, { Fragment } from "react";
import { Button, Layout, Menu } from "antd";
import {
  BorderOuterOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { storageKeyEnum } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setInitialLoaded } from "../store/reducers/dashSlice";

const { Header, Footer, Sider, Content } = Layout;

function SidebarLayout({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.dashboard.user);

  const handleLogout = () => {
    dispatch(
      setInitialLoaded({ cities: [], brands: [], clients: [], user: null })
    );
    localStorage.removeItem(storageKeyEnum.access_token);
    history.push("/");
  };

  if (!Boolean(user?.email)) {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Content
          style={{
            margin: "24px 16px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          O Tracker ©2022 Created by Omedia
        </Footer>
      </Layout>
    );
  }

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
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<BorderOuterOutlined />}>
            <Link to="/campaigns">Campaign</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<SettingOutlined />}>
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={handleLogout} icon={<UserOutlined />}>
            Logout
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
