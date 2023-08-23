const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  sequelize.define(
    "Psicologo",
    {
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
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pais: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zona_horaria: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genero: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      licencia: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      tarifa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dias: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      horas: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      especialidad: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      valoracion: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: []
      },
      whatsapp_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"https://res.cloudinary.com/dwer6yvud/image/upload/v1691860142/png-transparent-computer-icons-user-profile-google-account-s-icon-account-miscellaneous-sphere-silhouette-thumbnail_pqrou8.png",
        validate: {
          checkDefault(value) {
              if (value === "") {
                  this.foto = this.foto.defaultValue
              }
          },
      }
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      estado_cuenta: {
        type: DataTypes.STRING,
        defaultValue: "activo",
        allowNull: true,
      },
      // validacion_cuenta: {
      //   type: DataTypes.STRING,
      //   defaultValue: "activo",
      //   allowNull: true,
      // },,
      fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      roll: {
        type: DataTypes.STRING,
        defaultValue: "psicologo",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
};
