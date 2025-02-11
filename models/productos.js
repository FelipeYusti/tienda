// modelo para la coleccion producto
// destructuriing de la clase mongoose -- solo traemos las clases que necesitamos.
const { Schema, model } = require("mongoose");
// creamos el Schema
const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: false,
    },

    existencia: {
      type: Number,
      required: true,
    },
  },
  { collection: "producto" }
);
module.exports = model("Producto", productoSchema);
