module.exports = ( function() {
    'use strict';
    var dataRoutes = require('express').Router();

    var database = require('./../database.js');
    var data_db = new database();
    
    dataRoutes.get('/', function(req,res){
        let data = [];
        let sql = `select * from logdata where log_id = ?`;
        data_db.db.all(sql, [req.query.logId], (err, rows) => {
            if(err) {
                throw err;
            }
            rows.forEach((row) => {
                console.log(row.name)
                let obj = {};
                obj.logId = row.log_id;
                obj.timestamp = row.timestamp
                obj.value = row.value
                data.push(obj);
            });
            res.send(JSON.stringify(data));
        });
    });

    dataRoutes.put('/', function(req,res){
        let sql = `insert into logdata(log_id, timestamp, value) values (?, ?, ?)`;

        data_db.db.run(sql, [req.query.logId, req.query.timestamp, req.query.value], (err, rows) => {
            if(err) {
                throw err;
            }
        });
        res.sendStatus(200);
    });

    return dataRoutes;
})();
