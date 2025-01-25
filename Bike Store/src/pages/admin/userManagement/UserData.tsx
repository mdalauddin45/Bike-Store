import { toast } from "sonner";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/api/bike/userApi";
import { Typography } from "antd";
import { UserTable } from "./UserTable";

const { Title } = Typography;

export const UserData = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  const filteredUsers = users?.data.filter((user:any) => user.role !== "admin");

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    const toastId = toast.loading(isBlocked ? "Activating user..." : "Deactivating user...");
    try {
      const response:any = await updateUser({ id, isBlocked: !isBlocked });
      if (response?.error) {
        toast.error("Something went wrong", { id: toastId, duration: 2000 });
      } else {
        toast.success(
          `User ${isBlocked ? "activated" : "deactivated"} successfully`,
          { id: toastId, duration: 2000 }
        );
        refetch();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <Title level={2}>User List</Title>
      {filteredUsers && filteredUsers.length > 0 ? (
        <UserTable users={filteredUsers} onToggleBlock={handleToggleBlock} />
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
