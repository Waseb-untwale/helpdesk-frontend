import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/UserManagement.css'
const UserManagement = () => {
  const [users, setUsers] = useState([]); // State for user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token
      const response = await axios.get("https://helpdesk-backend-murex.vercel.app/api/auth/customers", {
        headers: { Authorization: `Bearer ${token}` }, // Add token in headers
      });
      setUsers(response.data); // Set fetched users
    } catch (err) {
      console.error(err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Create a new user
  const createUser = async (userData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://helpdesk-backend-murex.vercel.app/api/auth/register", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error(err);
      setError("Failed to create user.");
    }
  };

  // Edit an existing user and navigate to the create-user page with the id in the URL
  const editUser = (userId) => {
    navigate(`/create-user/${userId}`); // Navigate to the create-user page with user ID
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle the create button click event to create a new user
  

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}

      

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => editUser(user._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
