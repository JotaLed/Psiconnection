import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./loginUsuario.css";
import { isValidPassword } from "../validaciones";
import axios from "axios";
import { Link } from "react-router-dom";
import LoginButtonAuth0 from "./LoginAuth0";
import LogoutButtonAuth0 from "./LogoutAutho0";
import { useAuth0 } from "@auth0/auth0-react";

const LoginUsuario = () => {
  const { isAuthenticated } = useAuth0();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  // const [performValidations, setPerformValidations] = useState(true); // Estado para controlar las validaciones
  const navigate = useNavigate();
  //const { loginWithRedirect } = useAuth0();
  const [token, setToken] = useState("");
  //  const onAuth0SignIn = () => {
  //     loginWithRedirect();
  //   };
  // Guardar un token en el localStorage después de un inicio de sesión exitoso
  const handleWindow = () => {
    localStorage.setItem("authToken", token); // Guarda el token en localStorage
    navigate("/home");
  };

  // Recuperar un token del localStorage en otro componente
  //const authToken = localStorage.getItem('authToken');

  const onSubmit = async (formData) => {
    if (!formData.email || !formData.password) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/psiconection/login",
        formData
      );
      console.log(response);
      console.log("Response from server:", response.data);
      console.log("Token:", response.data.info.tokenSessionUser);
      if (response.status === 200) {
        const userRole = response.data.info.roll;

        if (userRole === "psicologo") {
          // Si el rol es diferente psicologo, muestra un mensaje y no realiza la redirección
          window.alert("Por favor inicie sesión como usuario");
        } else {
          setToken(response.data.info.tokenSessionUser); // Aquí estás guardando el token en el estado
          // Si el rol es otro, realiza la redirección
          handleWindow();
        }
      } else {
        setErrorMessage("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      window.alert(error.response.data.error);
    }
  };

  return (
    <div className="containerLoginUsuario">
      <div className="login-formUsu">
        <h2>¡Bienvenidos Usuarios!</h2>
        <h3>Para ingresar a nuestra comunidad, inicia sesión:</h3>

        {/* //! Botón de inicio de sesión con Google */}
        {console.log(isAuthenticated)}
        {isAuthenticated ? <LogoutButtonAuth0 /> : <LoginButtonAuth0 />}

        {/* Formulario de inicio de sesión local */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-formUsu">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>

            {/* Enlace para ir a la página de registro */}
            <div className="register-link">
              ¿No tienes una cuenta?{" "}
              <Link to="/registroUsuario" className="register-link-text">
                Regístrate aquí
              </Link>
            </div>
            {/* //! Volver a la pagina de selección roll */}
            <div className="link-back">
              {/* Enlace para volver a la página anterior */}
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

export default LoginUsuario;
