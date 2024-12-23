import { LocationStatus } from "../enums/LocationStatus";
import { Schedule } from "./Schedule";

export interface CompanyLocation {
  id: string; 
  name: string;
  address: string;
  status: LocationStatus; 
  accessSchedules: Schedule[]; 
}
