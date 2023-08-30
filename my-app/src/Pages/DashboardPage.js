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

  const brands = ['Hoka', 'Brooks', 'Saucony']; // List of brand options
  const modelsByBrand = {
    Hoka: ['Clifton', 'Bondi', 'Speedgoat'],
    Brooks: ['Ghost', 'Adrenaline', 'Glycerin'],
    Saucony: ['Ride', 'Guide', 'Kinvara'],
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
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>
      <select
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        disabled={!selectedBrand} // Disable model selection until a brand is selected
      >
        <option value="">Select a Model</option>
        {selectedBrand &&
          modelsByBrand[selectedBrand].map((model) => (
            <option key={model} value={model}>
              {model}
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
