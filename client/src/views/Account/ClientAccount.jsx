import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from './Account.module.css';
import ProfileBar from "./AccountComponents/ProfileBar";
import React, { useState, useEffect } from 'react';
import { Card, Nav, Button, Form } from 'react-bootstrap';
import {updateClient, getDetailClient } from '../../Redux/actions';
import BasicInfo from './AccountComponents/basicInfo';
import Foto from './AccountComponents/foto';
import ProfileInfo from './AccountComponents/ProfileInfo';
import CitasPsic from './AccountComponents/CitasPsic';
import CitasClient from "./AccountComponents/CitasClient";



const ClientAccount = () => {
    const [selectedTab, setSelectedTab] = useState('profile');

    // const psicology = useSelector((store) => store.psicoloDetail)

    const client = useSelector((store) => store.cliente)
    const dispatch = useDispatch()
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [dateToUpdate, setDateToUpdate] = useState({
        id: id,
    })
    // const [imagen, setImagen] = useState(client.usuario?.foto);

    const navigate =  useNavigate();

    //Useeffect
    useEffect(() => {
        const aux = async () => {
            await dispatch(getDetailClient(id))
            setIsLoading(false);
            // setImagen(client.usuario.foto)
        }
        aux()
        

    }, [dispatch, id, client.usuario?.foto])

  

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
        
        setDateToUpdate({ ...dateToUpdate, [name]: value });
    }
    const handleSubmit = async () => {
        const emptyFields = Object.values(dateToUpdate).some(value => value === "");
        if (emptyFields) {
            window.alert("Por favor no dejar campos vacios.");
            return;
        }

        if (dateToUpdate.email && !isValidEmail(dateToUpdate.email)) {
            const title = "Email incorrecto";
            const message = "Debe ingresar un correo electrónico válido.";
            window.alert(`${title}\n${message}`);
            return;
        }
        await dispatch(updateClient(dateToUpdate));

       
            await dispatch(getDetailClient(id));
        
    }


    if (isLoading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se busca el psicólogo
    }

    const logout = async () => {
      await window.localStorage.clear()
        navigate('/')
       
    }

    const redirectError = () => {
        navigate('/')
        window.alert(client)
    }
   
    return (
        <div className={styles.accountContainer}>
            {
                typeof client === "string" ? redirectError() : null
            }
            <div className={styles.sidebar}>
                <ProfileBar handleTabChange={handleTabChange} selectedTab={selectedTab} />
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

                                <div className={styles.prueba}>
                                    {isEditing ? (<>
                                        <h1 className={styles.title}>
                                            Editar Perfil
                                        </h1>
                                        <Form onSubmit={handleSubmit}>
                                            <div className={styles.propiedades}>
                                                <BasicInfo handleChange={handleChange} client={client.usuario} />
                                                <Foto handleChange={handleChange} imagen={client.usuario.foto} />

                                            </div>
                                            <Button variant="outline-primary" type="submit">
                                                Guardar Cambios
                                            </Button>
                                        </Form>
                                    </>) : 
                                    (<> 
                                    <ProfileInfo client={client.usuario} imagen={client.usuario?.foto} id={id} />

                                    </>)}

                                </div>
                            </>
                        )}
                        {selectedTab === 'reservations' && (
                           <div> 
                            <CitasClient client={client}/></div>
                        )}
                        {/* {selectedTab === 'logout' && (
                            <h2 onClick={logout}>Cerrar Sesión</h2>
                        )}
                        <h2 onClick={logout}> Logout </h2> */}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default ClientAccount;