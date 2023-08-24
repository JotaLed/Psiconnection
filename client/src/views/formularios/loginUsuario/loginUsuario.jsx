import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { isValidPassword } from "../validaciones";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { loadCurrentUser } from "../../../Redux/actions";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginButtonAuth0 from "./LoginAuth0";
import "./loginUsuario.css";

const LoginUsuario = () => {
  const { isAuthenticated } = useAuth0();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleWindow = () => {
    localStorage.setItem("authToken", token);
    navigate("/home");
  };

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post("/psiconection/login", formData);

      if (response.status === 200) {
        const userRole = response.data.info.roll;
        if (userRole === "psicologo") {
          toast.error("Por favor inicie sesión como usuario");
          return;
        }

        // Carga el estado de usuario actual y guarda el token en el localStorage
        await dispatch(loadCurrentUser(response.data.info));
        const tokenString = JSON.stringify(
          response.data.info.tokenSessionUser
        );
        localStorage.setItem("authToken", tokenString);

        // Muestra el toast de inicio de sesión exitoso y redirige al usuario después de cerrarlo
        toast.success(`¡Bienvenid@, ${response.data.info.nombre}! Inicio de sesión exitoso.`, {
          autoClose: 2000,
          onClose: () => {
            navigate("/home");
          },
        });
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      if (error.response) {
        const status = error.response.status;
        if (status === 404) {
          toast.error("No encontramos un correo registrado. Regístrate para crear una cuenta.");
        } else if (status === 401) {
          toast.error("El correo o la contraseña son incorrectos. Inténtalo nuevamente.");
        } else {
          toast.error("Hubo un problema al procesar la solicitud. Por favor, intenta nuevamente más tarde.");
        }
      } else {
        toast.error("Hubo un problema al conectar con el servidor.");
      }
    }
  };
  return (
    <div className="containerLoginUsuario">
      <div className="login-formUsu">
        <h2>¡Bienvenido!</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-formUsu">
            <h4>Inicia sesión:</h4>
            {errors.email && (
              <p className="error-message">Por favor ingresa tu correo electrónico.</p>
            )}
            {errors.contraseña && (
              <p className="error-message">Por favor ingresa tu contraseña.</p>
            )}
            <div className="form-groupLogUsu">
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
            </div>
            <button type="submit" className="btnIsUsu">
              Iniciar Sesión
            </button>

            {/* Enlace para ir a la página de registro */}
            <div className="register-link">
              ¿No tienes una cuenta?{" "}
              <Link to="/registroUsuario" className="register-link-textUsu">
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

export default LoginUsuario;
