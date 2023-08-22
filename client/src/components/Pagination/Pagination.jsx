import React from "react";
import style from "./Pagination.module.css";
import CardsContainer from "../CardsContainer/CardsContainer";
import Profesionales from "../AdminComponents/Profesionales";
import Clientes from "../AdminComponents/Clientes";

const Pagination = ({ currentPage, prevHandler, nextHandler, items, cardsContainer, profesionales, clientes }) => {

  return (
    <div className={style.paginationContainer}>
      <div className={style.contenido}>
        <div className={`${style.buttonContainer} ${profesionales || clientes ? style.profesionalesBtnConteiner : ""}`}>
        <button className={style.btn} onClick={prevHandler}>Prev</button>
          <span className={style.pageIndicator}>{currentPage + 1}</span>
          <button className={style.btn} onClick={nextHandler}>Next</button>
        </div>
      </div>
      <div className={style.prueba}>
      {cardsContainer && <CardsContainer items={items} />}
      {profesionales && <Profesionales items={items} />}
      {clientes && <Clientes items={items}/>}
      </div>
      
    </div>

  );
};

export default Pagination;
