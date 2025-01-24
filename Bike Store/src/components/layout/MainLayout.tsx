import { createElement } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout } from "antd";
import Sidebar from "./Sidebar";
// import { useAppDispatch } from '../../redux/hooks';
// import { logout } from '../../redux/features/auth/authSlice';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    // const dispatch = useAppDispatch();

    const handleLogout = () => {
    
    };
  return (
    <Layout style={{ height: '100%' }}>
    <Sidebar />
    <Layout>
      <Header>
        <Button onClick={handleLogout}>Logout</Button>{' '}
      </Header>
      <Content style={{ margin: '24px 16px 0' }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  </Layout>
  );
};

export default MainLayout;
