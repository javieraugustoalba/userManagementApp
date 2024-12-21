import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersManagement from "./pages/Management/UsersManagement";
import LocationsManagement from "./pages/Management/LocationsManagement";
import ScheduleManagement from "./pages/Management/ScheduleManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/locations" element={<LocationsManagement />} />
        <Route path="/schedules" element={<ScheduleManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
