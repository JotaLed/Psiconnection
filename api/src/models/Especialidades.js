const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    sequelize.define('Especialidad', {
        id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        especialidad: {
            type: DataTypes.STRING,
            unique: true
        }
    },{
        timestamps: false,
      })
    }
