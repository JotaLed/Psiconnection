import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonAuth0 = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => {
        loginWithRedirect();
      }}
    >
      Login con Google
    </button>
  );
};

export default LoginButtonAuth0;
