import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Form } from 'react-bootstrap';
import styles from './Account.module.css';
import { useSelector, useDispatch } from "react-redux"
import { loadDetail, updatePsic } from '../../Redux/actions';
import { useParams } from "react-router-dom";
import Description from './formComponents/description';


const Account = () => {
    const [selectedTab, setSelectedTab] = useState('profile');

    // const psicology = useSelector((store) => store.psicoloDetail)
    // const psicology = {
    //     nombre: "Luis",
    //     apellido: "Hernández",
    //     fecha_nacimiento: "1992-03-25",
    //     email: "luis@hernandez.com",
    //     contraseña: "securepassword",
    //     pais: "Venezuela",
    //     zona_horaria: "GMT-4",
    //     genero: "Masculino",
    //     licencia: "789457",
    //     tarifa: "300",
    //     horario: "PM",
    //     whatsapp_url: "https://wa.me/1818181818",
    //     telefono: "1818181818",
    //     foto: "https://i.pinimg.com/564x/12/75/40/127540404fd8f8b0e423a8e599245701.jpg",
    //     descripcion: "En el vasto y misterioso comano, imbuido de En el vasto y misterioso cosmos, innumerables estrellas parpadean como diamantes en la negrura del espacio. Galaxias espirales, nebulosas resplandecientes y cúmulos estelares adornan la bóveda celeste con su magnificencia cósm  cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan l cúmulos estelares adornan la bóveda celeste con su magnificencia cósma bóveda celeste con su magnificencia cósmcúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm cúmulos estelares adornan la bóveda celeste con su magnificencia cósm",
    //     estado_cuenta: "Activo",
    //     fecha_registro: "2023-08-03",
    //     especialidad: ["Psicología infantil", "Psicología de pareja"],
    //     valoracion: 4
    // }
    const psicology = useSelector((store) => store.psicoloDetail)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [dateToUpdate, setDateToUpdate] = useState({
        id: id,
    })
    const [imagen, setImagen] = useState(psicology.foto);
    const [esp, setEsp] = useState(psicology.especialidad)
    const [description, setDescription] = useState(psicology.descripcion)
    const opcionesEspecialidades = [
        'Psicología de pareja',
        'Psicología infantil',
        'Psicología cognitivo-conductual',
        'Psicoanálisis',
        'Sexología'
    ];
    const paises = [
        "Argentina",
        "Colombia",
        "México",
        "Venezuela"
    ]

    const generos = [
        "Femenino",
        "Masculino",
        "Otro"
    ]

  



    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await dispatch(loadDetail(id))
            setIsLoading(false);
            setImagen(psicology.foto)
            // console.log(imagen)


        }
        aux()
    }, [psicology.foto])

    const isValidEmail = (email) => {
        // Expresión regular para validar el formato del correo electrónico
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "foto") {
            setImagen(value);

        }
        if (name === "tarifa" && value < 1) {
            return
        }
        setDateToUpdate({ ...dateToUpdate, [name]: value });

    }
    const handleSubmit = () => {
        console.log(dateToUpdate)
        // Validar el formato del correo electrónico antes de enviar los datos al servidor
        if (dateToUpdate.email && !isValidEmail(dateToUpdate.email)) {
            const title = "Email incorrecto";
            const message = "Debe ingresar un correo electrónico válido.";
            window.alert(`${title}\n${message}`);
            return;
        }



        dispatch(updatePsic(dateToUpdate))

    }
   

    const handleOptionChange = (optionValue) => {
        if (esp.includes(optionValue)) {
            setEsp(esp.filter(option => option !== optionValue));
        } else {
            setEsp([...esp, optionValue]);
        }

        setDateToUpdate({ ...dateToUpdate, especialidad: esp })
    }

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        // Mostrar un mensaje de carga mientras se busca el psicólogo
        return <div>Cargando...</div>;
    }

    const handleKeyPress = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === 45) { // 45 es el código de tecla para el signo "-"
            event.preventDefault();
        }
    };



    return (
        <div className={styles.accountContainer}>
            <div className={styles.sidebar}>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => handleTabChange('profile')}
                            className={`${styles.customNavLink} ${selectedTab === 'profile' ? styles.active : ''}`}
                        >
                            Perfil
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => handleTabChange('reservations')}
                            className={`${styles.customNavLink} ${selectedTab === 'reservations' ? styles.active : ''}`}
                        >
                            Citas
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Link onClick={() => handleTabChange('logout')} className={styles.customNavLink}>
                        Cerrar Sesión
                    </Nav.Link>
                </Nav>
            </div>
            <div className={styles.mainContent}>
                <Card className={styles.card}>
                    <Card.Body className={`${styles.cardBody}`}>
                        {selectedTab === 'profile' && (
                            <>

                                {!isEditing && (
                                    <Button variant="link" onClick={() => setIsEditing(true)}>
                                        <i className="fas fa-pencil-alt"></i> Editar
                                    </Button>
                                )}

                                <div>
                                    {isEditing ? (<>
                                        <h1 className={styles.title}>
                                            Editar Perfil
                                        </h1>
                                        <Form onSubmit={handleSubmit}>
                                            <div className={styles.propiedades}>
                                            {/* Campos de edición */}
                                            
                                            <Form.Group >
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="nombre"
                                                    placeholder={psicology.nombre}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="apellido"
                                                    placeholder={psicology.apellido}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label>Correo</Form.Label>
                                                <Form.Control
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="email"
                                                    defaultValue={psicology.email}
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label>Foto</Form.Label>
                                                <Form.Control
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="foto"
                                                    defaultValue={imagen}

                                                />
                                            </Form.Group>
                                            <Form.Group controlId="options">
                                                <Form.Label className={styles.prop}>Especialidades:</Form.Label>
                                                <div className="text-left">
                                                    {opcionesEspecialidades.map(opcion => (
                                                        !psicology.especialidad.includes(opcion) && (
                                                            <Form.Check
                                                                key={opcion}
                                                                type="checkbox"
                                                                label={opcion}
                                                                value={opcion}
                                                                checked={esp.includes(opcion)}

                                                                onChange={() => handleOptionChange(opcion)}
                                                            />
                                                        )
                                                    ))}
                                                </div>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className={styles.prop}>País:</Form.Label>
                                                <Form.Select
                                                    name="pais"
                                                    onChange={handleChange}
                                                    defaultValue={psicology.pais}
                                                >
                                                    {paises.map(opcion => (

                                                        <option key={opcion} value={opcion}>
                                                            {opcion}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label className={styles.prop}>Zona horaria: </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="zona_horaria"
                                                    placeholder={psicology.zona_horaria}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className={styles.prop}>Género:</Form.Label>
                                                <Form.Select
                                                    name="genero"
                                                    onChange={handleChange}
                                                    defaultValue={psicology.genero}
                                                >
                                                    {generos.map(opcion => (

                                                        <option key={opcion} value={opcion}>
                                                            {opcion}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className={styles.prop}>Tárifa:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="tarifa"
                                                    defaultValue={psicology.tarifa}
                                                    min="1" // Puedes ajustar el valor mínimo permitido si es necesario
                                                    step="1" // Define el incremento/decremento al usar las flechas
                                                    onKeyPress={handleKeyPress}

                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className={styles.prop}>Horario:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="horario"
                                                    defaultValue={psicology.horario}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label className={styles.prop}>Whatsapp:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="whatsapp_url"
                                                    placeholder={psicology.whatsapp_url}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label className={styles.prop}>Telefono:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="telefono"
                                                    placeholder={psicology.telefono}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            </div>
                                            <Description/>
                                            <Button variant="outline-primary" type="submit">
                                                Guardar Cambios
                                            </Button>
                                        </Form>
                                    </>) : (<>

                                        <h1 className={styles.title}>
                                            {psicology?.genero === "femenino" ?
                                                `Bienvenida, ${capitalizeFirstLetter(psicology.nombre)} ${capitalizeFirstLetter(psicology.apellido)}` :
                                                `Bienvenido, ${capitalizeFirstLetter(psicology.nombre)} ${capitalizeFirstLetter(psicology.apellido)}`}
                                        </h1>
                                        <div className={styles.specialties}>

                                            {psicology.especialidad?.map((espe, index) => (
                                                <p key={index}>#{espe}</p>
                                            ))}
                                        </div>
                                        <div className={styles.foto_conteiner}>
                                            <img src={imagen} />
                                        </div>
                                        <div className={`${styles.infoConteiner}`}>

                                            <h2 className={styles.subtitle}><b>País: </b>{capitalizeFirstLetter(psicology.pais)}</h2>

                                            <h2 className={styles.subtitle}><b>Fecha de nacimiento:</b> {formatDate(psicology.fecha_nacimiento)}</h2>
                                            <h2 className={styles.subtitle}><b>Email:</b> {psicology.email}</h2>
                                            <h2 className={styles.subtitle}><b>Zona Horaria:</b> {psicology.zona_horaria}</h2>
                                            <h2 className={styles.subtitle}><b>Género:</b> {capitalizeFirstLetter(psicology.genero)}</h2>
                                            <h2 className={styles.subtitle}><b>Tarifa:</b> ${psicology.tarifa}</h2>
                                            <h2 className={styles.subtitle}><b>Whatsapp:</b> <a href={psicology.whatsapp_url} target="_blank" rel="noopener noreferrer"> {psicology.whatsapp_url}</a></h2>
                                            <h2 className={styles.subtitle}><b>Telefono:</b> {psicology.telefono}</h2>
                                            <h2 className={styles.subtitle}><b>Fecha de registro:</b> {formatDate(psicology.fecha_registro)}</h2>
                                        </div>
                                        <div className={styles.descripcionTitle}>
                                            <h2 className={styles.subtitle}><b>Descripción</b></h2>
                                        </div>                                        <div className={styles.descripcion}>
                                            {psicology.descripcion}
                                        </div> </>)}

                                </div>


                                {/* <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="password">
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Nueva contra   seña"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <Button variant="outline-primary" type="submit">
                                            Editar
                                        </Button>
                                    </Form.Group>
                                    <Form.Group controlId="description">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            placeholder="Nueva descripción"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                        />
                                        <Button variant="outline-primary" type="submit">
                                            Editar
                                        </Button>
                                    </Form.Group>
                                 </Form> */}
                            </>
                        )}
                        {selectedTab === 'reservations' && (
                            <h2>Mis Citas</h2>
                        )}
                        {selectedTab === 'logout' && (
                            <h2>Cerrar Sesión</h2>
                        )}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Account;
