import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Form } from 'react-bootstrap';
import styles from './Account.module.css';
import { useSelector, useDispatch } from "react-redux"
import { loadDetail, updatePsic } from '../../Redux/actions';
import { useParams } from "react-router-dom";


const Account = () => {
    const [selectedTab, setSelectedTab] = useState('profile');

    const psicology = useSelector((store) => store.psicoloDetail)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [dateToUpdate, setDateToUpdate] = useState({
        id: id,
        foto: psicology.foto,
        email: psicology.email,

    })





    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await dispatch(loadDetail(id))
            setIsLoading(false);


        }
        aux()
    }, [])

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
        setDateToUpdate({ ...dateToUpdate, [name]: value })

    }
    const handleSubmit = () => {

        // Validar el formato del correo electrónico antes de enviar los datos al servidor
        if (!isValidEmail(dateToUpdate.email)) {
            const title = "Email incorrecto";
            const message = "Debe ingresar un correo electrónico válido.";
            window.alert(`${title}\n${message}`);
            return;
          }
        
        dispatch(updatePsic(dateToUpdate))

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

    // if (!psicology) {
    //     // Manejar el caso donde no se encuentra el psicólogo
    //     return <div>El psicólogo no existe.</div>;
    // }
    console.log(dateToUpdate)

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
                            Reservas
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
                                            {/* Campos de edición */}
                                            <Form.Group >
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="foto"
                                                    placeholder={psicology.nombre}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label>Apellido</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="foto"
                                                    placeholder={psicology.apellido}
                                                    readOnly
                                                />
                                            </Form.Group>
                                            <Form.Group >
                                                <Form.Label>Correo</Form.Label>
                                                <Form.Control
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
                                                    defaultValue={psicology.foto}

                                                />
                                            </Form.Group>
                                            {/* Agrega campos de edición similares para otros campos */}
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
                                            <img src={psicology.foto} />
                                        </div>
                                        <div className={`${styles.infoConteiner}`}>

                                            <h2 className={styles.subtitle}><b>País: </b>{capitalizeFirstLetter(psicology.pais)}</h2>

                                            <h2 className={styles.subtitle}><b>Fecha de nacimiento:</b> {formatDate(psicology.fecha_nacimiento)}</h2>
                                            <h2 className={styles.subtitle}><b>Email:</b> {psicology.email}</h2>
                                            <h2 className={styles.subtitle}><b>Zona Horaria:</b> {psicology.zona_horaria}</h2>
                                            <h2 className={styles.subtitle}><b>Género:</b> {capitalizeFirstLetter(psicology.genero)}</h2>
                                            <h2 className={styles.subtitle}><b>Tarifa:</b> ${psicology.tarifa}</h2>
                                            <h2 className={styles.subtitle}><b>Whatsapp:</b> {psicology.whatsapp_url}</h2>
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
                            <h2>Mis Reservas</h2>
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
