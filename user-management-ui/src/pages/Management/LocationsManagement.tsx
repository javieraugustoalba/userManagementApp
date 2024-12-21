import React, { useState, useEffect } from "react";
import { getLocations, deleteLocation, updateLocationStatus } from "../../services/LocationService";
import { LocationForm } from "../../components/LocationForm";
import { CompanyLocation } from "../../types/CompanyLocation";

const LocationsManagement: React.FC = () => {
    const [locations, setLocations] = useState<CompanyLocation[]>([]);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        const data = await getLocations(1);
        setLocations(data);
    };

    const handleDelete = async (locationId: number) => {
        await deleteLocation(locationId);
        fetchLocations();
    };

    const handleToggleStatus = async (locationId: number, currentStatus: string) => {
        await updateLocationStatus(locationId, currentStatus === "Active" ? "Inactive" : "Active");
        fetchLocations();
    };

    return (
        <div>
            <h1>Locations Management</h1>
            <LocationForm refreshLocations={fetchLocations} />
            <ul>
                {locations.map((location) => (
                    <li key={location.id}>
                        {location.name} - {location.status}
                        <button onClick={() => handleDelete(location.id)}>Delete</button>
                        <button onClick={() => handleToggleStatus(location.id, location.status)}>
                            {location.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationsManagement;
