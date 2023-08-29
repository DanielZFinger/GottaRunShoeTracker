import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { getUsernameFromToken } from '../AuthUtils'; // Adjust the path

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');

  

  useEffect(() => {
    async function fetchData() {
    const oppy = "create";
    const empID ="Employee12345";
    const custID="TestCustomer12345";

    const payload = {
        operation: oppy,
        EmployeeID: empID,
        CustomerID: custID
    };
      try {
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken().getJwtToken();
        console.log(accessToken);

        const response = await fetch('https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log(payload);
        console.log(JSON.stringify(payload));

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        } else {
          console.error('Error fetching data:', response.statusText);
        }

        // Get the username from the token
        const fetchedUsername = await getUsernameFromToken();
        setUsername(fetchedUsername);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      {/* Display userData or other content */}
    </div>
  );
}

export default Dashboard;
