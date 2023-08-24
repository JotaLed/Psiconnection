import React from "react";
import logoPsiconnetion from "./logoPsiconnetion.png";

import "./header.css"; // Importa tus estilos CSS

const Header = () => {
  return (
    <div className="header-container">
      <img src={logoPsiconnetion} alt="" className="header-logo" />
      <div className="logoName">PSICONNECTION</div>
    </div>
  );
};

export default Header;
