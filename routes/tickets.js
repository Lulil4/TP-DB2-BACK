const express = require('express')
const router = express.Router()
const ticketeraController = require('../controllers/tickets.controller');

router.get('/ejercicio1', ticketeraController.traerCualesDesperfectosYDonde);
router.get('/ejercicio2', ticketeraController.traerCadaCuantoOcurrenDesperfectos);
router.get('/ejercicio3', ticketeraController.traerQuienAtiendeMas);
router.get('/ejercicio4', ticketeraController.traerAQueHoraHayMasTrabajo);
router.get('/ejercicio5', ticketeraController.traerQueTrabajoEstaSinResolver);
router.get('/ejercicio6', ticketeraController.traerDesperfectosPorZona);
router.get('/ejercicio7', ticketeraController.traerAtencionHechaPorZona);
router.get('/ejercicio8', ticketeraController.traerQuienHaceMas);
router.get('/ejercicio9', ticketeraController.traerQuienTieneSinResolver);

module.exports = router