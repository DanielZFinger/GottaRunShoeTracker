// OrderReports.js
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';

function OrderReports() {
    const [retrievedData, setRetrievedData] = useState(null); // State for retrieved data

    // Fetch function to call in our order data
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
    
    // USE EFFECT so that i can immidiately pull the order data on page load--This function calls the fetch function to get the data
      useEffect(() => {
        fetchRetrievedData(); // Fetch retrieved data immediately
      }, []);
    
  return (
    <div>
    <div>
      <h1>Order Reports</h1>
      <p>This is the Order Reports page.</p>
    </div>
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

export default OrderReports;
