// librerias base
const express = require("express");
const app = express();
const cors = require("cors");

// middlware de app
app.use(cors());
app.use(express.json());

// llamamos la libreria de conexion
const cnn = require("./models/bd_conexion.js");
cnn();

// rutas globales de la app
const productoRuta = require("./routes/productos.js");

app.use("/api", productoRuta);
app.listen(4000, () => {
  console.log(`escuchando en el puerto: ${4000}`);
});
