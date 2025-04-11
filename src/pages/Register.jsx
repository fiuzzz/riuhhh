import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset error

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/register",
        formData
      );

      if (response.status === 201) {
        console.log("Registrasi berhasil:", response.data);
        navigate("/login");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Terjadi kesalahan saat registrasi.";
      setErrorMessage(msg);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
