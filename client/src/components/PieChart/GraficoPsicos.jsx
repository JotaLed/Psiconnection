import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPsicologos } from "../../Redux/actions";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GraficoPsicos = () => {
  const dispatch = useDispatch();
  const psychologists = useSelector((state) => state.psychologists);

  useEffect(() => {
    dispatch(getPsicologos());
  }, []);

  const data = psychologists.map((psychologist) => ({
    name: psychologist.name,
    value: psychologist.especialidad.length,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficoPsicos;
