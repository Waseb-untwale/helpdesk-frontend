import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LeftMenu.css";

function LeftMenu({ role, onLogout }) {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <div className="left-menu">
      <h2>Helpdesk</h2>
      <div className="menu-links">
        {role === "customer" && (
          <>
            <Link to="/customer-dashboard">Dashboard</Link>
            <Link to="/create-ticket">Create Ticket</Link>
            <Link to="/customer-tickets">View Tickets</Link>
          </>
        )}

        {role === "agent" && (
          <>
            <Link to="/agent-dashboard">Agent Dashboard</Link>
            <Link to="/tickets">Manage Tickets</Link>
            <Link to="/add-note">Add Notes/Replies</Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
            <Link to="/user-management">Manage Users</Link>
            <Link to="/tickets">View All Tickets</Link>
            <Link to="/add-note">Add Notes/Replies</Link>
            <Link to="/customers">Customers</Link>
          </>
        )}
      </div>

      {/* Logout Button */}
      <div className="logout">
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default LeftMenu;
