import api from "../api";
import { CreateSchedule } from "../types/CreateSchedule";
import { Schedule } from "../types/Schedule";

export const getSchedules = async (): Promise<Schedule[]> =>
  api.get("/api/schedules").then((response) => response.data as Schedule[]);

export const createSchedule = async (schedule: CreateSchedule): Promise<void> =>
  api.post("/api/schedules", schedule);

export const deleteSchedule = async (id: number): Promise<void> =>
  api.delete(`/api/schedules/${id}`);
