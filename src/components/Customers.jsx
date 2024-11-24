import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]); // State to hold customer data
  const [error, setError] = useState(null);       // State to hold any errors
  const [loading, setLoading] = useState(true);   // State to show a loading indicator

  // Function to fetch customers from the backend
  const fetchCustomers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        setError("No token found, please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://helpdesk-backend-murex.vercel.app/api/auth/customers", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the Authorization header
        },
      });

      setCustomers(response.data); // Update state with the fetched customers
    } catch (err) {
      console.error(err);
      setError("Failed to fetch customers.");
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="customers">
      <h1>Customers</h1>

      {loading && <p>Loading customers...</p>} {/* Show loading message */}
      {error && <p className="error">{error}</p>} {/* Show error message */}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Customers;
