import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
// MUI styling below
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';


function EditOrder(props){
    const [brands, setBrands] = useState(['']);
    const [models, setModels] = useState(['']);
    const [colors, setColors] = useState(['']);
    const navigate = useNavigate();
    const [isFieldsFilled, setIsFieldsFilled] = useState(true);//checks to make sure all fields for the create order button are filled. So makes sure employeeID, brand and model all have values  
    // default sizes,width and gender of shoes
    const sizes = [
        "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5",
        "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0", "13.5", "14.0", "14.5", "15.0", "15.5", "16.0"
      ];
      const genders = ["Male", "Female"];
      const width = ["A","AA","B","D","2E","4E"];
      const statusOption =["Shipping", "Ready To Be Picked Up", "Complete"]

     //   call the brands available on load
     useEffect(() => {
        fetchBrands();
        fetchModels();
        fetchColors();
    }, []);

    const { rowData } = props;

    console.log(rowData);
    const [selectedBrand, setSelectedBrand] = useState(rowData.Brand);
    const [selectedModel, setSelectedModel] = useState(rowData.Model);//chosen model on the dropdown bar on the screen for user
    const [selectedSize, setSelectedSize] = useState(rowData.Size);//chosen shoe size from dropdown
    const [selectedWidth, setSelectedWidth] = useState(rowData.Width);//chosen shoe width from dropdown
    const [selectedColor, setSelectedColor] = useState(rowData.Color);//chosen color from dropdown
    const [selectedStatus, setSelectedStatus] = useState(rowData.Status);//status of the shipping
    const [selectedCompletedDate, setSelectedCompletedDate] = useState(rowData.CompletedDate);
    const [selectedGender, setSelectedGender] = useState(rowData.Gender);//chosen shoe gender from dropdown
    
    const fetchColors = async () => {
        try {
            const colorPayload = {
                operation: "retrieveColors",
            };
            const response = await fetch(
                'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(colorPayload),
                }
              );
        
              if (response.ok) {
                const data = await response.json();
                setColors(data);
                console.log(data);
              } else {
                console.error('Error fetching data:', response.statusText);
              }
        
            } catch (error) {
              console.error('Error fetching data:', error);
            }
        };


    // fetch available models by brand
  const fetchModels = async () => {
    try {
        const modelPayload = {
            operation: "retrieveModels",
        };
        const response = await fetch(
            'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(modelPayload),
            }
          );
    
          if (response.ok) {
            const data = await response.json();
            setModels(data);
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

        const handleBrandChange = (e) => {
            setSelectedBrand(e.target.value);
            setSelectedModelValue('');
            setSelectedColorValue('');
            setIsFieldsFilled(false); // Reset the flag when the brand changes
          };
          const setSelectedModelValue = (value) => {
            setSelectedModel(value);
            setIsFieldsFilled(!!(selectedBrand && value));
          };
          const setSelectedColorValue = (value) => {
            setSelectedColor(value);
          }


    const updateOrderFetch = async (compDate) => {
        console.log(selectedBrand);
        console.log(selectedModel);
        console.log(selectedColor);
        console.log(selectedSize);
        console.log(selectedWidth);
        console.log(selectedGender);
        console.log(selectedStatus);
        console.log(compDate);
        // try {
        //     console.log("in the updatefeth");
        //     const retrievePayload = {
        //       operation: 'updateOrder',
        //     };
      
        //     const response = await fetch(
        //       'https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata',
        //       {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(retrievePayload),
        //       }
        //     );
      
        //     if (response.ok) {
        //       const data = await response.json();
        //     } else {
        //       console.error('Error fetching retrieved data:', response.statusText);
        //     }
      
        //   } catch (error) {
        //     console.error('Error fetching retrieved data:', error);
        //   }
      };

    return(
        <div>
            {/* <Button variant="contained">Back to Active Orders</Button> */}
            <h1>Edit Order</h1>
            <Typography className="editOrder">Brand: {selectedBrand} <TextField className="editOrder" sx={{m:"2%"}}
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e)} select label="Update Brand"
                >
                <MenuItem value="">Select a Brand</MenuItem>
                {brands.map((item, index) => (
                    <MenuItem key={index} value={item.BrandName}>
                    {item.BrandName}
                    </MenuItem>
                ))}
            </TextField></Typography>

            <Typography className="editOrder">Model: {selectedModel} <TextField className="editOrder" sx={{m:"2%"}}
                value={selectedModel}
                onChange={(e) => setSelectedModelValue(e.target.value)} select label="Update Model"
                >
                <MenuItem value="">Select a Model</MenuItem>
                {selectedBrand &&
            models
            .filter(item => item.Brand === selectedBrand)
            .map((item, index) => (
                <MenuItem key={index} value={item.Model}>
                {item.Model}
                </MenuItem>
                ))}
            </TextField></Typography>

            <Typography className="editOrder">Color: {selectedColor} <TextField className="editOrder" sx={{m:"2%"}}
                value={selectedColor}
                onChange={(e) => setSelectedColorValue(e.target.value)} select label="Update Color"
                >
        <MenuItem value="">Update Color</MenuItem>
        {selectedBrand &&
            colors
            .filter(item => item.BrandName === selectedBrand)
            .map((item, index) => (
                <MenuItem key={index} value={item.Color}>
                {item.Color}
                </MenuItem>
            ))}
        </TextField></Typography>

        <Typography className="editOrder">Size: {selectedSize} 
        <TextField className="editOrder" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} select label="Size">
          <MenuItem value="">-- Select a Size --</MenuItem>
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField></Typography>

        <Typography className="editOrder">Width: {selectedWidth} 
        <TextField className="editOrder" value={selectedWidth} onChange={(e) => setSelectedWidth(e.target.value)} select label="Width">
          <MenuItem value="">-- Select a Width --</MenuItem>
          {width.map((width) => (
            <MenuItem key={width} value={width}>
              {width}
            </MenuItem>
          ))}
        </TextField>
        </Typography>

        <Typography className="editOrder">Gender: {selectedGender} 
        <TextField className="editOrder" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} select label="Gender">
          <MenuItem value="">-- Select a Gender --</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
        </Typography>

        <Typography className="editOrder">Status: {selectedStatus} 
        <TextField className="editOrder" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} select label="Status">
          <MenuItem value="">-- Select a Status --</MenuItem>
          {statusOption.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        </Typography>



            <Button variant="contained" disabled={!isFieldsFilled || selectedColor===""} onClick={() => {   
            if(selectedStatus==="Complete"){
                updateOrderFetch(new Date());
            }
            else{
                updateOrderFetch("Incomplete");
            }
            }}>Update Changes</Button>  
            
        </div>
    );
};

export default EditOrder;
