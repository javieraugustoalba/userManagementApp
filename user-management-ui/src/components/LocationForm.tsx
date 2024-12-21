import React, { useState } from "react";
import { createLocation } from "../services/LocationService";
import { LocationStatus } from "../types/LocationStatus";

interface LocationFormProps {
  refreshLocations: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({ refreshLocations }) => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [status, setStatus] = useState<LocationStatus>(LocationStatus.Active);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createLocation({ name, address, status });
    refreshLocations();
    setName("");
    setAddress("");
    setStatus(LocationStatus.Active);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Location</h3>
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Location Name"
          required
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Location Address"
          required
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as LocationStatus)}
        >
          <option value={LocationStatus.Active}>Active</option>
          <option value={LocationStatus.Inactive}>Inactive</option>
        </select>
      </div>
      <button type="submit">Add Location</button>
    </form>
  );
};
