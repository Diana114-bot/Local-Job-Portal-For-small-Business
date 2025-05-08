import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [resendVisible, setResendVisible] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const isEmployerPath = location.pathname.startsWith('/employer');

  const queryParams = new URLSearchParams(location.search);
  const redirected = queryParams.get('redirected');

  useEffect(() => {
    if (redirected) {
      setInfo('You can safely log in now.');
    }
  }, [redirected]);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
    }
  }, [countdown]);

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

      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (userDoc.exists()) {
        const role = userDoc.data().role;

        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else if (role === 'employer') {
          if (!isEmployerPath) {
            setCountdown(3);
            setError('You are a registered Employer. Redirecting to Employer login page in 3...');
            setTimeout(() => {
              navigate('/employer/login?redirected=true');
            }, 3000);
            return;
          }
          navigate('/employer/dashboard');
        } else if (role === 'jobseeker') {
          if (isEmployerPath) {
            setCountdown(3);
            setError('You are a registered Job Seeker. Redirecting to Job Seeker login page in 3...');
            setTimeout(() => {
              navigate('/login?redirected=true');
            }, 3000);
            return;
          }
          navigate('/dashboard');
        } else {
          setError('You are not a registered user.');
        }
      } else {
        setError('You are not a registered user.');
      }
    } catch (error) {
      let customMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          customMessage = 'Incorrect credentials. Please try again.';
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

  const renderRedirectMessage = () => {
    if (countdown !== null && error.includes('Redirecting')) {
      const roleMsg = error.includes('Job Seeker')
        ? 'You are a registered Job Seeker. Redirecting to Job Seeker login page'
        : 'You are a registered Employer. Redirecting to Employer login page';
      return (
        <div className="alert alert-danger mt-3 mb-0">
          {roleMsg} in {countdown}...
        </div>
      );
    }
    return error && !redirected ? (
      <div className="alert alert-danger mt-3 mb-0">{error}</div>
    ) : null;
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-body">
          <h3 className="text-center mb-4">{isEmployerPath ? 'Employer Login' : 'Login'}</h3>

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

            {renderRedirectMessage()}
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
              <Link to={isEmployerPath ? "/employer/forgot-password" : "/forgot-password"} className="text-decoration-none">Reset here</Link>
            </small><br />
            <small className="text-muted">
              Don’t have an account?{' '}
              <Link to={isEmployerPath ? "/employer/register" : "/register"} className="text-decoration-none">Register</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
