// Pagination.jsx
import React from "react";
import style from "./Pagination.module.css"; // Importa el archivo CSS
import CardsContainer from "../CardsContainer/CardsContainer";
import Profesionales from "../AdminComponents/Profesionales";
import Clientes from "../AdminComponents/Clientes";

const Pagination = ({ currentPage, prevHandler, nextHandler, items, cardsContainer, profesionales, clientes }) => {

  return (
    <div className={style.paginationContainer}>
      <div className={style.buttonContainer}>
        <button className={style.btn} onClick={prevHandler}>Prev</button>
        <span className={style.pageIndicator}>{currentPage + 1}</span>
        <button className={style.btn} onClick={nextHandler}>Next</button>
      </div>
      <div className={style.prueba}>
        {cardsContainer && <CardsContainer items={items} />}
        {profesionales && <Profesionales items={items} />}
        {clientes && <Clientes items={items} />}
      </div>
    </div>
  );
};

export default Pagination;

