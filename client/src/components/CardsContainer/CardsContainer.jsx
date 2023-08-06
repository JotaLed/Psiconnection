import { useSelector } from "react-redux"
import Card from "../cards/Card"
import style from "./CardsContainer.module.css"

const CardsContainer = ({ items }) => {
    const psicologos = useSelector(state => state.psychologists);
    if (!Array.isArray(psicologos)) {
        return <div>No hay recetas disponibles</div>
    }



    return (
        <div className={style.mainContainer}>
            <div className={style.container}>
                {console.log(psicologos)}
                {items.map((psicologo) => {
                    return <Card key={psicologo.id}
                        id={psicologo.id}
                        nombre={psicologo.nombre}
                        imagen={psicologo.imagen}
                        valoracion={psicologo.valoracion}
                        tarifa={psicologo.tarifa}
                        pais={psicologo.pais}
                    />
                })}
            </div>
        </div>


    )
}

export default CardsContainer;