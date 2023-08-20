import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './AdminAccount.module.css';

import ProfileBarAdmin from '../../components/AdminComponents/ProfileBarAdmin';
import Profesionales from '../../components/AdminComponents/Profesionales';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../Account/AccountComponents/ProfileInfo';
import { useParams } from 'react-router-dom';
import { getDetailClient, updateClient } from '../../Redux/actions';
import BasicInfo from '../Account/AccountComponents/basicInfo';
import Foto from '../Account/AccountComponents/foto';
import Clientes from '../../components/AdminComponents/Clientes';



const AccountAdmin = () => {
    const dispatch = useDispatch()

    const admin = useSelector((store) => store.cliente)

    const [selectedTab, setSelectedTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams();
    const [dateToUpdate, setDateToUpdate] = useState({
        id: id,
    })


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        const aux = async () => {
            console.log(id)
            await dispatch(getDetailClient(id))
            setIsLoading(false);
            // setImagen(client.usuario.foto)
        }
        aux()


    }, [dispatch, id, admin.usuario?.foto])

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

    return (<div className={styles.accountContainer}>


        <div className={styles.sidebar}>
            <ProfileBarAdmin handleTabChange={handleTabChange} selectedTab={selectedTab} />
        </div>
        <div className={styles.mainContent}>
            <Card className={styles.card}>
                <Card.Body className={`${styles.cardBody}`}>
                    {selectedTab === 'profile' && (
                        <>
                            {!isEditing && (<>
                                <Button variant="link" onClick={() => setIsEditing(true)}>
                                    <i className="fas fa-pencil-alt"></i> Editar
                                </Button>
                                <ProfileInfo client={admin?.usuario} imagen={admin.usuario?.foto} id={id} />

                            </>

                            )}

                            <div>
                                {isEditing && (<>
                                    <h1 className={styles.title}>
                                        Editar Perfil
                                    </h1>
                                    <Form onSubmit={handleSubmit}>
                                        <div className={styles.propiedades}>
                                            <BasicInfo handleChange={handleChange} client={admin?.usuario} />
                                            <Foto handleChange={handleChange} imagen={admin.usuario?.foto} />

                                        </div>
                                        <Button variant="outline-primary" type="submit">
                                            Guardar Cambios
                                        </Button>
                                    </Form>
                                </>) }

                            </div>
                        </>
                    )}
                    {selectedTab === 'profesionales' && (
                        <div>
                            <Profesionales /></div>
                    )}
                    {selectedTab === 'usuarios' && (
                        <div>
                            <Clientes/></div>
                    )}
                    {selectedTab === 'resumen' && (
                        <div>
                            <h1>Resumen</h1></div>
                    )}

                    {selectedTab === 'logout' && (
                        <h2 onClick={() => { logout() }}>Cerrar Sesión</h2>
                    )}
                </Card.Body>
            </Card>
        </div>
    </div>
    );
}

export default AccountAdmin;