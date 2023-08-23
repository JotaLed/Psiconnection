//importamos el estilo s
// import s from "../landing/landing.module.css"
import '../landing/landing.css'
//importamos componentes 
import Carousel from "../../components/carrusel/Carrusel"
import '../../components/carrusel/Carrusel.module.css';
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Landing() {
    return (
        <div className="landing">
            <div >
                <Carousel>
                </Carousel>
            </div> 
            <Link className="button" to="/home">
                <button className="button2">INGRESA AQUÍ</button>
            </Link>
    
        </div>
      )
    }
{/* <div className={s.col2}>
        {/* <img src={logo} alt="" /> */}
        {/* <img src={logoPsiconnetion} alt="" /> */}
        {/* <h1 className={s.title_landing}>¡Bienevenido a Psicconection!.</h1> */}
        {/* <p className={s.description_landing}>
            Conéctate con psicólogos de alta calidad y servicio excepcional. Charla, consulta y cuida tu bienestar mental aquí
        </p> */}
    {/* </div>  */}