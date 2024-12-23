import api from "../api";
import { Schedule } from "../types/Schedule";

export const getSchedules = async (): Promise<Schedule[]> =>
  api.get("/api/schedule").then((response) => response.data as Schedule[]);

export const createSchedule = async (schedule: Schedule): Promise<void> =>
  api.post("/api/schedule", schedule);

export const deleteSchedule = async (id: string): Promise<void> =>
  api.delete(`/api/schedule/${id}`);
