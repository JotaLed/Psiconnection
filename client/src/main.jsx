import React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./Redux/store";

const rootUri = window.location.origin;

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Auth0Provider
      domain={"dev-sdzlhz4u3748bi1n.us.auth0.com"}
      clientId={"pqcJSZZkLUgo8FLZD2vpRH76UsQVNcb5"}
      redirectUri={
        rootUri.includes("localhost")
          ? "http://localhost:5173/registroUsuario/google"
          : "https://psiconnectiondev.vercel.app/registroUsuario/google"
      }
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </Provider>
);

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
