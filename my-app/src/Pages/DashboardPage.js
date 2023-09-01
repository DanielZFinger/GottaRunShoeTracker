import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { getUsernameFromToken } from '../AuthUtils'; // Adjust the path

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [brandName, setBrandName] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [employeeIDValue, setEmployeeIDValue] = useState('');
  const [retrievedData, setRetrievedData] = useState(null); // State for retrieved data
  const [brands, setBrands]=useState(['']);
  const [models, setModels]=useState(['']);

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

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setSelectedModel('');
  };

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
    //   console.log(accessToken);
      console.log("reg fetch")

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
        console.log(data);
      } else {
        console.error('Error fetching data:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchRetrievedData = async () => {
    try {
      const session = await Auth.currentSession();
      const fetchedUsername = await getUsernameFromToken();

      const retrievePayload = {
        operation: 'retrieveAll',
        CustomerID: fetchedUsername, // Use the fetched username
      };

      const accessToken = session.getAccessToken().getJwtToken();
      console.log(accessToken);
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
        setRetrievedData(data);
        console.log(data);
      } else {
        console.error('Error fetching retrieved data:', response.statusText);
      }

    } catch (error) {
      console.error('Error fetching retrieved data:', error);
    }
  };

  useEffect(() => {
    // fetchData();
    fetchRetrievedData(); // Fetch retrieved data immediately
    fetchBrands();
    fetchModels();
  }, []);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <input
        type="text"
        placeholder="EmployeeID"
        value={employeeIDValue}
        onChange={(e) => setEmployeeIDValue(e.target.value)}
      />
      {/* select shoe brand */}
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
      {/* <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        disabled={!selectedBrand}
        >
        <option value="">Select a Model</option>
        {selectedBrand &&
            retrievedData
            .filter(item => item.Brand === selectedBrand)
            .map((item, index) => (
                <option key={index} value={item.Model}>
                {item.Model}
                </option>
            ))}
        </select> */}
        <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
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


      <button onClick={fetchData}>Create Order</button>
      <div>
        {/* Display retrieved data */}
        {retrievedData && (
          <div>
            <h2>Retrieved Data</h2>
            <pre>{JSON.stringify(retrievedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
