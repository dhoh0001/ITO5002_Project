module.exports = ( function() {
    'use strict';
    var logRoutes = require('express').Router();
    
    var database = require('./../database.js');
    var log_db = new database();

    logRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            if(!Number.isInteger(parseInt(req.query.id))) {
                res.status(500).send("The log ID must be an integer");
                return;
            }
            let sql = `select * from log where log_id = ?`;
            log_db.db.get(sql, [req.query.logId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    let obj = {};
                    obj.logId = row.log_id;
                    obj.name = row.name;
                    obj.sensorId = row.sensorId;
                    obj.farmId = row.farm_id;
                    res.send(JSON.stringify(obj));
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
                        console.log(row.name)
                        let obj = {};
                        obj.logId = row.log_id;
                        obj.name = row.name;
                        obj.sensorId = row.sensorId;
                        obj.farmId = row.farm_id;
                        logs.push(obj);
                    });
                    res.send(JSON.stringify(logs));
                }
            });
        }
    });
    
    logRoutes.put('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.logId))) {
            res.status(500).send("The log ID must be an integer");
            return;
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }

        let sql = `insert into log(log_id, name, sensor_id, farm_id) values (?, ?, ?, ?)`;

        log_db.db.run(sql, [req.query.logId, req.query.name, req.query.sensorId, req.query.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    logRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.logId))) {
            res.status(500).send("The log ID must be an integer");
            return;
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.sensorId))) {
            res.status(500).send("The sensor ID must be an integer");
            return;
        }

        let sql = `update log set log_id=?, name=?, sensor_id=?, farm_id = ? where log_id = ?`;

        log_db.db.run(sql, [req.query.logId, req.query.name, req.query.sensorId, req.query.farmId, req.query.logId], (err, rows) => {
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
