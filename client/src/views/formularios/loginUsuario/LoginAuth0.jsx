import React from "react";
import logo from '../../../Images/logoGoogle.png'
import './loginGoogle.css'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonAuth0 = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  return <button onClick={handleLogin} className="buttonGoogle">
    <img src={logo} alt="login" className="logo"/>
  
  </button>;
};

export default LoginButtonAuth0;
