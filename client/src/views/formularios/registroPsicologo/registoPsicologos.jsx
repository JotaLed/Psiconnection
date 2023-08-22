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
import "./registroPsicologo.css";
import fetchCountriesList from "./fetchCountriesList";
import { useNavigate } from "react-router-dom";

const RegistroPsicologo = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedDays, setSelectedDays] = useState([]); // Estado para los días seleccionados
  const [selectedHours, setSelectedHours] = useState([]); // Estado para las horas seleccionadas
  const [countriesList, setCountriesList] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Estado para las especialidades seleccionadas
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [fileData, setFileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountriesList();
      setCountriesList(countries);
    };
    fetchCountries();
  }, []);

  const onSubmit = async (formData) => {
    formData.roll = "psicologo";
    formData.dias = selectedDays;
    formData.horas = selectedHours;
    formData.foto = image;
    formData.zona_horaria = "est";
    const selectedSpecialtyValues = selectedSpecialties.map(
      (option) => option.value
    );
    formData.especialidad = selectedSpecialtyValues;
    formData.descripcion = formData.descripcion || ""; // En caso de que sea undefined
    formData.licencia = fileData.url;

    console.log("Datos a enviar:", formData);
    console.log("Días seleccionados:", selectedDays);
    console.log("imagen", image);
    // console.log('foto:', image);

    // Envio al backend
    try {
      const response = await axios.post(
        "/psiconection/registerPsicologo",
        formData
      );

      // Realiza alguna acción en base a la respuesta del servidor
      if (response.status === 200) {
        setRegistrationSuccess(true);
        // Resetea los campos del formulario
        setSelectedDays([]);
        setSelectedHours([]);
        setImage("");
        alert("¡Registro exitoso!");
        navigate("/loginPsicologo");
        // Resetea el formulario después de un registro exitoso
        reset();
      }
    } catch (error) {
      // Maneja los errores
      console.error("Error al registrar:", error);
    }
  };

  const handleDaySelect = (day) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
      } else {
        return [...prevSelectedDays, day];
      }
    });
  };

  {
    /* //* CARGA DE PDF*/
  }
  const handleLicenseUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ppddfs"); // Ajusta el nombre del preset de Cloudinary
    data.append("pdfs", "licenses");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzphgeome/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const fileData = await response.json();
      console.log(fileData);
      setFileData(fileData); // Guardar los datos del archivo en el estado
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  {
    /* //* CARGA DE IMAGENES*/
  }
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
    <div className="containerFormPsico">
      <div className="registro-formPsico">
        <h2>¡Regístrate como Psicólogo!</h2>
        {/* Formulario de registro */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
          <div className="form-columnPsico col-md-6">
            {/* //* Nombre */}
            <div className="form-groupRegPsico">
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
            <div className="form-groupRegPsico">
              <label>
                <i class="bx bx-user"></i> Apellido:
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
              {errors.nombre?.type === "required" && (
                <p className="errores">Este campo es requerido</p>
              )}
              {errors.nombre?.type === "validate" && (
                <p className="errores">
                  El nombre debe tener más de 3 letras y menos de 50
                </p>
              )}
            </div>
            {/* //* GENERO */}
            <div className="form-groupRegPsico">
              <label>
                <i class="bx bx-male-female"></i> Género:
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
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  )}
                />
              </label>
              {errors.genero && (
                <p className="errores">{errors.genero.message}</p>
              )}
            </div>

            {/*//* EDAD */}
            <div className="form-groupRegPsico">
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
            {/* //*PAIS */}
            <div className="form-groupRegPsico">
              <label>
                <i class="bx bx-world"></i>
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
            <div className="form-groupRegPsico">
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
            {/* //* EMAIL */}
            <div className="form-groupPsico">
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
                      placeholder="Email del Psicologo"
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
                  name="password"
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
            {/* //*DESCRIPCION*/}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bx-message"></i> Descripción de la experiencia:
                <Controller
                  name="descripcion"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      placeholder="Añade una descripción de tu experiencia"
                    />
                  )}
                />
              </label>
            </div>
          </div>

          <div className="form-columnPsico col-md-6">
            {/* //?????Campos de la segunda columna */}
            {/*//* Foto */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bxs-camera"></i> Foto de perfil:
                <input type="file" name="file" onChange={upLoadImage} />
                /(
                <img src={image} style={{ width: "150px" }} />)
              </label>
            </div>

            {/*//* LICENCIA */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bxs-file-pdf"></i> Subir Licencia (PDF):
                <input
                  type="file"
                  accept=".pdf" // Asegúrate de que solo se permitan archivos PDF
                  onChange={handleLicenseUpload} // Maneja la función para subir el archivo
                />
              </label>
            </div>

            {/* //* días */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bxs-calendar"></i> Días disponibles:
              </label>
              <div className="day-selection">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Mon")}
                    onChange={() => handleDaySelect("Mon")}
                  />
                  Lunes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Tue")}
                    onChange={() => handleDaySelect("Tue")}
                  />
                  Martes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Wed")}
                    onChange={() => handleDaySelect("Wed")}
                  />
                  Miercoles
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Thu")}
                    onChange={() => handleDaySelect("Thu")}
                  />
                  Jueves
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Fri")}
                    onChange={() => handleDaySelect("Fri")}
                  />
                  Viernes
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Sat")}
                    onChange={() => handleDaySelect("Sat")}
                  />
                  Sabado
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedDays.includes("Sun")}
                    onChange={() => handleDaySelect("Sun")}
                  />
                  Domingo
                </label>

                {/* Repite para los otros días */}
              </div>
            </div>

            {/* //*horas */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bxs-time-five"></i> Hora disponible:
              </label>
              <Select
                isMulti
                options={[
                  { value: "1-2", label: "1:00 - 2:00" },
                  { value: "2-3", label: "2:00 - 3:00" },
                  { value: "3-4", label: "3:00 - 4:00" },
                  { value: "4-5", label: "4:00 - 5:00" },
                  { value: "5-6", label: "5:00 - 6:00" },
                  { value: "6-7", label: "6:00 - 7:00" },
                ]}
                value={selectedHours.map((hour) => ({
                  value: hour,
                  label: hour,
                }))}
                onChange={(selectedOption) => {
                  const selectedHourValues = selectedOption.map(
                    (option) => option.value
                  );
                  setSelectedHours(selectedHourValues);
                }}
                placeholder="Selecciona una o más horas"
              />
              {errors.hora && <p className="errores">{errors.hora.message}</p>}
            </div>
            {/* //*tarifa */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bx-dollar"></i> Tarifa:
                <Controller
                  name="tarifa" // Nombre del campo en el objeto formData
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Ingresa la tarifa",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text" // Cambia el tipo a text
                      placeholder="Ingresa la tarifa en USD"
                    />
                  )}
                />
              </label>
              {errors.tarifa && (
                <p className="errores">{errors.tarifa.message}</p>
              )}
            </div>
            {/* //*Especialidad */}
            <div className="form-groupRegPsico">
              <label>
                <i className="bx bx-book"></i> Especialidad:
                <Select
                  isMulti
                  options={[
                    {
                      value: "Psicología de pareja",
                      label: "Psicología de pareja",
                    },
                    {
                      value: "Psicología infantil",
                      label: "Psicología cognitivo-conductual",
                    },
                    { value: "Psicoanálisis", label: "Psicoanálisis" },
                    {
                      value: "Psicología infantil",
                      label: "Psicología infantil",
                    },
                    { value: "Sexología", label: "Sexología" },
                    // Agrega más especialidades aquí
                  ]}
                  value={selectedSpecialties}
                  onChange={(selectedOptions) =>
                    setSelectedSpecialties(selectedOptions)
                  }
                  placeholder="Selecciona tus specialidades"
                />
              </label>
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

export default RegistroPsicologo;
