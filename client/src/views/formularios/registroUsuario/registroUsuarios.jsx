import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons/css/boxicons.min.css";
import {
  isValidName,
  isValidDate,
  isValidTel,
  isValidPassword,
} from "../validaciones";
import "./registroUsuario.css";
import fetchCountriesList from "../registroPsicologo/fetchCountriesList";
import { useNavigate } from "react-router-dom";

const RegistroUsuario = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      genero: "",
      pais: "",
    },
  });

  const [countriesList, setCountriesList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountriesList();
      setCountriesList(countries);
    };
    fetchCountries();
  }, []);

  const onSubmit = async (formData) => {
    formData.roll = "usuario";
    formData.foto = image;

    if (shouldShowErrorToast(formData)) {
      return;
    }

    try {
      const response = await axios.post(
        "/psiconection/registerUsuario",
        formData
      );

      if (response.status === 200) {
        toast.success(`¡Bienvenid@, ${formData.nombre}! Registro exitoso`);
        setTimeout(() => {
          navigate("/loginUsuario");
          setImage("");
        }, 4000); // Espera 2 segundos antes de redirigir
      }
    } catch (error) {
      handleErrorResponse(error);
    }
  };

  const shouldShowErrorToast = (formData) => {
    const requiredFields = [
      "nombre",
      "apellido",
      "genero",
      "fecha_nacimiento",
      "pais",
      "telefono",
      "email",
      "contraseña",
    ];

    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Por favor completa los campos obligatorios: ${missingFields.join(', ')}`);
      return true;
    }

    if (errors.email?.type === "pattern") {
      toast.error("Formato de correo electrónico incorrecto.");
      return true;
    }
    if (errors.fecha_nacimiento?.type === "validate") {
      toast.error("Debes tener al menos 18 años para registrarte.");
      return true;
    }
    if (errors.contraseña) {
      toast.error("La contraseña debe tener al menos 6 caracteres alfanuméricos.");
      return true;
    }
    return false;
  };


  const handleErrorResponse = (error) => {
    if (error.response) {
      if (error.response.status === 400) {
        if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors)
            .map((errorMessage) => `• ${errorMessage}`)
            .join("\n");
          toast.error(`Error en el formulario:\n${errorMessages}`);
        } else if (error.response.data.message === "Correo ya registrado") {
          toast.error("El correo electrónico ya está registrado. Por favor, usa otro correo.");
        } else {
          toast.error("Error en el formulario. Verifica los datos.");
        }
      } else {
        toast.error("Error al registrar. Inténtalo de nuevo más tarde.");
      }
    } else {
      toast.error("Error al conectar con el servidor.");
    }
  };

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
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
      <div className="containerFormUsu">
        <div className="registro-formUsu">
          <h2 className="form-title">¡Regístrate como Usuario!</h2>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate className="row">
            <div className="form-columnUsu col-md-6">
              <div className="form-groupRegUsu">
                <label>
                  <i className="bx bxs-user"></i> Nombre:
                  </label>
                  <Controller
                    name="nombre"
                    control={control}
                    rules={{
                      required: "Este campo es requerido",
                      validate: isValidName,
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Ingresa tu nombre"
                        className={errors.nombre ? "input-error" : ""}
                      />
                    )}
                  />
                
                {errors.nombre && (
                  <p className="errores">El nombre es requerido</p>
                )}
              </div>
            {/* //*APELLIDO */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bx-user"></i> Apellido:
                </label>
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
              </label>
                <Controller
                  name="genero"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Selecciona tu género" }}
                  render={({ field }) => (
                    <select {...field} className={errors.genero ? "input-error" : ""}>
                      <option value="" disabled>
                        Selecciona tu género
                      </option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </select>
                  )}
                />
              
              {errors.genero && (
                <p className="errores">{errors.genero.message}</p>
              )}
            </div>

            {/*//* EDAD */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-calendar"></i> Fecha de Nacimiento:
                </label>
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
                    <div>
                      <input
                        {...field}
                        type="date"
                        placeholder="Selecciona tu fecha de nacimiento"
                        className={errors.fecha_nacimiento ? "input-error" : ""}
                      />
                      {errors.fecha_nacimiento && (
                        <p className="errores">{errors.fecha_nacimiento.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
 
{/* //* TELEFONO*/}

<div className="form-groupRegUsu">
  <label>
    <i className="bx bx-phone"></i> Teléfono:
  </label>
  <Controller
    name="telefono"
    control={control}
    defaultValue=""
    rules={{
      required: "Este campo es requerido",
      validate: isValidTel,
    }}
    render={({ field }) => (
      <div>
        <input
          {...field}
          type="tel"
          placeholder="Ingresa tu teléfono"
        />
        {errors.telefono && (
          <p className="errores">{errors.telefono.message}</p>
        )}
      </div>
    )}
  />
</div>
          </div>

          <div className="form-columnUsu col-md-6">
            {/* //?????Campos de la segunda columna */}
{/* //*PAIS */}
<div className="form-groupRegUsu">
              <label>
                <i className="bx bx-world"></i>
                País:
                </label>
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
             
              {errors.pais && <p className="errores">{errors.pais.message}</p>}
            </div>
           
            
            {/*//* Foto */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-camera"></i> Foto de perfil: 
              </label>
                <input type="file" name="file" onChange={upLoadImage} />
                {/* /(<img src={image} style={{width: "300px"}}/>) */}
            </div>
         {/*//* Email */}
            <div className="form-groupRegUsu">
              <label>
                <i className="bx bxs-envelope"></i> Correo electrónico:
              </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                    />
                  )}
                />
              {errors.email?.type === "pattern" && (
                <p className="errores">Formato de email incorrecto</p>
              )}
              </div>
 {/*//* Contraseña */}
        <div className="form-groupRegUsu">
            <label>
              <i className="bx bxs-lock-alt"></i> Contraseña:
            </label>
            <Controller
              name="contraseña"
              control={control}
              defaultValue=""
              rules={{ validate: isValidPassword }}
              render={({ field }) => (
            <div>
   <input
          {...field}
          placeholder="Crea una contraseña"
          type={showPassword ? "text" : "password"} // Cambio de tipo aquí
          className={errors.contraseña ? "input-error" : ""}
        />
        {errors.contraseña && (
          <p className="errores">
            Debe tener más de 6 caracteres alfanuméricos
          </p>
        )}
      </div>
    )}
  />
</div>



</div>

            <div className="col-12">
            <Button type="submit" className="btnUsu btn-primary">
              Registrarse
            </Button>

            <div className="link-back">
              <Link to="/form" className="back-link">
                Volver
              </Link>
            </div>
          </div>
      <ToastContainer
          position="bottom-right"
          autoClose={3000}
          style={{ zIndex: 5000 }} // Ajusta el valor según tus necesidades
        />
        </Form>
      </div>
    </div>
  );
};

export default RegistroUsuario;
