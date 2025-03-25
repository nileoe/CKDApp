/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { createAccount } from "../../backend/userActions";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import { ethnicities, userSexes } from "../../types/CalculationTypes";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userDOB, setUserDOB] = useState("");
  const [userSex, setUserSex] = useState("female");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await createAccount(name, email, password, userDOB, userSex);
      navigate("/");
    } catch (err) {
      setError(`Registration failed: ${err}`);
    }
  };

  return (
    <div className="container">
      <div className="registerBox">
        <h2 className="registerTitle">Register for CKDApp</h2>
        <form onSubmit={handleRegister} className="registerForm">
          <div className="inputGroup">
            <input
              type="text"
              className="registerInput"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="email"
              className="registerInput"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="password"
              className="registerInput"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="date"
              className="registerInput"
              placeholder="Date of Birth"
              value={userDOB}
              onChange={(e) => setUserDOB(e.target.value)}
              required
            />
          </div>

          <div className="inputGroup">
            <select
              className="registerInput"
              value={userSex}
              onChange={(e) => setUserSex(e.target.value)}
              required
            >
              {userSexes.map((sex) => (
                <option key={sex} value={sex}>
                  {sex}
                </option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <select className="registerInput" required>
              {ethnicities.map((ethnicity) => (
                <option key={ethnicity} value={ethnicity}>
                  {ethnicity}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="registerBtn">
            Register
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <p className="signinText">
          Have an account?{" "}
          <Link to="/" className="signinLink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
