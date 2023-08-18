import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
//importmas browserRouter
import { BrowserRouter } from "react-router-dom";
//Imports para la utilizacion de redux
import store from "./Redux/store";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID}
      redirectUri={import.meta.env.VITE_URL_REDIRECT_LOGIN}
      onLogout={import.meta.env.VITE_URL_REDIRECT_LOGOUT}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
);

//solucionar el tema de si esta registrado no mandar al formulario

// import React from "react";
// import { createRoot } from "react-dom";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import "./index.css";
// import { Provider } from "react-redux";
// import { Auth0Provider } from "@auth0/auth0-react";
// import store from "./Redux/store";
// import axios from "axios";

// const onRedirectCallback = async ({ user }) => {
//   if (user) {
//     try {
//       const response = await axios.get("psiconection/get/users");
//       const usersData = response.data || [];
//       const userEmail = user.email;

//       if (userEmailIsRegistered(usersData, userEmail)) {
//         window.location.href = "http://localhost:5173/home";
//       } else {
//         window.location.href = "http://localhost:5173/registroUsuario/google";
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   }
// };

// const userEmailIsRegistered = (usersData, userEmail) => {
//   return usersData.some((user) => user.email === userEmail);
// };

// const root = createRoot(document.getElementById("root"));

// root.render(
//   <Provider store={store}>
//     <Auth0Provider
//       domain={"dev-sdzlhz4u3748bi1n.us.auth0.com"}
//       clientId={"pqcJSZZkLUgo8FLZD2vpRH76UsQVNcb5"}
//       onRedirectCallback={onRedirectCallback}
//     >
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Auth0Provider>
//   </Provider>
// );
