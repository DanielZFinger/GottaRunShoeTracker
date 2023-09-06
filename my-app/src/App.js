import './App.css';
import AuthForm from './Pages/AuthForm';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import DashboardPage from './Pages/DashboardPage';
import OrderReports from './Pages/OrderReports';
import ShoeCreation from './Pages/ShoeCreation';
import ActiveOrders from './Pages/ActiveOrders';

function App() {
  const navigateToSignUp = () => {
    // Implement navigation logic here, e.g., using React Router
    // For now, let's just log the navigation
    console.log('Navigating to Sign Up page');
  };

  return (
    <HashRouter>
      <div>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<AuthForm navigateToSignUp={navigateToSignUp} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
          <Route path="/order-reports" element={<OrderReports/>} />
          <Route path ="/shoe-creation" element={<ShoeCreation/>}/>
          <Route path ="/active-orders" element={<ActiveOrders/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

