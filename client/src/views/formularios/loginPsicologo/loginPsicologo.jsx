import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
//import { useHistory } from 'react-router-dom';
import './loginPsicologo.css';
import { isValidPassword } from '../validaciones';
import axios, { formToJSON } from 'axios';
import { Link } from 'react-router-dom';
import { isValidPassword } from '../validaciones';

const LoginPsicologo = () => {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
 // const history = useHistory();



  const onSubmit = async (formData) => {
    if (!formData.email || !formData.contraseña) {
      setErrorMessage('Todos los campos son requeridos');
      return;
    }

    try {

      // Realiza la solicitud al backend para verificar el inicio de sesión
      const response = await axios.post('http://localhost:3001/psiconection/login', formData);

      console.log(response)

      if (response.status === 200) {
       // const userRole = response.data.rol;

        if (userRole === 'psicologo') {
          //history.push('/home'); // Redirige al perfil del psicólogo
        } else {
          setErrorMessage('Credenciales inválidas');
        }
      } else {
        setErrorMessage('Credenciales inválidas');
      }
    } catch (error) {

      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="containerLoginPisco">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="login-formPsico">
          <h2>¡Bienvenidos Psicologos!</h2>
          <h3>Para ingresar a nuestra comunidad, inicia sesión:</h3>
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
                    placeholder="Email del Psicologo"
                  />
                )}
              />
            </label>
            {errors.email?.type === 'pattern' && (
              <p className='errores'>Formato de email incorrecto</p>
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
                    type={showPassword ? 'text' : 'password'} // Cambio de tipo aquí
                    placeholder="Contraseña"
                  />
      
                  <i
                    className={`bx ${showPassword ? 'bxs-hide' : 'bxs-show'}`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              )}
            />
            </label>
            {errors.password && (
              <p className='errores'>Debe tener más de 6 caracteres alfanuméricos</p>
            )}
          </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
{/* Enlace para ir a la página de registro */}
<div className="register-link">
          ¿No tienes una cuenta?{' '}
          <Link to="/registroPsicologo" className="register-link-text">
            Regístrate aquí
          </Link>
          </div>         
       
       
        <div className="link-back">
          {/* Enlace para volver a la página anterior */}
          <Link to="/form" className="back-link">Volver</Link>
        </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPsicologo;
