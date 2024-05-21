
import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';

const TextInput = ({ label, type, id, name, value, onChange, autoComplete, required }) => (
  <div className="mb-3">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      type={type}
      className="form-control"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required={required}
    />
  </div>
);

function Card({ children }) {
  return <div className="card-container">{children}</div>;
}

function LoginForm( { onLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [user_id, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const user_id_cookie = Cookies.get('user_id');
    if (user_id_cookie) {
      setUserId(user_id_cookie);
    }
  }, []);



  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
        const response = await fetch('https://expense-backend-f7e811c7173d.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const userData = await response.json();
       
        const { user_id, username } = userData;

        localStorage.setItem('user_id', user_id);
        localStorage.setItem('username', username);

        setUserId(user_id);
        onLogin(user_id, username);

        
        console.log('Login successful!');
        window.location.href = `/account?user_id=${user_id}`;
        
      }else{
        const errorMessage = await response.text();
        setError(errorMessage);

      }
    } catch(error) {
      console.error('Error during login:', error.message);
      setError('Error during login. Please try again later.');

    }
  };
      
  





  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="center-container">
      <div className="col-md-6">
        <Card>
          <h2 className="text-center mb-41"> Expense Tracker</h2>
          <h3 className="text-center mb-4"> Login</h3>
          <form onSubmit={handleLogin}>
            <TextInput
              label="Username:"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="username"
              required
            />
            <TextInput
              label="Password:"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              required
            />
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
          <p className="mt-3 text-center">
            Don't have an account?{' '}
            <a href="/signup" onClick={handleSignUp}>
              Sign Up
            </a>
          </p>
          {error && <p className="mt-3 text-center text-danger">{error}</p>}
          {user_id && (
            <p className="mt-3 text-center">User ID from cookie: {user_id}</p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;


