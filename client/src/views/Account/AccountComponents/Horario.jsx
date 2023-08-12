import { Form } from 'react-bootstrap';
import styles from '../Account.module.css';

const Horario = ({horario, handleChange}) => {
    return 
    <Form.Group>
        <Form.Label className={styles.prop}>Horario:</Form.Label>
        <Form.Control
            type="text"
            name="horario"
            defaultValue={horario}
            onChange={handleChange}
        />
    </Form.Group>
}

export default Horario;