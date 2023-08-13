import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import s from "./detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import Turnos from "../../components/turnos/Turnos";
import { loadDetail } from "../../Redux/actions";

const Detail = () => {
  const { detailID } = useParams();
  const psicology = useSelector((store) => store.psicoloDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llamada a la acción para cargar los detalles del psicólogo
    dispatch(loadDetail(detailID));
  }, [dispatch, detailID]); // Se agrega [dispatch, detailID] como dependencias del efecto

  // Función para capitalizar la primera letra
  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className={s.detail_conteiner}>
      <div className={s.detail}>
        <div className={s.view_psico}>{/* ...contenido del detalle... */}</div>
        <div className={s.turno_conteiner}>
          <h1>Pide tu turno!</h1>
          {psicology.nombre ? (
            <Turnos dias={psicology.dias} horas={psicology.horas} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Detail;
