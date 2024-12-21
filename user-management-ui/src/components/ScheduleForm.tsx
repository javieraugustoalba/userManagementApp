import React, { useState } from "react";
import { createSchedule } from "../services/ScheduleService";

interface ScheduleFormProps {
  refreshSchedules: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ refreshSchedules }) => {
  const [userId, setUserId] = useState<number>(0);
  const [locationId, setLocationId] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSchedule({ userId, locationId, startTime, endTime });
    refreshSchedules();
    setUserId(0);
    setLocationId(0);
    setStartTime("");
    setEndTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Schedule</h3>
      <div>
        <label>User ID</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          placeholder="User ID"
          required
        />
      </div>
      <div>
        <label>Location ID</label>
        <input
          type="number"
          value={locationId}
          onChange={(e) => setLocationId(Number(e.target.value))}
          placeholder="Location ID"
          required
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Schedule</button>
    </form>
  );
};
