module.exports = ( function() {
    'use strict';
    var logRoutes = require('express').Router();
    
    logRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    logRoutes.put('/test', function(req,res){
        res.send('test');
    });

    logRoutes.post('/test', function(req,res){
        res.send('test');
    });

    logRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return logRoutes;
})();
