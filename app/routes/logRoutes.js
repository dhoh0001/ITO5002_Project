module.exports = ( function() {
    'use strict';
    var logRoutes = require('express').Router();
    
    var database = require('./../database.js');
    var log_db = new database();

    logRoutes.get('/', function(req,res){
        if(typeof req.query.logId !== "undefined" && req.query.logId) {
            if(!Number.isInteger(parseInt(req.query.logId))) {
                res.status(500).send("The log ID must be an integer");
                return;
            }
            let sql = `select * from log where log_id = ?`;
            log_db.db.get(sql, [req.query.logId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.logId = row.log_id;
                        obj.name = row.name;
                        obj.sensorId = row.sensor_id;
                        obj.farmId = row.farm_id;
                        obj.logSetting = row.log_setting;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
                }
            });
        } else {
            let logs = [];
            let sql = `select * from log`;
            log_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.logId = row.log_id;
                        obj.name = row.name;
                        obj.sensorId = row.sensor_id;
                        obj.farmId = row.farm_id;
                        obj.logSetting = row.log_setting;
                        logs.push(obj);
                    });
                    res.send(JSON.stringify(logs));
                }
            });
        }
    });
    
    logRoutes.get('/byuid', function(req,res){
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.uid.match(regex)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            let sql = `select l.* from log l inner join farm f on l.farm_id = f.farm_id inner join user u on u.user_id = f.user_id where u.uid = ?;`;
            log_db.db.get(sql, [req.query.uid], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.logId = row.log_id;
                        obj.name = row.name;
                        obj.sensorId = row.sensor_id;
                        obj.farmId = row.farm_id;
                        obj.logSetting = row.log_setting;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
                }
            });
    });

    logRoutes.put('/', function(req,res){
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.name.match(regex)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }

        let sql = `insert into log(name, sensor_id, farm_id, log_setting) values (?, ?, ?, ?)`;

        log_db.db.run(sql, [req.query.name, req.query.sensorId, req.query.farmId, req.query.logSetting], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    logRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.body.logId))) {
            res.status(500).send("The log ID must be an integer");
            return;
        }
        if(req.body.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.name.match(regex)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        let regex = new RegExp("[a-zA-Z0-9@.-_]");
        if(!req.query.logSetting.match(regex)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }

        let sql = `update log set log_id=?, name=?, sensor_id=?, farm_id = ?, log_setting = ? where log_id = ?`;

        log_db.db.run(sql, [req.body.logId, req.body.name, req.body.sensorId, req.body.farmId, req.body.logSetting, req.body.logId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    logRoutes.delete('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.logId))) {
            res.status(500).send("The log ID must be an integer");
            return;
        }

        let sql = `delete from log where log_id = ?`;

        log_db.db.run(sql, [req.query.logId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    return logRoutes;
})();
