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

exports.traerClienteMasCercanoAlCentro = (req, res) => {

    // Save user in the database
	db.getInstance().collection('centros').find({"tipoCentro" : "servicio técnico"}).toArray().then((data) => {
		db.getInstance().collection('clientes').find(
			{ 
				"domicilios.geometry":{
					$near: {
								$geometry: data[0].geometry					
						  }
					  }
			 }).limit(1).toArray().then((data) => {
				res.send(data);
			});
	});

};

exports.traerClienteMasCercanoAlCentro = (req, res) => {

    // Save user in the database
	db.getInstance().collection('centros').find({"tipoCentro" : "servicio técnico"}).toArray().then((data) => {
		db.getInstance().collection('clientes').find(
			{ 
				"domicilios.geometry":{
					$near: {
								$geometry: data[0].geometry					
						  }
					  }
			 }).sort({"domicilios.geometry" : -1}).limit(1).toArray().then((data) => {
				res.send(data);
			});
	});

};