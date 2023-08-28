import './App.css';
import AuthForm from './Pages/AuthForm';
import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import DashboardPage from './Pages/DashboardPage';

function App() {
  const navigateToSignUp = () => {
    // Implement navigation logic here, e.g., using React Router
    // For now, let's just log the navigation
    console.log('Navigating to Sign Up page');
  };

  return (
    <Router>
      <div>
        <h1>Cognito User Management</h1>
        <Routes>
          <Route path="/" element={<AuthForm navigateToSignUp={navigateToSignUp} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirmation" element={<ConfirmationPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

