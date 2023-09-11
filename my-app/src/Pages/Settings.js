import React, { useEffect, useState } from 'react';
import './CSS/CreateOrder.css'
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// MUI styling below
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';

function Settings(){
    const navigate = useNavigate();
    // logout
    const handleLogOut = async () => {
        await Auth.signOut();
            navigate('/signin'); // Redirect to the sign-in page
    }
    return(
        <div>
            <h1>Settings page</h1>
            <Button variant="contained"
      onClick={() => {
        handleLogOut();
      }}>Log Out</Button>
        </div>    
    );
}
export default Settings;