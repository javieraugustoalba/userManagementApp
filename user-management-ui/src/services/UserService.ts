import axios from "axios";

export const getUsers = async () => axios.get("/api/users").then((res) => res.data);
export const createUser = async (user: any) => axios.post("/api/users", user);
export const deleteUser = async (id: number) => axios.delete(`/api/users/${id}`);
