import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { signup, setCurrentUser, currentUser } = useGlobalContext();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      
      setError('');
      setLoading(true);
      await signup(email, password);
      setSuccessMessage('Account created successfully');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setGender('');
      setCountry('');
      setCurrentUser(email);
      console.log(currentUser);
      setTimeout(() => {
        navigate('/')
      }, 2000);
    }
    catch (error) {
      console.log(error);
      setError('Failed to create an account\n' + error.message);
    }
    setLoading(false);
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Sign Up</h2>
        {successMessage && <p className="register-success">{successMessage}</p>}
        {error && <p className="register-error">{error}</p>}
        <div className="register-inputs">
          <label className="register-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="register-input"
            placeholder="Enter your name"
            required
          />
          <label className="register-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            placeholder="Enter your email"
            required
          />
          <label className="register-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            placeholder="Enter your password"
            required
          />
          <label className="register-label">Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="register-input"
            placeholder="Enter your password again to confirm"
            required
          />
          <label className="register-label">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="register-input"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="register-label">Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="register-input"
            placeholder="Enter your country"
            required
          />
          <button type="submit" className="register-button" disabled={loading}>Sign Up</button>
        </div>
        <p className="login-link">Already have an account? <Link to="/login" className ='nav-link nav-login'>Log in</Link></p>
      </form>
    </div>
  );
};

export default Register;
