import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const LoginButtonAuth0 = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return <button onClick={handleLogin}>Login con Google</button>;
};

export default LoginButtonAuth0;
