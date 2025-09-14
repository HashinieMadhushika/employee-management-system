import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUpPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('employee');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the terms and conditions');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        ...formData,
        userType
      });

      // Save token & user info
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('userType', res.data.user.userType);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className='signup-page'>
      <Header />

      <div className="signup-container">
        <div className="signup-card">
          <div className="login-option-side">
            <div className="login-option-content">
              <h1>Welcome Back</h1>
              <p>Already have an account? Sign in to access your dashboard</p>
              <button className="login-redirect-button" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
          </div>

          <div className="signup-form-side">
            <div className="signup-form-content">
              <h2>Create Your Account</h2>
              <p className="subtitle">Share your artwork and get projects!</p>

              <div className="user-type-selector">
                <button
                  className={`user-type-btn ${userType === 'employee' ? 'active' : ''}`}
                  onClick={() => setUserType('employee')}
                >
                  Employee
                </button>
                <button
                  className={`user-type-btn ${userType === 'administrator' ? 'active' : ''}`}
                  onClick={() => setUserType('administrator')}
                >
                  Administrator
                </button>
              </div>

              <form onSubmit={handleSignUp} className="signup-form">
                <div className="form-row">
                  <div className="form-group half-width">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="form-group half-width">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
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
                    onChange={handleInputChange}
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    I accept the Terms and Conditions
                  </label>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="signup-submit-btn">
                  Join Us as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUpPage;
