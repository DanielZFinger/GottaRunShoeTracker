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
  const [errorMessage, setErrorMessage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // page navigation once a valid account is created. This will send us to the confirmation page
  const navigate = useNavigate();

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
  };

  // create user
  const createUser = async (userID) => {
    try {
      const retrievePayload = {
        operation: 'createUser',
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        UserLevel: "Customer",
      };
      setEmail('');
      setFirstName('');
      setLastName('');
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
        // Show a success notification
        toast.success('Customer Created', {
          position: 'top-right',
          autoClose: 5000, // Notification will automatically close after 5 seconds
        });
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
        placeholder="Email/Phone Number"
        value={email}
        onChange={handleEmailChange}
      />
      <Button  variant="contained" onClick={createUser} disabled={email==="" ||firstName==="" || lastName===""}>
        Sign Up Customer
      </Button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
}

export default NewCustomer;
