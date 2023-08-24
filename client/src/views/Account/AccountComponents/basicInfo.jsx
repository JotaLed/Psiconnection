import React from 'react';
import { Form } from 'react-bootstrap';
import styles from '../Account.module.css';

const generos = [
    "Femenino",
    "Masculino",
    "Otro"
];

const paises = [
    "Argentina",
    "Colombia",
    "México",
    "Venezuela"
]


const handleKeyPress = (event) => {
    const keyCode = event.keyCode;
    if (keyCode === 45 && event.target.name === "tarifa") {
        event.preventDefault();
    }
};

const handleKeyDown = (event) => {
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"]; // Permitir teclas de navegación y eliminación
    if (!allowedKeys.includes(event.key) && isNaN(event.key)) {
        event.preventDefault();
    }
};

const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
};

const BasicInfo = ({ handleChange, psicology, client }) => {
    return (
        <>
            <Form.Group>
                <Form.Label className={styles.prop}>Nombre</Form.Label>
                <Form.Control
                    type="text"
                    name="nombre"
                    placeholder={psicology?.nombre || client.nombre}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.prop}>Apellido</Form.Label>
                <Form.Control
                    type="text"
                    name="apellido"
                    placeholder={psicology?.apellido || client.apellido}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.prop}>Correo</Form.Label>
                <Form.Control
                    onChange={handleChange}
                    type="text"
                    placeholder={psicology?.email || client.email}
                    readOnly
                />
            </Form.Group>
            <Form.Group>
                <Form.Label className={styles.prop}>Género:</Form.Label>
                <Form.Select
                    name="genero"
                    onChange={handleChange}
                    defaultValue={psicology?.genero || client.genero}
                >
                    {generos.map((opcion) => (
                        <option key={opcion} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            {psicology && (
                <>
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
                    {/* <Form.Group>
                        <Form.Label className={styles.prop}>Whatsapp:</Form.Label>
                        <Form.Control
                            type="text"
                            name="whatsapp_url"
                            defaultValue={psicology.whatsapp_url}
                            onChange={(event) => {
                                const { name, value } = event.target;
                                if (name === "whatsapp_url" && isValidUrl(value)) {
                                    handleChange(event);
                                }
                            }}
                        />
                    </Form.Group> */}
                </>
            )}
            <Form.Group>
                <Form.Label className={styles.prop}>Telefono:</Form.Label>
                <Form.Control
                    type="text"
                    name="telefono"
                    defaultValue={psicology?.telefono || client.telefono}
                    onChange={handleChange}
                    pattern="[0-9]*" // Permitir solo números
                    maxLength="16"
                    onKeyDown={handleKeyDown}
                />
            </Form.Group>
            <Form.Group>
            <Form.Label className={styles.prop}>País:</Form.Label>
            <Form.Select
                name="pais"
                onChange={handleChange}
                defaultValue={psicology?.pais || client.pais}
            >
                {paises.map(opcion => (
                    <option key={opcion} value={opcion}>
                        {opcion}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
        </>
    );
};

export default BasicInfo;
