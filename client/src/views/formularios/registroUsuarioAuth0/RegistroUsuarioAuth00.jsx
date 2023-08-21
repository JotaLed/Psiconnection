import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import fetchCountriesList from "../registroPsicologo/fetchCountriesList";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "./RegistroUsuarioAuth00.module.css";
const RegistroUsuarioAuth0 = () => {
  const { user, isAuthenticated } = useAuth0();
  const [countriesList, setCountriesList] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [image, setImage] = useState("");
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    foto: "",
    fecha_nacimiento: "",
    pais: "",
    genero: "",
    telefono: "",
    email: "",
    contraseña: "",
    roll: "usuario",
  });
  const [errors, setErrors] = useState({
    fecha_nacimiento: "",
    telefono: "",
    contraseña: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountriesList();
      setCountriesList(countries);
    };
    fetchCountries();

    if (isAuthenticated && user) {
      setForm({
        nombre: user.given_name || "",
        apellido: user.family_name || "",
        foto: user.picture || "",
        email: user.email || "",
        fecha_nacimiento: "",
        pais: "",
        genero: "",
        telefono: "",
        contraseña: "",
        roll: "usuario",
      });
    }
  }, [isAuthenticated, user]);

  const isUnder18 = (selectedDate) => {
    const birthdate = new Date(selectedDate);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();

    return (
      age < 18 ||
      (age === 18 && today.getMonth() < birthdate.getMonth()) ||
      (age === 18 &&
        today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate())
    );
  };

  const validateTelefono = (telefonoValue) => {
    if (!/^[0-9]{10,20}$/.test(telefonoValue)) {
      return "El teléfono debe tener entre 10 y 20 dígitos numéricos.";
    }
    return "";
  };

  const validatecontraseña = (contraseñaValue) => {
    if (!/^[A-Za-z0-9]{6,13}$/.test(contraseñaValue)) {
      return "La contraseña debe contener entre 6 y 13 caracteres alfanuméricos.";
    }
    return "";
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const dateValidationError = isUnder18(selectedDate)
      ? "Debes tener al menos 18 años para registrarte."
      : "";

    setForm((prevData) => ({
      ...prevData,
      fecha_nacimiento: selectedDate,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      fecha_nacimiento: dateValidationError,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const validationError =
      name === "telefono"
        ? validateTelefono(value)
        : name === "contraseña"
        ? validatecontraseña(value)
        : "";

    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasEmptyFields = Object.values(form).some((value) => value === "");

    if (hasEmptyFields) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Se deben corregir los campos.");
      return;
    }

    setCargando(true);

    try {
      const imageUrl = await uploadImageToCloudinary(form.foto); // Cargar imagen en Cloudinary
      const response = await axios.post("/psiconection/registerUsuario", {
        ...form,
        foto: imageUrl,
      });

      setCargando(false);
      console.log("Formulario enviado:", response);

      setRegistrationSuccess(true);
      setRedirectToHome(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        console.error("Error al registrar:", error);
      }
      return;
    }

    setForm({
      nombre: "",
      apellido: "",
      foto: "",
      fecha_nacimiento: "",
      pais: "",
      genero: "",
      telefono: "",
      email: "",
      contraseña: "",
    });
  };

  const uploadImageToCloudinary = async (imageUrl) => {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dzphgeome/image/upload",
      {
        method: "POST",
        body: JSON.stringify({
          file: imageUrl,
          upload_preset: "images",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  return (
    <div className="containerFormUsu">
      <div className="registro-formUsu">
        <h2>¡Regístrate como Usuario!</h2>
        {cargando ? (
          <div>
            <h1>Cargando</h1>
            <h1>Cargando</h1>
            <h1>Cargando</h1>
            <h1>Cargando</h1>
            <div className="loading-spinner">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          </div>
        ) : registrationSuccess ? (
          <div>
            <p className="registro-exitoso">¡Registro exitoso!</p>
            <button
              onClick={() => {
                navigate(import.meta.env.VITE_URL_REDIRECT_LOGIN);
              }}
            >
              Continuar
            </button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="row">
              <div className="form-columnUsu col-md-6">
                <div className="form-groupRegUsu">
                  <i className="bx bxs-user"></i> Nombre:
                  <input
                    className="bx bxs-user"
                    name="nombre"
                    defaultValue={form.nombre}
                    type="text"
                    disabled
                  />
                </div>
                <div className="form-groupRegUsu">
                  <i className="bx bx-user"></i> Apellido:
                  <input
                    className="bx bx-user"
                    name="apellido"
                    defaultValue={form.apellido}
                    type="text"
                    disabled
                  />
                </div>
                <div className="form-groupRegUsu">
                  <i className="bx bx-male-female"></i> Género:
                  <select
                    className="bx bx-male-female"
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                  >
                    <option value="">-Select-</option>
                    <option value="femenino">Femenino</option>
                    <option value="masculino">Masculino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div className="form-groupRegUsu">
                  <i className="bx bxs-calendar"></i> Fecha de Nacimiento:
                  <input
                    className="bx bxs-calendar"
                    name="fecha_nacimiento"
                    value={form.fecha_nacimiento}
                    type="date"
                    onChange={handleDateChange}
                  />
                  <span className="error-message">
                    {errors.fecha_nacimiento}
                  </span>
                </div>
              </div>

              <div className="form-columnUsu col-md-6">
                <div className="form-groupRegUsu">
                  <i className="bx bx-world"></i>
                  País:
                  <select
                    className="bx bx-world"
                    name="pais"
                    value={form.pais}
                    onChange={handleChange}
                  >
                    <option value="">-Select-</option>
                    {countriesList.map((country) => (
                      <option key={country.alpha2Code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-groupRegUsu">
                  <i className="bx bx-phone"></i> Teléfono:
                  <input
                    className="bx bx-phone"
                    name="telefono"
                    value={form.telefono}
                    type="text"
                    onChange={handleChange}
                    required
                  />
                  <span className="error-message">{errors.telefono}</span>
                </div>
                <div className="form-groupRegUsu">
                  <i className="bx bxs-camera"></i> Foto de perfil:
                  <img
                    className="bx bxs-camera"
                    src={form.foto}
                    alt={form.nombre}
                    disabled
                  />
                </div>
                <div className="form-groupUsu">
                  <i className="bx bxs-envelope"></i>
                  <input
                    className="bx bxs-envelope"
                    name="email"
                    defaultValue={form.email}
                    type="text"
                    disabled
                  />
                </div>

                <div>
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    className="contraseña-input"
                    name="contraseña"
                    value={form.contraseña}
                    type="contraseña"
                    required
                    onChange={handleChange}
                  />
                  <span className="error-message">{errors.contraseña}</span>
                </div>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Registrarse
                </button>

                {/* Enlace para volver */}
                <div className="link-back">
                  <Link to="/form" className="back-link">
                    Volver
                  </Link>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistroUsuarioAuth0;
