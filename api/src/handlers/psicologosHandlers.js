const {
    createUsuarioPsicologo,
    getDetailController,
    uploadFoto,
    getPsicologosController,
    getPsicologoByNameController,
  } = require("../controllers/psicologosController.js");

  const cloudinary = require('../utils/cloudinary.js');
 
// helpers
  const obtenerFechaActual = require('../helpers/getFecha.js')
  
  //Handler de la ruta get que trae a todos los psicologos
  const getPsicologosHandler = async (req, res) => {
    const { name } = req.query;
    try {
      let psicologo;
      if (name) {
        psicologo = await getPsicologoByNameController(name);
      } else {
        psicologo = await getPsicologosController();
      }
      res.status(200).json(psicologo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

  };
  
  const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    try {
      const detail = await getDetailController(id);
      res.status(200).json(detail);
    } catch (error) {
      res.status(400).json({ error: error.message });
  
    }

}   
    
    
    // manejador de registro psicologo http://localhost:3001/psiconection/registerPsicologo --- Psicologo
    const registerHandler = async (req, res, next) => {
    
        const {
            nombre,
            apellido,
            email,
            fecha_nacimiento,
            contraseña,
            pais,
            zona_horaria,
            horario,
            genero,
            licencia,
            tarifa,
            especialidad,
            whatsapp_url,
            telefono,
            descripcion,
        } = req.body;
        const fecha = obtenerFechaActual();
        console.log(fecha);
        
        try {
         //! validaciones
            if (!nombre) return res.status(403).json({ error: 'nombre vacio' });
            if (!apellido) return res.status(403).json({ error: 'apellido vacio' });
            if (!email) return res.status(403).json({ error: 'email vacio' });
            if (!fecha_nacimiento) return res.status(403).json({ age: 'nombre vacio' });
            if (!contraseña) return res.status(403).json({ error: 'password vacio' });
            if (!pais) return res.status(403).json({ error: 'pais vacio' });
            if (!genero) return res.status(403).json({ error: 'genero vacio' });
            if (!licencia) return res.status(403).json({ error: 'lecencia vacia' });
            if (!tarifa) return res.status(403).json({ error: 'tipo de pago vacio' });
            if (!especialidad) return res.status(403).json({ error: 'especialidad vacio' });
            if (!whatsapp_url) return res.status(403).json({ error: 'WhatsApp vacio' });
            if (!telefono) return res.status(403).json({ error: 'telefono vacio' });
            if (!descripcion) return res.status(403).json({ error: 'descripcion vacio' });
            if (!zona_horaria) return res.status(403).json({ error: 'zona horaria vacio' });
            if (!horario) return res.status(403).json({ error: 'horario vacio' });
    
    
    
    
    
            const usuarioPsicologo = await createUsuarioPsicologo({
                nombre,
                apellido,
                email,
                fecha_nacimiento,
                contraseña,
                pais,
                zona_horaria,
                horario,
                genero,
                licencia,
                tarifa,
                especialidad,
                whatsapp_url,
                telefono,
                descripcion,
                fecha
            })
    
            return res.status(200).json(usuarioPsicologo)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    };
    
      
    
    
    const subirFoto = async (req, res) => {
    
        function getUrlImage() {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(req.file.path, function (err, result) {
                    if (err) {
                        reject(new Error("No se pudo subir la imagen"));
                    } else {
                        const data = result.url;
                        resolve(data);
                    }
                });
            });
        }
    
        try {
            const { id } = req.params;
            const fotoURL = await getUrlImage();
            const updateFoto = await uploadFoto({ fotoURL, id });
            return res.status(200).json(updateFoto)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
  
    }

    
    
    
    //Handler de la ruta put para corroborar que al menos llego un dato para actualizar
    const checkDataUpdate = (req, res, next) => {
      const data = req.body;
    
      if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("No llegó ningún dato");
      } else {
        next();
      }
    };
    
  
  
  //Handler de la ruta delete para verificar si llego por body id de tipo UUIDV4
  const checkDataDelete = (req, res, next) => {
    const { id } = req.body;
  
    const uuidv4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
    if (!id) {
      return res
        .status(400)
        .send("Se requiere un 'id' en el cuerpo de la solicitud.");
    }
  
    if (!uuidv4Regex.test(id)) {
      return res
        .status(400)
        .send("El 'id' proporcionado no tiene el formato UUIDV4 válido.");
    }
  
    next();
}

  
    
    
    module.exports = {
      registerHandler,
      getDetailHandler,
      subirFoto,
      checkDataUpdate,
      checkDataDelete,
      getPsicologosHandler,
    };
