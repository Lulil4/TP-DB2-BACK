const db = require('../models/db');

exports.traerEmpleadoConTicket = (req, res) => {

    // Save user in the database
    db.getInstance().collection('empleados').aggregate([
        {
            $lookup: {
                from:"clientes",
                localField:"dni",
                foreignField:"dni",
                as:"esCliente"
            }
        },
        {
            $match: {esCliente : {$ne: []}}
        },
        {
            $project: {apellido : 1, nombreCentral : 1, dni : 1}
        }]).toArray((err, result) => {
                if (err) {
                    return console.log(err);
                }
                res.send(result);
            });
};
