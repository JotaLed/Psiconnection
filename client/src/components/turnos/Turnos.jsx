import React, { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css';
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
    const disponibilidad = { dias: ["Mon", "Wed", "Fri"], horarios: ["17-18", "15-16"] }

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
            className = 'weekend-day'
            return className
        }
        return null
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
        console.log(hora);
        setNewTurno({ ...newTurno, fecha: selectTurno.fecha, hora: hora })

    }

    console.log(newTurno);
    console.log(date.toDateString().split(" ")[0]);

    return (
        <div>
            <Calendar
                onChange={OnChange}
                tileClassName={({ date }) => tileClassName(date)}
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