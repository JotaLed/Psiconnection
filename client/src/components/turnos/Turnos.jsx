import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css';
import './App.css'
//importamos react calendar 
import Calendar from 'react-calendar'
// /,Estos son los horarios posibles 
//   , 12 - 13
//   , 13 - 14
//   , 14 - 15
//   , 15 - 16
//   , 17 - 18
//   , 18 - 19
//   , 20 - 21

//   , /
export default function Turnos() {
    //arreglo de citas de psicologos harcode 
    const disponibilidad = { dias: ["lunes", "miercoles", "viernes"], horarios: ["17-18", "15-16"] }

    const horasPosibles = ["12-13", "13-14", "14-15", "15-16", "17-18", "18-19", "20-21"]
    const citas = [
        { fecha: "12/8/2023", horario: ["17-18"] },//Necesitp comparar que el date no coincida con la fecha y 
        { fecha: "15/8/2023", horario: ["12-13"] },
        { fecha: "19/8/2023", horario: ["12-13"] },
        { fecha: "19/8/2023", horario: ["20-21"] },
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



    //funciones
    const OnChange = (date) => {
        //Steamos el estado del date
        setDate(date);
        //Seteamos el div con los horarios
        setFlagH(true)

        //reiniciamos el estado de envio del turno 
        setNewTurno({
            fecha: "",
            hora: ""
        })

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
        console.log(hora);
        setNewTurno({ ...newTurno, fecha: selectTurno.fecha, hora: hora })

    }

    console.log(newTurno);

    return (
        <div>
            <Calendar
                onChange={OnChange}
                initialDateFrom="2023-01-01"
                initialDateTo="2023-12-31"
                align="start"
                locale="en-GB"
                showCompare={false}
            />
            {flagH === true &&
                <div>
                    {horasPosibles.map((hora, index) => {
                        if (selectTurno.horas.includes(hora)) {
                            return (
                                <div key={index} className="unvalidate">
                                    <p>{hora}</p>
                                </div>
                            )
                        }
                        else
                            return (
                                <div key={index} className="validate">
                                    <p onClick={() => addTurno(hora)}>{hora}</p>
                                </div>
                            )
                    })}
                </div>}
        </div>
    )
}