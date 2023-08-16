import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-sdzlhz4u3748bi1n.us.auth0.com";
const clientId = "pqcJSZZkLUgo8FLZD2vpRH76UsQVNcb5";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

//comentario
