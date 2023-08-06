import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../Redux/actions";
import style from "./filters.module.css";
import Orders from "../orders/orders";
import './filters.module.css'


const Filters = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        genero: "all",
        pais: "all",
        horario: "all",
        especializacion: "all",
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters({ ...filters, [name]: value });
    };

    // Función para controlar filtros
    const handleFilters = () => {
        dispatch(setFilter(filters));
    };

    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    return (

        <div className={style.container}>

            <label className={style.label}>Especialización</label>
            <div className={style.selectContainer}>
                <select
                    className={style.select}
                    name="especializacion"
                    value={filters.especializacion}
                    onChange={handleFilterChange}
                >
                    <option value="all">ALL</option>
                    <option value={"terapia familiar"}>Terapia familiar</option>
                    <option value={"terapia de pareja"}>Terapia de pareja</option>
                    <option value={"terapia psicoanalitica"}>
                        Terapia psicoanalitica
                    </option>
                </select>
            </div>

            <label className={style.label}>Horario</label>
            <div className={style.selectContainer}>
                <select
                    className={style.select}
                    name="horario"
                    value={filters.horario}
                    onChange={handleFilterChange}
                >
                    <option value="all">ALL</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>

            <label className={style.label}>Género</label>
            <div className={style.selectContainer}>
                <select
                    className={style.select}
                    name="genero"
                    value={filters.gender}
                    onChange={handleFilterChange}
                >
                    <option value="all">ALL</option>
                    <option value="female">FEMALE</option>
                    <option value="male">MALE</option>
                </select>
            </div>

            <label className={style.label}>País</label>
            <div className={style.selectContainer}>
                <select
                    className={style.select}
                    name="pais"
                    value={filters.country}
                    onChange={handleFilterChange}
                >
                    <option value="all">ALL</option>
                    <option value="colombia">COLOMBIA</option>
                    <option value="argentina">ARGENTINA</option>
                    <option value="venezuela">VENEZUELA</option>
                    <option value="mexico">MEXICO</option>
                </select>
            </div>
        
            <button className={style.btn} onClick={handleFilters}>
                FILTRAR
            </button>
            <Orders/>
        </div>
    );
};

export default Filters;
