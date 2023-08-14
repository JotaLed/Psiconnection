import { Form } from 'react-bootstrap';
import styles from '../Account.module.css';

const paises = [
    "Argentina",
    "Colombia",
    "México",
    "Venezuela"
]

const Paises = ({pais, handleChange, zona_horaria}) => {
    return <>
        <Form.Group>
            <Form.Label className={styles.prop}>País:</Form.Label>
            <Form.Select
                name="pais"
                onChange={handleChange}
                defaultValue={pais}
            >
                {paises.map(opcion => (

                    <option key={opcion} value={opcion}>
                        {opcion}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
       {zona_horaria && <Form.Group >
            <Form.Label className={styles.prop}>Zona horaria: </Form.Label>
            <Form.Control
                type="text"
                name="zona_horaria"
                placeholder={zona_horaria}
                onChange={handleChange}
            />
        </Form.Group>}</>
}

export default Paises