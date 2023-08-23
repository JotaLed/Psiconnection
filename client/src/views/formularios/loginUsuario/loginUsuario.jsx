import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isValidPassword } from "../validaciones";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "../../../Redux/actions";
import axios from "axios";
import LoginButtonAuth0 from "./LoginAuth0";

import "./loginUsuario.css";

const LoginUsuario = () => {
  const { isAuthenticated } = useAuth0();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  //Estados locales
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

  //Estados globales:
  const dispatch = useDispatch();

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
      const response = await axios.post("/psiconection/login", formData);
      console.log(response);
      console.log("Response from server:", response.data);
      console.log("Token:", response.data.info.tokenSessionUser);
      if (response.status === 200) {
        const userRole = response.data.info.roll;

        if (userRole === "psicologo") {
          // Si el rol es diferente psicologo, muestra un mensaje y no realiza la redirección
          window.alert("Por favor inicie sesión como usuario");
        } else {
          //! cambios
          //cargamos el estado de usuario actiual
          console.log("supuesto objeto: " + response.data.info);
          await dispatch(loadCurrentUser(response.data.info));
          const tokenString = JSON.stringify(
            response.data.info.tokenSessionUser
          );

          // setToken(response.data.info.tokenSessionUser); // Aquí estás guardando el token en el estado
          // Si el rol es otro, realiza la redirección
          // handleWindow();

          localStorage.setItem("authToken", tokenString); // Guarda el token en localStorage
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      window.alert(error.response.data.error);
    }
  };

  return (
    <div className="containerLoginUsuario">
      <div className="login-formUsu">
        <h2>¡Bienvenido!</h2>
        
        <h4>ó registrate con tu correo: </h4>
        {/* Formulario de inicio de sesión local */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-formUsu">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
           {/* //*EMAIL */}
            <div className="form-groupLogUsu">
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
                      placeholder="Ingresa tú correo electrónico"
                    />
                  )}
                />
              {errors.email?.type === "pattern" && (
                <p className="errores">Formato de email incorrecto</p>
              )}

              {/*//* Contraseña */}
        <div className="form-groupLogUsu">
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
                placeholder="Ingresa tú contraseña"
                type={showPassword ? "text" : "password"} // Cambio de tipo aquí
              />
              <i
                className={`bx ${showPassword ? "bxs-hide" : "bxs-show"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
                )}
                />
              {errors.password && (
                <p className="errores">
                  Debe tener más de 6 caracteres alfanuméricos
                </p>
              )}
            </div>
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
            <div>
            <h3>Ó regístrate con:{""}</h3>
        {/* //! Botón de inicio de sesión con Google */}
        {console.log(isAuthenticated)}
        <LoginButtonAuth0 />
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
