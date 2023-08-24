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
  const ITEMS_PER_PAGE = 4;
  const piscologos = useSelector(state => state.psychologists);
  const currentUser = useSelector(state => state.currentUser);

  const [currentPage, setCurrentPage] = useState(0);

  //Funciona para guardar el usuario actual
  const loadUserById = async (id, roll) => {
    console.log("Entra a la funcion de loadbyId");
    const getToken = window.localStorage.getItem('authToken')
    const tokenObject = JSON.parse(getToken);

    if (roll === "psicologo") {
      const { data } = await axios.get(`psiconection/${id}`)
      console.log(data);
      return dispatch(loadCurrentUser(data))
    }
    if (roll === "usuario") {
      console.log("Entra para usuario");
      const { data } = await axios.get(`psiconection/usuario/acount/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
        }
      })
      return dispatch(loadCurrentUser(data.usuario))
    }
    if (roll === "admin") {
      const { data } = await axios.get(`psiconection/usuario/acount/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${tokenObject}` // Agrega el token al encabezado de autorización
        }
      })
      console.log('dataaaa', data)
      return dispatch(loadCurrentUser(data.usuario))
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (piscologos.length === 0) {
        await dispatch(getPsicologos())
      }
      if (window.localStorage.getItem('authToken') !== null) {
        const tokenData = window.localStorage.getItem('authToken').split('.').at(1)
        console.log("Token del home: " + tokenData);
        const decodedData = JSON.parse(window.atob(tokenData))
        console.log(decodedData);
        loadUserById(decodedData.id, decodedData.roll)
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

  console.log(currentUser);

  return (
    <div className={style.home}>
      <div className={style.col1Home}>
        <Filters update={updateCurrentPage} />
      </div>
      <div className={style.col2Home}>
        <div className={style.search_conteinerHome}>
        <p>¡Comienza tu búsqueda ahora mismo!</p>

          <SearchBar update={updateCurrentPage}/>
        </div>
        <Pagination currentPage={currentPage} nextHandler={nextHandler}
        prevHandler={prevHandler} items={currentItems} />
        {/* <div className={style.welcomeMessage}>
                {/* <p className={style.p1}>Aquí podrás conectar con diferentes psicólogos, </p>
                <p className={style.p}>mejorar tu salud mental y tu vida.</p> 
            </div>*/}

        <CardsContainer items={currentItems} />
        <Pagination currentPage={currentPage} nextHandler={nextHandler}
          prevHandler={prevHandler} items={currentItems} />
      </div>

    </div>
  );
}
