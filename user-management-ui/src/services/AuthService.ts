import api from "../api";
import { LoginFormValues } from "../types/LoginFormValues";

export const authenticateUser = async (credentials: LoginFormValues) => {
  const response = await api.post("/api/auth/login", credentials);
  return response.data;
};
