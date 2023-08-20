import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPsicologos } from "../../Redux/actions";

const Profesionales = () => {
    const dispatch = useDispatch()
    const psicologos = useSelector((state) => state.adminPsicologos)

    useEffect(() => {
        const aux = async () => {
            await dispatch(getAllPsicologos())
        }

        aux()
    },[dispatch])
   

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return (
        <div>
            {psicologos.length > 0 ?
                (<div><h2>Profesionales</h2><br></br>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Psicologo</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Genero</th>
                                <th>Tarifa</th>
                                <th>País</th>
                                <th>estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {psicologos.map((psicologo, index) => (
                                <tr key={psicologo.nombre}>
                                    <td>{index + 1}</td>
                                    <td><img src= {psicologo.foto} alt="Foto pisc" style={{ height: "40px", borderRadius: "100%" }}/></td>
                                    <td>{capitalizeFirstLetter(psicologo.nombre)} {capitalizeFirstLetter(psicologo.apellido)}</td>
                                    <td>{psicologo.email}</td>
                                    <td>{psicologo.genero}</td>
                                    <td>{psicologo.tarifa}</td>
                                    <td>{psicologo.pais}</td>
                                    <td>{capitalizeFirstLetter(psicologo.estado_cuenta)}</td>
                                    <td>{psicologo.estado_cuenta.toLowerCase() !==  "activo"? <Button variant="success" style={{ width: "100px" }}>Activar</Button> :
                                    <Button variant="danger" style={{ width: "100px" }}>Desactivar</Button>}</td>


                                </tr>
                            ))}
                        </tbody>
                    </Table></div>) : <h1>No hay psicolgoso disponibles</h1>}
        </div>
    )
}

export default Profesionales;