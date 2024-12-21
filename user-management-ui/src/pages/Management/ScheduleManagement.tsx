import React, { useState, useEffect } from "react";
import { getSchedules, deleteSchedule } from "../../services/ScheduleService";
import { ScheduleForm } from "../../components/ScheduleForm"; 

interface Schedule {
  id: number;
  userId: number;
  locationId: number;
  startTime: string;
  endTime: string;
}

const ScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    const data = await getSchedules();
    setSchedules(data);
  };

  const handleDelete = async (scheduleId: number) => {
    await deleteSchedule(scheduleId);
    fetchSchedules();
  };

  return (
    <div>
      <h1>Schedule Management</h1>
      <ScheduleForm refreshSchedules={fetchSchedules} />
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            User ID: {schedule.userId} - Location ID: {schedule.locationId} - Time: {schedule.startTime} to {schedule.endTime}
            <button onClick={() => handleDelete(schedule.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleManagement;
