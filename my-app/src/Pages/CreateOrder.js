import React, { useEffect, useState } from 'react';
import './CSS/CreateOrder.css'
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
// MUI styling below
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {Select, MenuItem} from "@mui/material";
import TextField from '@mui/material/TextField';


function CreateOrder() {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState('');//usernameID once we get it from etch function
    const [userLevel, setUserLevel]=useState(['']);//level of said user ex. Customer, Employee, Admin
    const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
    const [selectedModel, setSelectedModel] = useState('');//chosen model on the dropdown bar on the screen for user
    const [selectedSize, setSelectedSize] = useState('');//chosen shoe size from dropdown
    const [selectedWidth, setSelectedWidth] = useState('');//chosen shoe width from dropdown
    const [selectedColor, setSelectedColor] = useState('');//chosen color from dropdown
    const [selectedStatus, setSelectedState] = useState('Shipping');//status of the shipping. All are default set to shipping when order is placed
    const [selectedOrderedDate, setSelectedOrderedDate] = useState(new Date());//date of the order when placed
    const [selectedCompletedDate, setSelectedCompletedDate] = useState('Incomplete');//date when order is completed--Not completed when order is placed
    const [selectedGender, setSelectedGender] = useState('');//chosen shoe gender from dropdown
    const [employeeIDValue, setEmployeeIDValue] = useState('');//employees ID so we can track who placed the order
    const [customerIDValue, setCustomerIDValue] = useState('');//customer ID so we can track who we ordered for
    const [selectedCustomer, setSelectedCustomer] = useState('');//customer info like email and name
    const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
    const [models, setModels]=useState(['']);//models available pulled from the fetch function
    const [colors, setColors]=useState(['']);//colors avaliable pulled from fetch function
    const [customers, setCustomers]=useState(['']);//customers available pulled from fetch fuction
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);//checks to make sure all fields for the create order button are filled. So makes sure employeeID, brand and model all have values  
    const navigate = useNavigate();
    // default sizes,width and gender of shoes
    const sizes = [
      "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5",
      "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0", "13.5", "14.0", "14.5", "15.0", "15.5", "16.0"
    ];
    const genders = ["Male", "Female"];
    const width = ["A","AA","B","D","2E","4E"];
    
    const [filterText, setFilterText] = useState('');//filter for when searching up a user by email or name

    //   call the brands and models available on load
  useEffect(() => {
    fetchBrands();
    fetchModels();
    fetchUserData();
    fetchColors();
    fetchCustomerData();
  }, []);

  // Function to handle filter text changes
  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  // Check if customers is defined and not null
  if (!customers || customers.length === 0) {
    return (
      <div>
        <p>No customers available.</p>
      </div>
    );
  }

  // Filter customers based on the filter text
  const filteredCustomers = customers.filter((item) => {
    // Check if Email property is defined before calling toLowerCase
    if (item.Email) {
      return item.Email.toLowerCase().includes(filterText.toLowerCase());
    }
    return false;
  });

  // toastify success notification
  const handleCreateOrder = () => { 
    // Show a success notification
    toast.success('Order Placed', {
      position: 'top-right',
      autoClose: 5000, // Notification will automatically close after 5 seconds
    });
  };

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

    // fetch available colors by models
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

  //this just changes the brand selected by the user. When user chooses a new brand this is changed.
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
        Size: selectedSize,
        Width: selectedWidth,
        Color: selectedColor,
        Status: selectedStatus,
        OrderedDate: selectedOrderedDate,
        CompletedDate: selectedCompletedDate,
        Gender: selectedGender,
        EmployeeID: employeeIDValue,
        CustomerID: selectedCustomer,
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
        console.log("created");
      } else {
        console.error('Error fetching data:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //this is where user data is retrieved for the employee
  const fetchUserData = async () => {
    try {
      const session = await Auth.currentSession();
      const fetchedUsername = await getUsernameFromToken();
      setUsername(fetchedUsername);
  
      const payload = {
        operation: "retrieveUserInfo",
        UserID: fetchedUsername
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
        console.log(data); // Make sure the data is received correctly
        const dataArr = data[0];
        console.log(dataArr.UserID);
        setUserLevel(dataArr.UserLevel);

        setEmployeeIDValue(dataArr.UserID);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //this is where user data is retrieved for all customers
  const fetchCustomerData = async () => {
    try { 
      const payload = {
        operation: "retrieveAllCustomers"
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
        console.log(data); // Make sure the data is received correctly
        setCustomers(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // reset all the selected values
  const resetVals = async () => {
    setSelectedCustomer("");
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedSize("");
    setSelectedWidth("");
    setSelectedGender("");
    setSelectedColor("");
  }

  return (
    <div className="body">
        <h1>Create an Order</h1>
      {/* select a customer from available customers */}
      {/* Search input for filtering customers */}
      <label>Select a Customer:</label>
      <TextField
        type="text"
        placeholder="Search for a customer"
        value={filterText}
        onChange={handleFilterChange}
        label="Search for a customer"
      />

      {/* Select a customer from available customers */}
      <TextField
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)} select label="Customer"
      >
        <MenuItem value="">Select a Customer</MenuItem>
        {filteredCustomers.map((item, index) => (
          <MenuItem key={index} value={item.UserID}>
            {item.Email} | {item.FirstName} {item.LastName}
          </MenuItem>
        ))}
      </TextField>
      {/* select shoe brand from available brands */}
      <label>Select Brand:</label>
      <TextField
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)} select label="Brand"
        >
        <MenuItem value="">Select a Brand</MenuItem>
        {brands.map((item, index) => (
            <MenuItem key={index} value={item.BrandName}>
            {item.BrandName}
            </MenuItem>
        ))}
      </TextField>
      {/* button to show available models for chosen brand */}
      <label>Select Model:</label>
        <TextField
        value={selectedModel}
        onChange={(e) => setSelectedModelValue(e.target.value)}
        disabled={!selectedBrand} select label="Model"
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
        </TextField>
        {/* button to show available colors for chosen brand */}
        <label>Select Color:</label>
        <TextField
        value={selectedColor}
        onChange={(e) => setSelectedColorValue(e.target.value)}
        disabled={!selectedBrand} select label="Color"
        >
        <MenuItem value="">Select a Color</MenuItem>
        {selectedBrand &&
            colors
            .filter(item => item.BrandName === selectedBrand)
            .map((item, index) => (
                <MenuItem key={index} value={item.Color}>
                {item.Color}
                </MenuItem>
            ))}
        </TextField>
        {/* select size */}
        <label>Select Size:</label>
        <TextField value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} select label="Size">
          <MenuItem value="">-- Select a Size --</MenuItem>
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </TextField>

        {/* select width */}
        <label>Select Width:</label>
        <TextField value={selectedWidth} onChange={(e) => setSelectedWidth(e.target.value)} select label="Width">
          <MenuItem value="">-- Select a Width --</MenuItem>
          {width.map((width) => (
            <MenuItem key={width} value={width}>
              {width}
            </MenuItem>
          ))}
        </TextField>
        {/* select gender */}
        <label>Select Gender:</label>
        <TextField value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} select label="Gender">
          <MenuItem value="">-- Select a Gender --</MenuItem>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
      {/* button to create order and reset all values this is also where we call the popup notification*/}
      <Button variant="contained"
      onClick={() => {
        fetchData();
        resetVals();
        handleCreateOrder();
      }}
        disabled={!isFieldsFilled || selectedCustomer==="" || selectedColor==="" || selectedGender==="" || selectedSize==="" || selectedWidth==="" || selectedColor===""} // Disable the button when required fields are empty
        >
        Create Order
      </Button>
    </div>
  );
}

export default CreateOrder;