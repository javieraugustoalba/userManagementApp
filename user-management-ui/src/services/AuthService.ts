import axios from "axios";
import { LoginFormValues } from "../types/LoginFormValues";

export const authenticateUser = async (credentials: LoginFormValues) => {
  const response = await axios.post("/api/auth/login", credentials);
  return response.data;
};
