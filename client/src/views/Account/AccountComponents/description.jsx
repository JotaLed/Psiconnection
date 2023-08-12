import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const Description = ({descrip, handleChange}) => {
  const [description, setDescription] = useState('');

  const handleDescription = (event) => {
    const { value } = event.target;
    if (value.length <= 900) {
      setDescription(value);
    }
  };

  const maxCharCount = 900;
  const remainingChars = maxCharCount - description.length;

  return (
    <Form.Group controlId="description">
      <Form.Label>Descripción (Máximo {maxCharCount} caracteres)</Form.Label>
      <Form.Control
        as="textarea"
        rows={4}
        name="descripcion"
        value={description}
        onChange={(event) => {
          handleDescription(event); // Llamamos a la función local
          handleChange(event); // Llamamos a la función pasada como prop
      }}
        maxLength={maxCharCount}
        placeholder={descrip}

      />
      <Form.Text className="text-muted">
        {remainingChars} caracteres restantes
      </Form.Text>
    </Form.Group>
  );
};

export default Description;
