module.exports = ( function() {
    'use strict';
    var sensorRoutes = require('express').Router();
    
    sensorRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    sensorRoutes.put('/test', function(req,res){
        res.send('test');
    });

    sensorRoutes.post('/test', function(req,res){
        res.send('test');
    });

    sensorRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return sensorRoutes;
})();
