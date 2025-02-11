// controlador para el manejo de los productos

// conectamos el controlador con su modelo correspondiente
let producto = require("../models/productos");

// logica de un CRUD tipico.
const getProductos = async (req, res) => {
  try {
    // consultador todo sin filtro
    let listarProductos = await producto.find().exec();
    res.status(200).send({
      Exito: true,
      data: listarProductos,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
      error: error,
    });
  }
};

module.exports = {
  getProductos,
};
