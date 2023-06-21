module.exports = ( function() {
    'use strict';
    var alertRoutes = require('express').Router();

    var database = require('./../database.js');
    var alert_db = new database();
    
    alertRoutes.get('/', function(req,res){
        if(typeof req.query.alertId !== "undefined" && req.query.alertId) {
            if(!Number.isInteger(parseInt(req.query.alertId))) {
                res.status(500).send("The ID must be an integer");
                return;
            }
            let sql = `select * from alert where alert_id = ?`;
            alert_db.db.get(sql, [req.query.alertId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.alertId = row.alert_id;
                        obj.name = row.name;
                        obj.alertLevel = row.alert_level;
                        obj.timeframe = row.timeframe;
                        obj.farmId = row.farm_id;
                        obj.logId = row.log_id;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
                }
            });
        } else {
            let alerts = [];
            let sql = `select * from alert`;
            alert_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.alertId = row.alert_id;
                        obj.name = row.name;
                        obj.alertLevel = row.alert_level;
                        obj.timeframe = row.timeframe;
                        obj.farmId = row.farm_id;
                        obj.logId = row.log_id;
                        alerts.push(obj);
                    });
                    res.send(JSON.stringify(alerts));
                }
            });
        }
    });

    alertRoutes.get('/byuid', function(req,res){
        if(req.query.uid.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        let regex = new RegExp("^([a-zA-Z0-9@.-_ ]*)$");
        if(!regex.test(req.query.uid)) {
            res.status(500).send("The uid has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
            let alerts = [];
            let sql = `select a.* from alert a inner join farm f on a.farm_id = f.farm_id inner join user u on u.user_id = f.user_id where u.uid = ?;`;
            alert_db.db.all(sql, [req.query.uid], (err, rows) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.alertId = row.alert_id;
                        obj.name = row.name;
                        obj.alertLevel = row.alert_level;
                        obj.timeframe = row.timeframe;
                        obj.farmId = row.farm_id;
                        obj.logId = row.log_id;
                        alerts.push(obj);
                    });
                    res.send(JSON.stringify(alerts));
                }
            });
    });
    
    alertRoutes.put('/', function(req,res){
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        let regex = new RegExp("^([a-zA-Z0-9@.-_ ]*)$");
        if(!regex.test(req.query.name)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(isNaN(Number.parseFloat(req.query.alertLevel))) {
            res.status(500).send("The alert level needs to be a float");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.timeframe))) {
            res.status(500).send("The timeframe must be a number");
            return
        }
        if(!Number.isInteger(parseInt(req.query.farmId))) {
            res.status(500).send("The farm id must be a number");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.logId))) {
            res.status(500).send("The log id must be a number");
            return;
        }
        
        let sql = `insert into alert(name, alert_level, timeframe, farm_id, log_id) values (?, ?, ?, ?, ?)`;

        alert_db.db.run(sql, [req.query.name, req.query.alertLevel, req.query.timeframe, req.query.farmId, req.query.logId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    alertRoutes.post('/', function(req,res){
        if(req.body.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        let regex = new RegExp("^([a-zA-Z0-9@.-_ ]*)$");
        if(!regex.test(req.body.name)) {
            res.status(500).send("The name has illegal characters, only letters, numbers and the characters @ . - _ are allowed");
            return;
        }
        if(isNaN(Number.parseFloat(req.body.alertLevel))) {
            res.status(500).send("The alert level needs to be a float");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.timeframe))) {
            res.status(500).send("The timeframe must be a number");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.logId))) {
            res.status(500).send("The log ID must be an integer");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.alertId))) {
            res.status(500).send("The alert ID must be an integer");
            return;
        }

        let sql = `update alert set name=?, alert_level=?, timeframe=?, farm_id = ? , log_id = ? where alert_id = ?`;

        alert_db.db.run(sql, [req.body.name, req.body.alertLevel, req.body.timeframe, req.body.farmId, req.body.logId, req.body.alertId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    alertRoutes.delete('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.alertId))) {
            res.status(500).send("The ID must be an integer");
            return;
        }

        let sql = `delete from alert where alert_id = ?`;

        alert_db.db.run(sql, [req.query.alertId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    return alertRoutes;
})();
