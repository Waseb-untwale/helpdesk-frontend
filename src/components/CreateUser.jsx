import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");

  // Fetch user data if editing
  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            // If token is missing, redirect to login
            navigate("/login");
            return;
          }

          const response = await axios.get(`http://localhost:5000/api/auth/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = response.data;
          setUsername(user.name);
          setEmail(user.email);
          setRole(user.role);
        } catch (err) {}
      };
      fetchUserData();
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { name: username, email, role };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      if (id) {
        // Edit existing user
        await axios.put(`http://localhost:5000/api/auth/users/${id}`, updatedUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User updated successfully");
      } else {
        
        
      }

      // Clear form fields after success
      setUsername("");
      setEmail("");
      setRole("customer");

      // Redirect to the user management page after success
      navigate("/user-management");
    } catch (err) {
      // Check if the error has a response from the backend
      if (err.response) {
        console.error("Error response:", err.response);
        alert(`Error creating/updating user: ${err.response.data.message || err.message}`);
      } else {
        console.error("Unexpected error:", err);
        alert(`Unexpected error: ${err.message}`);
      }
    }
  };

  return (
    <div className="create-user-container">
      <h2>{id ? "Edit User" : "Create New User"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">{id ? "Save Changes" : ""}</button>
      </form>
    </div>
  );
};

export default CreateUser;
