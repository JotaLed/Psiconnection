import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Verificacion = () => {
  const { user } = useAuth0();
  const [usersRegistered, setUsersRegistered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_AUTH0_GET_USERS);
        console.log(response.data);
        setUsersRegistered(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (!loading && user && user.email) {
      // Verifica si user y user.email no son undefined
      const isUserRegistered = usersRegistered.some(
        (u) => u.email === user.email
      );

      if (isUserRegistered) {
        // Redirige a /home si está registrado
        navigate("/home");
      } else {
        // Redirige a /registroUsuario/google si no está registrado
        navigate("/registroUsuario/google");
      }
    }
  }, [loading, user, usersRegistered, navigate]);

  const style = { color: "blue" };
  return (
    <div>
      <h1 style={style}>Verificando</h1>
      <h1 style={style}>Verificando</h1>
      <h1 style={style}>Verificando</h1>
      <h1 style={style}>Verificando</h1>
    </div>
  );
};

export default Verificacion;
