import { useDispatch } from 'react-redux';
import styles from '../Account.module.css';
import { Button } from "react-bootstrap";
import { deleteClient, deletePiscologo } from '../../../Redux/actions';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'




const ProfileInfo = ({ psicology, imagen, client, id}) => {
    const dispatch = useDispatch()
    const navigateTo = useNavigate();


    const handleEliminarCuenta = async () => {
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar la cuenta? Esta acción no se puede deshacer.');
        if (confirmacion) {
            console.log("Cuenta eliminada")
            psicology ? dispatch(deletePiscologo(id)) : dispatch(deleteClient(id)) 
            await window.localStorage.clear()
            navigateTo(`/`);
        }
    }

    function capitalizeFirstLetter(name) {
        return name?.charAt(0).toUpperCase() + name?.slice(1);
    }
   
    const usuario = psicology ? psicology : client;
    const formatDate = (dateString) => {
        if (dateString?.length < 11) {
            return dateString
        }
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);


        return date.toLocaleDateString(undefined, options); 
    };
    return (
        <>

            <h1 className={styles.title}>
                {`Bienvenid${usuario.genero.toLowerCase() === "femenino" ? 'a' : (usuario?.genero.toLowerCase() === "masculino" ? 'o' : '@ ')}, ${capitalizeFirstLetter(usuario.nombre)} ${capitalizeFirstLetter(usuario.apellido)}`
                }
            </h1>
            {psicology && <div className={styles.specialties}>
                {psicology.especialidad?.map((espe, index) => (
                    <p key={index}>#{espe}</p>
                ))}
            </div>}
            <div className={client ? styles.foto_cliente : styles.foto_conteiner}>
                <img src={imagen} alt={"Profile"}/>
            </div>
            <div className={`${styles.infoConteiner}`}>

                <h2 className={styles.subtitle}><b>País: </b>{capitalizeFirstLetter(usuario.pais)}</h2>

                <h2 className={styles.subtitle}><b>Fecha de nacimiento:</b> {formatDate(usuario.fecha_nacimiento)}</h2>
                <h2 className={styles.subtitle}><b>Email:</b> {usuario.email}</h2>

                <h2 className={styles.subtitle}><b>Género:</b> {capitalizeFirstLetter(usuario.genero)}</h2>
                {psicology && <>
                    <h2 className={styles.subtitle}><b>Tarifa:</b> ${psicology.tarifa}</h2>

                    {/* <h2 className={styles.subtitle}><b>Whatsapp:</b> <a href={psicology.whatsapp_url} target="_blank" rel="noopener noreferrer"> {psicology.whatsapp_url}</a></h2> */}
                    </>}
                <h2 className={styles.subtitle}><b>Telefono:</b> {usuario.telefono}</h2>
                <h2 className={styles.subtitle}><b>Fecha de registro:</b> {formatDate(usuario.fecha_registro)}</h2>
            </div>

            {psicology && <>
                <div className={styles.descripcionTitle}>
                    <h2 className={styles.subtitle}><b>Descripción</b></h2>
                </div>
                <div className={styles.descripcion}>
                    {psicology.descripcion}
                </div></>}

            <Button variant="danger" onClick={handleEliminarCuenta}>
                Eliminar cuenta
            </Button>
        </>)

}

export default ProfileInfo;