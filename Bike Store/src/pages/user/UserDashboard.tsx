import React from 'react';
import { Card, Row, Col, Button } from 'antd';

const UserDashboard = () => {
  // Sample user data (you can replace with actual data from an API)
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://www.example.com/path/to/avatar.jpg',
  };

  return (
    <div style={{ padding: '24px' }}>
     
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
        </div>
      </div>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="User Statistics" bordered={false}>
            <p>Total Products: 50</p>
            <p>Total Sales: 1200</p>
            <p>Total Notifications: 5</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Recent Activity" bordered={false}>
            <p>Created a new product</p>
            <p>Received a new message</p>
            <p>Updated profile</p>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Messages" bordered={false}>
            <p>You have 3 unread messages</p>
            <Button type="link">View messages</Button>
          </Card>
        </Col>
      </Row>

     
    </div>
  );
};

export default UserDashboard;
