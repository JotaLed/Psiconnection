import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
//importamos imagen del logo
import logo from "../../Images/Screenshot_18.jpg";

export default function Sidebar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* <a href="/home" className="navbar-logo">Psiconnection</a> */}
        <Link to="/home">
          <div className="navbar-logo_conteiner">
            <img className="navbar-logo" src={logo} alt="" />
          </div>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/home">Home</a>
          </li>
          {/* <li className="nav-item"><a href="/detail">Perfil</a></li> */}
          <li className="nav-item">
            <a href="/nosotros">About us</a>
          </li>
          <li className="nav-item">
            <a href="/form">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
