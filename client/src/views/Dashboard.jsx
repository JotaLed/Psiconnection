import React from "react";
import GraficoPsicos from "../components/Graficos/GraficoPsicos";
import GraficoReservas from "../components/Graficos/GraficoReservas";

const Dashboard = () => {
  return (
    <div>
      <GraficoPsicos />
      <GraficoReservas />
    </div>
  );
};

export default Dashboard;
