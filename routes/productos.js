// routes para consumir el modulo productos del SERVICIO
const express = require("express");

const router = express.Router();

// instanciamos el controlador  correspondiente
const productoCrt = require("../controllers/productos.js");

// rutas que entregara el modulo producto
router.get("/producto/listartodos", productoCrt.getProductos);
router.post("/producto/nuevo", productoCrt.setProducto);
router.put("/producto/actualizar", productoCrt.updateProducto);
module.exports = router;
