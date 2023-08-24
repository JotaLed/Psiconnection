import React from "react";
import GraficoPsicos from "../components/Graficos/GraficoPsicos";
import GraficoReservas from "../components/Graficos/GraficoReservas";
import s from "../views/Dashboard.module.css"


const Dashboard = () => {
  return (
    <div className={s.graficos_conteiner}>
      <GraficoPsicos />
      <GraficoReservas />
    </div>
  );
};

export default Dashboard;
