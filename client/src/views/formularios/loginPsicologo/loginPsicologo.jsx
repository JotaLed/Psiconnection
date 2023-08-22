import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./loginPsicologo.css";
import { isValidPassword } from "../validaciones";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    if (!formData.email || !formData.password) {
      setErrorMessage("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await axios.post("/psiconection/login", formData);
      console.log(response);
      console.log("Response from server:", response.data);
      console.log("Token:", response.data.info.tokenSession);
      if (response.status === 200) {
        const userRole = response.data.info.roll;

        if (userRole !== "psicologo") {
          // si es dife a psico error y no realiza la redirección
          window.alert("Por favor inicie sesión como psicologo");
        } else {
          //! cambios
          // setToken(response.data.info.tokenSession);
          // Aquí estás guardando el token en el estado tokenSession
          const tokenString = JSON.stringify(response.data.info.tokenSession);
          window.localStorage.setItem("authToken", tokenString);
          navigate("/home");
        }
      }
      // else {
      //   setErrorMessage('Credenciales inválidas');
      // }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      window.alert(error.response.data.error);
    }
  };
  return (
    <div className="containerLoginPisco">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="login-formPsico">
          <h2>¡Bienvenidos Psicologos!</h2>
          <h3 className="title">inicia sesión:</h3>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                    placeholder="example@gmail.com"
                  />
                )}
              />
            </label>
            {errors.email?.type === "pattern" && (
              <p className="errores">Formato de email incorrecto</p>
            )}
          <div className="form-groupPsico">
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
                      className={`bx ${showPassword ? "bxs-hide" : "bxs-show"}`}
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  </div>
                )}
              />
            </label>
            </div>
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
            <Link to="/registroPsicologo" className="register-link-text">
              Regístrate aquí
            </Link>
          </div>

          <div className="link-back">
            {/* Enlace para volver a la página anterior */}
            <Link to="/form" className="back-link">
              Volver
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPsicologo;
