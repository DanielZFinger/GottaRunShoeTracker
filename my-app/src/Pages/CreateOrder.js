import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';

function CreateOrder() {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState('');//usernameID once we get it from etch function
    const [userLevel, setUserLevel]=useState(['']);
    const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
    const [selectedModel, setSelectedModel] = useState('');//chosen model on the dropdown bar on the screen for user
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedWidth, setSelectedWidth] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStatus, setSelectedState] = useState('Shipping');
    const [selectedOrderedDate, setSelectedOrderedDate] = useState(new Date());
    const [selectedCompletedDate, setSelectedCompletedDate] = useState('Incomplete');
    const [selectedGender, setSelectedGender] = useState('');
    const [employeeIDValue, setEmployeeIDValue] = useState('');
    const [customerIDValue, setCustomerIDValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
    const [models, setModels]=useState(['']);//models available pulled from the fetch function
    const [colors, setColors]=useState(['']);
    const [customers, setCustomers]=useState(['']);
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);//checks to make sure all fields for the create order button are filled. So makes sure employeeID, brand and model all have values  
    const navigate = useNavigate();
    const sizes = [
      "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5",
      "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0", "13.5", "14.0", "14.5", "15.0", "15.5", "16.0"
    ];
    const genders = ["Male", "Female"];
    const width = ["A","AA","B","D","2E","4E"];
    const [filterText, setFilterText] = useState('');

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

  return (
    <div>
        <h1>Create an Order</h1>
      {/* select a customer from available customers */}
      {/* Search input for filtering customers */}
      <input
        type="text"
        placeholder="Search for a customer"
        value={filterText}
        onChange={handleFilterChange}
      />

      {/* Select a customer from available customers */}
      <select
        value={selectedCustomer}
        onChange={(e) => setSelectedCustomer(e.target.value)}
      >
        <option value="">Select a Customer</option>
        {filteredCustomers.map((item, index) => (
          <option key={index} value={item.UserID}>
            {item.Email} | {item.FirstName} {item.LastName}
          </option>
        ))}
      </select>
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
        {/* button to show available colors for chosen brand */}
        <select
        value={selectedColor}
        onChange={(e) => setSelectedColorValue(e.target.value)}
        disabled={!selectedBrand}
        >
        <option value="">Select a Color</option>
        {selectedBrand &&
            colors
            .filter(item => item.BrandName === selectedBrand)
            .map((item, index) => (
                <option key={index} value={item.Color}>
                {item.Color}
                </option>
            ))}
        </select>
        {/* select size */}
        <label>Select Size:</label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option value="">-- Select a Size --</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        {/* select width */}
        <label>Select Width:</label>
        <select value={selectedWidth} onChange={(e) => setSelectedWidth(e.target.value)}>
          <option value="">-- Select a Width --</option>
          {width.map((width) => (
            <option key={width} value={width}>
              {width}
            </option>
          ))}
        </select>
        {/* select gender */}
        <label>Select Gender:</label>
        <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
          <option value="">-- Select a Gender --</option>
          {genders.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
      {/* button to create order */}
      <button
        onClick={fetchData}
        disabled={!isFieldsFilled || selectedCustomer==="" || selectedColor==="" || selectedGender==="" || selectedSize==="" || selectedWidth==="" || selectedColor===""} // Disable the button when required fields are empty
        >
        Create Order
      </button>
    </div>
  );
}

export default CreateOrder;