import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import EmployeeDashboard from './EmployeeDashboard'; // Import an employee-specific dashboard component
import CustomerDashboard from './CustomerDashboard'; // Import a customer-specific dashboard component
import OrderReports from './OrderReports';
import ShoeCreation from './ShoeCreation';
import CreateOrder from './CreateOrder';
import MyOrders from './MyOrder';
import ActiveOrders from './ActiveOrders';
import NewCustomer from './NewCustomer';
import Settings from './Settings';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
const drawerWidth = 240;

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState('');//usernameID once we get it from etch function
  const [userFirstName, setUserFirstName] = useState('');//usernameID once we get it from etch function
  const [userLevel, setUserLevel]=useState(['']);
  const navigate = useNavigate(); // Use useNavigate
  const [showOrderPage, setShowOrderPage] = useState(false);
  const [showCreateShoePage, setCreateShoePage] = useState(false);
  const [showCreateOrderPage, setCreateOrderPage] = useState(false);
  const [showMyOrdersPage, setMyOrdersPage] = useState(true);
  const [showActiveOrdersPage, setActiveOrdersPage] = useState(false);
  const [showNewCustomerPage, setNewCustomerPage] = useState(false);
  const [showSettingsPage, setShowSettingsPage] = useState(false);

  const handleMyOrdersPage = () => {
    setMyOrdersPage(true);
  };
  const handleMyOrdersPageOff = () => {
    setMyOrdersPage(false);
  };

  const handleCreateOrderPage = () => {
    setCreateOrderPage(true);
  };
  const handleCreateOrderPageOff = () => {
    setCreateOrderPage(false);
  };

  const handleCreateShoePage = () => {
    setCreateShoePage(true);
  };
  const handleCreateShoePageOff = () => {
    setCreateShoePage(false);
  };

  const handleShowOrderPage = () => {
    setShowOrderPage(true);
  };
  const handleShowOrderPageOff = () => {
    setShowOrderPage(false);
  };
  const handleShowActiveOrdersPage = ()=> {
    setActiveOrdersPage(true);
  }
  const handleShowActiveOrdersPageOff = ()=> {
    setActiveOrdersPage(false);
  }
  const handleShowNewCustomerPage = ()=> {
    setNewCustomerPage(true);
  }
  const handleShowNewCustomerPageOff = ()=> {
    setNewCustomerPage(false);
  }
  const handleShowSettingsPage = ()=> {
    setShowSettingsPage(true);
  }
  const handleShowSettingsPageOff = ()=> {
    setShowSettingsPage(false);
  }




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
        console.log(dataArr.FirstName);
        setUserFirstName(dataArr.FirstName);
        
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
  useEffect(() => {
    async function checkAuthenticationStatus() {
      try {
        await Auth.currentSession(); // Check if there's a valid session
      } catch (error) {
        // No valid session, log the user out and redirect to the sign-in page
        await Auth.signOut();
        navigate('/signin'); // Redirect to the sign-in page
      }
    }

    checkAuthenticationStatus();
  }, [navigate]);


  return (
    
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Welcome, {userFirstName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
      <List>
        {[
          { text: 'Create Order', requiredLevel: 'Employee'},
          { text: 'Shoe Creation', requiredLevel: 'Employee'},
          { text: 'Active Orders', requiredLevel: 'Employee'},
          { text: 'Order Reports', requiredLevel: 'Employee'},
          { text: 'Create Customer', requiredLevel: 'Employee'},
          { text: 'My Orders'},
          { text: 'Settings'},
        ].map((item, index) => (
          (item.requiredLevel === undefined || item.requiredLevel === userLevel) &&
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.route}
            onClick={() => {
                if (item.text === 'Order Reports') {
                  handleShowOrderPage();
                  handleCreateShoePageOff();
                  handleCreateOrderPageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'Shoe Creation') {
                  handleCreateShoePage();
                  handleShowOrderPageOff();
                  handleCreateOrderPageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'Create Order') {
                  handleCreateOrderPage();
                  handleShowOrderPageOff();
                  handleCreateShoePageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'My Orders') {
                  handleCreateOrderPageOff();
                  handleShowOrderPageOff();
                  handleCreateShoePageOff();
                  handleMyOrdersPage();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'Active Orders') {
                  handleCreateOrderPageOff();
                  handleShowOrderPageOff();
                  handleCreateShoePageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPage();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'Create Customer') {
                  handleCreateOrderPageOff();
                  handleShowOrderPageOff();
                  handleCreateShoePageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPage();
                  handleShowSettingsPageOff();
                }
                else if (item.text === 'Settings') {
                  handleCreateOrderPageOff();
                  handleShowOrderPageOff();
                  handleCreateShoePageOff();
                  handleMyOrdersPageOff();
                  handleShowActiveOrdersPageOff();
                  handleShowNewCustomerPageOff();
                  handleShowSettingsPage();
                }
              }}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {/* <h1>Welcome, {username}!</h1> */}
      {userLevel === 'Employee' ? (
        <EmployeeDashboard userData={userData} />
      ) : (
        <CustomerDashboard userData={userData} />
      )}
      {/* ... other dashboard content */}
      {showOrderPage && userLevel === 'Employee' && <OrderReports />}
      {showCreateShoePage && userLevel === 'Employee' && <ShoeCreation />}
      {showCreateOrderPage && userLevel === 'Employee' && <CreateOrder />}
      {showActiveOrdersPage && userLevel === 'Employee' && <ActiveOrders/>}
      {showNewCustomerPage && userLevel === 'Employee' && <NewCustomer/>}
      {showMyOrdersPage && <MyOrders/>}
      {showSettingsPage && <Settings/>}
        
      </Box>
    </Box>
      </div>
  );
}

export default Dashboard;
