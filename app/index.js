const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {;
      res.send("Welcome to the project!");
});

//data routes;
var dataRoutes = require('./routes/dataRoutes');
app.use('/data',dataRoutes);

//Alert routes;
var alertRoutes = require('./routes/alertRoutes');
app.use('/alert',alertRoutes);

//sensor routes;
var sensorRoutes = require('./routes/sensorRoutes');
app.use('/sensor',sensorRoutes);

//ui metadata routes;
var uiMetadataRoutes = require('./routes/uiMetadataRoutes');
app.use('/uimetadata',uiMetadataRoutes);

//farm routes;
var farmRoutes = require('./routes/farmRoutes');
app.use('/farm',farmRoutes);

//setting routes;
var settingRoutes = require('./routes/settingRoutes');
app.use('/setting',settingRoutes);

//user routes;
var userRoutes = require('./routes/userRoutes');
app.use('/user',userRoutes);

//log routes;
var logRoutes = require('./routes/logRoutes');
app.use('/log',logRoutes);

app.listen(PORT, function () {;
      console.log(`Express server listening on port ${PORT}`);
});
