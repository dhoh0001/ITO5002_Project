module.exports = ( function() {
    'use strict';
    var alertRoutes = require('express').Router();

    var database = require('./../database.js');
    var alert_db = new database();
    
    alertRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            let sql = `select * from alert where alert_id = ?`;
            alert_db.db.get(sql, [req.query.id], (err, row) => {
                if(err) {
                    throw err;
                }
                let obj = {};
                obj.alertId = row.alert_id;
                obj.name = row.name;
                obj.alertLevel = row.alert_level;
                obj.timeframe = row.timeframe;
                res.send(JSON.stringify(obj));
            });
        } else {
            let alerts = [];
            let sql = `select * from alert`;
            alert_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    throw err;
                }
                rows.forEach((row) => {
                    console.log(row.name)
                    let obj = {};
                    obj.alertId = row.alert_id;
                    obj.name = row.name;
                    obj.alertLevel = row.alert_level;
                    obj.timeframe = row.timeframe;
                    alerts.push(obj);
                });
                res.send(JSON.stringify(alerts));
            });
        }
    });
    
    alertRoutes.put('/', function(req,res){
        let sql = `insert into alert(name, alert_level, timeframe) values (?, ?, ?)`;

        alert_db.db.run(sql, [req.query.name, req.query.alertLevel, req.query.timeframe], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
    });

    alertRoutes.post('/', function(req,res){
        let sql = `update alert set name=?, alert_level=?, timeframe=? where alert_id = ?`;

        alert_db.db.run(sql, [req.query.name, req.query.alertLevel, req.query.timeframe, req.query.id], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
    });

    alertRoutes.delete('/', function(req,res){
        let sql = `delete from alert where alert_id = ?`;

        alert_db.db.run(sql, [req.query.id], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
    });

    return alertRoutes;
})();
