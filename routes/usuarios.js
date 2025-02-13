// routes para consumir el modulo usuarios del SERVICIO
const express = require("express");

const router = express.Router();

// instanciamos el controlador  correspondiente
const usuarioCrt = require("../controllers/usuarios.js");

// rutas que entregara el modulo producto
router.post("/usuario/nuevo", usuarioCrt.setUsuario);
router.get("/usuario/listartodos", usuarioCrt.getUsuarios);
router.get("/usuario/buscarxid/:id", usuarioCrt.searchById);
router.put("/usuario/actualizar/:id", usuarioCrt.updateUsuario);
router.delete("/usuario/borrarxid/:id", usuarioCrt.deleteById);

module.exports = router;
