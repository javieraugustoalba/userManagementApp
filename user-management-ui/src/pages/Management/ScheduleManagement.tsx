import React, { useState, useEffect } from "react";
import { getSchedules, deleteSchedule } from "../../services/ScheduleService";
import { ScheduleForm } from "../../components/ScheduleForm";
import { User } from "../../types/User";
import { getUsers } from "../../services/UserService";
import { getLocations } from "../../services/LocationService";
import { CompanyLocation } from "../../types/CompanyLocation";

interface Schedule {
    id: number;
    userId: number;
    locationId: number;
    startTime: string;
    endTime: string;
}

const ScheduleManagement: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [employees, setEmployees] = useState<User[]>([]); 
    const [locations, setLocations] = useState<CompanyLocation[]>([]);
    const [userId, setUserId] = useState<number | null>(null); 
    const [locationId, setLocationId] = useState<number | null>(null);
  

    useEffect(() => {
        fetchSchedules();
        fetchEmployees();
        fetchLocations();
    }, []);

    const fetchSchedules = async () => {
        const data = await getSchedules();
        setSchedules(data);
    };

    const fetchEmployees = async () => {
        const data = await getUsers();
        setEmployees(data);
      };
    
      const fetchLocations = async () => {
        const data = await getLocations();
        setLocations(data);
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
            <select onChange={(e) => setUserId(Number(e.target.value))}>
                {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                        {employee.firstName}
                    </option>
                ))}
            </select>
            <select onChange={(e) => setLocationId(Number(e.target.value))}>
                {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                        {location.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ScheduleManagement;
