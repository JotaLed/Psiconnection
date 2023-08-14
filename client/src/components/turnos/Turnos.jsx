import React, { useEffect, useState } from 'react'
import axios from 'axios'
//IMportamos el calendario 
import 'react-calendar/dist/Calendar.css';
//importamos react calendar 
import "../turnos/Turnoss.css"
import Calendar from 'react-calendar'



export default function Turnos() {
    //arreglo de citas de psicologos harcode 
    const disponibilidad = { dias: ["Thu", "Wed", "Fri"], horarios: ["17-18", "15-16"] }

    const horasPosibles = ["06-07", "07-08", "08-09", "09-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "17-18", "18-19", "20-21"]
    const citas = [
        { fecha: "14/8/2023", horario: ["17-18"] },//Necesitp comparar que el date no coincida con la fecha y 
        { fecha: "15/8/2023", horario: ["12-13"] },
        { fecha: "19/8/2023", horario: ["12-13"] },
        { fecha: "14/8/2023", horario: ["20-21"] },
    ]

    //estados locales 
    const [date, setDate] = useState(new Date());
    const [flagH, setFlagH] = useState(false) //Aca vamos a setear los horarios que vegengan del psicologo 
    const [selectTurno, setSelectTurno] = useState(
        {
            fecha: "",
            horas: []

        }
    )
    const [newTurno, setNewTurno] = useState(
        {
            fecha: "",
            hora: ""

        }
    )
    const [buttonActive, setButtonActive] = useState({
        "Estado para los buttons":false
    })
    //useEffect
    useEffect(() => {
        console.log(date);

    }, [])



    //funciones
    const isValidate = (date) => {
        return !disponibilidad.dias.includes(date.toDateString().split(" ")[0]);
    };
    const isPastDate = (date) => {
        const today = new Date();
        return date < today;
    };
    const tileClassName = (date) => {
        let className = ""
        if (isValidate(date) || isPastDate(date)) {
            className = 'unvalidate-day'
            return className
        }
        className = "validate-day"
        return className
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
        let foundFecha = citas.filter((cita) => cita.fecha == date.toLocaleDateString())


        //Preguntamos si existen fechas con horaios tomados 
        if (foundFecha.length) {

            //preguntamos is la fache tiene mas de una horario ocupado 
            if (foundFecha.length > 1) {
                let hours = []
                foundFecha.forEach((c) => {
                    hours = [...hours, ...c.horario]
                })
                setSelectTurno({ ...selectTurno, fecha: foundFecha[0].fecha, horas: hours })
            }
            else {
                setSelectTurno({ ...selectTurno, fecha: foundFecha[0].fecha, horas: foundFecha[0].horario })

            }
        }
        else {
            setSelectTurno({ ...selectTurno, fecha: date.toLocaleDateString(), horas: [] })
        }
        console.log(selectTurno);

    }
    const addTurno = (hora) => {
        setNewTurno({ ...newTurno, fecha: selectTurno.fecha, hora: hora })
        setButtonActive({[hora]:true})
    }

    console.log(newTurno);
    // console.log(date.toDateString().split(" ")[0]);
    console.log(buttonActive);

    const handleCheckoutClick = async () => {
        const response = await axios.post(`http://localhost:3001/psiconnection/payment/create-order`)
        const link = response.data.body.init_point
        console.log(response.data.body.init_point)
        window.location.href = link
    }

    return (
        <div className='turnos'>
            <Calendar
                onChange={OnChange}
                tileClassName={({ date }) => tileClassName(date)}
                align="start"
                locale="en-GB"
                showCompare={false}/>

            {flagH === true ?<div className='contenedor'>
                    <h3 className='horario'>Selecione su horario:</h3>
                    <div className='horas_conteiner'>
                        {horasPosibles.map((hora, index) => {
                            if (selectTurno.horas.includes(hora)) {
                                return (
                                    <div key={index} className="unvalidate">
                                        <label>{hora}</label>
                                    </div>
                                )
                            }
                            else
                                return (
                                    <div key={index} className={buttonActive[hora] ? "validate_active" : "validate"}>
                                        <label onClick={() => addTurno(hora)}>{hora}</label>
                                    </div>
                                )
                        })}
                    </div>
                    
                    <button id="checkout" onClick={handleCheckoutClick} target="_blank" rel="noreferrer">
                        <div className="pedir_turno"
                             id='ckeckout'>
                                <p>📅</p>
                                <p>Pedir turno</p>
                        </div>
                    </button>
                </div>
                : <div>
                    Seleccione un dia en el calendario para consultar sus horarios
                </div>
            }
        
        </div>
    )
}
