import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');//usernameID once we get it from etch function
  const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
  const [selectedModel, setSelectedModel] = useState('');//chosen model on the dropdown bar on the screen for user
  const [employeeIDValue, setEmployeeIDValue] = useState('');
  const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
  const [models, setModels]=useState(['']);//models available pulled from the fetch function
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);//checks to make sure all fields for the create order button are filled. So makes sure employeeID, brand and model all have values
  const [isEmployeeFilled, setIsEmployeeFilled]=useState(false);//checks to see if employee is filled on or not
  const navigate = useNavigate(); // Use useNavigate


//   fetch brands available
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

const handleEmployeeChange = (e) => {
    setEmployeeIDValue(e);
    if(e.length<1){
        setIsEmployeeFilled(false);
    }
    else{
        setIsEmployeeFilled(true);
    }
    };
  //this just changes the brand selected by the user. When user chooses a new brand this is changed.
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModelValue('');
    setIsFieldsFilled(false); // Reset the flag when the brand changes
  };
  const setSelectedModelValue = (value) => {
    setSelectedModel(value);
    setIsFieldsFilled(!!(selectedBrand && value));
  };

  //this is where a new order is created. Once the user selects the model and brand and hits create order this gets called. An order is subsequently passe to the backend.
  const fetchData = async () => {
    try {
      const session = await Auth.currentSession();
      const fetchedUsername = await getUsernameFromToken();
      setUsername(fetchedUsername);

      const payload = {
        operation: "create",
        Brand: selectedBrand,
        Model: selectedModel,
        EmployeeID: employeeIDValue,
        CustomerID: fetchedUsername,
      };

      const accessToken = session.getAccessToken().getJwtToken();

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
        setUserData(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   call the brands and models available on load
  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

//   navigate to the order reports menu
  const handleOrderReports = async () => {
    try {
      navigate('/order-reports'); // Navigate to the order reports
    } catch (error) {
      console.error('Navigation Error', error);
    }
  };
  //   navigate to the shoe creation page
  const handleShoeCreation = async () => {
    try {
      navigate('/shoe-creation'); // Navigate to the shoe creation page
    } catch (error) {
      console.error('Navigation Error', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <input
        type="text"
        placeholder="EmployeeID"
        value={employeeIDValue}
        onChange={(e) => handleEmployeeChange(e.target.value)}
      />
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
      {/* button to show available models for chosen brand */}
        <select
        value={selectedModel}
        onChange={(e) => setSelectedModelValue(e.target.value)}
        disabled={!selectedBrand}
        >
        <option value="">Select a Model</option>
        {selectedBrand &&
            models
            .filter(item => item.Brand === selectedBrand)
            .map((item, index) => (
                <option key={index} value={item.Model}>
                {item.Model}
                </option>
            ))}
        </select>
      {/* button to create order */}
      <button
        onClick={fetchData}
        disabled={!isFieldsFilled || !isEmployeeFilled} // Disable the button when required fields are empty
        >
        Create Order
      </button>
      <div>
        {/* Button to navigate to Order Reports */}
      <button onClick={handleOrderReports}>Order Reports</button>
      <button onClick={handleShoeCreation}>Shoe Creation Page</button>
      </div>
    </div>
  );
}

export default Dashboard;
