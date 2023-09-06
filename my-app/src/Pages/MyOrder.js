import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
//MUI
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function MyOrder(){
    const [retrievedData, setRetrievedData] = useState(null); // State for retrieved data

    const columns = [
      { field: 'OrderID', headerName: 'Order ID', flex: 1 },
      { field: 'Brand', headerName: 'Brand', flex: 1 },
      { field: 'Status', headerName: 'Status', flex: 1 },
      { field: 'Model', headerName: 'Model', flex: 1 },
      { field: 'CustomerID', headerName: 'Customer ID', flex: 1 },
      { field: 'Completed Date', headerName: 'Completed Date', flex: 1 },
      { field: 'Color', headerName: 'Color', flex: 1},
      { field: 'EmployeeID', headerName: 'Employee ID', flex: 1},
      { field: 'Gender', headerName: 'Gender', flex: 1},
      { field: 'Ordered Date', headerName: 'Ordered Date', flex: 1},
      { field: 'Size', headerName: 'Size', flex: 1},
      { field: 'Width', headerName: 'Width', flex: 1}

    ];

    const getRowId = (row) => row.OrderID; // Specify the unique id for each row


    // Fetch function to call in our order data
    const fetchRetrievedData = async () => {
        try {
          const session = await Auth.currentSession();
          const fetchedUsername = await getUsernameFromToken();
    
          const retrievePayload = {
            operation: 'retrieveMyOrders',
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

    return(
      <div>
      <h1>My Orders</h1>
      {/* Display retrieved data */}
      {retrievedData && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={retrievedData}
            columns={columns.map((column) => ({
              ...column,
              renderCell: (params) => {
                return (
                  <div
                    title={params.value} // Set the title attribute to the cell value
                    style={{ cursor: 'pointer' }}
                  >
                    {params.value}
                  </div>
                );
              },
            }))}
            pageSize={5}
            getRowId={getRowId}
          />
        </div>
      )}
    </div>
    );
}
export default MyOrder;