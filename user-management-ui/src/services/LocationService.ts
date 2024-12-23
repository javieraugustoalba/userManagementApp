import api from "../api";
import { LocationStatus } from "../enums/LocationStatus";
import { CompanyLocation } from "../types/CompanyLocation";

const API_URL = "api/Location";

export const getLocations = async (): Promise<CompanyLocation[]> => {
    const response = await api.get<CompanyLocation[]>(API_URL);
    return response.data;
};

export const createLocation = async (location: CompanyLocation): Promise<void> => {
    await api.post(API_URL, location);
};

export const updateLocationStatus = async (id: string, status: "Active" | "Inactive"): Promise<void> => {
    await api.patch(`${API_URL}/${id}/status`, { status });
};

export const deleteLocation = async (id: string): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
};
