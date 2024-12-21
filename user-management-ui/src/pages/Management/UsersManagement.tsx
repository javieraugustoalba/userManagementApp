import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, sendInvitation } from "../../services/UserService";
import { UserForm } from "../../components/UserForm";
import { User } from "../../types/User";

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState<string>("");

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

  const handleInvite = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    await sendInvitation(email);
    alert("Invitation sent!");
    setEmail(""); 
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
      <h2>Invite User</h2>
      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => handleInvite}>Send Invitation</button>
    </div>
  );
};

export default UsersManagement;
