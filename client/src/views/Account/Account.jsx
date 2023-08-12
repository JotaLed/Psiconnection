import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Form } from 'react-bootstrap';
import styles from './Account.module.css';
import { useSelector, useDispatch } from "react-redux"
import { loadDetail, updatePsic } from '../../Redux/actions';
import { useParams } from "react-router-dom";
import Description from './AccountComponents/description';
import BasicInfo from './AccountComponents/basicInfo';
import Foto from './AccountComponents/foto';
import Paises from './AccountComponents/Paises';
import Horario from './AccountComponents/Horario';
import ProfileInfo from './AccountComponents/ProfileInfo';


const Account = () => {
    const [selectedTab, setSelectedTab] = useState('profile');

    // const psicology = useSelector((store) => store.psicoloDetail)
    
    const psicology = useSelector((store) => store.psicoloDetail)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [dateToUpdate, setDateToUpdate] = useState({
        id: id,
    })
    const [imagen, setImagen] = useState();
    console.log(imagen)
    const [esp, setEsp] = useState()
    const opcionesEspecialidades = [
        'Psicología de pareja',
        'Psicología infantil',
        'Psicología cognitivo-conductual',
        'Psicoanálisis',
        'Sexología'
    ];

    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await dispatch(loadDetail(id))
            setIsLoading(false);
            setImagen(psicology.foto)
            setEsp(psicology.especialidad)
        }
        aux()
    }, [id, dispatch, psicology.foto])

 

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
        console.log(dateToUpdate)

    }
    const handleSubmit = () => {
        const emptyFields = Object.values(dateToUpdate).some(value => value === "");
        if (emptyFields) {
            window.alert("Por favor no dejar campos vacios.");
            return;
        }
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





    if (isLoading) {
        // Mostrar un mensaje de carga mientras se busca el psicólogo
        return <div>Cargando...</div>;
    }




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
                                                <BasicInfo handleChange={handleChange} psicology={psicology} />

                                                <Foto handleChange={handleChange} imagen={imagen} />

                                                <Paises handleChange={handleChange} zona_horaria={psicology.zona_horaria} pais={psicology.pais} />

                                                <Form.Group controlId="options">
                                                    <Form.Label className={styles.prop}>Especialidades:</Form.Label>
                                                    <div className="text-left">
                                                        {opcionesEspecialidades.map(opcion => (
                                                            
                                                                <Form.Check
                                                                    key={opcion}
                                                                    type="checkbox"
                                                                    label={opcion}
                                                                    value={opcion}
                                                                    checked={esp.includes(opcion)} 
                                                                    onChange={() => handleOptionChange(opcion)}
                                                                />
                                                            
                                                        ))}
                                                    </div>
                                                </Form.Group>

                                                <Horario handleChange={handleChange} horario={psicology.horario} />

                                            </div>
                                            <Description descrip={psicology.descripcion} handleChange={handleChange} />
                                            <Button variant="outline-primary" type="submit">
                                                Guardar Cambios
                                            </Button>
                                        </Form>
                                    </>) : (<> <ProfileInfo psicology={psicology} imagen={imagen} />

                                    </>)}

                                </div>
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
