import styles from "../Account.module.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileBar = ({ handleTabChange, selectedTab }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth0();
  //funciones:
  const desloguearse = async () => {
    if (isAuthenticated) {
      logout();
    } else {
      await window.localStorage.clear();
      navigate("/");
    }
  };
  return (
    <Nav className="flex-column">
      <Nav.Item>
        <Nav.Link
          onClick={() => handleTabChange("profile")}
          className={`${styles.customNavLink} ${
            selectedTab === "profile" ? styles.active : ""
          }`}
        >
          Perfil
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          onClick={() => handleTabChange("reservations")}
          className={`${styles.customNavLink} ${
            selectedTab === "reservations" ? styles.active : ""
          }`}
        >
          Citas
        </Nav.Link>
      </Nav.Item>
      <Nav.Link
        onClick={desloguearse}
        to="/form"
        className={styles.customNavLink}
      >
        Cerrar Sesión
      </Nav.Link>
    </Nav>
  );
};

export default ProfileBar;
