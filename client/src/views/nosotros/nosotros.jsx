import React from "react";
import style from "./nosotros.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ana from "../../Images/Ana.png"
import delfi from "../../Images/Delfi.png"
import diego from "../../Images/Diego.png"
import facu from "../../Images/Facu.png"
import joni from "../../Images/Joni.png"
import juan from "../../Images/Juan.png"
import lau from "../../Images/Lau.png"
import lucas from "../../Images/Lucas.png"


const Nosotros = () => {
    return (
        <div className={style.container}>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                <img
                    className={style.introImage}
                    src="https://img.freepik.com/vector-premium/trabajo-equipo-desarrolla-ilustracion-contenido-redes-sociales-equipo-personas-disenador-desarrollador-plano-pequeno-dibujos-animados-trabajando-pagina-web-creativa-portal-noticias-o-sitio-web-informacion-fondo-desarrollo-web_213110-392.jpg?w=2000"
                    alt="Grupo de estudiantes de Henry"
                />
                    <h1 className="display-4">Nuestro equipo</h1>
                    <p className="lead">
Somos un equipo de estudiantes de Henry y este es nuestro proyecto final. Creamos esta aplicación con el objetivo de facilitar el acceso a buenos psicólogos y mejorar la salud mental de las personas. Nuestra plataforma ofrece una experiencia segura y confiable para conectar a individuos con profesionales calificados. Estamos comprometidos a brindar un apoyo efectivo y accesible en la búsqueda del bienestar emocional.</p>
                </div>
            </div>
          
            <div className={style.teamSection}>
                <h1 className={style.title}>NOSOTROS</h1>
                <div className={style.teamMembers}>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={ana}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={delfi}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={diego}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={facu}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={joni}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={juan}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={lau}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    <div className={style.teamMember}>
                        <img className={style.imagen}
                            src={lucas}
                            alt="Ana"
                        />
                        <a
                            href="url_del_perfil_de_LinkedIn_del_estudiante_1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className={style.linkedinLogo}
                                src="https://play-lh.googleusercontent.com/kMofEFLjobZy_bCuaiDogzBcUT-dz3BBbOrIEjJ-hqOabjK8ieuevGe6wlTD15QzOqw"
                                alt="LinkedIn"
                            />
                        </a>
                    </div>
                    {/* Repetir los siguientes divs para cada miembro del equipo */}
                </div>
            </div>
        </div>
    );
};

export default Nosotros;