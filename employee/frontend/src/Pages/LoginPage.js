import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';



const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState('employee');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
       console.log('Sending login request:', { email, password }); // Add this line
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('userType', res.data.user.userType);

      if (rememberMe) localStorage.setItem('rememberMe', 'true');

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className='login-page'>
      <Header />

      <div className="login-container">
        <div className="login-card">
          <div className="signup-side">
            <div className="signup-content">
              <h1>Sign Up</h1>
              <p>Create an account to get started with our platform</p>
              <button className="signup-button" onClick={() => navigate('/signup')}>
                Create Account
              </button>
            </div>
          </div>

          <div className="login-side">
            <div className="login-content">
              <h2>Welcome Back</h2>
              <p className="subtitle">Sign in to access your dashboard</p>

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

              <form onSubmit={handleLogin} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#forgot" className="forgot-link">Forget password?</a>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="login-submit-btn">
                  Sign in as {userType.charAt(0).toUpperCase() + userType.slice(1)}
                </button>
              </form>

              <div className="help-section">
                <p className="help-text">Need help?</p>
                <p className="contact-info">
                  Contact system administrator at<br />
                  <strong>ngocompany.com</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
