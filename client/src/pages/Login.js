import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use proxy path instead of hardcoded URL
      const res = await axios.post('/api/auth/login', form, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      // ✅ Check res.data before using it
      if (res && res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/profile'); // adjust path if needed
      } else {
        alert('Login failed: Empty server response');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Log In</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/signup">
        <button>Create Account</button>
      </Link>
    </div>
  );
};

export default Login;
