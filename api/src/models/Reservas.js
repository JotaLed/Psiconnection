const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize) => {
    sequelize.define('Reserva', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hora: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
};