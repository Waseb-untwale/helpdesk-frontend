import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AddNote.css'
const AddNote = ({ role }) => {
  const [ticketId, setTicketId] = useState(""); // Ticket ID to add a note
  const [note, setNote] = useState(""); // Note content
  const navigate = useNavigate();

  const handleAddNote = (e) => {
    e.preventDefault();
    if (ticketId && note) {
      // Here you would typically send a request to the backend to add the note to the ticket
      console.log(`Note added for Ticket ID: ${ticketId}`);
      console.log(`Note: ${note}`);
      // Redirect to the respective dashboard or ticket view page
      navigate(`/${role}-dashboard`);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="add-note-container">
      <h2>Add Note/Reply to Ticket</h2>
      <form onSubmit={handleAddNote}>
        <div className="input-group">
          <label>Ticket ID:</label>
          <input
            type="text"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Note:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
