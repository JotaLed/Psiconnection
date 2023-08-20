import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../../Redux/actions";
import { Table, Button } from "react-bootstrap";

const CitasPsic = () => {
    const dispatch = useDispatch();
    const psicologo = useSelector((store) => store.psicologo);

    const { id } = useParams();

    useEffect(() => {
        const aux = async () => {
            await dispatch(getDetail(id));
        };
        aux();
    }, [dispatch, id]);

    const handleCancelCita = (idCita) => {
        
    };
    
    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <div>
            {console.log(psicologo.cita)}
            <h2>Mis Citas</h2><br></br>
            {psicologo.cita?.length > 0 ?  <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cita</th>
                        <th>Usuario</th>
                        <th>País del Usuario</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th> 
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {psicologo.cita.map((cita, index) => (
                        <tr key={cita.IdCita}>
                            <td>{index + 1}</td>
                            <td>{capitalizeFirstLetter(cita.usuarioNombre)} {capitalizeFirstLetter(cita.usuarioApellido)}</td>
                            <td>{cita.usuarioPais}</td>

                            <td>{cita.Fecha}</td>
                            <td>{cita.Hora}</td>
                            <td>{capitalizeFirstLetter(cita.Estado)}</td>
                            <td>
                                {cita.Estado.toLowerCase() !== "finalizado" && <Button variant="danger" onClick={() => handleCancelCita(cita.IdCita)}>
                                    Cancelar Cita
                                </Button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : <h3>No tienes citas</h3>}
        </div>
    );
};

export default CitasPsic;
