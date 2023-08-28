import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken().getJwtToken();
        console.log(accessToken);

        const response = await fetch('https://h4lh1cdrq6.execute-api.us-east-1.amazonaws.com/Dev/userdata', {
            method: 'GET',
            headers: {
                Accept: "application/json"
            },
        });

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
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Display userData or other content */}
    </div>
  );
}

export default Dashboard;
