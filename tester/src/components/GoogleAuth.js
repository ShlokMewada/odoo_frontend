// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserContext';

// function GoogleAuth() {
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(UserContext);
//   const [googleUser, setGoogleUser] = useState(null);
//   const [role, setRole] = useState("Customer");
//   const [errors, setErrors] = useState(null);

//   const sendTokenToBackend = async (idToken) => {
//     try {
//       const response = await fetch('https://odoo.detrace.systems/api/users/google-auth/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id_token: idToken ,role}),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         // Save tokens to localStorage
//         console.log(data)
//         localStorage.setItem("access_token", data.tokens.access);
//         localStorage.setItem("user",JSON.stringify(data.user))
//         setUser(data.user)
//         // const userData = localStorage.getItem("user")
//         // console.log(JSON.parse(userData))
//         // Redirect to the path saved in localStorage or to the home page
//         const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
//         localStorage.removeItem("redirectAfterLogin");
//         console.log('Login successful');
//         navigate(redirectPath);
//       } else {
//         throw new Error('Failed to login with Google');
//       }
//     } catch (error) {
//       console.error('Error sending token to backend:', error);
//     }
//   };
//   // const handleGoogleSuccess = (credentialResponse) => {
//   //   const credential = credentialResponse.credential;
//   //   if (credential) {
//   //     try {
//   //       const decoded = jwtDecode(credential);
//   //       console.log(decoded);
//   //       setGoogleUser(decoded);
//   //     } catch (error) {
//   //       console.error('Error decoding token:', error);
//   //     }
//   //   } else {
//   //     console.error('No credential returned from Google');
//   //   }
//   };
//   const handleRoleSelection = () => {
//     if (googleUser) {
//       sendTokenToBackend(googleUser.sub);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//       {googleUser ? (
//           <div className="role-selection-container">
//             <h2>Select Your Role</h2>
//             <select value={role} onChange={(e) => setRole(e.target.value)}>
//               <option value="Customer">User</option>
//               <option value="Librarian">Librarian</option>
//             </select>
//             <button onClick={handleRoleSelection}>Continue</button>
//             {errors && <span className="error">{errors}</span>}
//           </div>
//         ) : (
//           <>
//           <p className="google">SignIn Using Google:</p>
//           <GoogleLogin
//         //       onSuccess={handleGoogleSuccess}
//         //       onError={() => {
//         //         console.log('Login Failed');
//         //       }}
//         //     />
//         //   </>
//         // )}
//         {<span>
//           <GoogleLogin
//             onSuccess={(credentialResponse) => {
//               const credential = credentialResponse.credential;
//               if (credential) {
//                 try {
//                   const decoded = jwtDecode(credential);
//                   console.log(decoded);

//                   // Send the ID token to the backend
//                   sendTokenToBackend(credential);
//                 } catch (error) {
//                   console.error('Error decoding token:', error);
//                 }
//               } else {
//                 console.error('No credential returned from Google');
//               }
//             }}
//             onError={() => {
//               console.log('Login Failed');
//             }}
//           />
//         </span>}
//       </header>
//     </div>
//   );
// }

// export default GoogleAuth;
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function GoogleAuth() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [role, setRole] = useState("Customer");
  const [errors, setErrors] = useState(null);

  const sendTokenToBackend = async (idToken) => {
    try {
      const response = await fetch('https://odoo.detrace.systems/api/users/google-auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: idToken, role }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        console.log('Login successful');
        navigate(redirectPath);
      } else {
        throw new Error('Failed to login with Google');
      }
    } catch (error) {
      console.error('Error sending token to backend:', error);
      setErrors('Failed to login. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="google">SignIn Using Google:</p>
        <div className="role-selection-container">
          <h2>Select Your Role</h2>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Customer">User</option>
            <option value="Librarian">Librarian</option>
          </select>
        </div>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const credential = credentialResponse.credential;
            if (credential) {
              try {
                const decoded = jwtDecode(credential);
                console.log(decoded);
                sendTokenToBackend(credential);
              } catch (error) {
                console.error('Error decoding token:', error);
                setErrors('Error processing login. Please try again.');
              }
            } else {
              console.error('No credential returned from Google');
              setErrors('No credential returned. Please try again.');
            }
          }}
          onError={() => {
            console.log('Login Failed');
            setErrors('Login failed. Please try again.');
          }}
        />
        {errors && <span className="error">{errors}</span>}
      </header>
    </div>
  );
}

export default GoogleAuth;