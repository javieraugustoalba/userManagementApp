import axios from "axios";
import { Schedule } from "../types/Schedule";

export const getSchedules = async () => axios.get("/api/schedules").then((res) => res.data);
export const createSchedule = async (schedule: Schedule) => axios.post("/api/schedules", schedule);
export const deleteSchedule = async (id: number) => axios.delete(`/api/schedules/${id}`);

