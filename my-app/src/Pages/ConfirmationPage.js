import React from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const navigate = useNavigate();

  const handleBackToSignIn = () => {
    navigate('/GottaRunShoeTracker'); // Navigate to the sign-in page
  };

  return (
    <div>
      <h2>Account Created</h2>
      <p>Please check your email to confirm your account.</p>
      <button onClick={handleBackToSignIn}>Back to Sign In</button>
    </div>
  );
}

export default ConfirmationPage;
