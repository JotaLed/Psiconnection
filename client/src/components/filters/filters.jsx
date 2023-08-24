import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../Redux/actions";
import style from "./filters.module.css";
import Orders from "../orders/orders";
import './filters.module.css'


const Filters = (props) => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        genero: "all",
        pais: "all",
        horario: "all",
        especialidad: "all",
    });

    
    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        setFilters({ ...filters, [name]: value });
    };

    // Función para controlar filtros
    const handleFilters = () => {
        dispatch(setFilter(filters));
        props.update()

    };

    const [isExpanded, setExpanded] = useState(false);

    const toggleExpand = () => {
      setExpanded(!isExpanded);
    };
  
    return (  
        <div className={style.container}>
            <label className={style.label}>Especialización</label>
            <div className={style.selectContainer}>
                <select
                    className={style.select}
                    name="especialidad"
                    value={filters.especializacion}
                    onChange={handleFilterChange}
                >
                    <option value="all">TODOS</option>
                    <option value={"Psicología cognitivo-conductual"}>Terapia conductual</option>
                    <option value={"Psicología de pareja"}>Terapia de pareja</option>
                    <option value={"Psicoanalisis"}>Terapia psicoanalitica</option>
                    <option value={"Psicología infantil"}>Terapia infatil</option>
                    <option value={"Sexología"}>Sexologia</option>
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
                    <option value="all">TODOS</option>
                    <option value="femenino">FEMENINO</option>
                    <option value="masculino">MASCULINO</option>
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
                    <option value="all">TODOS</option>
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
