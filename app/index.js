//Initialize dependencies
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');
const next = require('next');


//initialize express
const PORT = process.env.PORT || 8080;

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

//alert monitor
	const alertMonitor = require('./monitors/alertMonitor');
	setInterval(alertMonitor.run, 10000);

nextApp.prepare().then(() => {

	const app = express();

	app.use(cors());


	//firebase auth
	//const middleware = require('./middleware/index');
	//app.use(middleware.decodeToken);

	//set to use body parser, for POST requests
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(express.static('client/build'));

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

	//user routes;
	var userRoutes = require('./routes/userRoutes');
	app.use('/user',userRoutes);

	//log routes;
	var logRoutes = require('./routes/logRoutes');
	app.use('/log',logRoutes);

	//unknown route
	app.get('*', function(req, res) {
		return handle(req, res);
	});
	app.put('*', function(req, res) {
		return handle(req, res);
	});
	app.post('*', function(req, res) {
		return handle(req, res);
	});
	app.delete('*', function(req, res) {
		return handle(req, res);
	});

	//set listener
	app.listen(PORT, function () {;
		  console.log(`Express server listening on port ${PORT}`);
	});
});
