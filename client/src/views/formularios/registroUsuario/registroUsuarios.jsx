import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import {
  isValidName,
  isValidDate,
  isValidTel,
  isValidPassword,
} from "../validaciones";
import "./registroUsuario.css";
import fetchCountriesList from "../registroPsicologo/fetchCountriesList";

const RegistroUsuario = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [countriesList, setCountriesList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountriesList();
      setCountriesList(countries);
    };
    fetchCountries();
  }, []);

  const onSubmit = async (formData) => {
    (formData.roll = "usuario"), (formData.foto = image);

    console.log("Datos a enviar:", formData);

    // Envio al backend
    try {
      const response = await axios.post(
        "/psiconection/registerUsuario",
        formData
      );

      if (response.status === 200) {
        setRegistrationSuccess(true);

        setImage(""); // Limpiar la imagen seleccionada
      }
    } catch (error) {
      // Maneja los errores
      console.error("Error al registrar:", error);
    }
  };

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const upLoadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "images");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzphgeome/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    console.log(res);
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="containerFormUsu">
      <div className="registro-formUsu">
        <h2>¡Regístrate como Usuario!</h2>
        {registrationSuccess && (
          <p className="registro-exitoso">¡Registro exitoso!</p>
        )}
        {/* Formulario de registro */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
          <div className="form-columnUsu col-md-6">
            {/* //* Nombre */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-user"></i> Nombre:
                <Controller
                  name="nombre"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    validate: isValidName,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Ingresa tu nombre"
                    />
                  )}
                />
              </label>
              {errors.nombre?.type === "required" && (
                <p className="errores">Este campo es requerido</p>
              )}
              {errors.nombre?.type === "validate" && (
                <p className="errores">
                  El nombre debe tener más de 3 letras y menos de 50
                </p>
              )}
            </div>
            {/* //*APELLIDO */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bx-user"></i> Apellido:
                <Controller
                  name="apellido"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    validate: isValidName,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Ingresa tu apellido"
                    />
                  )}
                />
              </label>
              {errors.apellido?.type === "required" && (
                <p className="errores">Este campo es requerido</p>
              )}
              {errors.apellido?.type === "validate" && (
                <p className="errores">
                  El nombre debe tener más de 3 letras y menos de 50
                </p>
              )}
            </div>
            {/* //* GENERO */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bx-male-female"></i> Género:
                <Controller
                  name="genero"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Selecciona tu género" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="" disabled>
                        Selecciona tu género
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  )}
                />
              </label>
              {errors.genero && (
                <p className="errores">{errors.genero.message}</p>
              )}
            </div>

            {/*//* EDAD */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-calendar"></i> Fecha de Nacimiento:
                <Controller
                  name="fecha_nacimiento"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es requerido",
                    validate: {
                      isValidDate: (value) =>
                        isValidDate(value) || "Debes tener al menos 18 años",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      placeholder="Selecciona tu fecha de nacimiento"
                    />
                  )}
                />
              </label>
              {errors.fechaNacimiento && (
                <p className="errores">{errors.fechaNacimiento.message}</p>
              )}
            </div>
          </div>

          <div className="form-columnUsu col-md-6">
            {/* //?????Campos de la segunda columna */}

            {/* //*PAIS */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bx-world"></i>
                País:
                <Controller
                  name="pais"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Selecciona tu país" }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="" disabled>
                        Selecciona tu país
                      </option>
                      {countriesList.map((country) => (
                        <option key={country.alpha2Code} value={country.name}>
                          {`${country.name} (${country.alpha2Code})`}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </label>
              {errors.pais && <p className="errores">{errors.pais.message}</p>}
            </div>
            {/* //* TELEFONO*/}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bx-phone"></i> Teléfono:
                <Controller
                  name="telefono"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es requerido",
                    validate: isValidTel,
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="Ingresa tu teléfono"
                    />
                  )}
                />
              </label>
              {errors.telefono && (
                <p className="errores">{errors.telefono.message}</p>
              )}
            </div>
            {/*//* Foto */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-camera"></i> Foto de perfil:
                <input type="file" name="file" onChange={upLoadImage} />
                {/* /(<img src={image} style={{width: "300px"}}/>) */}
              </label>
            </div>
            <div className="form-groupUsu">
              <label>
                <i className="bx bxs-envelope"></i>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Email del Usuario"
                    />
                  )}
                />
              </label>
              {errors.email?.type === "pattern" && (
                <p className="errores">Formato de email incorrecto</p>
              )}

              <label>
                <i className="bx bxs-lock-alt"></i>
                <Controller
                  name="contraseña"
                  control={control}
                  defaultValue=""
                  rules={{ validate: isValidPassword }}
                  render={({ field }) => (
                    <div className="password-input">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"} // Cambio de tipo aquí
                        placeholder="Contraseña"
                      />

                      <i
                        className={`bx ${
                          showPassword ? "bxs-hide" : "bxs-show"
                        }`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></i>
                    </div>
                  )}
                />
              </label>
              {errors.password && (
                <p className="errores">
                  Debe tener más de 6 caracteres alfanuméricos
                </p>
              )}
            </div>
          </div>

          {/* //!!! Botón de registro */}
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
    </div>
  );
};

export default RegistroUsuario;
