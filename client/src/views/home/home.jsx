import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "../../components/filters/filters";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/searchBar/searchBar";
import { getPsicologos, loadCurrentUser, setOrders } from "../../Redux/actions";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import style from "../home/home.module.css";

export default function Home() {
  const { user, isAuthenticated } = useAuth0(); // Agregamos el hook de Auth0
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE = 6;
  const piscologos = useSelector((state) => state.psychologists);
  const [currentPage, setCurrentPage] = useState(0);

  const loadUserById = async (id) => {
    const { data } = await axios.get(`psiconection/usuario/acount/${id}`);
    await dispatch(loadCurrentUser(data.usuario));
    console.log(data.usuario);
  };

  useEffect(() => {
    async function fetchData() {
      if (piscologos.length === 0) {
        await dispatch(getPsicologos());
      }

      if (isAuthenticated) {
        // Si está autenticado con Auth0, carga el usuario
        const response = await axios.get(`/psiconection/get/users`);
        const usuarioRegistrado = response.data.find(
          (u) => u.email === user.email
        );
        console.log(usuarioRegistrado);
        await dispatch(loadCurrentUser(usuarioRegistrado.usuario));
      } else if (window.localStorage.getItem("authToken") !== null) {
        const tokenData = window.localStorage
          .getItem("authToken")
          .split(".")
          .at(1);
        console.log("Token del home: " + tokenData);
        const decodedData = JSON.parse(window.atob(tokenData));
        loadUserById(decodedData.id);
      }

      dispatch(setOrders("alf"));
    }

    fetchData();
  }, [isAuthenticated]); // Agregamos isAuthenticated como dependencia al useEffect

  const updateCurrentPage = () => {
    setCurrentPage(0);
  };

  const prevHandler = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const nextHandler = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(piscologos.length / ITEMS_PER_PAGE) - 1)
    );
  };

  const firstIndex = currentPage * ITEMS_PER_PAGE;
  const lastIndex = Math.min(firstIndex + ITEMS_PER_PAGE, piscologos.length);
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
        <Pagination
          currentPage={currentPage}
          nextHandler={nextHandler}
          prevHandler={prevHandler}
          items={currentItems}
        />
      </div>
    </div>
  );
}
