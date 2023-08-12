import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Sidebar.css'; 

export default function Sidebar() {

  return (
<nav className="navbar">
      <div className="navbar-container">
        <a href="/home" className="navbar-logo">Psiconnection</a>
        <ul className="nav-menu">
          <li className="nav-item"><a href="/home">Home</a></li>
          {/* <li className="nav-item"><a href="/detail">Perfil</a></li> */}
          <li className="nav-item"><a href="/nosotros">About us</a></li>
          <li className="nav-item"><a href="/form">Sign up</a></li>
        </ul> 
      </div>
    </nav>
  );
}

