module.exports = ( function() {
    'use strict';
    var settingRoutes = require('express').Router();
    
    settingRoutes.get('/', function(req,res){
        res.send('test');
    });
    
    settingRoutes.put('/test', function(req,res){
        res.send('test');
    });

    settingRoutes.post('/test', function(req,res){
        res.send('test');
    });

    settingRoutes.delete('/test', function(req,res){
        res.send('test');
    });

    return settingRoutes;
})();
