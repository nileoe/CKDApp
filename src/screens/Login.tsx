/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { login } from "../appwriteConfig";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setError("Invalid Details. Please Try Again");
    }
  };

  return (
    <div>
      <div>
        <h2>Welcome to CKDApp</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
