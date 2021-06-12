const db = require('../models/db');

exports.traerDondeTenemosMas = (req, res) => {

    // Save user in the database
    db.getInstance().collection('clientes').aggregate([
        {
			$unwind: "$domicilios"
		},
		{
			$project: {apellido: 1, zona: "$domicilios.localidad.descripcion"}
		},
		{
			$group: {_id:"$zona", cantClientes: {$sum: 1}}
		},
		{
			$sort: {_id: -1}
		},
		{
			$limit: 1
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerPlanesActualesPorCliente = (req, res) => {

    // Save user in the database
    db.getInstance().collection('clientes').aggregate([
        {
			$unwind: "$planesActuales"
		},
		{
			$project: {apellido : 1, planesActuales : 1}
		},
				{
			$group: {_id:"$apellido", planes_actuales: {$push: "$planesActuales"}}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};