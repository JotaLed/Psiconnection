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
            allowNull:false,
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
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        estado_cuenta: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:"activo"
        },
        roll: {
            type: DataTypes.STRING,
            defaultValue: 'usuario'
        }
    },{
        timestamps: false,
        freezeTableName: true
      })
}