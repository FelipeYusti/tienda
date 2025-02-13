// controlador para el manejo de los Usuarios
// conectamos el controlador con su modelo correspondiente
const Usuario = require("../models/usuarios.js");

const getUsuarios = async (req, res) => {
  try {
    // consultador todo sin filtro
    let listaUsuarios = await Usuario.find().exec();
    res.status(200).send({
      Exito: true,
      data: listaUsuarios,
      mensaje: "Exito en la consulta",
    });
  } catch (error) {
    res.status(500).send({
      Exito: false,
      mensaje: "Error, en la consulta.",
    });
  }
};
const setUsuario = async (req, res) => {
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
    const usuarioCreate = new Usuario(data);
    usuarioCreate.save(); // salvamos el mongo.
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
const updateUsuario = async (req, res) => {
  let id = req.params.id;
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
    let usuarioUpdate = await Usuario.findByIdAndUpdate(id, data);

    return res.send({
      estado: true,
      mensaje: "Actualizacion Exitosa!",
      reslut: usuarioUpdate,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `Error en la Actualizacion: ${error}`,
    });
  }
};

// buscar por ID o otro parametro
const searchById = async (req, res) => {
  //let id=0;
  let id = req.params.id;
  /*  if (req.params.id) {
    id = req.params.id;
  } else {
    console.log("falta el parametro");
  } */
  try {
    // logica de buscar y mostrar el resultado.
    let result = await Usuario.findById(id).exec();
    return res.send({
      estado: true,
      mensaje: "Consulta Exitosa",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, No fue posible encotrar el registro.",
    });
  }
};
// actualizadr de acuerdo al ID

// Eliminar de acuerdo al ID :: RECUERDE QUE ES SOLO DE USO DIDACTICO.
const deleteById = async (req, res) => {
  let id = req.params.id;

  try {
    let result = await Usuario.findOneAndDelete(id).exec();
    return res.send({
      estado: true,
      mensaje: "Borrado Exitoso",
      result: result,
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: "Error, Nos fue posible eliminar el producto.",
    });
  }
};
module.exports = {
  getUsuarios,
  setUsuario,
  updateUsuario,
  searchById,
  deleteById,
};
