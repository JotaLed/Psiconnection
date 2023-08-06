import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import s from "./detail.module.css"
//importamos los hooks para el estado global dd
import { useSelector } from "react-redux"

const Detail = () => {
    //Estados locales 
    const { detailID } = useParams();
    const [psicologo, setPiscologo] = useState({})
    //Estados globales 
    const allPsyco = useSelector((store) => store.allPshychologists)
    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await setPiscologo(allPsyco.find((psyco) => {
                return psyco.id == detailID

            }))
        }
        aux()
        console.log(psicologo);
    }, [])
    //funciones 

    console.log(detailID);
    console.log(allPsyco);
    console.log(psicologo);
    console.log(psicologo.imagen);
    return (
        <div className={s.detail_conteiner}>
            <div className={s.detail}>
                <div className={s.view_psico}>
                    <div className={s.row1}>
                        <div className={s.foto_conteiner}>
                            <img src={psicologo.imagen} />
                        </div>
                        <div className={s.info_psyco}>

                            <h1 className={s.name}>{psicologo.nombre}</h1>
                            <h2 className={s.especialidad}>{psicologo.especializacion}</h2>
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
                            <p>Fecha de nacimiento:</p>
                            <p>Pais de origen: <span className={s.negrita}>{psicologo.pais}</span></p>
                            <p>Genero: <span className={s.negrita}>{psicologo.genero}</span></p>
                            <p>Licencia:</p>

                        </div>
                    </div>
                    <div className={s.row3}>
                        <label className={s.label}>Descripción:</label>
                        <div className={s.descripcion}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque quis tempore saepe quia illo Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis expedita sunt hic, beatae esse eum, atque unde libero facilis aperiam autem. Dolore error distinctio voluptatum fugiat explicabo illo alias Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ut molestiae esse fugiat delectus eum numquam, est dolore necessitatibus minus voluptas non ipsum iste? Quasi fugiat eaque ut quae ad? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo vitae dolores omnis expedita minima odio harum asperiores, dolorum eligendi amet! Accusantium magnam blanditiis sapiente facilis numquam commodi necessitatibus, libero qui. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit eum, assumenda saepe iure debitis, eaque consectetur cumque veritatis natus doloribus nisi quae neque et dolores omnis, quo voluptatem perspiciatis unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus ex quas quisquam repellat laborum necessitatibus, eius illo excepturi voluptatibus consequatur nobis molestiae neque vitae numquam, facere blanditiis, repudiandae earum! Illum. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere doloremque rerum voluptatum, consequatur provident praesentium explicabo at, voluptate quis nihil quod beatae quaerat ratione eos impedit fuga voluptatibus dolores veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ipsum dolore in saepe officiis numquam hic modi magni exercitationem consequuntur recusandae incidunt rerum ratione consequatur eius ipsa minima, ab alias! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis molestiae amet magnam ipsa aperiam voluptatibus quo iure mollitia adipisci, earum animi suscipit non ex totam saepe soluta consequuntur. Sunt, quae? suscipit et sequi rerum at deleniti reprehenderit perspiciatis placeat ratione, odit dolore porro deserunt eligendi praesentium!lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt dicta quae vero rerum, alias quibusdam expedita corporis a dolor sunt quidem quia veritatis soluta vitae reiciendis exercitationem aut minima similique?
                        </div>
                    </div>

                </div>


                <div className={s.turno_conteiner}>
                    Suspuesto pedir turno

                </div>

            </div>

        </div>
    )
}

export default Detail;