const { createUserController, uploadUserPhoto } = require('../controllers/userControllers.js');
const obtenerFechaActual = require('../helpers/getFecha.js');
const cloudinary = require('../utils/cloudinary.js');


const userCreateHandler = async (req,res) => {
    const {nombre, apellido, fecha_nacimiento, pais, genero, email, contraseña, telefono} = req.body
    const fecha = obtenerFechaActual();
    console.log(fecha);
    
    try {
        //! validaciones
        if(!nombre) return res.status(403).json({error:"Nombre vacio."});
        if(!apellido) return res.status(403).json({error:"Apellido vacio."});
        if(!contraseña) return res.status(403).json({error:"Nombre vacio."});
        if(!fecha_nacimiento) return res.status(403).json({error:"Edad vacio."});
        if(!pais) return res.status(403).json({error:"Pais vacio."});
        if(!genero) return res.status(403).json({error:"Genero vacio."});
        if(!telefono) return res.status(403).json({error:"Telefono vacio."});

       const newUser = await createUserController({nombre, apellido, fecha_nacimiento, pais, genero, email, contraseña, telefono, fecha});
        return res.status(200).json(newUser);
      
        
    } catch (error) {
        return  res.status(400).json({error:error.message});
    }

    
}


const subirFotoUser = async (req, res) => {
    
        function getUrlUserImage() {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload(req.file, function (err, result) {
                    if (err) {
                        reject(new Error("No se pudo subir la imagen"));
                    } else {
                        const data = result.url;
                        resolve(data);
                    }
                })
            })
        }
    try {
    
        const { id } = req.params;
        const fotoUserURL = await getUrlUserImage();
        console.log(fotoUserURL);
        const updatedUserPhoto = await uploadUserPhoto({id, fotoUserURL});
         res.status(200).json(updatedUserPhoto);
    } catch (error) {
        return  res.status(400).json({error:error.message});
    }
}



module.exports = {
    userCreateHandler,
    subirFotoUser
};



// id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
// },
// nombre: {
//     type: DataTypes.STRING,
//     allowNull: false,
// },
// apellido: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// fecha_nacimiento: {
//     type: DataTypes.DATE,
//     allowNull: false
// },
// pais: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// genero: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// email: {
//     type: DataTypes.STRING,
//     allowNull:false,
//     unique: true
// },
// contraseña: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
// },
// telefono: {
//     type: DataTypes.STRING,
//     allowNull: false
// },
// foto: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     validate: {
//         isUrl: true
//       }
// },
// fecha_registro: {
//     type: DataTypes.DATE,
//     allowNull: false
// },
// estado_cuenta: {
//     type: DataTypes.STRING,
//     allowNull: true
// },
// roll: {
//     type: DataTypes.STRING,
//     defaultValue: 'user'
// }