import { toast } from "sonner";
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../../redux/api/bike/userApi";

export const UserData = () => {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error fetching users.</p>;

  const filteredUsers = users?.data.filter((user) => user.role !== "admin");

  const handleDelete = (id: string) => {
    console.log("Delete user with ID:", id);
  };

  const handleToggleBlock = async (id: string, isBlocked: boolean) => {
    const toastId = toast.loading('Deactivating user...');
    try {
      const response = await updateUser({ id, isBlocked: !isBlocked });
      if (response?.error) {
        toast.error('Something went wrong', { id: toastId, duration: 2000 });
      } else {
        toast.success(`User ${isBlocked ? "activated" : "deactivated"} successfully`, { id: toastId, duration: 2000 });
        refetch();
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <div>
      <h1>User List</h1>
      {filteredUsers && filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                  {user.isBlocked ? (
                    <button onClick={() => handleToggleBlock(user._id, user.isBlocked)}>Activate</button>
                  ) : (
                    <button onClick={() => handleToggleBlock(user._id, user.isBlocked)}>Deactivate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};
