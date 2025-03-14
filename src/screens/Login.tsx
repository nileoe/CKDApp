/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { login } from "../appwriteConfig";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

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
      navigate("/calculator");
    } catch (err) {
      setError("Invalid Details. Please Try Again");
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h2 className="loginTitle">Welcome to CKDApp</h2>
        <form onSubmit={handleLogin} className="loginForm">
          <div className="inputGroup">
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
        <p className="signupText">
          Don't have an account?{" "}
          <Link to="/register" className="signupLink">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
