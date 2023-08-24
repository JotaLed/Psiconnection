import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './AdminAccount.module.css';

import ProfileBarAdmin from '../../components/AdminComponents/ProfileBarAdmin';
import Profesionales from '../../components/AdminComponents/Profesionales';
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../Account/AccountComponents/ProfileInfo';
import { useParams } from 'react-router-dom';
import { getAllPsicologos, getDetailClient, getUsers, updateClient, getDetailClientAdmin } from '../../Redux/actions';
import BasicInfo from '../Account/AccountComponents/basicInfo';
import Foto from '../Account/AccountComponents/foto';
import Clientes from '../../components/AdminComponents/Clientes';
import Pagination from '../../components/Pagination/Pagination';
//importamos la vista de los graficos 
import Dashboard from '../Dashboard';


const AccountAdmin = () => {
    const ITEMS_PER_PAGE = 6
    const [currentPage, setCurrentPage] = useState(0);

    const dispatch = useDispatch()

    const admin = useSelector((store) => store.usuarioAcountAdmin)

    const [selectedTab, setSelectedTab] = useState('resumen');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const profesionales = useSelector((state) => state.adminPsicologos?.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    const clientes = useSelector((state) => state.allUsers?.sort((a, b) => a.nombre.localeCompare(b.nombre)))

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
            // await dispatch(getDetailClient(id))
            await dispatch(getDetailClientAdmin(id))
            await dispatch(getAllPsicologos())
            await dispatch(getUsers())

            setIsLoading(false);
            // setImagen(client.usuario.foto)
        }
        aux()


    }, [dispatch, id, admin.usuario?.foto])

    // Recuperar la pestaña seleccionada de localStorage al cargar la página
    useEffect(() => {
        const savedTab = localStorage.getItem('selectedTab');
        if (savedTab) {
            setSelectedTab(savedTab);
        }
    }, []);

    // Guardar la pestaña seleccionada en localStorage cuando cambia
    useEffect(() => {
        localStorage.setItem('selectedTab', selectedTab);
    }, [selectedTab]);

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
        // await dispatch(getDetailClient(id));
        await dispatch(getDetailClientAdmin(id))

    }

    if (isLoading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se busca el psicólogo
    }

    //--------------------Paginado----------------//
    const prevHandler = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const nextHandler = () => {
        setCurrentPage(prevPage =>
            Math.min(prevPage + 1, Math.ceil(profesionales.length / ITEMS_PER_PAGE) - 1)
        );
    };
    const nextHandlerClient = () => {
        setCurrentPage(prevPage =>
            Math.min(prevPage + 1, Math.ceil(clientes.length / ITEMS_PER_PAGE) - 1)
        );
    };

    // Calcula los índices de inicio y fin de los profesionales a mostrar en la página actual
    const firstIndex = currentPage * ITEMS_PER_PAGE;
    const lastIndex = Math.min(firstIndex + ITEMS_PER_PAGE, profesionales.length);
    const lastIndexClient = Math.min(firstIndex + ITEMS_PER_PAGE, clientes.length);
    // Filtra los profesionales a mostrar en la página actual
    const currentProfesionales = profesionales.slice(firstIndex, lastIndex);
    const currentClientes = clientes.slice(firstIndex, lastIndex)


    return (<div className={styles.accountContainer}>


        <div className={styles.sidebar}>
            <ProfileBarAdmin handleTabChange={handleTabChange} selectedTab={selectedTab} />
        </div>
        <div className={styles.mainContent}>
            <Card className={styles.card}>
                <Card.Body className={`${styles.cardBody}`}>
                    {selectedTab === 'resumen' && (
                        <Dashboard />
                    )}
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
                                </>)}

                            </div>
                        </>
                    )}
                    {selectedTab === 'profesionales' && (
                        <div className={styles.tablas}>
                            <Pagination
                                currentPage={currentPage}
                                nextHandler={nextHandler}
                                prevHandler={prevHandler}
                                items={currentProfesionales}
                                profesionales={true}
                            /></div>
                    )}
                    {selectedTab === 'usuarios' && (
                        <div className={styles.tablas}>
                            <Pagination
                                currentPage={currentPage}
                                nextHandler={nextHandlerClient}
                                prevHandler={prevHandler}
                                items={currentClientes}
                                clientes={true}
                            /></div>
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