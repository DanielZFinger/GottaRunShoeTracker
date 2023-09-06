import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import './CSS/ShoeCreation.css';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
// MUI styling below
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';



function ShoeCreation() {
    const [brandValue, setBrandValue] = useState('');//value of the brand the user just created
    const [modelValue, setModelValue] = useState('');//value of the model the user just created
    const [colorValue, setColorValue] = useState('');
    const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
    const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
    const navigate = useNavigate(); // Use useNavigate

    // toastify success notification
  const handleCreateBrand = () => { 
    // Show a success notification
    setBrandValue('');
    toast.success('Brand Created', {
      position: 'top-right',
      autoClose: 5000, // Notification will automatically close after 5 seconds
    });
  };
  const handleCreateModel = () => { 
    // Show a success notification
    setModelValue('');
    setBrandValue('');
    setSelectedBrand('');
    toast.success('Model Created', {
      position: 'top-right',
      autoClose: 5000, // Notification will automatically close after 5 seconds
    });
  };
  const handleCreateColor = () => { 
    // Show a success notification
    setColorValue('');
    setBrandValue('');
    setSelectedBrand('');
    toast.success('Color Created', {
      position: 'top-right',
      autoClose: 5000, // Notification will automatically close after 5 seconds
    });
  };

    // fetch function that is called when user inputs a new brand name in the provided field. This function calls the backend and creates a new brand
    const createBrand = async () => {
        try {  
          const payload = {
            operation: "createBrand",
            Brand: brandValue
          };
          const response = await fetch(
            'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    //   fetch function that is called when a user creates a new model. This calls the backend and creates a new model for the respective brand it is attatched to
      const createModel = async () => {
        try {  
          const payload = {
            operation: "createModel",
            Brand: selectedBrand,
            Model: modelValue
          };
          const response = await fetch(
            'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      //   fetch function that is called when a user creates a new color. This calls the backend and creates a new color for the respective brand it is attatched to
      const createColor = async () => {
        try {  
          const payload = {
            operation: "createColor",
            Brand: selectedBrand,
            Color: colorValue
          };
          const response = await fetch(
            'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            console.log(data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    //   fetch all available brands
      const fetchBrands = async () => {
        try {
            const brandPayload = {
                operation: "retrieveBrand"
            };
            const response = await fetch(
                'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(brandPayload),
                }
              );
        
              if (response.ok) {
                const data = await response.json();
                setBrands(data);
                console.log(data);
              } else {
                console.error('Error fetching data:', response.statusText);
              }
        
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };

      //   call the brands available on load
        useEffect(() => {
            fetchBrands();
        }, []);

    return (
        <div className="body">
          <Box className="typography-text">
          <h1>Brand Creation</h1>  
          <Typography>To Create A Brand Simply Type The Brand Name Below and Click "Create Brand"</Typography> 
          </Box>       
          <TextField sx={{m: "2%"}}
            type="text"
            placeholder="Brand Name"
            value={brandValue}
            onChange={(e) => setBrandValue(e.target.value)}
            input
          />
          <Button sx={{m:"2%"}} variant="contained"  onClick={() => {
            handleCreateBrand();
            createBrand();
            }}disabled={brandValue===""}>Create Brand</Button>
          {/* choose the brand for the new model user is going to add */}
          <Box className="typography-text">
          <h1>Model And Color Creation</h1>  
          <Typography>To Create A Model Or Color Simply Select A Brand To Be Applied, Type The Name Of Your Color or Model and Click "Create"</Typography>
          <Button sx={{fontSize: "50%"}}>Recently Created Brand Not Showing Up? Click Here To Refresh.</Button>
          </Box>
          {/* select shoe brand from available brands */}
            <TextField sx={{m:"2%"}}
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)} select label="Choose A Brand For This Model To Be Applied"
                >
                <MenuItem value="">Select a Brand</MenuItem>
                {brands.map((item, index) => (
                    <MenuItem key={index} value={item.BrandName}>
                    {item.BrandName}
                    </MenuItem>
                ))}
            </TextField>
          {/* create new model on click */}
          <div className='text-field-container'>
          <TextField
            type="text"
            placeholder="Model Name"
            value={modelValue}
            onChange={(e) => setModelValue(e.target.value)}
            input
          />
          {/* create new model on click */}
          <Button variant="contained" onClick={() => {
            handleCreateModel();
            createModel();
            }}disabled={modelValue==="" || selectedBrand===""}>Create Model</Button>
          {/* select shoe brand from available brands */}
          <TextField
            type="text"
            placeholder="Color Code"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            input
          />
          {/* create new model on click */}
          <Button variant="contained" onClick={() => {
            handleCreateColor();
            createColor();
            }} disabled={colorValue==="" || selectedBrand===""}>Create Color</Button>
        </div>
        </div>
      );
}
export default ShoeCreation;