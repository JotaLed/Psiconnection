import styles from '../../views/AdminAccount/AdminAccount.module.css';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ProfileBar = ({ handleTabChange, selectedTab }) => {
    const navigate = useNavigate()
    //funciones:
    const logout = async () => {
        await window.localStorage.clear()
        navigate('/')

    }
    return (
        <Nav className="flex-column">
             <Nav.Item>
                <Nav.Link
                    onClick={() => handleTabChange('resumen')}
                    className={`${styles.customNavLink} ${selectedTab === 'resumen' ? styles.active : ''}`}
                >
                    Resumen
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onClick={() => handleTabChange('profesionales')}
                    className={`${styles.customNavLink} ${selectedTab === 'profesionales' ? styles.active : ''}`}
                >
                    Profesionales
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onClick={() => handleTabChange('usuarios')}
                    className={`${styles.customNavLink} ${selectedTab === 'usuarios' ? styles.active : ''}`}
                >
                    Usuarios
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link
                    onClick={() => handleTabChange('profile')}
                    className={`${styles.customNavLink} ${selectedTab === 'profile' ? styles.active : ''}`}
                >
                    Perfil
                </Nav.Link>
            </Nav.Item>
           
            <Nav.Link onClick={logout} to="/form" className={styles.customNavLink}>
                Cerrar Sesión
            </Nav.Link>

        </Nav>
    )
}

export default ProfileBar;