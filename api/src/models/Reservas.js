const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize) => {
    sequelize.define('Reserva', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        PsicologoId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        UsuarioId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //estado
        estado: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
};