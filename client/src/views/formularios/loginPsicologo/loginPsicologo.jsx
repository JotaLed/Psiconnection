import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import './loginPsicologo.css'
import { isValidPassword } from "../validaciones";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const LoginPsicologo = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [token, setToken] = useState("");

  const handleWindow = () => {
    localStorage.setItem("authToken", token);
    // Guarda el token en localStorage
    navigate("/nosotros");
  };

  const onSubmit = async (formData) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await axios.post("/psiconection/login", formData);

      if (response.status === 200) {
        const userRole = response.data.info.roll;

        if (userRole !== "psicologo") {
          toast.error("Por favor inicie sesión como psicólogo");
        } else {
          const tokenString = JSON.stringify(response.data.info.tokenSession);
          window.localStorage.setItem("authToken", tokenString);
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);

      if (error.response) {
        if (error.response.data && error.response.data.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error("Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
        }
      } else {
        toast.error("No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.");
      }
    }
  };
  return (
    <div className="containerLoginPsico">
      <div className="login-formPsico">
        <h2 className="h2Psico">¡Bienvenidos Psicólogos!</h2>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-formPsico">
            <h4 className="h4Psico">Inicia sesión:</h4>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
                 {/* //*EMAIL */}
         <div className="form-groupLogPsico">
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
        <div className="form-groupLogPsico">
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
            <button type="submit" className="btnIsPsico">
              Iniciar Sesión
            </button>
            </div>
   </Form>
   <div className="register-link">
          ¿No tienes una cuenta?{" "}
          <Link to="/registroPsicologo" className="register-link-textPsico">
            Regístrate aquí
          </Link>
        </div>
        <div className="link-back">
          <Link to="/form" className="back-link">
            Volver
          </Link>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          style={{ zIndex: 5000 }}
        />
      </div>
    </div>
  );
};

export default LoginPsicologo;