const db = require('../models/db');

exports.traerCualesDesperfectosYDonde = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
        {
            $project: { motivo: 1, zona: "$domicilio.localidad.descripcion" }
        }]).toArray((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.send(result);
        });
};

exports.traerCadaCuantoOcurrenDesperfectos = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate(
        {
            $match: { motivo: { $eq: "desperfecto" } }
        },
        {
            $project: { fecha: 1, motivo: 1 }
        },
        {
            $group: { _id: "$fecha", cantidad_desperfectos: { $sum: 1 } }
        }).toArray((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.send(result);
        });
};

exports.traerQuienAtiendeMas = (req, res) => {                  
    var empleados = [];
    var empleadosDerivados;
    var empleadosActuales;
    
    db.getInstance().collection('tickets').aggregate([
        {
			$match: {empleado: {$ne: {}}}
		},
		{
			$project: {empleado: "$empleado.apellido"}
		},
		{
			$group: {_id : "$empleado", tickets : {$sum : 1}}
		}]).toArray((err, result) => {
            if (err) {
                return console.log(err);
            }
            empleadosActuales = result;

            empleadosDerivados = db.getInstance().collection('tickets').aggregate(
                {
                    $match: {traza: {$ne: []}}
                },
                {
                    $unwind: "$traza"
                },
                {
                    $project: {empleado: "$traza.empleado.apellido"}
                },
                {
                    $group: {_id : "$empleado", tickets : {$sum : 1}}
                }).toArray((err,result)=>{
                        if(err){
                            return console.log(err);
                        }

                        empleadosDerivados = result;
                        for (var e of empleadosActuales){
                            empleados.push(e);
                        }
                   
                        for (var e of empleadosDerivados){
                            empleados.push(e);
                        }
                        //encuentro al maximo
                        var empleadoMax = {tickets : 0};
                   
                        for (var e of empleados){
                            if (e.tickets >= empleadoMax.tickets){
                                empleadoMax = e;
                            }
                        }
                   
                        res.send(empleadoMax);

                        return result;
                    }); 
        });
};

exports.traerAQueHoraHayMasTrabajo = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
        {
            $project: {hora: 1}
        },
        {
            $group: {_id : "$hora", cantTickets : {$sum : 1}}
        },
        {
            $sort: {cantTickets: -1}
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

exports.traerQueTrabajoEstaSinResolver = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
		{
			$match: {estado: "sin resolver"}
		},
		{
			$project: {area: 1, motivo: 1, domicilio: 1, estado: 1}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerDesperfectosPorZona = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
		{
			$match: {motivo : "desperfecto"}
		},
		{
			$project: {descripcion: 1, zona : "$domicilio.localidad.descripcion"}
		},
		{
			$group: {_id:"$zona", motivo: {$push: "$descripcion"}}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerAtencionHechaPorZona = (req, res) => {

    db.getInstance().collection('tickets').aggregate([
		{
			$project: {area: 1, zona : "$domicilio.localidad.descripcion"}
		},
		{
			$group: {_id:"$zona", motivo: {$push: "$area"}}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerQuienHaceMas = (req, res) => {

    db.getInstance().collection('tickets').aggregate([
        {
			$project: {cliente: "$cliente.dni"}
		},
		{
			$group: {_id : "$cliente", cantTickets : {$sum : 1}}
		},
		{
			$sort: {cantTickets: -1}
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

exports.traerQuienTieneSinResolver = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
        {
			$match: {estado : "sin resolver"}
		},
		{
			$project: {cliente:{apellido: "$cliente.apellido", nombre: "$cliente.nombre", dni: "$cliente.dni"}}
		},
		{
			$group: {_id:"$cliente"}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerQueTrabajoEstaResuelto = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
		{
			$match: {estado: "resuelto"}
		},
		{
			$project: {area: 1, motivo: 1, domicilio: 1, estado: 1}
		}]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};

exports.traerCualesDesperfectosTemperley = (req, res) => {

    // Save user in the database
    db.getInstance().collection('tickets').aggregate([
        {
            $project: { motivo: 1, zona: "$domicilio.localidad.descripcion" }
        },
        {
            $match: {zona : "Temperley"}
        }]).toArray((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.send(result);
        });
};

exports.traerQuienHaceMenos = (req, res) => {

    db.getInstance().collection('tickets').aggregate([
        {
			$project: {cliente: "$cliente.dni"}
		},
		{
			$group: {_id : "$cliente", cantTickets : {$sum : 1}}
		},
		{
			$sort: {cantTickets: 1}
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
/*
// Create user
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a user
    const user = {
        name: req.body.name,
        mail: req.body.mail,
    };

    // Save user in the database
    db.getInstance().collection('users').save(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the db.getInstance().collection('users')."
            });
        });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    db.getInstance().collection('empleados').find().toArray().then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single user with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    db.getInstance().collection('users').findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found user with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving user with id=" + id });
        });
};

// Update a user by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    db.getInstance().collection('users').findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with id=${id}. Maybe user was not found!`
                });
            } else res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    db.getInstance().collection('users').findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "user was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};
*/