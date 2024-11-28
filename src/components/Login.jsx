import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to install axios via npm or yarn
import "../styles/Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://helpdesk-backend-murex.vercel.app/api/auth/login", {
        email,
        password,
      });

      const { token, role } = response.data;

      // Save the token to localStorage or sessionStorage
      localStorage.setItem("token", token);

      // Handle role-based navigation after successful login
      onLogin(role);

      if (role === "customer") {
        navigate("/customer-dashboard");
      } else if (role === "agent") {
        navigate("/agent-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
      
      <p>
        Try Customer-agent-login:"amit@gmail.com"
        password:123456
      </p>
      <p>
        Try Admin-Login:"sahil@gmail.com"<br></br>
        password:123456
      </p>
    </div>
  );
}

export default Login;
