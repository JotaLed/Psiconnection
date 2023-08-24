import React from 'react';
import { Link } from 'react-router-dom';
import './FormularioGeneral.css'; 
import LoginUsuario from './loginUsuario/loginUsuario'; 
import LoginPsicologo from './loginPsicologo/loginPsicologo';
import { useState } from 'react';
const FormularioGeneral = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (roll) => {
    setSelectedRole(roll);
  };
  return (
    <div className="contenedorFormGeneral">
      <div className="contenidoFormularioGeneral">
        <div>
        <h1>
          Descubre una nueva forma de conectarte con 
        </h1>
        </div>
      <div>
        <h1>
        profesionales de la salud mental
        </h1>
      </div>
      <div>
        <h1>
          y encontrar apoyo para tu bienestar emocional.
        </h1>
      </div>
      <h2>¡Estamos aquí para ti!</h2>
      <div className="button-container">
        <p>Elige la opción que se adapte a ti y comienza tu viaje hacia el bienestar.</p>
        <p>¿Cómo deseas continuar?</p>
        <div className="button-groupLogin">
          <Link to="/loginUsuario" className="btn SelectRol" onClick={() => handleRoleSelect('usuario')}>
            Soy Usuario
          </Link>
          <Link to="/loginPsicologo" className="btn SelectRol" onClick={() => handleRoleSelect('psicologo')}>
            Soy Psicólogo
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};
export default FormularioGeneral;
