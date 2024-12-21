import api from "../api";
import { CreateUser } from "../types/CreateUser";

export const getUsers = async () => api.get("/api/users").then((res) => res.data);
export const createUser = async (user: CreateUser) => api.post("/api/users", user);
export const deleteUser = async (id: number) => api.delete(`/api/users/${id}`);
export const sendInvitation = async (email: string): Promise<void> => {
    await api.post("/api/users/invite", email ); 
  };