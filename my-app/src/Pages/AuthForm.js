import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AuthForm({navigateToSignUp}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  

  const navigate = useNavigate(); // Use useNavigate

  const handleSignUp = () => {
    navigateToSignUp();
    navigate('/GottaRunShoeTracker/signup'); // Navigate to the sign-up page
  };

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log('User signed in:', user);
      navigate('/GottaRunShoeTracker/dashboard'); // Navigate to the dashboard page upon successful sign-in
    } catch (error) {
      console.error('Sign In error:', error);
      setErrorMessage('Invalid username or password. Please check your credentials.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default AuthForm;
