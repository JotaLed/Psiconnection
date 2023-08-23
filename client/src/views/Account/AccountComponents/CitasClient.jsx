import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../../Redux/actions";
import { Table, Button } from "react-bootstrap";

const CitasClient = ({client}) => {
    
    const handleCancelCita = (idCita) => {
        
    };
    
    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return (
        <div>
            <h2>Mis Citas</h2><br></br>
            {client.citas?.length > 0 ?  <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cita</th>
                        <th>Psicólogo</th>
                        <th>País del Psicólogo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {client.citas.map((cita, index) => (
                        <tr key={cita.IdCita}>
                            <td>{index + 1}</td>
                            <td>{capitalizeFirstLetter(cita.psicologoNombre)} {capitalizeFirstLetter(cita.psicologoApellido)}</td>
                            <td>{cita.psicologoPais}</td>

                            <td>{cita.Fecha}</td>
                            <td>{cita.Hora}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleCancelCita(cita.IdCita)}>
                                    Cancelar Cita
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> : <h3>No tienes citas</h3>}
        </div>
    );
};

export default CitasClient;
