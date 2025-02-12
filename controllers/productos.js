// controlador para el manejo de los productos

// conectamos el controlador con su modelo correspondiente
let Producto = require("../models/productos");

// logica de un CRUD tipico.
const getProductos = async (req, res) => {
  try {
    // consultador todo sin filtro
    let listarProductos = await Producto.find().exec();
    res.status(200).send({
      Exito: true,
      data: listarProductos,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
    });
  }
};
const setProducto = async (req, res) => {
  // llega el objeto en el body del request.
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    marca: req.body.marca,
    precio: req.body.precio,
    existencia: req.body.existencia,
    rating: req.body.rating,
    numRevisiones: req.body.numRevisiones,
    estadoOfertado: req.body.estadoOfertado,
  };
  try {
    // instancia del modelo Producto (collection).
    const productoCreate = new Producto(data);
    // creamos el nuevo documento (que agregaremos a la collection).
    productoCreate.save(); // salvamos el mongo.
    return res.send({
      estado: true,
      mensaje: "¡Insercion Exitosa!",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error en la Insercion: ${error}`,
      error: error,
    });
  }
};
const updateProducto = async (req, res) => {
  // llega el objeto en el body del request.
  let data = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    marca: req.body.marca,
    precio: req.body.precio,
    existencia: req.body.existencia,
    rating: req.body.rating,
    numRevisiones: req.body.numRevisiones,
    estadoOfertado: req.body.estadoOfertado,
  };
  try {
    // instancia del modelo Producto (collection).
    const productoUpdate = new Producto(data);
    // creamos el nuevo documento (que agregaremos a la collection).
    productoUpdate.save(); // salvamos el mongo.
    return res.send({
      estado: true,
      mensaje: "Actualizacion Exitosa!",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error en la Insercion: ${error}`,
      error: error,
    });
  }
};
module.exports = {
  getProductos,
  setProducto,
  updateProducto,
};
