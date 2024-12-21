import axios from "axios";
import { CompanyLocation } from "../types/CompanyLocation";
import { CreateLocation } from "../types/CreateLocation";

export const getLocations = async (page: number): Promise<CompanyLocation[]> => {
  const response = await axios.get(`/api/locations?page=${page}`);
  return response.data; 
};

export const createLocation = async (location: CreateLocation) => {
  await axios.post("/api/locations", location);
};

export const deleteLocation = async (id: number): Promise<void> => {
  await axios.delete(`/api/locations/${id}`);
};
