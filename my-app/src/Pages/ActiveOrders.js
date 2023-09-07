import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import './CSS/ActiveOrders.css';
//MUI
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Select, MenuItem} from "@mui/material";
import Typography from '@mui/material/Typography';

function ActiveOrders(){
    const [retrievedData, setRetrievedData] = useState(null); // State for retrieved data
    const navigate = useNavigate(); // Use useNavigate
      
    const columnsOne = [
      { field: 'OrderID', headerName: 'Order ID', flex: 1 },
      { field: 'Brand', headerName: 'Brand', flex: 1 },
      { field: 'Status', headerName: 'Status', flex: 1,},      
      { field: 'Model', headerName: 'Model', flex: 1 },
      { field: 'CustomerID', headerName: 'Customer ID', flex: 1 },
      { field: 'OrderedDate', headerName: 'Ordered Date', flex: 1},
      { field: 'Name', headerName: 'Name', flex: 1},
      { field: 'Email', headerName: 'Email', flex: 1},
    ];

    const getRowId = (row) => row.OrderID; // Specify the unique id for each row

      const UpdateStatusFetch = async (orderId, updatedStatus) => {
        try {
            console.log("in the updatefeth");
            const retrievePayload = {
              operation: 'updateOrderStatus',
              OrderID: orderId,
              status: updatedStatus,
            };
      
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
            } else {
              console.error('Error fetching retrieved data:', response.statusText);
            }
      
          } catch (error) {
            console.error('Error fetching retrieved data:', error);
          }
      };

    // Fetch function to call in our order data
    const fetchRetrievedData = async () => {
        try {
          const retrievePayload = {
            operation: 'retrieveActiveOrders',
            completedDate: "Incomplete",
          };
    
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
      <h1>Active Orders</h1>
      <Typography
            className="typography-text2"
            style={{ fontSize: "60%" }}
          >
            When Updating Values The Browser Will Refresh
          </Typography>
      {/* Display retrieved data */}
      {retrievedData && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={retrievedData}
            columns={columnsOne.map((column) => ({
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
            getRowId={getRowId} // Set the custom getRowId function here
            />

        </div>
      )}
    </div>
    );
}
export default ActiveOrders;