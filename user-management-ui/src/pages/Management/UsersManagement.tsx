import React, { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../../services/UserService";
import { UserForm } from "../../components/UserForm";


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (userId: number) => {
    await deleteUser(userId);
    fetchUsers();
  };

  return (
    <div>
      <h1>Users Management</h1>
      <UserForm refreshUsers={fetchUsers} />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.role})
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersManagement;
