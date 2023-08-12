import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./views/home/home";
import Account from "./views/Account/Account";
import SideBar from "./components/sideBar/sideBar";
import "./App.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

//Hooks:
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

//imports generales:

//importamos views:
import Landing from "./views/landing/landing";
import Form from "./views/form/form";
import Detail from "./views/detail/detail";
import Nosotros from "./views/nosotros/nosotros";

//importmos components:

//comentario
function App() {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname !== "/" && <SideBar />}
      <Routes>
        <Route path="/form" element={<Form />} />

        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/nosotros" element={<Nosotros />}></Route>
        <Route path="/detail/:detailID" element={<Detail />}></Route>
        <Route path="/account/:id" element={<Account />} />
      </Routes>
    </div>
  );
}
export default App;

//prueba
