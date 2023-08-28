import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  // page navigation once a valid account is created. This will send us to the confirmation page
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await Auth.signUp(email, password);
      console.log('User signed up:', user);
      navigate('/confirmation');
    } catch (error) {
      console.error('Sign Up error:', error);
      setErrorMessage('Sign Up error. Check your email and password.');
    }
  };

  // email validation

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // password validation
  const validatePassword = (password) => {
    // Password must have at least 8 characters, one number, and one capital letter
    const passwordPattern = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordPattern.test(password);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      {!isValidEmail && <div className="error">Please enter a valid email address.</div>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {!isValidPassword && (
        <div className="error">
          Password must have at least 8 characters, one number, and one capital letter.
        </div>
      )}
      <button onClick={handleSignUp} disabled={!isValidEmail || !isValidPassword}>
        Sign Up
      </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default SignUpPage;
