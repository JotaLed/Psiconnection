import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./views/home/home";
import Account from "./views/Account/Account";
import SideBar from "./components/sideBar/sideBar";

import Success from "./components/success/Success";

import RegistroUsuarioAuth0 from "./views/formularios/registroUsuarioAuth0/RegistroUsuarioAuth00";

import "./App.css";
import axios from "axios";

// axios.defaults.baseURL = "https://psiconnection-production.up.railway.app/";
axios.defaults.baseURL = "http://localhost:3001/";

//Hooks:
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//imports generales::

//importamos views:
import Landing from "./views/landing/landing";
//import Form from "./views/form/form";
import Detail from "./views/detail/detail";
import Nosotros from "./views/nosotros/nosotros";
import ClientAccount from "./views/Account/ClientAccount";
import FormularioGeneral from "./views/formularios/FormularioGeneral";

//importmos components:
import LoginUsuario from "./views/formularios/loginUsuario/loginUsuario"; // Asegúrate de usar mayúsculas en las letras iniciales/
import LoginPsicologo from "./views/formularios/loginPsicologo/loginPsicologo";
import Failure from "./views/paymentFailure/failure"
import RegistroUsuario from "./views/formularios/registroUsuario/registroUsuarios";
import RegistroPsicologo from "./views/formularios/registroPsicologo/registoPsicologos";

//comentario
function App() {
  const { pathname } = useLocation();

  return (
    <div>
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
        <Route path="/home" element={<Home />}/>
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/detail/:detailID" element={<Detail />} />

        <Route path="/success" element={<Success />} />
        
        
        <Route path="/account/:id" element={<Account />} />
        <Route path="/account/client/:id" element={<ClientAccount />} />

        <Route path="/payment/state/failure" element={<Failure/>}/>
      </Routes>
    </div>
  );
}
export default App;

//prueba
