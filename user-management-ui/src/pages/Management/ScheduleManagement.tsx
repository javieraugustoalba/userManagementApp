import React, { useState, useEffect } from "react";
import { getSchedules, deleteSchedule } from "../../services/ScheduleService";
import { ScheduleForm } from "../../components/ScheduleForm";
import { User } from "../../types/User";
import { getUsers } from "../../services/UserService";
import { getLocations } from "../../services/LocationService";
import { CompanyLocation } from "../../types/CompanyLocation";
import { Schedule } from "../../types/Schedule";

const ScheduleManagement: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [locations, setLocations] = useState<CompanyLocation[]>([]);
    const [userId, setUserId] = useState<number | null>(null);
    const [locationId, setLocationId] = useState<number | null>(null);


    useEffect(() => {
        fetchSchedules();
        fetchUsers();
        fetchLocations();
    }, []);

    const fetchSchedules = async () => {
        const data = await getSchedules();
        setSchedules(data);
    };

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const fetchLocations = async () => {
        const data = await getLocations();
        setLocations(data);
    };

    const handleDelete = async (scheduleId: string) => {
        await deleteSchedule(scheduleId);
        fetchSchedules();
    };


    const getUserById = (userId: string) =>
        users.find((user) => user.id === userId);

    const getLocationById = (locationId: string) =>
        locations.find((location) => location.id === locationId);

    return (
        <div>
            <h1>Schedule Management</h1>
            <ScheduleForm refreshSchedules={fetchSchedules} />
            <ul>
                {schedules.map((schedule) => {
                    const user = getUserById(schedule.userId);
                    const location = getLocationById(schedule.locationId);
                    return (
                        <li key={schedule.id}>
                            <strong>User:</strong> {user?.firstName} {user?.lastName} -{" "}
                            <strong>Location:</strong> {location?.name} -{" "}
                            <strong>Time:</strong> {schedule.startTime} to {schedule.endTime}
                            <button onClick={() => handleDelete(schedule.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ScheduleManagement;
