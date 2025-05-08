import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasUpper: false,
    hasSpecial: false
  });
  const [confirmValid, setConfirmValid] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') || 'jobseeker';
  const isEmployer = role === 'employer';
  const { login } = useAuth();

  // 🔐 Prevent wrong URL access
  useEffect(() => {
    const pathname = location.pathname;

    if (pathname.includes('/employer') && role !== 'employer') {
      navigate('/register?role=jobseeker');
    } else if (pathname === '/register' && role !== 'jobseeker') {
      navigate('/employer/register?role=employer');
    }
  }, [location.pathname, role, navigate]);

  const checkPasswordStrength = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };
    const strength = Object.values(validations).filter(v => v).length;
    setPasswordValidations(validations);
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'password') {
      checkPasswordStrength(value);
      if (form.confirmPassword) {
        setConfirmValid(value === form.confirmPassword);
      }
    }
    if (name === 'confirmPassword') {
      const isValid = value === form.password;
      setConfirmValid(isValid);
      if (isValid) setError('');
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return '#ff0000';
      case 1: return '#ff4000';
      case 2: return '#ff8000';
      case 3: return '#ffbf00';
      case 4: return '#00ff00';
      default: return '#e0e0e0';
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    const { name, email, password, confirmPassword } = form;
    const trimmedEmail = email.trim().toLowerCase();

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password does not meet minimum strength requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, trimmedEmail, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });
      await sendEmailVerification(user);
      login(user);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name,
        email: trimmedEmail,
        role: isEmployer ? 'employer' : 'jobseeker',
        createdAt: new Date()
      });

      toast.success('Account created! Please check your email to verify your account.');

      setTimeout(() => {
        navigate(isEmployer ? '/employer/dashboard' : '/dashboard');
      }, 2000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login or use a different email.');
      } else {
        setError('Registration failed: ' + error.message);
      }
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 mb-5 bg-body rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <Link to={`/login?role=${isEmployer ? 'employer' : 'jobseeker'}`} className="text-decoration-none text-muted mb-3 d-inline-block">
            <i className="bi bi-arrow-left me-2"></i>Back to Login
          </Link>
          <h2 className="text-primary text-center mb-4">{isEmployer ? 'Employer Register' : 'Register'}</h2>
          <p className="text-muted text-center mb-4">Create your secure account</p>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Mosa Mabowa" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              <div className="progress mt-2" style={{ height: '4px' }}>
                <div className="progress-bar" role="progressbar" style={{ width: `${(passwordStrength / 4) * 100}%`, backgroundColor: getStrengthColor() }}></div>
              </div>
              <div className="row mt-2 g-2">
                {Object.entries(passwordValidations).map(([key, isValid]) => (
                  <div className="col-6 d-flex align-items-center" key={key}>
                    {isValid ? <CheckCircleFill className="text-success me-1" size={16} /> : <XCircleFill className="text-danger me-1" size={16} />}
                    <small className="text-muted">
                      {key === 'minLength' && '8+ characters'}
                      {key === 'hasNumber' && 'Contains number'}
                      {key === 'hasUpper' && 'Uppercase letter'}
                      {key === 'hasSpecial' && 'Special character'}
                    </small>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm Password</label>
              <div className="input-group">
                <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                <span className="input-group-text bg-transparent border-0">
                  {confirmValid !== null && (confirmValid ? <CheckCircleFill className="text-success" size={20} /> : <XCircleFill className="text-danger" size={20} />)}
                </span>
              </div>
              {form.confirmPassword && !confirmValid && <small className="text-danger">Passwords do not match</small>}
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">Create Account</button>
            {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
          </form>
          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{' '}
              <Link to={`/login?role=${isEmployer ? 'employer' : 'jobseeker'}`} className="text-decoration-none">Login</Link>
            </small>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
