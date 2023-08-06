import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Filters from "../../components/filters/filters";
import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
//importamos estilo 
import style from "../home/home.module.css"
export default function Home() {
  const ITEMS_PER_PAGE = 6;
  const piscologos = useSelector(state => state.psychologists);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() =>{
    if(piscologos.length === 0){
      //dispatch(getPsicologos())
    }
  }, [piscologos]);

  const prevHandler = () => {
    const elements = filteredRecipes.length > 0 ? filteredRecipes.length : recipes.length;

    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  }
  const nextHandler = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(piscologos.length / ITEMS_PER_PAGE) - 1));
  }

  // Calcula los índices de inicio y fin de las tarjetas a mostrar en la página actual
  const firstIndex = currentPage * ITEMS_PER_PAGE;
  const lastIndex = Math.min(firstIndex + ITEMS_PER_PAGE, piscologos.length);

  // Filtra las tarjetas a mostrar en la página actual
  const currentItems = piscologos.slice(firstIndex, lastIndex);

  

  return (
    <div className={style.home}>
      <div className={style.col1}>
        {/* Columna para los filtros */}
        <Filters />
      </div>
      
      <div className={style.col2}>
        {/* Columna para los contenedores de tarjetas */}
        <div className={style.pagination_conteiner}>
          <Pagination currentPage={currentPage} nextHandler={nextHandler} prevHandler={prevHandler} items={currentItems}/>
        </div>
        {/* <CardsContainer items={currentItems} /> */}
      </div>
      
    </div>
  );
}
