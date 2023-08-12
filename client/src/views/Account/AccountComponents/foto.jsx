import { Form } from 'react-bootstrap';

const Foto = ({handleChange, imagen}) => {
    return(
    <Form.Group >
        <Form.Label>Foto</Form.Label>
        <Form.Control
            onChange={handleChange}
            type="text"
            name="foto"
            defaultValue={imagen}
        />
    </Form.Group>)
}

export default Foto;