const express = require('express')
const router = express.Router()
const clientescontroller = require('../controllers/clientes.controller');

router.get('/ejercicio10', clientescontroller.traerDondeTenemosMas);
router.get('/ejercicio12', clientescontroller.traerPlanesActualesPorCliente);
router.get('/ejercicio13', clientescontroller.traerClienteMasCercanoAlCentro);

router.get('/ejercicio13inverso', clientescontroller.traerClienteMasCercanoAlCentro );

module.exports = router