import React, { useState, useEffect } from "react";
import { getLocations, deleteLocation } from "../../services/LocationService";
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

  return (
    <div>
      <h1>Locations Management</h1>
      <LocationForm refreshLocations={fetchLocations} />
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name} - {location.status}
            <button onClick={() => handleDelete(location.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsManagement;
