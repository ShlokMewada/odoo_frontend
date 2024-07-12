import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function GoogleAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use context to set user


  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await fetch('https://odoo.detrace.systems/api/users/google-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save tokens to localStorage
        localStorage.setItem("access_token", data.tokens.access);
        setUser(data.user);

        // Redirect to the path saved in localStorage or to the home page
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        console.log('Login successful');
        navigate(redirectPath);
      } else {
        throw new Error('Failed to login with Google');
      }
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>SignIn Using Google</p>
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
