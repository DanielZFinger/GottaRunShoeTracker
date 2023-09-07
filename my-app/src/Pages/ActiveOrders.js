import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsernameFromToken } from '../AuthUtils';
import './CSS/ActiveOrders.css';
import EditOrder from './EditOrder';
//MUI
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

function ActiveOrders() {
  const [retrievedData, setRetrievedData] = useState(null); // State for retrieved data
  const [selectedRow, setSelectedRow] = useState(null); // State to track the selected row
  const [showEditPage, setShowEditPage] = useState(false); // State to control rendering of EditOrder

  const handleToggleButtonClick = () => {
    // Toggle the value of showEditPage
    setShowEditPage(!showEditPage);
  };
  const navigate = useNavigate();

  const columnsOne = [
    { field: 'OrderID', headerName: 'Order ID', flex: 1 },
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'Email', headerName: 'Email', flex: 1 },
    { field: 'Brand', headerName: 'Brand', flex: 1 },
    { field: 'Model', headerName: 'Model', flex: 1 },
    { field: 'Status', headerName: 'Status', flex: 1 },
    { field: 'OrderedDate', headerName: 'Ordered Date', flex: 1 },
    {
      field: 'Edit',
      headerName: 'Edit',
      flex: 1,
      renderCell: (params) => {

        return (
          <button onClick={handleEditClick}>Edit</button>
        );
      },
    },
  ];

  const handleEditClick = (params) => {
    // Set the selected row and show the EditOrder component
    setSelectedRow(params.row);
    setShowEditPage(true);
  };

  const getRowId = (row) => row.OrderID;



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
        

      return (
        <div>
      {showEditPage && (
        <Button variant="contained" onClick={handleToggleButtonClick}>
          Back to Active Orders
        </Button>
      )}

      {showEditPage ? (
        <EditOrder rowData={selectedRow} />
      ) : (
        <>
          <h1>Active Orders</h1>
          <Typography
            className="typography-text2"
            style={{ fontSize: '60%' }}
          >
            When Updating Values The Browser Will Refresh
          </Typography>
          {retrievedData && (
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={retrievedData}
                columns={columnsOne}
                pageSize={5}
                getRowId={getRowId}
                onCellClick={handleEditClick}
              />
            </div>
          )}
        </>
      )}
    </div>

      );
    }
    export default ActiveOrders;