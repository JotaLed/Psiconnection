import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import logo from "../../Images/Screenshot_18.jpg";

export default function Sidebar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo_conteiner">
          <img className="navbar-logo" src={logo} alt="" />
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          {/* <li className="nav-item"><Link to="/detail">Perfil</Link></li> */}
          <li className="nav-item">
            <Link to="/nosotros">About us</Link>
          </li>
          {/* {
            !login ? <li className="nav-item">
            <Link to="/form">Sign up</Link>
          </li>
          :<li className="nav-item">
          <Link to="/acount:id">Perfil</Link>
        </li>
          } */}
          <li className="nav-item">
            <Link to="/form">Sign up</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}
