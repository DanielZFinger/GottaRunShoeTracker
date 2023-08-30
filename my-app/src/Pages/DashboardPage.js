import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { getUsernameFromToken } from '../AuthUtils'; // Adjust the path

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');
  const [operationValue, setOperationValue] = useState('');
  const [employeeIDValue, setEmployeeIDValue] = useState('');

  const fetchData = async () => {
    try {
      const session = await Auth.currentSession();
      const fetchedUsername = await getUsernameFromToken(); // Fetch the username here
      setUsername(fetchedUsername); // Set the username state

      const payload = {
        operation: operationValue,
        EmployeeID: employeeIDValue,
        CustomerID: fetchedUsername, // Use the fetched username
      };

      const accessToken = session.getAccessToken().getJwtToken();
      console.log(accessToken);

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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <input
        type="text"
        placeholder="Operation"
        value={operationValue}
        onChange={(e) => setOperationValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="EmployeeID"
        value={employeeIDValue}
        onChange={(e) => setEmployeeIDValue(e.target.value)}
      />
      <button onClick={fetchData}>Submit</button>
      {/* Display userData or other content */}
    </div>
  );
}

export default Dashboard;
