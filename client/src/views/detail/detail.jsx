import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import s from "./detail.module.css"


//importamos los hooks para el estado global dd
import { useSelector, useDispatch } from "react-redux"

//importamos componenetes 
import Turnos from "../../components/turnos/Turnos";

//importamos las actions
import { loadDetail } from "../../Redux/actions";

const Detail = () => {
    //Estados locales 
    const { detailID } = useParams();
    //Estados globales 
    const psicology = useSelector((store) => store.psicoloDetail)
    const dispatch = useDispatch()
    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await dispatch(loadDetail(detailID))
        }
        aux()
        return 
        console.log(psicology);
    }, [])
    //funciones 

    console.log(detailID);
    console.log(psicology);
    console.log(psicology.imagen);
    return (
        <div className={s.detail_conteiner}>
            <div className={s.detail}>
                <div className={s.view_psico}>
                    <div className={s.row1}>
                        <div className={s.foto_conteiner}>
                            <img src={psicology.foto} />
                        </div>
                        <div className={s.info_psyco}>
                            <h1 className={s.name}>{psicology.nombre}</h1>
                            <h2 className={s.especialidades}>Especialidades:</h2>
                            {psicology.especialidad?.map((espe, index) => {

                                return (
                                    <p key={index} className={s.especialidad}>#{espe} <br></br></p>
                                )
                            })}
                            <h2 className={s.time}>Cuenta creada el 03/08/23</h2>
                            <div className={s.contactar}>
                                <p>📱</p>
                                <p>Contanctar</p>
                            </div>
                        </div>
                    </div>
                    <div className={s.row2}>
                        <label className={s.label}>Datos del psicologo:</label>
                        <div className={s.info}>
                            <p>Fecha de nacimiento:<span className={s.negrita}>{psicology.fecha_nacimiento}</span></p>
                            <p>Pais de origen: <span className={s.negrita}>{psicology.pais}</span></p>
                            <p>Genero: <span className={s.negrita}>{psicology.genero}</span></p>
                        </div>
                    </div>
                    <div className={s.row3}>
                        <label className={s.label}>Descripción:</label>
                        <div className={s.descripcion}>
                            {psicology.descripcion}
                        </div>
                    </div>
                </div>
                <div className={s.turno_conteiner}>
                    <h1>Pide tu turno!</h1>
                    {psicology.nombre? <Turnos
                        dias={psicology.dias}
                        horas={psicology.horas}
                    />: null}

                </div>
            </div>
        </div>
    )
}

export default Detail;