// controlador para el manejo de los Usuarios
// conectamos el controlador con su modelo correspondiente
const usuarios = require("../models/usuarios.js");
const Usuario = require("../models/usuarios.js");
const bcrypt = require("bcryptjs");

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
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
  };
  // validamos si el usuario ya esta registrado
  const usuarioExiste = await usuarios.findOne({ email: data.email });

  if (usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarioNuevo = new usuarios(data);
    await usuarioNuevo.save();
    return res.send({
      estado: true,
      mensaje: "usuario creado exitosamente",
    });
  } catch (error) {
    return res.send({
      estado: false,
      mensaje: `error ${error}`,
    });
  }
};
const updateUsuario = async (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    email: req.body.email,
    telefono: req.body.telefono,
    esAdmin: req.body.esAdmin,
    direccion: req.body.direccion,
    zip: req.body.zip,
    ciudad: req.body.ciudad,
    pais: req.body.pais,
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

const login = async (req, res) => {
  let usuarioExiste = await usuarios.findOne({ email: req.body.email });

  if (!usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "no existe el usuario",
    });
  }

  if (bcrypt.compareSync(req.body.clave, usuarios.passwordHash)) {
    return res.send({
      estado: true,
      mensaje: "ok",
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "no",
    });
  }
};
module.exports = {
  getUsuarios,
  setUsuario,
  updateUsuario,
  searchById,
  deleteById,
  login,
};
