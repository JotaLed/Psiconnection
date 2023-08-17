import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LogoutButtonAuth0 = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: `${window.location.origin}/home` }); // Return to the /home page
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButtonAuth0;
