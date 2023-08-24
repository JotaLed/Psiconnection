import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointment } from "../../Redux/actions";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraficoReservas = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAppointment());
  }, []);

  useEffect(() => {
    // Cuenta la cantidad de reservas que aparece cada mes
    let countAppointments = {};

    for (let i = 1; i < appointments.length; i++) {
      let dateParts = appointments[i].fecha.split("/");
      let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      let date = new Date(formattedDate);

      if (isNaN(date)) {
        console.log(`Invalid date at index ${i}: ${appointments[i].fecha}`);
      }
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let monthYear = `${month}-${year}`;

      if (!countAppointments[monthYear]) {
        countAppointments[monthYear] = 0;
      }

      countAppointments[monthYear]++;
    }

    // Reformatea la cuenta de las reservas para el gráfico.
    let chartData = [];

    for (let monthYear in countAppointments) {
      chartData.push({
        monthYear: monthYear,
        count: countAppointments[monthYear],
      });
    }

    setData(chartData);
  }, [appointments]);

  return (
    <div>
      <p>Reservas por mes</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoReservas;
