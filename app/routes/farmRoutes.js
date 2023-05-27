module.exports = ( function() {
    'use strict';
    var farmRoutes = require('express').Router();
    
    farmRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    farmRoutes.put('/test', function(req,res){
        res.send('test');
    });

    farmRoutes.post('/test', function(req,res){
        res.send('test');
    });

    farmRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return farmRoutes;
})();
