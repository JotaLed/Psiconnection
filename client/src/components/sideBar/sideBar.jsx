import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import logo from "../../Images/Screenshot_18.jpg";



export default function Sidebar() {

  let token = localStorage.getItem('authToken');
  console.log("tokennnn", token)
  
  if(token){
    const tokenData = token.split('.').at(1)
    console.log("tokenData", tokenData)
    let decodedData = window.atob(tokenData)
    console.log("decodedData", decodedData)

  }

  // console.log('sideBarToken',token)

  // eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ

  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiYzA2YTQzLWI5NDAtNGM3MC1hYTgzLTE0YTM2MDQxYjU0NSIsInJvbGwiOiJ1c3VhcmlvIiwibm9tYnJlIjoiZ2FicmllbCIsImFwZWxsaWRvIjoiZmVybmFuZGV6IiwiaWF0IjoxNjkyMTYyMTUxfQ.oYvMSurD_UtqipUnTRx2HQcdyyITjuSdBQ9A4q8_QH0"

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
          {
            !token ? <li className="nav-item">
            <Link to="/form">Sign up</Link>
          </li>
          :<li className="nav-item">
          <Link to="/acount:id">Perfil</Link>
        </li>
          }
        </ul>
      </div>
    </nav>
  );
}
