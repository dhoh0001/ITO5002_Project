module.exports = ( function() {
    'use strict';
    var dataRoutes = require('express').Router();

    var database = require('./../database.js');
    var data_db = new database();
    
    dataRoutes.get('/', function(req,res){
        if(!Number.isInteger(req.query.logId)) {
            res.status(500).send("The log ID must be an integer");
        }
        if(!Number.isInteger(req.query.dateStart)) {
            res.status(500).send("The start date must be an integer");
        }
        if(!Number.isInteger(req.query.dateEnd)) {
            res.status(500).send("The end date must be an integer");
        }

        let sql = `select * from logdata where log_id = ? and timestamp >= ? and timestamp <= ?`;
        data_db.db.all(sql, [req.query.logId, req.query.dateStart, req.query.dateEnd], (err, rows) => {
            if(err) {
                res.status(500).send("err: error retrieving from db: " + err);
                throw err;
            } else {
                var data = [];
                rows.forEach((row) => {
                    console.log(row)
                    let obj = {}
                    obj.logId = row.log_id
                    obj.timestamp = row.timestamp
                    obj.value = row.value
                    data.push(obj)
                })
                res.send(JSON.stringify(data))
            }
        });
    });

    dataRoutes.put('/', function(req,res){
        if(!Number.isInteger(req.query.logId)) {
            res.status(500).send("The log ID must be an integer");
        }
        if(!Number.isInteger(req.query.timestamp)) {
            res.status(500).send("The timestamp must be an integer");
        }
        if(isNaN(Number.parseFloat(req.query.value))) {
            res.status(500).send("The value needs to be a float");
        }

        let sql = `insert into logdata(log_id, timestamp, value) values (?, ?, ?)`;

        data_db.db.run(sql, [req.query.logId, req.query.timestamp, req.query.value], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200)
            }
        });
    });

    return dataRoutes;
})();
