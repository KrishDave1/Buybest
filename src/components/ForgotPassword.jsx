import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState('');
  const { resetPassword } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage('');
      setLoading(true);
      await resetPassword(email);
      setEmail("");
      setMessage('Check your inbox for further instructions');
    } catch (error) {
      console.log(error);
      setError("Failed to reset Password");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Password Reset</h2>
        {error && <p className="register-error">{error}</p>}
        {message && <p className="register-success">{message}</p>}
        <div className="login-inputs">
          <label className="login-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="Enter your email"
          />
          <button type="submit" className="login-button" disabled={loading}>
            <Link className="nav-link">
              Reset Password
            </Link>
        </button>
        <Link to="/login" className="nav-forgot">
            Login
        </Link>
        </div> 
      </form>
    </div>
  );
};

export default ForgotPassword;
 