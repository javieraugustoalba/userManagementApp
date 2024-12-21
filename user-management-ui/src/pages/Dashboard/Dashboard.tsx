import React, { useEffect, useState } from "react";
import { getLocations } from "../../services/LocationService";
import Pagination from "../../components/Pagination";
import { CompanyLocation } from "../../types/CompanyLocation";

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<CompanyLocation[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchLocations();
  }, [currentPage]);

  const fetchLocations = async () => {
    const data = await getLocations(currentPage); 
    setLocations(data);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="location-grid">
        {locations.map((loc) => (
          <div key={loc.id} className="location-card">
            <h3>{loc.name}</h3>
            <p>{loc.address}</p>
          </div>
        ))}
      </div>
      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={10} />
    </div>
  );
};

export default Dashboard;
