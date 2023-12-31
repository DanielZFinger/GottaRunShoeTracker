import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// MUI styling below
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  

  const navigate = useNavigate(); // Use useNavigate

  const handleSignUp = () => {
    // navigateToSignUp();
    navigate('/signup'); // Navigate to the sign-up page
  };

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log('User signed in:', user);
      navigate('/dashboard'); // Navigate to the dashboard page upon successful sign-in
    } catch (error) {
      console.error('Sign In error:', error);
      setErrorMessage('Invalid username or password. Please check your credentials.');
    }
  };

  return (
    <div className="body">
      <p>this is the test environment. If you would like to test the site use the email "dzfinge@clemson.edu" as the username and password "Daniel123". If you want to create an account you must click the link that is sent to your email after creating an account for your account to be active(this will likely be in your junk folder. Keep in mind the account you create will not have full functions as it is the default permissions of "customer") </p>
      <h1>Welcome to GottaRun Order Tracker</h1>
      <TextField sx={{p:2}}
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField sx={{p:2}}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button sx={{p:2, m:2}} variant="contained" onClick={handleSignIn}>Sign In</Button>
      <Typography className="center">Don't have an account? Create one here.</Typography>
      <Button sx={{p:2, m:2}} variant="contained" onClick={handleSignUp}>Sign Up</Button>
      
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default AuthForm;
