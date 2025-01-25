import { Button, Space } from "antd";

interface ActionsProps {
  user: any;
  onToggleBlock: (id: string, isBlocked: boolean) => void;
}

export const Actions = ({ user, onToggleBlock }: ActionsProps) => {
  return (
    <Space>
      <Button danger onClick={() => console.log("Delete user with ID:", user._id)}>
        Delete
      </Button>
      <Button
        type={user.isBlocked ? "default" : "primary"}
        onClick={() => onToggleBlock(user._id, user.isBlocked)}
      >
        {user.isBlocked ? "Activate" : "Deactivate"}
      </Button>
    </Space>
  );
};
