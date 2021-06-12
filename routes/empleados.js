const express = require('express')
const router = express.Router()
const empleadosController = require('../controllers/empleados.controller');

router.get('/ejercicio11', empleadosController.traerEmpleadoConTicket);

module.exports = router