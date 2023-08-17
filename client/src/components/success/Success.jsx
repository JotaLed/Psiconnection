import "./Success.css"
import { useLocation } from "react-router-dom";

function Success() {
    const location = useLocation();
    const psico = new URLSearchParams(location.search).get('idPsico');
    const user = new URLSearchParams(location.search).get('idUser');
    const fecha = new URLSearchParams(location.search).get('fecha');
    const hora = new URLSearchParams(location.search).get('hora');



    return (
        <div className="success-container">
            {!psico || !user | !fecha || !hora ?
                <div>
                    <h1>Ha ocurrido un error</h1>
                </div>
                : 
                <div className="container-message">
                    <img src={'https://www.pngkit.com/png/full/920-9209437_check-mark-black-outline-comments-check-logo.png'} className="logo-check" />
                    <h2>Cita reservada con éxito!</h2>
                    <h5>Psicologo: {psico}</h5>
                    <h5>Usuario: {user}</h5>
                    <h5>Fecha: {fecha}</h5>
                    <h5>Hora: {hora}</h5>
                </div> 
            }

        </div>
    )
}

export default Success;