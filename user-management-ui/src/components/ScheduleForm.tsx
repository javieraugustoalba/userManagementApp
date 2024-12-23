import React, { useState, useEffect } from "react";
import { createSchedule } from "../services/ScheduleService";
import { getUsers } from "../services/UserService";
import { getLocations } from "../services/LocationService";
import { User } from "../types/User";
import { CompanyLocation } from "../types/CompanyLocation";
import { Schedule } from "../types/Schedule";

interface ScheduleFormProps {
  refreshSchedules: () => void;
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ refreshSchedules }) => {
  const [scheduleId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [locations, setLocations] = useState<CompanyLocation[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchLocations();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const fetchLocations = async () => {
    const data = await getLocations();
    setLocations(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || userId === "Select a User") {
      alert("Please select a valid user.");
      return;
    }
    if (!locationId || locationId === "Select a Location") {
      alert("Please select a valid location.");
      return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (endDate < startDate) {
      alert("End time must be equal to or greater than start time.");
      return;
    }

    const newSchedule: Schedule = {
      id: scheduleId,
      userId: userId,
      locationId: locationId,
      startTime: startTime,
      endTime: endTime,
    };

    try {
      await createSchedule(newSchedule);
      refreshSchedules();
      setUserId("");
      setLocationId("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      console.error("Error creating schedule:", error);
      alert("Failed to create schedule. Please try again.");
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Schedule</h3>
      <div>
        <label>User</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Location</label>
        <select value={locationId} onChange={(e) => setLocationId(e.target.value)} required>
          <option value="">Select a Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          min={getMinDateTime()} 
          required
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          min={startTime || getMinDateTime()} 
          required
        />
      </div>
      <button type="submit">Add Schedule</button>
    </form>
  );
};
