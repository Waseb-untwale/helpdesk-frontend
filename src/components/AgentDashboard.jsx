import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AgentDashboard.css";

function AgentDashboard() {
  const [tickets, setTickets] = useState([]); // State to store the tickets
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track errors if any

  useEffect(() => {
    // Fetch tickets when the component is mounted
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data); // Assuming the API returns an array of tickets
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError("Error fetching tickets");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []); // Empty dependency array to run the effect only once after the component mounts

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="agent-dashboard">
      <h1>Tickets Overview</h1>
      <table>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>name</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AgentDashboard;
