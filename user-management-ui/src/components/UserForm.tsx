import React, { useState } from "react";
import { createUser } from "../services/UserService";

interface UserFormProps {
  refreshUsers: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ refreshUsers }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Employee");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({ firstName, lastName, email, role });
    refreshUsers();
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("Employee");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="Employee">Employee</option>
        <option value="Administrator">Administrator</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};
