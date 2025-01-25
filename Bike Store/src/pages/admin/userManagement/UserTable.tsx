import { Table, Space, Tag } from "antd";
import { Actions } from "./Actions";

interface UserTableProps {
  users: any[];
  onToggleBlock: (id: string, isBlocked: boolean) => void;
}

export const UserTable = ({ users, onToggleBlock }: UserTableProps) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "user" ? "blue" : "green"}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Actions user={record} onToggleBlock={onToggleBlock} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      rowKey="_id"
      pagination={{ pageSize: 10 }}
      bordered
    />
  );
};
