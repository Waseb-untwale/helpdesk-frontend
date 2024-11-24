import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CustomerDashboard from "./components/CustomerDashboard";
import CreateTicket from "./components/CreateTicket";
import AgentDashboard from "./components/AgentDashboard";
import LeftMenu from "./components/LeftMenu";
import Dashboard from "./components/Dashboard";
import Tickets from "./components/Tickets";
import TicketDetails from "./components/TicketDetails";
import Customers from "./components/Customers";
import UserManagement from "./components/UserManagement";
import AddTicketForm from "./components/AddTicketForm";
import AddNote from "./components/AddNote"; // Import AddNote component
import "./App.css";
import CustomerTickets from "./components/CustomerTickets";
import CreateUser from "./components/CreateUser";

function App() {
  const [role, setRole] = useState(""); // Track the logged-in user's role
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar toggle

  const handleLogin = (userRole) => {
    setRole(userRole); // Update role after login
  };

  const handleLogout = () => {
    setRole(""); // Clear role on logout
    localStorage.removeItem("token"); // Clear token from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="app">
        {/* Conditionally render LeftMenu if logged in */}
        {role && <LeftMenu role={role} onLogout={handleLogout} sidebarOpen={sidebarOpen} />}

        <div className={`content ${sidebarOpen ? 'open' : ''}`}>
          <Routes>
            {/* Public routes: Login and Register */}
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            
            {/* Customer routes */}
            {role === "customer" && (
              <>
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/create-ticket" element={<CreateTicket />} />
                <Route path="/add-note" element={<AddNote role={role} />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/customer-tickets" element={<CustomerTickets />} />
                <Route path="/tickets/:id" element={<TicketDetails />} />
              </>
            )}

            {/* Admin routes */}
            {role === "admin" && (
              <>
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/create-user/:id" element={<CreateUser />} />
                <Route path="/add-note" element={<AddNote role={role} />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/create-user" element={<CreateUser />} />
              </>
            )}

            {/* Agent routes */}
            {role === "agent" && (
              <>
                <Route path="/agent-dashboard" element={<AgentDashboard />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/tickets/:id" element={<TicketDetails />} />
                <Route path="/add-note" element={<AddNote role={role} />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
