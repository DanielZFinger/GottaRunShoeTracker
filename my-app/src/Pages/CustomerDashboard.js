import React from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Customer Dashboard</h2>
      <p>Here is your dashboard.</p>
    </div>
  );
}

export default CustomerDashboard;