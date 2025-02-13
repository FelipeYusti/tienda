// routes para consumir el modulo productos del SERVICIO
const express = require("express");

const router = express.Router();

// instanciamos el controlador  correspondiente
const productoCrt = require("../controllers/productos.js");

// rutas que entregara el modulo producto
router.post("/producto/nuevo", productoCrt.setProducto);
router.get("/producto/listartodos", productoCrt.getProductos);
router.get("/producto/buscarxid/:id", productoCrt.searchById);
router.put("/producto/actualizar/:id", productoCrt.updateProducto);
router.delete("/producto/borrarxid/:id", productoCrt.deleteById);

module.exports = router;
