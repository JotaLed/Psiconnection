import "./Success.css"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { loadDetail, getDetailClient  } from '../../Redux/actions'
import { useNavigate } from "react-router-dom";

//! font awesome 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons"

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

    const dispatch = useDispatch();

    const psicologo = useSelector( (store) => store.psicoloDetail )
    const {usuario} = useSelector((store) => store.cliente)

    const navigate = useNavigate();

    console.log('psicologo', psicologo)
    console.log('paciente', usuario)

    useEffect(()=> {
        
        const queryParamData = new URLSearchParams(location.search).get('data');
        // const queryParamStatus = new URLSearchParams(location.search).get('status');
        let decodedData = window.atob(queryParamData)
        const objeto = JSON.parse(decodedData);
        
        setReserva({
            ...reserva,
            psico: objeto.idPsico,
            user: objeto.idUser,
            fecha: objeto.fecha,
            hora: objeto.hora,
            estado: objeto.estado,
            tarifa: objeto.tarifa,
        })
        dispatch(loadDetail(objeto.idPsico))
        dispatch(getDetailClient(objeto.idUser))

    
    }, [!reserva])


    const redirectToHome = () => {
        navigate("/home")
    }


    return (
        <div className="success-container">
            {!reserva.psico || !reserva.user | !reserva.fecha || !reserva.hora ?
                <div>
                    <h1>Ha ocurrido un error</h1>
                </div>
                : 
                <div className="container-message">
                    <div className="title-success">
                    <div className="logo-success">
                    <FontAwesomeIcon icon={faCalendarCheck} size="2xl" />
                    </div>
                     <h1>Su pago se ha completado con correctamente</h1>
                    </div>
                    {/* <img src={'https://www.pngkit.com/png/full/920-9209437_check-mark-black-outline-comments-check-logo.png'} className="logo-check" /> */}
                    <h2>Cita reservada con éxito!</h2>
                    <h5>Psicologo</h5>
                    <p> {psicologo?.nombre} {psicologo.apellido}</p>
                    <h5>Cliente:</h5>
                    <p>{usuario?.nombre} {usuario?.apellido}</p>
                    <h2> Detalles de la cita </h2>
                    <h5>Fecha: {reserva?.fecha}</h5>
                    <h5>Hora: {reserva?.hora}</h5>
                    <button className="boton-success" onClick={redirectToHome}>Regresa a casa </button>
                </div> 
            }

           

        </div>
    )
}

export default Success;