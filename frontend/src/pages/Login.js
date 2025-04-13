import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/form.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  const verifyToken = useCallback(async (token) => {
    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.get(`${BASE_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (res.data.authenticated) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      }
    } catch (err) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, navigate]);

  useEffect(() => {
    setIsMounted(true); 
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
    return () => setIsMounted(false); 
  }, [verifyToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMounted) return;
    
    setIsLoading(true);
    setError("");

    try {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${BASE_URL}/api/auth/login`, { 
        email, 
        password 
      });

      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError("Access token not found. Please contact support.");
      }
    } catch (err) {
      if (!isMounted) return;
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please try again."
      );
    } finally {
      if (isMounted) setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;