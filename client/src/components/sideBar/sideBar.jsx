import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          Psiconnection
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          {/* <li className="nav-item"><Link to="/detail">Perfil</Link></li> */}
          <li className="nav-item">
            <Link to="/nosotros">About us</Link>
          </li>
          <li className="nav-item">
            <Link to="/form">Sign up</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
