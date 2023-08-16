import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div>
      <button className="g-signin2" onClick={() => loginWithRedirect()}>
        Login
      </button>
    </div>
  );
};

export default LoginButton;
