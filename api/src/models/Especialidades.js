const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Especialidad",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      especialidad: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
