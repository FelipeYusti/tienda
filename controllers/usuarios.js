// controlador para el manejo de los Usuarios
// instanciamos  la capa de modelo correspondiente
const Usuario = require("../models/usuarios.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs"); // fs: File System
const path = require("path"); // modulo nativo de node :  ultil para el manejo de las rutas
const usuarios = require("../models/usuarios.js");
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

/**
 * @description Funcion que hace la creacion o el registro de los usuarios en el sistema.
 * @param {*} req la peticion con la data del formulario de registro del usuario
 * @param {*} res falso si no exite el usuario, true y mensaje de exito si esta crea, false y mensaje de error si no ingresa la password.
 * @version 0.1 -24-02-25
 * @callback Funcion asisncronica que ejecuta la api.
 * @author Felipe Yusti
 * @function login
 */

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
  const usuarioExiste = await Usuario.findOne({ email: data.email });

  if (usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "el usuario ya existe en el sistema",
    });
  }

  try {
    const usuarioNuevo = new Usuario(data);
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
// Eliminar de acuerdo al ID : RECUERDE QUE ES SOLO DE USO DIDACTICO.
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

/**
 * @description Funcion que hace el login o ingreso al sistema con autenticaion de 2 factores.
 * @param {*} req la peticion con el usuario y password
 * @param {*} res falso si no exite el usuario, si exite devuelve (true) y el token en formato json con tiempo de vida de (4 horas), false y mensaje de error si no ingresa la password.
 * @version 0.1 -24-02-25
 * @callback Funcion asisncronica que ejecuta la api.
 * @author Felipe Yusti
 */

const login = async (req, res) => {
  let usuarioExiste = await Usuario.findOne({ email: req.body.email });
  if (!usuarioExiste) {
    return res.send({
      estado: false,
      mensaje: "no existe el usuario",
    });
  }

  // validamos credemciales
  if (bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)) {
    //autenticacion de 2 factores con generacion de token

    const token = jwt.sign(
      // datos a codificar en le toke
      {
        userId: usuarioExiste.id,
        isAdmin: usuarioExiste.esAdmin,
      },
      // Salt de la codificacion o hashing
      "seCreTo",
      // vida util
      { expiresIn: "4h" }
    );
    return res.send({
      estado: true,
      mensaje: "ok",
      token: token,
    });
  } else {
    return res.send({
      estado: false,
      mensaje: "Contraseña incorrecta , Intente de nuevo !",
    });
  }
};
//sube la imagen del usuario

const subirImagen = async (req, res) => {
  try {
    // Validar si se subió un archivo
    if (!req.file) {
      return res.status(400).json({
        estado: false,
        mensaje: "No se ha subido ninguna imagen",
      });
    }

    const { originalname, filename, path } = req.file;
    const extension = originalname.split(".").pop().toLowerCase();
    // Validar extensión de la imagen
    const extensionesValidas = ["png", "jpg", "jpeg", "gif"];
    if (!extensionesValidas.includes(extension)) {
      await fs.unlink(path); // Eliminar archivo inválido
      return res.status(400).json({
        estado: false,
        mensaje: "Extensión de archivo no permitida",
      });
    }

    // Actualizar usuario con la imagen subida
    const usuarioActualizado = await usuarios.findByIdAndUpdate(req.body.id, {
      imagen: filename,
    });

    return res.status(200).json({
      estado: true,
      user: usuarioActualizado,
      //file: req.file,
    });
  } catch (error) {
    return res.status(500).json({
      estado: false,
      nensaje: "Error al procesar la imagen",
      error: error.message,
    });
  }
};

// retorna la ruta de la imagen
const avatar = (req, res) => {
  // Sacar el parametro de la url
  const file = req.params.file;

  // Montar el path real de la imagen
  const filePath = "./uploads/usuarios/" + file;

  // Comprobar que existe
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imagen",
      });
    }

    // Devolver un file
    return res.sendFile(path.resolve(filePath));
  });
};
module.exports = {
  getUsuarios,
  setUsuario,
  updateUsuario,
  searchById,
  deleteById,
  subirImagen,
  avatar,
  login,
};
