import React, { useState, useEffect, useCallback } from "react";
import { Card, Nav, Button, Form } from "react-bootstrap";
import styles from "./Account.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  loadDetail,
  updatePsic,
  getSpecialities,
  getDetailAuthPsicologo,
} from "../../Redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import Description from "./AccountComponents/description";
import BasicInfo from "./AccountComponents/basicInfo";
import Foto from "./AccountComponents/foto";
import ProfileInfo from "./AccountComponents/ProfileInfo";
import ProfileBar from "./AccountComponents/ProfileBar";
import CitasPsic from "./AccountComponents/CitasPsic";
import axios from "axios";

const Account = () => {
  const [selectedTab, setSelectedTab] = useState("profile");

  // const psicology = useSelector((store) => store.psicoloDetail)

  // const psicology = useSelector((store) => store.psicoloDetail)
  const psicology = useSelector((store) => store.psicologoDetailAcount);
  const opcionesEspecialidades = useSelector((store) => store.especialidades);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [dateToUpdate, setDateToUpdate] = useState({
    id: id,
  });
  const [imagen, setImagen] = useState();
  const [esp, setEsp] = useState();
  const [auth, setAuth] = useState(false);
  // const opcionesEspecialidades = [
  //     'Psicología de pareja',
  //     'Psicología infantil',
  //     'Psicología cognitivo-conductual',
  //     'Psicoanálisis',
  //     'Sexología'
  // ];

  //Useeffect

  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    // await dispatch(loadDetail(id));
    await dispatch(getDetailAuthPsicologo(id));
    await dispatch(getSpecialities());
    setIsLoading(false);
  }, [id, dispatch]);

  useEffect(() => {
    const aux = async () => {
      // await dispatch(loadDetail(id))
      await dispatch(getDetailAuthPsicologo(id));
      await dispatch(getSpecialities());
      setIsLoading(false);

      setImagen(psicology.foto);
      setEsp(psicology.especialidad);
    };
    aux();
  }, [id, dispatch, psicology.foto]);
  console.log("psicologo cuenta", psicology);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setDateToUpdate({ ...dateToUpdate, especialidad: esp });
  }, [esp]);
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
    console.log(value.foto);
    if (name === "foto") {
      setImagen(value.foto);
    }
    if (name === "tarifa" && value < 1) {
      return;
    }
    setDateToUpdate({ ...dateToUpdate, [name]: value });
  };
  const handleSubmit = async () => {
    const emptyFields = Object.values(dateToUpdate).some(
      (value) => value === ""
    );
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
    dispatch(updatePsic(dateToUpdate));
  };

  const handleOptionChange = (optionValue) => {
    if (esp.includes(optionValue)) {
      setEsp(esp.filter((option) => option !== optionValue));
    } else {
      setEsp([...esp, optionValue]);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se busca el psicólogo
  }

  console.log(psicology);

  const logout = async () => {
    await window.localStorage.clear();
    navigate("/");
  };

  const redirect = () => {
    window.alert("404 Not found");
    navigate("/");
  };

  return (
    <div>
      {typeof psicology === "string" ? redirect() : null}
      <div className={styles.accountContainer}>
        <div className={styles.sidebar}>
          <ProfileBar
            handleTabChange={handleTabChange}
            selectedTab={selectedTab}
          />
        </div>
        <div className={styles.mainContent}>
          <Card className={styles.card}>
            <Card.Body className={`${styles.cardBody}`}>
              {selectedTab === "profile" && (
                <>
                  {!isEditing && (
                    <Button variant="link" onClick={() => setIsEditing(true)}>
                      <i className="fas fa-pencil-alt"></i> Editar
                    </Button>
                  )}

                  <div>
                    {isEditing ? (
                      <>
                        <h1 className={styles.title}>Editar Perfil</h1>
                        <Form onSubmit={handleSubmit}>
                          <div className={styles.propiedades}>
                            <BasicInfo
                              handleChange={handleChange}
                              psicology={psicology}
                            />
                            <Foto handleChange={handleChange} imagen={imagen} />

                            <Form.Group controlId="options">
                              <Form.Label className={styles.prop}>
                                Especialidades:
                              </Form.Label>
                              <div className={styles.textLeft}>
                                {opcionesEspecialidades.map((opcion) => (
                                  <Form.Check
                                    key={opcion}
                                    type="checkbox"
                                    label={opcion}
                                    value={opcion}
                                    checked={esp?.includes(opcion)}
                                    onChange={() => handleOptionChange(opcion)}
                                  />
                                ))}
                              </div>
                            </Form.Group>
                          </div>
                          <Description
                            descrip={psicology.descripcion}
                            handleChange={handleChange}
                          />
                          <Button variant="outline-primary" type="submit">
                            Guardar Cambios
                          </Button>
                        </Form>
                      </>
                    ) : (
                      <>
                        {" "}
                        <ProfileInfo
                          psicology={psicology}
                          imagen={imagen}
                          id={id}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
              {selectedTab === "reservations" && (
                <div>
                  <CitasPsic />
                </div>
              )}
              {selectedTab === "logout" && (
                <h2
                  onClick={() => {
                    logout();
                  }}
                >
                  Cerrar Sesión
                </h2>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
