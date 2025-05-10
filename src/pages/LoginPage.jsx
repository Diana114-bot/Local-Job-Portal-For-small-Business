import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [resendVisible, setResendVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isEmployer = location.pathname.startsWith('/employer');

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        // Redirect to the appropriate dashboard if already logged in
        navigate(isEmployer ? '/employer/dashboard' : '/dashboard');
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [navigate, isEmployer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError('');
    setInfo('');
    setResendVisible(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setResendVisible(false);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setError('Email not verified. Please check your inbox or resend the verification email.');
        setResendVisible(true);
        return;
      }

      // Redirect after successful login
      navigate(isEmployer ? '/employer/dashboard' : '/dashboard');
    } catch (error) {
      let customMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          customMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/user-not-found':
          customMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          customMessage = 'The email address entered is not valid.';
          break;
        case 'auth/too-many-requests':
          customMessage = 'Too many failed attempts. Please wait and try again later.';
          break;
        default:
          customMessage = error.message;
      }
      setError(customMessage);
    }
  };

  const handleResendVerification = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setInfo('Verification email resent. Please check your inbox.');
      } else {
        setError('You must be logged in to resend the verification email.');
      }
    } catch (error) {
      setError('Failed to resend verification email. ' + error.message);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">{isEmployer ? 'Employer Login' : 'Login'}</h3>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
            {info && <div className="alert alert-info mt-3 mb-0">{info}</div>}
          </form>

          {resendVisible && (
            <div className="text-center mt-3">
              <button className="btn btn-link text-decoration-none" onClick={handleResendVerification}>
                Resend verification email
              </button>
            </div>
          )}

          <div className="text-center mt-3">
            <small className="text-muted">
              Forgot your password?{' '}
              <Link to={isEmployer ? "/employer/forgot-password" : "/forgot-password"} className="text-decoration-none">Reset here</Link>
            </small><br />
            <small className="text-muted">
              Don’t have an account?{' '}
              <Link to={isEmployer ? "/employer/register" : "/register"} className="text-decoration-none">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
