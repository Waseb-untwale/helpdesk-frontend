import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Tickets.css'
const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://helpdesk-backend-murex.vercel.app/api/tickets");
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      // Call the backend API to update the ticket status
      const response = await axios.put(`https://helpdesk-backend-murex.vercel.app/api/tickets/${ticketId}`, { status: newStatus });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
      alert(`Ticket status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="agent-dashboard">
      <h1>Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>name</th>
            <th>Title</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Action</th>
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
              <td>
                <button onClick={() => handleStatusChange(ticket._id, "Active")}>Set Active</button>
                <button onClick={() => handleStatusChange(ticket._id, "Pending")}>Set Pending</button>
                <button onClick={() => handleStatusChange(ticket._id, "Closed")}>Set Closed</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDashboard;

