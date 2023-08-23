import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPsicologos } from "../../Redux/actions";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useState } from "react";

const GraficoPsicos = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector((state) => state.psychologists);

  useEffect(() => {
    dispatch(getPsicologos());
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    // Cuenta la cantidad de veces que aparece cada especialidad
    let countEspecialidades = {};

    for (let i = 0; i < psychologists.length; i++) {
      for (let j = 0; j < psychologists[i].especialidad.length; j++) {
        let especialidad = psychologists[i].especialidad[j];

        if (!countEspecialidades[especialidad]) {
          countEspecialidades[especialidad] = 0;
        }

        countEspecialidades[especialidad]++;
      }
    }

    // Reformatea la cuenta de las especialidades para el gráfico.
    let chartData = [];

    for (let especialidad in countEspecialidades) {
      chartData.push({
        name: especialidad,
        value: countEspecialidades[especialidad],
      });
    }

    setData(chartData);
  }, [psychologists]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

  return (
    <div>
      <p>Psicólogos por especialidad</p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={(entry) => entry.name}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoPsicos;
