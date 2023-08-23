import { useState } from 'react';
import { Form } from 'react-bootstrap';

const Foto = ({handleChange, imagen}) => {
    const [image, setImage] = useState("")
    const upLoadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dzphgeome/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        setImage(file.secure_url);
        handleChange({ target: { name: 'foto', value: file.secure_url } });

      };
    return(
    <Form.Group >
        <Form.Label><b>Foto</b></Form.Label>
        <div className="form-groupRegPsico">
              <label>
                <input type="file" name="file" onChange={upLoadImage} />
                
              </label>
            </div>
    </Form.Group>)
}

export default Foto;