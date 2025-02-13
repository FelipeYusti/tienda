// librerias base
const express = require("express");
const app = express();
const cors = require("cors");

// middlware de la app
app.use(cors());
app.use(express.json());

// llamamos la libreria de conexion a la Base de datos
const cnn = require("./models/bd_conexion.js");
cnn();

// rutas globales de la app
const productoRta = require("./routes/productos.js");

const usuarioRta = require("./routes/usuarios.js");

app.use("/api", productoRta);
app.use("/api", usuarioRta);
app.listen(4000, () => {
  console.log(`escuchando en el puerto: ${4000}`);
});
