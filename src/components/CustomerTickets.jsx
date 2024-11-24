import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/CustomerTickets.css'
const CustomerTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (err) {
        console.error("Error fetching tickets:", err.response?.data?.msg || err.message);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="customer-tickets-container">
      <h2>Your Tickets</h2>
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
              <td>{new Date(ticket.updatedAt).toLocaleString()}</td>
              <td>
                <Link to={`/tickets/${ticket._id}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTickets;
