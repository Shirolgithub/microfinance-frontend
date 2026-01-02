import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful");
        onLogin();
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      alert("Login error");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
