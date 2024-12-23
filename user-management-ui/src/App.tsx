import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UsersManagement from "./pages/Management/UsersManagement";
import LocationsManagement from "./pages/Management/LocationsManagement";
import ScheduleManagement from "./pages/Management/ScheduleManagement";

const ProtectedRoute = ({ children, userType }: { children: JSX.Element; userType: string }) => {
  const storedUserType = localStorage.getItem("userType");

  console.log("Stored UserType:", storedUserType);
  console.log("Required UserType:", userType);

  return storedUserType?.toLowerCase() === userType.toLowerCase() ? (
    children
  ) : (
    <Navigate to="/" />
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<ProtectedRoute userType="Administrator"><UsersManagement /></ProtectedRoute>} />
        <Route path="/locations"element={<ProtectedRoute userType="Administrator"><LocationsManagement /></ProtectedRoute>} />
        <Route path="/schedules" element={<ScheduleManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
