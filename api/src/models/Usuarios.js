const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize) => {
    sequelize.define('Usuario', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://res.cloudinary.com/dwer6yvud/image/upload/v1691860142/png-transparent-computer-icons-user-profile-google-account-s-icon-account-miscellaneous-sphere-silhouette-thumbnail_pqrou8.png',
            validate: {
                checkDefault(value) {
                    if (value === "") {
                        this.foto = this.foto.defaultValue
                    }
                },
            }
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado_cuenta: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "activo"
        },
        roll: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
    
}