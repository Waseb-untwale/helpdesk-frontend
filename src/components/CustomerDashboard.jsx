import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/CustomerDashboard.css'
const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from the backend
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://helpdesk-backend-murex.vercel.app/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="dashboard">
      <h1>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>{ticket.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
