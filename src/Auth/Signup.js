// Signup.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './Signup.css'; // Import CSS file

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } 
     if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } 
  };

  return (
    <div className="signup-container">
      <div className="wave-background">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L40,256C80,224,160,160,240,165.3C320,171,400,245,480,240C560,235,640,149,720,138.7C800,128,880,192,960,197.3C1040,203,1120,149,1200,149.3C1280,149,1360,203,1400,229.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
      </div>
      <div className="form-container">
        <div className="form-header">
          <h2>Sign Up</h2>
        </div>
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>ConfirmPassword</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {error && <Alert variant="danger" className="error-message">{error}</Alert>}

          <Button variant="primary" onClick={handleSignup} className='signup-button'>
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
