import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import fetchCountriesList from "../registroPsicologo/fetchCountriesList";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegistroUsuarioAuth0 = () => {
  const { user, isAuthenticated } = useAuth0();
  const [countriesList, setCountriesList] = useState([]);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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

  const validateContraseña = (contraseñaValue) => {
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
        ? validateContraseña(value)
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

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Se debe completar o corregir los campos.");
      return;
    }

    try {
      const response = await axios.post("/psiconection/registerUsuario", form);
      console.log("Formulario enviado:", response);
      // console.log("Formulario enviado:", form);

      setRegistrationSuccess(true);
      setRedirectToHome(true);
    } catch (error) {
      console.error("Error al registrar:", error);
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

  return (
    <div>
      <h1>¡Regístrate como Usuario!</h1>
      <h1>¡Regístrate como Usuario!</h1>
      <h1>¡Regístrate como Usuario!</h1>
      {registrationSuccess ? (
        <div>
          <p>¡Usuario registrado exitosamente!</p>
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Continuar
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre: </label>
              <input
                name="nombre"
                defaultValue={form.nombre}
                type="text"
                disabled
              />
            </div>
            <div>
              <label>Apellido: </label>
              <input
                name="apellido"
                defaultValue={form.apellido}
                type="text"
                disabled
              />
            </div>
            <div>
              <label>Foto: </label>
              <img src={form.foto} alt={form.nombre} disabled />
            </div>
            <div>
              <label>Email: </label>
              <input
                name="email"
                defaultValue={form.email}
                type="text"
                disabled
              />
            </div>
            <div>
              <label>Fecha de nacimiento: </label>
              <input
                name="fecha_nacimiento"
                value={form.fecha_nacimiento}
                type="date"
                onChange={handleDateChange}
              />
              <span className="error-message">{errors.fecha_nacimiento}</span>
            </div>
            <div>
              <label>Género: </label>
              <select name="genero" value={form.genero} onChange={handleChange}>
                <option value="">-Select-</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
                <option value="alien">Alien</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label>País: </label>
              <select name="pais" value={form.pais} onChange={handleChange}>
                <option value="">-Select-</option>
                {countriesList.map((country) => (
                  <option key={country.alpha2Code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Teléfono: </label>
              <input
                name="telefono"
                value={form.telefono}
                type="text"
                onChange={handleChange}
                required
              />
              <span className="error-message">{errors.telefono}</span>
            </div>
            <div>
              <label>Contraseña: </label>
              <input
                name="contraseña"
                value={form.contraseña}
                type="password"
                required
                onChange={handleChange}
              />
              <span className="error-message">{errors.contraseña}</span>
            </div>
            <button type="submit">Registrar</button>
          </form>
          <div>
            <Link to="/form">
              <button>Volver</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroUsuarioAuth0;
