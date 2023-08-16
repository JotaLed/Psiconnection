import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//importmas browserRouter
import { BrowserRouter } from "react-router-dom";
//Imports para la utilizacion de redux
import store from "./Redux/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = "dev-j2pay3qttg6wtsey.us.auth0.com";
const clientId = "cFFZWgwFiriqen5VK1Ut23IwXw9kprH0";

ReactDOM.createRoot(document.getElementById("root")).render(
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
  </Provider>
);

//comentario
