import styles from '../Account.module.css';

const ProfileInfo = ({ psicology, imagen }) => {

    function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    const formatDate = (dateString) => {
        if(dateString.length < 11){
            return dateString
        }
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString);

        
        return date.toLocaleDateString(undefined, options);
    };
    return (
        <>

            <h1 className={styles.title}>
                {`Bienvenid${psicology?.genero === "Femenino" ? 'a' : (psicology?.genero === "Masculino" ? 'o' : '@ ')}, ${capitalizeFirstLetter(psicology.nombre)} ${capitalizeFirstLetter(psicology.apellido)}`
                }
            </h1>
            <div className={styles.specialties}>
                {console.log(psicology.especialidad)}
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
            </div> </>)
}

export default ProfileInfo;