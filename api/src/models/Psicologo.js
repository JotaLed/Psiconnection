const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Psicologo', {
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
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zona_horaria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: false
        },
        licencia: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        tarifa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        especialidad:{
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        valoracion: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        whatsapp_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        estado_cuenta: {
            type: DataTypes.STRING,
            defaultValue: "activo",
            allowNull: true
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false
        },
        roll: {
            type: DataTypes.STRING,
            defaultValue: "psicologo"
        }
    },{
        timestamps: false,
        freezeTableName: true
      })
};