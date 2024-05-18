
import React, { useContext } from 'react';
import { GoogleLogin } from 'react-google-login';
import { UserContext } from '../context/UserContext'
import './GoogleLogin.css';


const GoogleLoginComponent = () => {
  const { setUser } = useContext(UserContext);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    setUser(response.profileObj.email);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleLoginSuccess}
      onFailure={handleLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginComponent;
