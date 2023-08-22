import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPsicologos, deletePiscologo, updatePsic } from "../../Redux/actions";

const Profesionales = (props) => {
    
    const dispatch = useDispatch()
    // const psicologos = useSelector((state) => state.adminPsicologos)
    const psicologos = props.items

    const desactivarCuenta = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la cuenta? Esta acción no se puede deshacer.');
        if (confirmacion) {
            dispatch(deletePiscologo(id))
            window.location.reload()
        }
    }

    const activarCuenta = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas Activar la cuenta?');
        if(confirmacion) {
            dispatch(updatePsic({id: id, estado_cuenta: "Activo"}))
            window.location.reload()
        }
    }

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
                (<div>
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
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {psicologos.map((psicologo, index) => (
                                <tr key={psicologo.id}>
                                    <td>{index + 1}</td>
                                    <td><img src= {psicologo.foto} alt="Foto pisc" style={{ height: "40px", borderRadius: "100%" }}/></td>
                                    <td>{capitalizeFirstLetter(psicologo.nombre)} {capitalizeFirstLetter(psicologo.apellido)}</td>
                                    <td>{psicologo.email}</td>
                                    <td>{psicologo.genero}</td>
                                    <td>{psicologo.tarifa}</td>
                                    <td>{psicologo.pais}</td>
                                    <td>{capitalizeFirstLetter(psicologo.estado_cuenta)}</td>
                                    <td>{psicologo.estado_cuenta.toLowerCase() !==  "activo"? <Button variant="success" onClick={() => activarCuenta(psicologo.id)} style={{ width: "100px" }}>Activar</Button> :
                                    <Button variant="danger" onClick= {(()=> desactivarCuenta(psicologo.id))}style={{ width: "100px" }} >Desactivar</Button>}</td>


                                </tr>
                            ))}
                        </tbody>
                    </Table></div>) : <h1>No hay psicolgoso disponibles</h1>}
        </div>
    )
}

export default Profesionales;