import React, { useEffect, useState } from "react";
import { getLocations } from "../../services/LocationService";
import Pagination from "../../components/Pagination";
import { CompanyLocation } from "../../types/CompanyLocation";
import { Link } from "react-router-dom"; // Import Link for navigation

const Dashboard: React.FC = () => {
  const [locations, setLocations] = useState<CompanyLocation[]>([]); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchLocations();
  }, [currentPage]);

  const fetchLocations = async () => {
    setIsLoading(true); 
    try {
      const data = await getLocations(); 
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Navigation Menu */}
      <nav>
        <ul>
          <li>
            <Link to="/users">Manage Users</Link>
          </li>
          <li>
            <Link to="/locations">Manage Locations</Link>
          </li>
          <li>
            <Link to="/schedules">Manage Schedules</Link>
          </li>
        </ul>
      </nav>

      {isLoading ? (
        <p>Loading locations...</p> 
      ) : locations && locations.length > 0 ? (
        <div className="location-grid">
          {locations.map((loc) => (
            <div key={loc.id} className="location-card">
              <h3>{loc.name}</h3>
              <p>{loc.address}</p>
              <p>Status: {loc.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No locations available.</p>
      )}

      <Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={10} />
    </div>
  );
};

export default Dashboard;
