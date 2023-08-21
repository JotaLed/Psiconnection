import "./Success.css"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

function Success() {
    const location = useLocation();
    const [reserva, setReserva] = useState({
        psico: '',
        user: '',
        fecha: '',
        hora: '',
        estado: '',
        tarifa: '',
        status: ''
    })
    
    // const psico = new URLSearchParams(location.search).get('idPsico');
    // const user = new URLSearchParams(location.search).get('idUser');
    // const fecha = new URLSearchParams(location.search).get('fecha');
    // const hora = new URLSearchParams(location.search).get('hora');
  
    // console.log('data', queryParamData)
    // console.log('status', queryParamStatus)
    // if(queryParamData){
    //     let decodedData = window.atob(queryParamData)
    //     const objeto = JSON.parse(decodedData);
    //     console.log("decodedData", decodedData)
    //     console.log('objeto', objeto)
    //     setReserva({
    //         psico: objeto.id ,
    //         user: objeto.id,
    //         fecha: objeto.fecha,
    //         hora: objeto.hora,
    //         estado: "activo",
    //         tarifa: objeto.tarifa
    //     })
    // }

    useEffect(()=> {
        const queryParamData = new URLSearchParams(location.search).get('data');
        // const queryParamStatus = new URLSearchParams(location.search).get('status');
        let decodedData = window.atob(queryParamData)
        const objeto = JSON.parse(decodedData);
        console.log("decodedData", decodedData)
        console.log('objeto', objeto)
        console.log('psico', objeto.idPsico)
        setReserva({
            ...reserva,
            psico: objeto.idPsico,
            user: objeto.idUser,
            fecha: objeto.fecha,
            hora: objeto.hora,
            estado: objeto.estado,
            tarifa: objeto.tarifa,
        })
        console.log('reserva', reserva)
        // return setReserva({})
    }, [!reserva.estado])


    

    

//     data = {
//         idPsico: id ,
//         idUser: tokenData.id,
//         fecha: newTurno.fecha,
//         hora: newTurno.hora,
//         estado: "activo",
//         tarifa: psicology.tarifa
//   }

    return (
        <div className="success-container">
            {!reserva.psico || !reserva.user | !reserva.fecha || !reserva.hora ?
                <div>
                    <h1>Ha ocurrido un error</h1>
                </div>
                : 
                <div className="container-message">
                     <h1>Exitoso</h1>
                    <img src={'https://www.pngkit.com/png/full/920-9209437_check-mark-black-outline-comments-check-logo.png'} className="logo-check" />
                    <h2>Cita reservada con éxito!</h2>
                    <h5>Psicologo: {reserva?.psico}</h5>
                    <h5>Usuario: {reserva?.user}</h5>
                    <h5>Fecha: {reserva?.fecha}</h5>
                    <h5>Hora: {reserva?.hora}</h5>
                </div> 
            }

           

        </div>
    )
}

export default Success;