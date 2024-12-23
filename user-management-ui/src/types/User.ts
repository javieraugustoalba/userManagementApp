import { UserTypes } from "../enums/UserTypes";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  country: string;
  city: string;
  password: string;
  userType: UserTypes;
}
