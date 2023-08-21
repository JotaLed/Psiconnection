import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import logo from "../../Images/Screenshot_18.jpg";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../../Redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Sidebar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.currentUser);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();
  const [tokenId, setTokenId] = useState("");
  const [tokenRoll, setTokenRoll] = useState("");
  const [usuarioRegistradoAuth0, setUsuarioRegistradoAuth0] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const getUsers = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3001/psiconection/get/users"
          );
          const usuarioRegistrado = response.data.find(
            (u) => u.email === user.email
          );
          if (usuarioRegistrado) {
            setUsuarioRegistradoAuth0(usuarioRegistrado);
            setTokenId(usuarioRegistrado.id);
            setTokenRoll(usuarioRegistrado.roll);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

      getUsers();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadCurrentUser(user));
    }
  }, [isAuthenticated, dispatch, user]);

  const DetailAcount = () => {
    navigate(`/account/client/${tokenId}`);
  };

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
          <li className="nav-item">
            <Link to="/nosotros">About us</Link>
          </li>
          {!tokenId ? (
            <li className="nav-item">
              <NavLink to="/form">Sign up</NavLink>
            </li>
          ) : isAuthenticated && usuarioRegistradoAuth0 ? (
            <NavLink
              className="nav-item-perfil"
              to={`/account/client/${tokenId}`}
            >
              {currentUser && currentUser.foto ? (
                <img className="foto_perfil" src={currentUser.foto} alt="" />
              ) : (
                "Perfil"
              )}
            </NavLink>
          ) : (
            <NavLink
              className="nav-item-perfil"
              to={
                tokenRoll === "usuario"
                  ? `/account/client/${tokenId}`
                  : tokenRoll === "admin"
                  ? "/account/admin/"
                  : `/account/${tokenId}`
              }
            >
              {currentUser && currentUser.foto ? (
                <img className="foto_perfil" src={currentUser.foto} alt="" />
              ) : (
                "Perfil"
              )}
            </NavLink>
          )}
        </ul>
      </div>
    </nav>
  );
}
