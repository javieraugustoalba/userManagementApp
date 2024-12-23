import api from "../api";
import { CreateUser } from "../types/CreateUser";

export const getUsers = async () => api.get("/api/user").then((res) => res.data);
export const createUser = async (user: CreateUser) => api.post("/api/user", user);
export const deleteUser = async (id: string) => api.delete(`/api/user/${id}`);
export const sendInvitation = async (email: string): Promise<void> => {
    await api.post("/api/user/invite", email ); 
  };