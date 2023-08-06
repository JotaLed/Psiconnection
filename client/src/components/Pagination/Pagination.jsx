import React from "react";
import style from "./Pagination.module.css";
import CardsContainer from "../CardsContainer/CardsContainer";

const Pagination = ({ currentPage, prevHandler, nextHandler, items }) => {
  return (
    <div className={style.paginationContainer}>
      <div className={style.buttonContainer}>
        <button className={style.btn} onClick={prevHandler}>Prev</button>
        <span className={style.pageIndicator}>{currentPage + 1}</span>
        <button className={style.btn} onClick={nextHandler}>Next</button>
      </div>
      <CardsContainer items={items}/>
    </div>
  );
};

export default Pagination;
