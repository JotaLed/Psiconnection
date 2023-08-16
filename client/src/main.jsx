import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./Redux/store";

const onRedirectCallback = (appState) => {
  // Redirigir a la URL deseada después del inicio de sesión
  window.location.href = "http://localhost:5173/registroUsuario";
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Auth0Provider
      domain={"dev-sdzlhz4u3748bi1n.us.auth0.com"}
      clientId={"pqcJSZZkLUgo8FLZD2vpRH76UsQVNcb5"}
      onRedirectCallback={onRedirectCallback} // Usar la función de redirección
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
);
