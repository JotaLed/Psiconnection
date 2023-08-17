import axios from 'axios'
import React, { useEffect, useState } from 'react'
//IMportamos el calendario 
import 'react-calendar/dist/Calendar.css';
//importamos react calendar 
import "../turnos/Turnoss.css"
import Calendar from 'react-calendar'
import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux"
import { loadDetail, getAppointment } from '../../Redux/actions';

export default function Turnos({ dias, horas }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const psicology = useSelector((store) => store.psicoloDetail)
  const appointments = useSelector((store) => store.appointments);
  const id = location.pathname.split('/').at(-1);
  const queryParam = new URLSearchParams(location.search).get('queryEjemplo');
    //! TOken de sesion...
     const [tokenData, setTokenData] = useState(null)

  //useEffect que me trae los estados globales al montarse la página
  useEffect(() => {
    dispatch(loadDetail(id));
    dispatch(getAppointment());
    //! token 
    let token = localStorage.getItem('authToken');
    console.log("tokennnn", token)
    
    if(token){
      const tokenData = token.split('.').at(1)
      console.log("tokenData", tokenData)
      const decodedData = window.atob(tokenData)
      const jsonObject = JSON.parse(decodedData);
      setTokenData(jsonObject)
    }
  
   
    console.log(queryParam);
    
  }, [])
  console.log("tokenData", tokenData)


  const psicoAppointmentsFound = appointments.filter((a) => a.PsicologoId === psicology.id && a.estado === "activo");



  const citas = psicoAppointmentsFound.map((c) => {
    return { fecha: c.fecha, horario: [c.hora] }
  })

  const citasPsico = [...citas];

  const disponibilidad = { dias: [...dias], horarios: [...horas] }


  //estados locales
  const [date, setDate] = useState(new Date());
  const [flagH, setFlagH] = useState(false); //Aca vamos a setear los horarios que vegengan del psicologo
  const [selectTurno, setSelectTurno] = useState({
    fecha: "",
    horas: [],
  });
  const [newTurno, setNewTurno] = useState({
    fecha: "",
    hora: "",
  });


  const [buttonActive, setButtonActive] = useState({
    "Estado para los buttons": false,
  });
  //useEffect
  // useEffect(() => {
  //   console.log(date);
  // }, []);

  //funciones
  const isValidate = (date) => {
    return !disponibilidad.dias.includes(date.toDateString().split(" ")[0]);
  };
  const isPastDate = (date) => {
    const today = new Date();
    return date < today;
  };
  const tileClassName = (date) => {
    let className = "";
    if (isValidate(date) || isPastDate(date)) {
      className = "unvalidate-day";
      return className;
    }
    className = "validate-day";
    return className;
  };
  const OnChange = (date) => {
    //Steamos el estado del date
    setDate(date);

    //reiniciamos el estado de envio del turno 
    setNewTurno({
      fecha: "",
      hora: ""
    })
    let day = date.toDateString().split(" ")[0] //Esto es las primeras 3 letras del dia de la semana
    if (!disponibilidad.dias.includes(day) || isPastDate(date)) {
      setFlagH(false)
      return alert("este dia no esta disponible")
    }
    //Seteamos el div con los horarios
    setFlagH(true)
    //Buscamos los horario de ese dia 
    // let foundFecha = citas.map((cita) => console.log(cita.fecha))
    let foundFecha = citasPsico.filter((cita) => cita.fecha == date.toLocaleDateString())



    //Preguntamos si existen fechas con horaios tomados
    if (foundFecha.length) {
      //preguntamos is la fache tiene mas de una horario ocupado
      if (foundFecha.length > 1) {
        let hours = [];
        foundFecha.forEach((c) => {
          hours = [...hours, ...c.horario];
        });
        setSelectTurno({
          ...selectTurno,
          fecha: foundFecha[0].fecha,
          horas: hours,
        });
      } else {
        setSelectTurno({
          ...selectTurno,
          fecha: foundFecha[0].fecha,
          horas: foundFecha[0].horario,
        });
      }
    } else {
      setSelectTurno({
        ...selectTurno,
        fecha: date.toLocaleDateString(),
        horas: [],
      });
    }
    console.log(selectTurno);
  };

  const addTurno = (hora) => {
    setNewTurno({ ...newTurno, fecha: selectTurno.fecha, hora: hora });
    setButtonActive({ [hora]: true });
  };

  console.log('Turno para elegir =>', newTurno);
  console.log(buttonActive);
  console.log(selectTurno);


  
 
  //! hacer el post de la cita
  const handleCheckoutClick = async () => {
    if (!newTurno.fecha || !newTurno.hora) {
      return null;
    }
    else {

      const data = {
            idPsico: id ,
            idUser: tokenData.id,
            fecha: newTurno.fecha,
            hora: newTurno.hora,
            estado: "activo",
            tarifa: psicology.tarifa
      }
      console.log(`obj`, obj)
      try {
        const response = await axios.post(`psiconnection/payment/create-order`, data )
        const link = response.data.body.init_point
        console.log(link);
        window.location.href = link
      } catch (error) {
        console.log("salio mál")
      }
    }
  }

  return (
    <div className="turnos">
      <Calendar
        onChange={OnChange}
        tileClassName={({ date }) => tileClassName(date)}
        align="start"
        locale="en-GB"
        showCompare={false}
      />

      <div className='view-appointment-date'>
        <p className="dia">Dia selecionado: {selectTurno.fecha}</p>
        <p className='hora'>Hora seleccionada: {newTurno.hora}</p>
        <p className="precio">Precio del turno: {psicology.tarifa}$</p>
      </div>

      {flagH === true ? (
        <div className="contenedor">
          <h3 className="horario">Selecione su horario:</h3>
          <div className="info_turno">
            {/* <p className="dia">Dia selecionado: {selectTurno.fecha}</p>
            <p className='hora'>Hora seleccionada: {newTurno.hora}</p>
            <p className="precio">Precio del turno: {psicology.tarifa}$</p> */}
          </div>
          <div className="horas_conteiner">
            {disponibilidad.horarios.map((hora, index) => {
              if (selectTurno.horas.includes(hora)) {
                return (
                  <div key={index} className="unvalidate">
                    <label>{hora}</label>
                  </div>
                );
              } else
                return (
                  <div
                    key={index}
                    className={
                      buttonActive[hora] ? "validate_active" : "validate"
                    }
                  >
                    <label onClick={() => addTurno(hora)}>{hora}</label>
                  </div>
                );
            })}
          </div>

          <div onClick={handleCheckoutClick} className={!newTurno.fecha || !newTurno.hora ? "no_pedir_turno" : "pedir_turno"}>
            <p>📅</p>
            <p>Pedir turno</p>
          </div>
        </div>
      ) : (
        <div>
          Seleccione un dia en el calendario para consultar sus horarios
        </div>
      )}
    </div>
  );
}
