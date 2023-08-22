import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import Turnos from "../../components/turnos/Turnos";
import { loadDetail } from "../../Redux/actions";

const Detail = () => {
  const { detailID } = useParams();
  const psicology = useSelector((store) => store.psicoloDetail);
  const dispatch = useDispatch();
  // Con este estado se controla la carga 
  
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    setIsLoading(true); // Comienza la carga
    dispatch(loadDetail(detailID)).then(() => {
      setIsLoading(false); // Finaliza la carga
    });
  }, [dispatch, detailID]); 
  // useEffect(() => {
   
  //   // Llamada a la acción para cargar los detalles del psicólogo
  //   dispatch(loadDetail(detailID)); 
  // }, [dispatch, detailID]); // Se agrega [dispatch, detailID] como dependencias del efecto

  // Función para capitalizar la primera letra
  function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <div className={s.detail_conteiner}>
      <div className={s.detail}>
      {/* {isLoading ? (
          <div className={s.loader}>
            Cargando...
          </div>
        ) : ( */}
        <div className={s.view_psico}>
          <div className={s.row1}>
            <div className={s.foto_conteiner}>
              <img src={psicology.foto} />
            </div>
            <div className={s.info_psyco}>
              <h1 className={s.name}>
                {psicology.nombre
                  ? capitalizeFirstLetter(psicology.nombre + " " + psicology.apellido)
                  : ""}
              </h1>
              <h2 className={s.especialidades}>Especialidades:</h2>
              {psicology.especialidad?.map((espe, index) => {
                return (
                  <p key={index} className={s.especialidad}>
                    ◉{espe}<br></br>
                  </p>
                );
              })}
              <h2 className={s.time}>Cuenta creada el {psicology.fecha_registro?.split("T")[0]}</h2>
              <div className={s.contactar}>
                <span className={s.emoji}>📱</span>
                <span className={s.text}>Contactar</span>
              </div>
            </div>
          </div>
          <div className={s.row2}>
            <label className={s.label}>Datos del psicologo:</label>
            <div className={s.info}>
              <p>
                Fecha de nacimiento:{" "}
                <span className={s.negrita}>{psicology.fecha_nacimiento}</span>
              </p>
              <p>
                Pais de origen:{" "}
                <span className={s.negrita}>{psicology.pais}</span>
              </p>
              <p>
                Genero: <span className={s.negrita}>{psicology.genero}</span>
              </p>
            </div>
          </div>
          <div className={s.row3}>
            <label className={s.label}>Descripción:</label>
            <div><p className={s.descripcion}>{psicology.descripcion}</p></div>
          </div>
        </div>
        {/* )} */}
        <div className={s.turno_conteiner}>
          <h1>Pedir Turno</h1>
          {psicology.nombre ? (
            <Turnos dias={psicology.dias} horas={psicology.horas} />
          ) : null}
      
        </div>
      </div>
    </div>
  );
};

export default Detail;
