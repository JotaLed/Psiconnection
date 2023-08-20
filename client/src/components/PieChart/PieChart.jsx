import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPsicologos } from "../../Redux/actions";
import { ResponsiveContainer } from "recharts";

const PieChart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPsicologos());
  }, []);

  const psychologists = useSelector((state) => state.psychologists);

  const data = [
    //conjunto de objetos clave-valor
    {
      clave: "clave",
      valor: "valor",
    },
  ];
  return <ResponsiveContainer></ResponsiveContainer>;
};

export default PieChart;
