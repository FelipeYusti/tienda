// modelo para la coleccion Usuario
// destructuring de la clase mongoose -- solo traemos las clases que necesitamos.
const { Schema, model } = require("mongoose");
// creamos el Schema
const usuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    esAdmin: {
      type: Boolean,
      default: false,
    },
    direccion: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
    ciudad: {
      type: String,
      default: "",
    },
    pais: {
      type: String,
      default: "",
    },
  },
  { collection: "usuario" }
);
module.exports = model("Usuario", usuarioSchema);
