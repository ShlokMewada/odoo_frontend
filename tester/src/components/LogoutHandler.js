import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogoutHandler = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call logout function from AuthContext to clear tokens and user state
        logout();

        // Redirect to the homepage after logout
        navigate('/');
      } catch (error) {
        console.error('Logout error:', error);
        // Handle logout error if needed
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return null; // This component does not render anything
};

export default LogoutHandler;



// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const LogoutHandler = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     logout();
//     navigate('/');
//   }, [logout, navigate]);

//   return null; // This component does not render anything
// };

// export default LogoutHandler;
