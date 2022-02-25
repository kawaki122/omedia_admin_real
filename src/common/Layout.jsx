import React from 'react';
import { Layout, Menu } from 'antd';
import { BorderOuterOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;

function SidebarLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<BorderOuterOutlined />}>
            <Link to='/'>
              Brands
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<BorderOuterOutlined />}>
            <Link to='/cities'>
              Cities
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<BorderOuterOutlined />}>
            <Link to='/clients'>
              Clients
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default SidebarLayout;