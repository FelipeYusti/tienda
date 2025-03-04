// routes para consumir el modulo usuarios del SERVICIO
const express = require("express");
// middelware : util para manejar los request
const multer = require("multer");
const router = express.Router();

// instanciamos el controlador  correspondiente
const usuarioCrt = require("../controllers/usuarios.js");
// configurar un bodega para las imagenes de multer
const storage = multer.diskStorage({
  // ruta de destino para almacenar los archivos
  destination: (req, file, cb) => {
    cb(null, "./uploads/usuarios/");
  },
  // estructara para determinar los archivos
  filename: (req, file, cb) => {
    // armamos el nombre del archivo
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// instancia el multer con la configuracion de almacenamiento y nombre de archivo
const uploads = multer({ storage });
// rutas que entregara el modulo producto
router.post("/usuario/nuevo", usuarioCrt.setUsuario);
router.get("/usuario/listartodos", usuarioCrt.getUsuarios);
router.get("/usuario/buscarxid/:id", usuarioCrt.searchById);
router.put("/usuario/actualizar/:id", usuarioCrt.updateUsuario);
router.delete("/usuario/borrarxid/:id", usuarioCrt.deleteById);
router.post("/usuario/login/", usuarioCrt.login);
router.post(
  "/usuario/subirimagen/",
  uploads.single("file0"),
  usuarioCrt.subirImagen
);
router.get("/usuario/avatar/:file", usuarioCrt.avatar);
module.exports = router;
