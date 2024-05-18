
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleSuccess = (response) => {
    console.log('Login successful:', response);
    onSuccess(response);
  };

  const handleFailure = (error) => {
    console.error('Login failed:', error);
    onFailure(error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
