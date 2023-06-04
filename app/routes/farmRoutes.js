module.exports = ( function() {
    'use strict';
    var farmRoutes = require('express').Router();
    
    var database = require('./../database.js');
    var farm_db = new database();

    farmRoutes.get('/', function(req,res){

        if(typeof req.query.id !== "undefined" && req.query.id) {
            if(!Number.isInteger(parseInt(req.query.id))) {
                res.status(500).send("The ID must be an integer");
                return;
            }
            let sql = `select * from farm where farm_id = ?`;
            farm_db.db.get(sql, [req.query.id], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    let obj = {};
                    obj.farmId = row.farm_id;
                    obj.name = row.name;
                    obj.userId = row.user_id;
                    res.send(JSON.stringify(obj));
                }
            });
        } else {
            let farms = [];
            let sql = `select * from farm`;
            farm_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        console.log(row.name)
                        let obj = {};
                        obj.farmId = row.farm_id;
                        obj.name = row.name;
                        obj.userId = row.user_id;
                        farms.push(obj);
                    });
                    res.send(JSON.stringify(farms));
                }
            });
        }
    });
    
    farmRoutes.put('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }

        let sql = `insert into farm(farm_id, name, user_id) values (?, ?, ?)`;

        farm_db.db.run(sql, [req.query.farmId, req.query.name, req.query.userId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    farmRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.query.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }

        let sql = `update farm set farm_id=?, name=?, user_id=? where farm_id=?`;

        farm_db.db.run(sql, [req.query.farmId, req.query.name, req.query.userId, req.query.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    farmRoutes.delete('/', function(req,res){
        console.log(req.query.farmId);
        if(!Number.isInteger(parseInt(req.query.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }
        let sql = `delete from farm where farm_id = ?`;

        farm_db.db.run(sql, [req.query.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    return farmRoutes;
})();
