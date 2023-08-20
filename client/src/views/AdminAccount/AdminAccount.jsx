import React, { useState, useEffect, useCallback } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import styles from './AdminAccount.module.css';

import ProfileBarAdmin from '../../components/AdminComponents/ProfileBarAdmin';
import Profesionales from '../../components/AdminComponents/Profesionales';


const AccountAdmin = () => {

    const [selectedTab, setSelectedTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);


    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return(<div className={styles.accountContainer}>


        <div className={styles.sidebar}>
            <ProfileBarAdmin handleTabChange={handleTabChange} selectedTab={selectedTab} />
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
                                        
                                        <Button variant="outline-primary" type="submit">
                                            Guardar Cambios
                                        </Button>
                                    </Form>
                                </>) : (<> <h1>Perfil Admin</h1>

                                </>)}

                            </div>
                        </>
                    )}
                    {selectedTab === 'profesionales' && (
                       <div> 
                        <Profesionales/></div>
                    )}
                    {selectedTab === 'usuarios' && (
                       <div> 
                        <h1>Usuarios</h1></div>
                    )}
                    {selectedTab === 'resumen' && (
                       <div> 
                        <h1>Resumen</h1></div>
                    )}
                    
                    {selectedTab === 'logout' && (
                        <h2 onClick={ () => { logout() }}>Cerrar Sesión</h2>
                    )}
                </Card.Body>
            </Card>
        </div>
    </div>
);
}

export default AccountAdmin;