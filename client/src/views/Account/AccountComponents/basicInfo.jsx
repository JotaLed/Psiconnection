import { Form } from 'react-bootstrap';
import styles from '../Account.module.css';

const generos = [
    "Femenino",
    "Masculino",
    "Otro"
]

const handleKeyPress = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 45) { // 45 es el código de tecla para el signo "-"
        event.preventDefault();
    }
};

const handleKeyDown = (event) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"]; // Permitir teclas de navegación y eliminación
    if (!allowedKeys.includes(event.key) && isNaN(event.key)) {
        event.preventDefault();
    }
};

const BasicInfo = ({handleChange, psicology }) => {
    return (<>
        <Form.Group >
            <Form.Label className={styles.prop}>Nombre</Form.Label>
            <Form.Control
                type="text"
                name="nombre"
                placeholder={psicology.nombre}
                readOnly
            />
        </Form.Group>
        <Form.Group >
            <Form.Label className={styles.prop}>Apellido</Form.Label>
            <Form.Control
                type="text"
                name="apellido"
                placeholder={psicology.apellido}
                readOnly
            />
        </Form.Group>
        <Form.Group >
            <Form.Label className={styles.prop}>Correo</Form.Label>
            <Form.Control
                onChange={handleChange}
                type="text"
                placeholder={psicology.email}
                readOnly
            />
        </Form.Group>
        <Form.Group>
            <Form.Label className={styles.prop}>Género:</Form.Label>
            <Form.Select
                name="genero"
                onChange={handleChange}
                defaultValue={psicology.genero}
            >
                {generos.map(opcion => (

                    <option key={opcion} value={opcion}>
                        {opcion}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Label className={styles.prop}>Tárifa:</Form.Label>
            <Form.Control
                type="number"
                name="tarifa"
                defaultValue={psicology.tarifa}
                min="1" // Puedes ajustar el valor mínimo permitido si es necesario
                onKeyPress={handleKeyPress}

                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
            <Form.Label className={styles.prop}>Whatsapp:</Form.Label>
            <Form.Control
                type="text"
                name="whatsapp_url"
                defaultValue={psicology.whatsapp_url}
                onChange={handleChange}
            />
        </Form.Group>
        <Form.Group >
            <Form.Label className={styles.prop}>Telefono:</Form.Label>
            <Form.Control
                 type="text"
                 name="telefono"
                 defaultValue={psicology.telefono}
                 onChange={handleChange}
                 pattern="[0-9]*" // Permitir solo números
                 maxLength="16" 
                 onKeyDown={handleKeyDown}

            />
        </Form.Group>
    </>
    )
}

export default BasicInfo;