// modelo para la coleccion producto
// destructuring de la clase mongoose -- solo traemos las clases que necesitamos.
const { Schema, model } = require("mongoose");
// creamos el Schema
const productoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      default: "",
    },
    imagen: {
      type: String,
      default: "",
    },
    imagenes: [
      {
        type: String,
      },
    ],
    marca: {
      type: String,
      default: "",
    },
    precio: {
      type: Number,
      default: 0,
    },
    /* categoria: {
type:
mongoose.Schema.Types.ObjectId
,
ref: &quot;Category&quot;,
required: true,
}, */
    existencia: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numRevisiones: {
      type: Number,
      default: 0,
    },
    estaOfertado: {
      type: Boolean,
      default: false,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "producto" }
);
module.exports = model("Producto", productoSchema);
