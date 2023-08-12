//importamos el logo
import logo from "../../Images/Screenshot_7.jpg"
//importamos el estilo 
import s from "../landing/landing.module.css"
//importamos componentes 
import Carrusul from "../../components/carrusel/Carrusel"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Landing() {
    return (
        <div className={s.landing}>
            <div className={s.col1}>
                <Carrusul></Carrusul>
            </div> 
            <div className={s.col2}>
                <h1 className={s.title_landing}>¡Bienevenido a Psicconection!.</h1>
                <p className={s.description_landing}>
                    Conéctate con psicólogos de alta calidad y servicio excepcional. Charla, consulta y cuida tu bienestar mental aquí
                </p>

                <Link to="/home">
                    <button>GET IN</button>
                </Link>
            </div>
        </div>
    )
}