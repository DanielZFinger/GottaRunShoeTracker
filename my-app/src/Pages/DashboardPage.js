import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import EmployeeDashboard from './EmployeeDashboard'; // Import an employee-specific dashboard component
import CustomerDashboard from './CustomerDashboard'; // Import a customer-specific dashboard component

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');//usernameID once we get it from etch function
  const [userLevel, setUserLevel]=useState(['Customer']);
  const navigate = useNavigate(); // Use useNavigate




  //this is where user data is retrieved
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

      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //   call the userdata on load
  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <div>
      <h1>Welcome, {username}!</h1>
      {userLevel === 'Employee' ? (
        <EmployeeDashboard userData={userData} />
      ) : (
        <CustomerDashboard userData={userData} />
      )}
      {/* ... other dashboard content */}
      </div>
  );
}

export default Dashboard;
