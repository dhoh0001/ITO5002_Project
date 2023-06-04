module.exports = ( function() {
    'use strict';
    var sensorRoutes = require('express').Router();

    var database = require('./../database.js');
    var sensor_db = new database();
    
    sensorRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            if(!Number.isInteger(req.query.id)) {
                res.status(500).send("The ID must be an integer");
            }
            let sql = `select * from sensor where sensor_id = ?`;
            sensor_db.db.get(sql, [req.query.id], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    let obj = {};
                    obj.sensorId = row.sensor_id;
                    obj.name = row.name;
                    obj.hardwareId= row.hardware_id;
                    obj.sensorAction = row.sensor_action;
                    res.send(JSON.stringify(obj));
                }
            });
        } else {
            let sensors = [];
            let sql = `select * from sensor`;
            sensor_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.sensorId = row.sensor_id;
                        obj.name = row.name;
                        obj.hardwareId= row.hardware_id;
                        obj.sensorAction = row.sensor_action;
                        sensors.push(obj);
                    });
                    res.send(JSON.stringify(sensors));
                }
            });
        }
    });
    
    sensorRoutes.put('/', function(req,res){
        if(req.query.hardwareId.length > 100) {
            res.status(500).send("The hardware ID is too long");
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
        }
        if(req.query.sensorAction.length > 100) {
            res.status(500).send("The sensor action is too long");
        }
        let sql = `insert into sensor(name, hardware_id, sensor_action) values (?, ?, ?)`;

        sensor_db.db.run(sql, [req.query.name, req.query.hardwareId, req.query.sensorAction], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    sensorRoutes.post('/', function(req,res){
        if(!Number.isInteger(req.query.sensorId)) {
            res.status(500).send("The sensor ID must be an integer");
        }
        if(req.query.hardwareId.length > 100) {
            res.status(500).send("The hardware ID is too long");
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
        }
        if(req.query.sensorAction.length > 100) {
            res.status(500).send("The sensor action is too long");
        }
        let sql = `update sensor set name=?, hardware_id=?, sensor_action=? where sensor_id = ?`;

        sensor_db.db.run(sql, [req.query.name, req.query.hardwareId, req.query.sensorAction, req.query.sensorId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    sensorRoutes.delete('/', function(req,res){
        if(!Number.isInteger(req.query.sensorId)) {
            res.status(500).send("The sensor ID must be an integer");
        }
        let sql = `delete from sensor where sensor_id = ?`;

        sensor_db.db.run(sql, [req.query.sensorId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    return sensorRoutes;
})();
