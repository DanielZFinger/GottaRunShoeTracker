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
    const [selectedCompletedDate, setSelectedCompletedDate] = useState(new Date());//date of the order when completed
    const navigate = useNavigate(); // Use useNavigate

    const getRowId2 = (row) => {
        return `${row.OrderID}_${row.Brand}_${row.Model}`; // Customize as needed
      };
      
    const columns = [
      { field: 'OrderID', headerName: 'Order ID', flex: 1 },
      { field: 'Brand', headerName: 'Brand', flex: 1 },
      {
        field: 'Status',
        headerName: 'Status',
        flex: 1,
        editable: true,
        renderCell: (params) => {
          return (
            <div title={params.value} style={{ cursor: 'pointer' }}>
              {params.value}
            </div>
          );
        },
        renderEditCell: (params) => <StatusEditor {...params} />,
      },      
      { field: 'Model', headerName: 'Model', flex: 1 },
      { field: 'CustomerID', headerName: 'Customer ID', flex: 1 },
      { field: 'CompletedDate', headerName: 'Completed Date', flex: 1 },
      { field: 'Color', headerName: 'Color', flex: 1},
      { field: 'EmployeeID', headerName: 'Employee ID', flex: 1},
      { field: 'Gender', headerName: 'Gender', flex: 1},
      { field: 'OrderedDate', headerName: 'Ordered Date', flex: 1},
      { field: 'Size', headerName: 'Size', flex: 1},
      { field: 'Width', headerName: 'Width', flex: 1}

    ];

    const getRowId = (row) => row.OrderID; // Specify the unique id for each row

    const handleStatusChange = (params) => {
        const updatedStatus = params.props.value; // Get the updated status value
        const orderId = params.id; // Get the ID of the row being edited
      
        UpdateStatusFetch(orderId, updatedStatus);
      };

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

      const UpdateStatusFetchComplete = async (orderId) => {
        try {
            console.log("in the updatefeth");
            const retrievePayload = {
              operation: 'updateOrderStatusComplete',
              OrderID: orderId,
              status: "Complete",
              CompletedDate: selectedCompletedDate,
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

      const StatusEditor = (params) => {
        const handleChange = (e) => {
          const newValue = e.target.value;
          if(newValue==="Complete"){
            UpdateStatusFetchComplete(params.row.OrderID);
          }
          else{
            UpdateStatusFetch(params.row.OrderID, newValue);
          }
          window.location.reload();
        };
      
        return (
          <Select
            native
            value={params.value}
            onChange={handleChange}
            autoFocus
          >
            <option value="Shipping">Shipping</option>
            <option value="Ready To Be Picked Up">Ready To Be Picked Up</option>
            <option value="Complete">Complete</option>
          </Select>
        );
      };
      
        

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
            getRowId={getRowId2} // Set the custom getRowId function here
            />

        </div>
      )}
    </div>
    );
}
export default ActiveOrders;