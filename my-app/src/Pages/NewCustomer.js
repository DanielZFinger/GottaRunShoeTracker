import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// MUI styling below
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';

function NewCustomer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // page navigation once a valid account is created. This will send us to the confirmation page
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const user = await Auth.signUp(email, password);
      console.log('User signed up:', user);
      createUser(user.userSub);
      // Show a success notification
        toast.success('Customer Created', {
        position: 'top-right',
        autoClose: 5000, // Notification will automatically close after 5 seconds
      });
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

  const handleFirstName = (e) => {
    const newFirst = e.target.value;
    setFirstName(newFirst);
  };

  const handleLastName = (e) => {
    const newLast = e.target.value;
    setLastName(newLast);
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

  // create user
  const createUser = async (userID) => {
    try {
      const retrievePayload = {
        operation: 'createUser',
        UserID: userID,
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        UserLevel: "Customer",
      };
      console.log(retrievePayload);

      const response = await fetch(
        'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(retrievePayload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error fetching retrieved data:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching retrieved data:', error);
    }
  };
  

  return (
    <div className="body">
      <h2>Create New Customer</h2>
      <TextField
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstName}
      />
      <TextField
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={handleLastName}
      />
      <TextField
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />
      {!isValidEmail && <div className="error">Please enter a valid email address.</div>}
      <TextField
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
      <Button  variant="contained" onClick={handleSignUp} disabled={!isValidEmail || !isValidPassword || firstName==="" || lastName===""}>
        Sign Up Customer
      </Button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default NewCustomer;
