import axios from "axios";
import { CreateUser } from "../types/CreateUser";

export const getUsers = async () => axios.get("/api/users").then((res) => res.data);
export const createUser = async (user: CreateUser) => axios.post("/api/users", user);
export const deleteUser = async (id: number) => axios.delete(`/api/users/${id}`);
export const sendInvitation = async (email: string): Promise<void> => {
    await axios.post("/api/users/invite", email ); 
  };