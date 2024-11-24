import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/TicketDetails.css";

function TicketDetails({ role }) {
  const { id } = useParams(); // Get ticket ID from URL params
  const [notes, setNotes] = useState(""); // State for the new note
  const [ticketData, setTicketData] = useState(null); // State for ticket details
  const [ticketNotes, setTicketNotes] = useState([]); // State for ticket notes

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch ticket details
        const ticketResponse = await axios.get(`http://localhost:5000/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicketData(ticketResponse.data);

        // Fetch notes for the ticket
        const notesResponse = await axios.get(`http://localhost:5000/api/tickets/${id}/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTicketNotes(notesResponse.data.notes); // Assuming the response has notes as an array

      } catch (err) {
        console.error("Error fetching ticket details:", err.response?.data?.msg || err.message);
      }
    };

    fetchTicketDetails();
  }, [id]); // Only fetch when ID changes

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      alert("Please enter a note.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/tickets/${id}/notes`,
        { note: notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update ticket notes after adding a new note
      setTicketNotes((prevNotes) => [...prevNotes, response.data]);
      setNotes(""); // Clear the note input field
    } catch (err) {
      console.error("Error adding note:", err.response?.data?.msg || err.message);
    }
  };

  if (!ticketData) return <p>Loading...</p>;

  return (
    <div className="ticket-details">
      <h2>Ticket ID: {ticketData._id}</h2>
      <h3>{ticketData.title}</h3>
      <p>Status: {ticketData.status}</p>
      <p>Last Updated: {new Date(ticketData.updatedAt).toLocaleString()}</p>

      <h4>Notes:</h4>
      <ul className="notes-list">
        {ticketNotes.length > 0 ? (
          ticketNotes.map((note, index) => (
            <li key={index}>
              <strong>{note.user}:</strong> {note.note} <br />
              <small>{new Date(note.timestamp).toLocaleString()}</small>
            </li>
          ))
        ) : (
          <p>No notes available for this ticket.</p>
        )}
      </ul>

      {role !== "agent" && (
        <form onSubmit={handleAddNote}>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add a note..."
            rows="4"
            required
          ></textarea>
          <button type="submit">Add Note</button>
        </form>
      )}
    </div>
  );
}

export default TicketDetails;
