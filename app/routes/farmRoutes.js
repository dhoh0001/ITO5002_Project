module.exports = ( function() {
    'use strict';
    var farmRoutes = require('express').Router();
    
    var database = require('./../database.js');
    var farm_db = new database();

    farmRoutes.get('/', function(req,res){

        if(typeof req.query.farmId !== "undefined" && req.query.farmId) {
            if(!Number.isInteger(parseInt(req.query.farmId))) {
                res.status(500).send("The ID must be an integer");
                return;
            }
            let sql = `select * from farm where farm_id = ?`;
            farm_db.db.get(sql, [req.query.farmId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    if(row) {
                        let obj = {};
                        obj.farmId = row.farm_id;
                        obj.name = row.name;
                        obj.userId = row.user_id;
                        res.send(JSON.stringify(obj));
                    } else {
                        res.status(404).send("id not found");
                    }
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


    farmRoutes.get('/byuid', function(req,res){
            let farms = [];
            let sql = `select f.* from farm f inner join user u on u.user_id = f.user_id where u.uid = ?;`;
            farm_db.db.all(sql, [req.query.uid], (err, rows) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.farmId = row.farm_id;
                        obj.name = row.name;
                        obj.userId = row.user_id;
                        farms.push(obj);
                    });
                    res.send(JSON.stringify(farms));
                }
            });
    });
    
    farmRoutes.put('/', function(req,res){
        if(req.query.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.query.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }

        let sql = `insert into farm(name, user_id) values (?, ?)`;

        farm_db.db.run(sql, [req.query.name, req.query.userId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    farmRoutes.post('/', function(req,res){
        if(!Number.isInteger(parseInt(req.body.farmId))) {
            res.status(500).send("The farm ID must be an integer");
            return;
        }
        if(req.body.name.length > 100) {
            res.status(500).send("The length of the name is too long");
            return;
        }
        if(!Number.isInteger(parseInt(req.body.userId))) {
            res.status(500).send("The user ID must be an integer");
            return;
        }

        let sql = `update farm set farm_id=?, name=?, user_id=? where farm_id=?`;

        farm_db.db.run(sql, [req.body.farmId, req.body.name, req.body.userId, req.body.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    farmRoutes.delete('/', function(req,res){
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
