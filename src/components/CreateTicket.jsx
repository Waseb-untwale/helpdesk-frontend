import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; // Import necessary hooks
import '../styles/CreateTicket.css'


function CreateTicket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState(""); // Add customer name if needed
  const [ticketId, setTicketId] = useState(null); // Track if we are editing an existing ticket
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  // Check if we're editing an existing ticket by getting data passed via navigation
  useEffect(() => {
    if (location.state && location.state.ticket) {
      const { ticket } = location.state;
      setTitle(ticket.title);
      setDescription(ticket.description);
      setName(ticket.name);
      setTicketId(ticket._id); // Set the ticketId for editing
    }
  }, [location.state]); // Run when location.state changes (i.e., when navigating with state)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
      name,
    };

    try {
      if (ticketId) {
        // If ticketId exists, update the ticket (PUT request)
        const response = await axios.put(`http://localhost:5000/api/tickets/${ticketId}`, ticketData);
        alert("Ticket Updated Successfully!");
      } else {
        // Otherwise, create a new ticket (POST request)
        const response = await axios.post("http://localhost:5000/api/tickets", ticketData);
        alert("Ticket Created Successfully!");
      }

      // Optionally navigate back to the tickets list or reset the form
      navigate("/customer-dashboard"); // Redirect to the tickets list after submission
      setTitle("");
      setDescription("");
      setName("");
    } catch (error) {
      console.error("Error creating or updating ticket:", error);
      alert("Failed to process ticket. Please try again.");
    }
  };

  return (
    <div className="create-ticket">
      <h1>{ticketId ? "Edit Ticket" : "Create New Ticket"}</h1>
      <form onSubmit={handleSubmit}>
      <label>Customer Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) =>  setName(e.target.value)}
        
        />
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{ticketId ? "Save Changes" : "Create Ticket"}</button>
      </form>
    </div>
  );
}

export default CreateTicket;
