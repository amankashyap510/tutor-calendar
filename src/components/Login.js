
import React from 'react';
import GoogleLoginButton from './GoogleLoginButton';

const Login = () => {
  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);

  };

  return (
    <div>
      <h2>Login</h2>
      <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
    </div>
  );
};

export default Login;
