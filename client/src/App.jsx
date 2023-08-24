import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./views/home/home";
import Account from "./views/Account/Account";
import SideBar from "./components/sideBar/sideBar";
import "./fonts.css"
import "react-toastify/dist/ReactToastify.css";

import Success from "./components/success/Success";

import RegistroUsuarioAuth0 from "./views/formularios/registroUsuarioAuth0/RegistroUsuarioAuth00";

import "./App.css";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_URL_AXIOS_URL_BASE;

//Hooks:
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Paypal 

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

//imports generales::

//importamos views:
import Landing from "./views/landing/landing";
//import Form from "./views/form/form";
import Detail from "./views/detail/detail";
import Nosotros from "./views/nosotros/nosotros";
import ClientAccount from "./views/Account/ClientAccount";
import FormularioGeneral from "./views/formularios/FormularioGeneral";
import Dashboard from "./views/Dashboard";
import Header from "./views/Header/Header";

//importmos components:
import LoginUsuario from "./views/formularios/loginUsuario/loginUsuario"; // Asegúrate de usar mayúsculas en las letras iniciales/
import LoginPsicologo from "./views/formularios/loginPsicologo/loginPsicologo";
import Failure from "./views/paymentFailure/failure";
import RegistroUsuario from "./views/formularios/registroUsuario/registroUsuarios";
import RegistroPsicologo from "./views/formularios/registroPsicologo/registoPsicologos";
import AccountAdmin from "./views/AdminAccount/AdminAccount";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//comentario
function App() {
  const { pathname } = useLocation();
  const shouldRenderHeader = !["/success", "/payment/state/failure"].includes(pathname);

  return (
    <PayPalScriptProvider options={{ "clientId":"AfeucC6LwLkek1cqd6c57o75Ay2VvQKOF01r1TSP42Tf2hFsYhvflmr5ay7J4XU-m8C56JVfJ-dyQci-"}}>
    <div>
    {shouldRenderHeader && <Header />}
      {pathname !== "/" && <SideBar />}
      <Routes>
        <Route path="/form" element={<FormularioGeneral />} />

        <Route path="/loginUsuario" element={<LoginUsuario />} />
        <Route path="/loginPsicologo" element={<LoginPsicologo />} />
        <Route path="/registroUsuario" element={<RegistroUsuario />} />
        <Route
          path="/registroUsuario/google"
          element={<RegistroUsuarioAuth0 />}
        />
        <Route path="/registroPsicologo" element={<RegistroPsicologo />} />

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/detail/:detailID" element={<Detail />} />

        <Route path="/success" element={<Success />} />

        <Route path="/account/:id" element={<Account />} />
        <Route path="/account/client/:id" element={<ClientAccount />} />

        <Route path="/account/admin/:id" element={<AccountAdmin/>}/>

        <Route path="/payment/state/failure" element={<Failure />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
   </PayPalScriptProvider>
  );
}
export default App;

//prueba
