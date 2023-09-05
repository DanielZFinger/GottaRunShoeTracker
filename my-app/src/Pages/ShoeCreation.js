import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';


function ShoeCreation() {
    const [brandValue, setBrandValue] = useState('');//value of the brand the user just created
    const [modelValue, setModelValue] = useState('');//value of the model the user just created
    const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
    const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
    const navigate = useNavigate(); // Use useNavigate


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
        <div>
          <h1>Shoe Creation</h1>
          <p>This is the Shoe Creation page.</p>
          
          <input
            type="text"
            placeholder="Brand Name"
            value={brandValue}
            onChange={(e) => setBrandValue(e.target.value)}
          />
          <button onClick={createBrand}>Create Brand</button>
          {/* choose the brand for the new model user is going to add */}
          {/* select shoe brand from available brands */}
            <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                >
                <option value="">Select a Brand</option>
                {brands.map((item, index) => (
                    <option key={index} value={item.BrandName}>
                    {item.BrandName}
                    </option>
                ))}
            </select>
          {/* create new model on click */}
          <input
            type="text"
            placeholder="Model Name"
            value={modelValue}
            onChange={(e) => setModelValue(e.target.value)}
          />
          {/* create new model on click */}
          <button onClick={createModel}>Create Model</button>
        </div>
      );
}
export default ShoeCreation;