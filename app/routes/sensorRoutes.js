module.exports = ( function() {
    'use strict';
    var sensorRoutes = require('express').Router();

    var database = require('./../database.js');
    var sensor_db = new database();
    
    sensorRoutes.get('/', function(req,res){
        if(typeof req.query.sensorId !== "undefined" && req.query.sensorId) {
            if(!Number.isInteger(parseInt(req.query.sensorId))) {
                res.status(500).send("The ID must be an integer");
                return;
            }
            let sql = `select * from sensor where sensor_id = ?`;
            sensor_db.db.get(sql, [req.query.sensorId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.sensorId = row.sensor_id;
                        obj.name = row.name;
                        obj.hardwareId= row.hardware_id;
                        obj.sensorAction = row.sensor_action;
                        obj.logId = row.log_id;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
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
                        obj.logId = row.log_id;
                        sensors.push(obj);
                    });
                    res.send(JSON.stringify(sensors));
                }
            });
        }
    });


    sensorRoutes.get('/byuid', function(req,res){
            let sql = `select s.* from sensor s inner join log l on s.log_id = l.log_id inner join farm f on l.farm_id = f.farm_id inner join user u on u.user_id = f.user_id where u.user_id = ?;`;
            log_db.db.get(sql, [req.query.uid], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.sensorId = row.sensor_id;
                        obj.name = row.name;
                        obj.hardwareId= row.hardware_id;
                        obj.sensorAction = row.sensor_action;
                        obj.logId = row.log_id;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
                }
            });
    });
    
    sensorRoutes.put('/', function(req,res){
        if(req.query.hardwareId.length > 100) {
            res.status(500).send("The hardware ID is too long");
            return;
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(req.query.sensorAction.length > 100) {
            res.status(500).send("The sensor action is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.logId))) {
            res.status(500).send("The ID must be an integer");
            return;
        }
        let sql = `insert into sensor(name, hardware_id, sensor_action, log_id) values (?, ?, ?)`;

        sensor_db.db.run(sql, [req.query.name, req.query.hardwareId, req.query.sensorAction, req.query.logId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    sensorRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.body.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }
        if(req.body.hardwareId.length > 100) {
            res.status(500).send("The hardware ID is too long");
            return;
        }
        if(req.body.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(req.body.sensorAction.length > 100) {
            res.status(500).send("The sensor action is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.logId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }
        let sql = `update sensor set name=?, hardware_id=?, sensor_action=?, log_id = ? where sensor_id = ?`;

        sensor_db.db.run(sql, [req.body.name, req.body.hardwareId, req.body.sensorAction, req.body.logId, req.body.sensorId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    sensorRoutes.delete('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
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
