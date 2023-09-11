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

    return(
        <div>
            <h1>Settins page</h1>
        </div>    
    );
}
export default Settings;