import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Importing jwtDecode as default import
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function GoogleAuth() {
  const navigate = useNavigate(); // Hook for navigation
  const { login } = useAuth();

  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await fetch('https://odoo.detrace.systems/users/google-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to login with Google');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Handle successful login, e.g., save tokens, redirect, etc.
      login(data.user); // Assuming the backend sends the user data
      navigate('/home'); // Redirect to the home page
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Google Auth</p>
        <span>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const credential = credentialResponse.credential;
              if (credential) {
                try {
                  const decoded = jwtDecode(credential);
                  console.log(decoded);

                  // Send the ID token to the backend
                  sendTokenToBackend(credential);
                } catch (error) {
                  console.error('Error decoding token:', error);
                }
              } else {
                console.error('No credential returned from Google');
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </span>
      </header>
    </div>
  );
}

export default GoogleAuth;
