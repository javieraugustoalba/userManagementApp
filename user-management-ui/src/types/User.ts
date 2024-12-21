import { UserTypes } from "./UserTypes";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  country: string;
  city: string;
  password: string;
  userType: UserTypes;
}
