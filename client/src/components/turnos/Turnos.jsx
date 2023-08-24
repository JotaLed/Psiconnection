import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadDetail, getAppointment } from "../../Redux/actions";
import axios from "axios";
//IMportamos el calendario
import "react-calendar/dist/Calendar.css";
//importamos react calendar
import "../turnos/Turnoss.css";
import Calendar from "react-calendar";

import Paypal from "../paypal/paypal";

import logoMP from '../../imagenes/logoMP.png'
import logoPaypal from '../../imagenes/logoPaypal.png'

//! mercado pago
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { toast, ToastContainer } from "react-toastify";

export default function Turnos({ dias, horas }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const psicology = useSelector((store) => store.psicoloDetail);
  const appointments = useSelector((store) => store.appointments);
  const id = location.pathname.split("/").at(-1);
  const queryParam = new URLSearchParams(location.search).get("queryEjemplo");

  // //! mercadoPago y paypal
  const [preferenceId, setPreferenceId] = useState(null);
  // initMercadoPago("TEST-442f1db5-f1a8-4d3e-aad6-5dd4d161c61c");

  //! paypal
  const [paypalID, setPaypalID] = useState(null);

  //! TOken de sesion...
  const [tokenData, setTokenData] = useState(null);
  //useEffect que me trae los estados globales al montarse la página

  useEffect(() => {
    dispatch(loadDetail(id));
    dispatch(getAppointment());

    //! token
    let token = localStorage.getItem("authToken");
    console.log("tokennnn", token);

    if (token) {
      const tokenData = token.split(".").at(1);
      console.log("tokenData", tokenData);
      const decodedData = window.atob(tokenData);
      const jsonObject = JSON.parse(decodedData);
      setTokenData(jsonObject);
    }
  }, []);

  const psicoAppointmentsFound = appointments.filter(
    (a) => a.PsicologoId === psicology.id && a.estado === "activo"
  );

  const citas = psicoAppointmentsFound.map((c) => {
    return { fecha: c.fecha, horario: [c.hora] };
  });

  const citasPsico = [...citas];

  const disponibilidad = { dias: [...dias], horarios: [...horas] };

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

  const [buttonActive, setButtonActive] = useState({});
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
      hora: "",
    });
    let day = date.toDateString().split(" ")[0]; //Esto es las primeras 3 letras del dia de la semana
    if (!disponibilidad.dias.includes(day) || isPastDate(date)) {
      setFlagH(false);
      return alert("este dia no esta disponible");
    }
    //Seteamos el div con los horarios
    setFlagH(true);
    //Buscamos los horario de ese dia
    // let foundFecha = citas.map((cita) => console.log(cita.fecha))
    let foundFecha = citasPsico.filter(
      (cita) => cita.fecha == date.toLocaleDateString()
    );

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
    if (buttonActive[hora]) {
      console.log("Entra aca");
      setButtonActive({});
      setNewTurno({ ...newTurno, hora: "" });
      clearID();
    } else {
      setNewTurno({ ...newTurno, fecha: selectTurno.fecha, hora: hora });
      setButtonActive({ [hora]: true });
      clearID();
    }
  };

  console.log("Turno para elegir =>", newTurno);
  console.log(buttonActive);
  console.log(selectTurno);
  // console.log("Usuario actuacl =>"+);

  const turno = {
    idPsico: "6462cf98-c531-41b3-9586-1d1b9b38cef1",
    idUser: "4ad79818-65ab-4330-a3d9-87970d408790",
    fecha: "29/01/24",
    hora: "10-11",
    estado: "activo",
  };

  //! hacer el post de la cita
  const handleCheckoutClick = async () => {
    if (tokenData === null) {
      window.location.href = `${
        import.meta.env.VITE_URL_AXIOS_URL_FRONT
      }/loginUsuario`;
      return null
      // window.location.href = "http://localhost:5173/loginUsuario";
    }
    if(tokenData.roll === "psicologo"){
      
      
    }
    
    if (!newTurno.fecha || !newTurno.hora) {
      return null;
    }
    const reserva = {
      idPsico: id,
      idUser: tokenData.id,
      fecha: newTurno.fecha,
      hora: newTurno.hora,
      estado: "activo",
      tarifa: psicology.tarifa,
    };
    try {
      // mercadoPago
      // const response = await axios.post(
      //   `/psiconnection/payment/create-order`,
      //   reserva
      // );


      // !Paypal
      const { data } = await axios.post(
        `/pay/paymentOrder`,
        reserva
      );
      // const link = response.data.body.init_point
      // window.open(link, '_blank');
      // window.location.href = link
      console.log({ data: data });
      setPaypalID(data);
      return data;

    } catch (error) {
      console.log("salio mál");
    }
  };

  console.log(paypalID);

  const handleBuy = async () => {
    if(tokenData &&tokenData.roll === "psicologo"){
      toast.error("Debe ingresar con una cuenta de usuario")
      return null
    }
    const id = await handleCheckoutClick();
    if (id) {
      setPreferenceId(id);
    }
  };

  const clearID = () => {
    setPreferenceId(null);
    setPaypalID(null);
  };

  const handleBuyPaypal = async () => {
    if (paypalID.status === "CREATED") {
      const link = paypalID.links[1].href;
      console.log("link", link);
      // window.open(link, "_blank");
      window.location.href = link;
      clearID();
    }
  };
  // console.log(buttonActive);
  return (
    <div className="turnos">
      <Calendar
        onChange={OnChange}
        tileClassName={({ date }) => tileClassName(date)}
        align="start"
        locale="en-GB"
        showCompare={false}
      />

      {flagH === true ? (
        <div className="contenedor">
          <div className="info_turno">
            <div className="view-appointment-date">
              <p className="dia">Dia selecionado: {selectTurno.fecha}</p>
              <p className="hora">Hora selecionada: {newTurno.hora}</p>
              <p className="precio">Costo de consulta: {psicology.tarifa}$</p>
            </div>
          </div>
          <h3 className="horario">Horarios disponibles:</h3>

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
                      buttonActive[hora]  ? "validate_active" : "validate"
                    }
                  >
                    <label onClick={() => addTurno(hora)}>{hora}</label>
                  </div>
                );
            })}
          </div>

          <div
            onClick={handleBuy}
            className={
              !newTurno.hora || !buttonActive  ? "no_pedir_turno" : "pedir_turno"
            }
          >
            <span className="emoji">📅</span>
            <span className="text">Pedir turno</span>
          </div>
          {/* {preferenceId && (
            <Wallet
              initialization={{ preferenceId, redirectMode: "blank" }}
              onClick={() => {
                clearID;
              }}
            />
          )} */}
          {paypalID && <Paypal handleBuyPaypal={handleBuyPaypal} />}
        </div>
      ) : (
        <div>
          Seleccione un dia en el calendario para consultar sus horarios
        </div>
      )}
      {/* <ToastContainer position="bottom-right" autoClose={3000}/> */}
    </div>
  );
}
