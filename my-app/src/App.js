import './App.css';
import AuthForm from './Pages/AuthForm';
import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import DashboardPage from './Pages/DashboardPage';
import OrderReports from './Pages/OrderReports';
import ShoeCreation from './Pages/ShoeCreation';
import ActiveOrders from './Pages/ActiveOrders';
import EditOrder from './Pages/EditOrder';
import NewCustomer from './Pages/NewCustomer';

function App() {
  const navigate = useNavigate(); // Get the navigation function

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
    // <HashRouter>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/signin" element={<AuthForm />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/order-reports" element={<OrderReports />} />
          <Route path="/shoe-creation" element={<ShoeCreation />} />
          <Route path="/active-orders" element={<ActiveOrders />} />
          <Route path="/edit-order" element={<EditOrder />} />
          <Route path="/new-customer" element={<NewCustomer />} />
        </Routes>
      </div>
    // </HashRouter>
  );
}

export default App;
