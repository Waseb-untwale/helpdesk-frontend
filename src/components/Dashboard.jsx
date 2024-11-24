import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

function Dashboard() {
  const [totalTickets, setTotalTickets] = useState([]);
  const [totalCustomers, setTotalCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tickets and customers dynamically
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Ensure token exists before making requests
        if (!token) {
          // Handle cases where the token doesn't exist (e.g., redirect to login page)
          setError("Token missing. Please log in again.");
          return;
        }

        // Fetch total tickets
        const ticketsResponse = await axios.get("http://localhost:5000/api/tickets");
        setTotalTickets(ticketsResponse.data.length); // Assuming the response data is an array of tickets

        // Fetch total customers
        const customersResponse = await axios.get("http://localhost:5000/api/auth/customers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTotalCustomers(customersResponse.data.length); // Assuming the response data is an array of customers
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <p>Total Tickets: {totalTickets}</p>
          <p>Total Customers: {totalCustomers}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
