import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePiscologo, getUsers } from "../../Redux/actions";

const Clientes = () => {
    const dispatch = useDispatch()
    const clientes = useSelector((state) => state.allUsers)


    const desactivarCuenta = (id) => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la cuenta? Esta acción no se puede deshacer.');
        if (confirmacion) {
            dispatch(deletePiscologo(id)) //Cambiar para usuario
            window.location.reload()
        }
    }

    useEffect(() => {
        const aux = async () => {
            await dispatch(getUsers())
        }

        aux()
    },[dispatch])
   

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return (
        <div>
            {clientes.length > 0 ?
                (<div><h2>Clientes</h2><br></br>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Cliente</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Genero</th>
                                <th>País</th>
                                <th>estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente, index) => (
                                <tr key={cliente.id}>
                                    <td>{index + 1}</td>
                                    <td><img src= {cliente.foto} alt="Foto pisc" style={{ height: "40px", borderRadius: "100%" }}/></td>
                                    <td>{capitalizeFirstLetter(cliente.nombre)} {capitalizeFirstLetter(cliente.apellido)}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.genero}</td>
                                    <td>{cliente.pais}</td>
                                    <td>{capitalizeFirstLetter(cliente.estado_cuenta)}</td>
                                    <td>{cliente.estado_cuenta.toLowerCase() !==  "activo"? <Button variant="success" style={{ width: "100px" }}>Activar</Button> :
                                    <Button variant="danger" onClick= {(()=> desactivarCuenta(cliente.id))}style={{ width: "100px" }} >Desactivar</Button>}</td>


                                </tr>
                            ))}
                        </tbody>
                    </Table></div>) : <h1>No se encontraron clientes</h1>}
        </div>
    )
}

export default Clientes;