module.exports = ( function() {
    'use strict';
    var logRoutes = require('express').Router();
    
    var database = require('./../database.js');
    var log_db = new database();

    logRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            let sql = `select * from log where log_id = ?`;
            log_db.db.get(sql, [req.query.logId], (err, row) => {
                if(err) {
                    throw err;
                }
                let obj = {};
                obj.logId = row.log_id;
                obj.name = row.name;
                obj.sensorId = row.sensorId;
                res.send(JSON.stringify(obj));
            });
        } else {
            let logs = [];
            let sql = `select * from log`;
            log_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    throw err;
                }
                rows.forEach((row) => {
                    console.log(row.name)
                    let obj = {};
                    obj.logId = row.log_id;
                    obj.name = row.name;
                    obj.sensorId = row.sensorId;
                    logs.push(obj);
                });
                res.send(JSON.stringify(logs));
            });
        }
    });
    
    logRoutes.put('/', function(req,res){
        let sql = `insert into log(log_id, name, sensor_id) values (?, ?, ?)`;

        log_db.db.run(sql, [req.query.logId, req.query.name, req.query.sensorId], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
 
    });

    logRoutes.post('/', function(req,res){
        let sql = `update log set log_id=?, name=?, sensor_id=? where log_id = ?`;

        log_db.db.run(sql, [req.query.logId, req.query.name, req.query.sensorId, req.query.logId], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
    });

    logRoutes.delete('/', function(req,res){
        let sql = `delete from log where log_id = ?`;

        log_db.db.run(sql, [req.query.logId], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
 
    });

    return logRoutes;
})();
