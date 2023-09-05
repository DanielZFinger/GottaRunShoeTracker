import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';

function EmployeeDashboard() {
    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState('');//usernameID once we get it from etch function
    const [userLevel, setUserLevel]=useState(['']);
    const [selectedBrand, setSelectedBrand] = useState('');//chosen brand on the dropdown bar on the screen for user
    const [selectedModel, setSelectedModel] = useState('');//chosen model on the dropdown bar on the screen for user
    const [employeeIDValue, setEmployeeIDValue] = useState('');
    const [brands, setBrands]=useState(['']);//brands available pulled from the fetch function
    const [models, setModels]=useState(['']);//models available pulled from the fetch function
    const [isFieldsFilled, setIsFieldsFilled] = useState(false);//checks to make sure all fields for the create order button are filled. So makes sure employeeID, brand and model all have values  
  const navigate = useNavigate();

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

        setEmployeeIDValue(dataArr.UserID);
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
    <div/>
  );
}

export default EmployeeDashboard;