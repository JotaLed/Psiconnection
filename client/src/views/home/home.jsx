import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filters from "../../components/filters/filters";
import Pagination from '../../components/Pagination/Pagination';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import SearchBar from '../../components/searchBar/searchBar'
import { getPsicologos, loadCurrentUser, setOrders } from '../../Redux/actions';
import axios from 'axios';
//importamos estilo 
import style from "../home/home.module.css"
export default function Home() {
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 6;
  const piscologos = useSelector(state => state.psychologists);
  const [currentPage, setCurrentPage] = useState(0);

  //Funciona para guardar el usuario actual
  const loadUserById = async(id)=>{
    const {data} = await axios.get(`psiconection/usuario/acount/${id}`)
    await dispatch(loadCurrentUser(data.usuario))
    console.log(data.usuario);
  }

  useEffect(() => {
    async function fetchData() {
      if (piscologos.length === 0) {
        await dispatch(getPsicologos())
      }
      if(window.localStorage.getItem('authToken') !== null){
        const tokenData = window.localStorage.getItem('authToken').split('.').at(1)
        console.log("Token del home: "+tokenData);
        const decodedData = JSON.parse(window.atob(tokenData))
        loadUserById(decodedData.id)
        
        
        

      }

      dispatch(setOrders("alf"))
    }
    fetchData()



  }, []);

  const updateCurrentPage = () => {
    setCurrentPage(0);
  };

  const prevHandler = () => {
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
        <Filters update={updateCurrentPage} />
      </div>
      <div className={style.col2}>
        <div className={style.search_conteiner}>
          <SearchBar />
        </div>
        <Pagination currentPage={currentPage} nextHandler={nextHandler} prevHandler={prevHandler} items={currentItems} />
      </div>

    </div>
  );
}
