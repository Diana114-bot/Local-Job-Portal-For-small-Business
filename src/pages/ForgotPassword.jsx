import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const isEmployer = location.pathname.startsWith('/employer');

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('A password reset link has been sent to your email.');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with that email.');
      } else {
        setError('Failed to send reset link. Please try again.');
      }
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 mb-5 bg-body rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <Link
            to={isEmployer ? '/employer/login' : '/login'}
            className="text-decoration-none text-muted mb-3 d-inline-block"
          >
            <i className="bi bi-arrow-left me-2"></i>Back to Login
          </Link>

          <h2 className="text-primary text-center mb-4">Reset Password</h2>
          <p className="text-muted text-center mb-4">Enter your email to receive a password reset link</p>

          <form onSubmit={handleReset}>
            <div className="mb-4">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <button type="submit" className="btn btn-primary w-100 py-2">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
