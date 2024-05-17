
import './LoginForm.css';
import React, { useState } from 'react';



function Card({ children }) {
  return <div className="card-container">{children}</div>;
}


function SignUp() {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('https://expense-backend-f7e811c7173d.herokuapp.com/signup', {
          // const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      

      if (response.ok) {
        console.log('Account created successfully!');
        window.location.href = '/';
      } else {
        console.error('Error creating account:', result.message);
      }
    } catch (error) {
      console.error('Error creating account:', error.message);
    }
  };

  

  return (
    <div className="center-container mt-5">
      <Card>
        <h2 className="text-center mb-41"> Expense Tracker</h2>    
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              className="form-controll"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-controll"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              className="form-controll"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        
          <button type="submit" className="btn btn-primary btn-block" >Sign Up</button>
        
        </form>

        <p className="mt-3 text-center">Already have an account? <a href="/">Login</a></p>
      </Card>
    </div>
  );
}

export default SignUp;

