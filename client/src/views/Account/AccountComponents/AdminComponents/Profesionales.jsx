import { Table, Button } from "react-bootstrap";

const Profesionales = () => {
    const psicologos = [
        {
            nombre: "Elena",
            apellido: "Gómez",
            email: "elena.gomez@example.com",
            pais: "Argentina",
            estado: "Activo",
            foto: "https://i.pinimg.com/236x/3c/fd/5a/3cfd5a3039f136406df91abe2c2a54c7.jpg"
        },
        {
            nombre: "Andrés",
            apellido: "Hernández",
            email: "andres.hernandez@example.com",
            pais: "Colombia",
            estado: "Activo",
            foto: "https://i.pinimg.com/236x/7a/fd/82/7afd82433efb0e76625caf9ab66729c3.jpg"
        },
        {
            nombre: "Carolina",
            apellido: "Rodríguez",
            email: "carolina.rodriguez@example.com",
            pais: "Mexico",
            estado: "Inactivo",
            foto:"https://i.pinimg.com/236x/c9/ab/13/c9ab13633a4108d631c1ba92edf26bb3.jpg"
        },
        {
            nombre: "Javier",
            apellido: "López",
            email: "javier.lopez@example.com",
            pais: "Venezuela",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "María",
            apellido: "Martínez",
            email: "maria.martinez@example.com",
            pais: "Argentina",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Carlos",
            apellido: "García",
            email: "carlos.garcia@example.com",
            pais: "Colombia",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "Sofía",
            apellido: "Díaz",
            email: "sofia.diaz@example.com",
            pais: "Mexico",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Alejandro",
            apellido: "Ramírez",
            email: "alejandro.ramirez@example.com",
            pais: "Venezuela",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "Valentina",
            apellido: "Fernández",
            email: "valentina.fernandez@example.com",
            pais: "Argentina",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Gabriel",
            apellido: "Pérez",
            email: "gabriel.perez@example.com",
            pais: "Colombia",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "Lucía",
            apellido: "Ortega",
            email: "lucia.ortega@example.com",
            pais: "Mexico",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Matías",
            apellido: "Cruz",
            email: "matias.cruz@example.com",
            pais: "Venezuela",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Ana",
            apellido: "Mendoza",
            email: "ana.mendoza@example.com",
            pais: "Argentina",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "David",
            apellido: "Gutiérrez",
            email: "david.gutierrez@example.com",
            pais: "Colombia",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Renata",
            apellido: "Silva",
            email: "renata.silva@example.com",
            pais: "Mexico",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "Pedro",
            apellido: "Luna",
            email: "pedro.luna@example.com",
            pais: "Venezuela",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Isabella",
            apellido: "Vargas",
            email: "isabella.vargas@example.com",
            pais: "Argentina",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Raúl",
            apellido: "Rojas",
            email: "raul.rojas@example.com",
            pais: "Colombia",
            estado: "Inactivo",
            foto: null
        },
        {
            nombre: "Fernanda",
            apellido: "Montoya",
            email: "fernanda.montoya@example.com",
            pais: "Mexico",
            estado: "Activo",
            foto: null
        },
        {
            nombre: "Diego",
            apellido: "Méndez",
            email: "diego.mendez@example.com",
            pais: "Venezuela",
            estado: "Inactivo",
            foto: null
        }
    ];

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
    return (
        <div>
            {psicologos.length > 0 ?
                (<div><h2>Profesionales</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Psicologo</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>País</th>
                                <th>Estado</th>
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
                                    <td>{psicologo.pais}</td>
                                    <td>{psicologo.estado}</td>
                                    <td>{psicologo.estado.toLowerCase() !==  "activo"? <Button variant="success" style={{ width: "100px" }}>Activar</Button> :
                                    <Button variant="danger" style={{ width: "100px" }}>Desactivar</Button>}</td>


                                </tr>
                            ))}
                        </tbody>
                    </Table></div>) : <h1>No hay psicolgoso disponibles</h1>}
        </div>
    )
}

export default Profesionales;