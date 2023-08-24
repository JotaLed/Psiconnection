import { useLoading } from '../../Redux/hooks/hooks'
import { useDispatch, useSelector } from 'react-redux';
import { getPsicologos } from '../../Redux/actions'
import Card from "../cards/Card"
import style from "./CardsContainer.module.css"

const CardsContainer = ({ items }) => {
    // Hook para manejar la pantalla de carga
    const dispatch = useDispatch()
    const loading = useLoading(dispatch, getPsicologos);

    const psicologos = useSelector(state => state.psychologists);
    if (!Array.isArray(psicologos)) {
        return <div>No hay Psicólogos disponibles</div>
    }
    return (
        <div className={style.mainContainer}>
            {loading ? (
                // Muestra un spinner de carga si el estado "loading" es verdadero
                <span className={style.loader}></span>
            ) : (
                <div className={style.container}>
                    {items.map((psicologo) => {
                        return <Card key={psicologo.id}
                            id={psicologo.id}
                            nombre={psicologo.nombre}
                            apellido={psicologo.apellido}
                            imagen={psicologo.foto}
                            valoracion={psicologo.valoracion}
                            tarifa={psicologo.tarifa}
                            pais={psicologo.pais}
                        />
                    })}
                </div>
            )}
        </div>
    )
}
export default CardsContainer;