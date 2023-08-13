import styles from '../Account.module.css';
import {Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';


const ProfileBar = ({handleTabChange, selectedTab}) => {
    return(
        <Nav className="flex-column">
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => handleTabChange('profile')}
                            className={`${styles.customNavLink} ${selectedTab === 'profile' ? styles.active : ''}`}
                        >
                            Perfil
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link
                            onClick={() => handleTabChange('reservations')}
                            className={`${styles.customNavLink} ${selectedTab === 'reservations' ? styles.active : ''}`}
                        >
                            Citas
                        </Nav.Link>
                    </Nav.Item>
                    <Link to="/form" className={styles.customNavLink}>
                            Cerrar Sesión 
                    </Link>
                </Nav>
    )
}

export default ProfileBar;