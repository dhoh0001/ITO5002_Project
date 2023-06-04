module.exports = ( function() {
    'use strict';
    var uiMetadataRoutes = require('express').Router();

    var database = require('./../database.js');
    var metadata_db = new database();
    
    uiMetadataRoutes.get('/', function(req,res){
        if(typeof req.query.id !== "undefined" && req.query.id) {
            if(!Number.isInteger(req.query.metadataId)) {
                res.status(500).send("The ID must be an integer");
            }
            let sql = `select * from userInterfaceData where farm_id = ?`;
            metadata_db.db.get(sql, [req.query.metadataId], (err, row) => {
                if(err) {
                    res.status(404).send("[]");
                } else {
                    let obj = {};
                    obj.farmId = row.farm_id;
                    obj.metadata = row.metadata;
                    res.send(JSON.stringify(obj));
                }
            });
        } else {
            let metadatas = [];
            let sql = `select * from userInterfaceData`;
            metadata_db.db.all(sql, [], (err, rows) => {
                if(err) {
                    res.status(500).send("err: error retrieving from db: " + err)
                } else {
                    rows.forEach((row) => {
                        let obj = {};
                        obj.farmId = row.farm_id;
                        obj.metadata = row.metadata;
                        metadatas.push(obj);
                    });
                    res.send(JSON.stringify(metadatas));
                }
            });
        }
 
    });
    
    uiMetadataRoutes.put('/', function(req,res){
        if(!Number.isInteger(req.query.farmId)) {
            res.status(500).send("The farm ID must be an integer");
        }
        let sql = `insert into userInterfaceData(farm_id, metadata) values (?, ?)`;

        metadata_db.db.run(sql, [req.query.farmId, req.query.metadata], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
    });

    uiMetadataRoutes.post('/', function(req,res){
        if(!Number.isInteger(req.query.farmId)) {
            res.status(500).send("The farm ID must be an integer");
        }
        let sql = `update userInterfaceData set farm_id=?, metadata=? where farm_id = ?`;

        metadata_db.db.run(sql, [req.query.farmId, req.query.metadata, req.query.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error updating db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    uiMetadataRoutes.delete('/', function(req,res){
        if(!Number.isInteger(req.query.farmId)) {
            res.status(500).send("The farm ID must be an integer");
        }
        let sql = `delete from userInterfaceData where farm_id = ?`;

        metadata_db.db.run(sql, [req.query.farmId], (err, rows) => {
            if(err) {
                res.status(500).send("err: error deleting from db: " + err)
            } else {
                res.sendStatus(200);
            }
        });
 
    });

    return uiMetadataRoutes;
})();
