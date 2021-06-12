const express = require('express')
const router = express.Router()
const clientescontroller = require('../controllers/clientes.controller');

router.get('/ejercicio10', clientescontroller.traerDondeTenemosMas);
router.get('/ejercicio12', clientescontroller.traerPlanesActualesPorCliente);
module.exports = router