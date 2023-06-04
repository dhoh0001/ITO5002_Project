## This file will run testing on the various endpoints
## Tests are run on a locally running instance
## seed data can be found in the seed_data.sql file
## generally, after seeding data from the seed file, there should only be 3 rows in each table, id 1 to 3

#Scenario: alert get all alerts
 curl -X GET localhost:5000/alert

#Scenario: alert get individual alert
curl -X GET -d id=1 -G localhost:5000/alert

#Scenario: alert put alert return status
curl -X PUT -d name=test -d alertLevel=1.0 -d timeframe=2 -G localhost:5000/alert

#Scenario: alert put alert validate alert was inserted
curl -X GET -d id=4 -G localhost:5000/alert

#Scenario: alert post alert validate status
curl -X POST -d id=1 -d name=test -d alertLevel=1.0 -d timeframe=2 -G localhost:5000/alert

#Scenario: alert post alert validate appropriate alert was changed
curl -X GET -d id=1 -G localhost:5000/alert

#Scenario: alert delete alert validate response
curl -X DELETE -d id=1 -G localhost:5000/alert

#Scenario: alert delete validate alert deleted
curl -X GET -d id=1 -G localhost:5000/alert

#Scenario: farm get all farms
curl -X GET -G localhost:5000/farm

#Scenario: farm get individualfarm 
curl -X GET -d id=1 -G localhost:5000/farm

#Scenario: farm put farm return status
curl -X PUT -d farmId=4 -d name=test -d userId=4 -G localhost:5000/farm

#Scenario: farm put farm validate farm was inserted
curl -X GET -d id=4 -G localhost:5000/farm

#Scenario: farm post farm validate status
curl -X POST -d id=1 -d farmId=1 -d name=test -d userId=1 -G localhost:5000/farm

#Scenario: farm post farm validate appropriate farm was changed
curl -X GET -d id=1 -G localhost:5000/farm

#Scenario: farm delete farm validate response
curl -X DELETE -d farmId=1 -G localhost:5000/farm

#Scenario: farm delete validate farm deleted
curl -X GET -d id=1 -G localhost:5000/farm

#Scenario: log get all logs
curl -X GET -G localhost:5000/log

#Scenario: log get individuallog 
curl -X GET -d logId=1 -G localhost:5000/log

#Scenario: log put log return status
curl -X PUT -d logId=4 -d name=test -d sensorId=4 -G localhost:5000/log

#Scenario: log put log validate log was inserted
curl -X GET -d logId=4 -G localhost:5000/log

#Scenario: log post log validate status
curl -X POST -d logId=4 -d name=test -d sensorId=1 -G localhost:5000/log

#Scenario: log post log validate appropriate log was changed
curl -X GET -d logId=4 -G localhost:5000/log

#Scenario: log delete log validate response
curl -X DELETE -d logId=1 -G localhost:5000/log

#Scenario: log delete validate log deleted
curl -X GET -d id=1 -G localhost:5000/log

#Scenario: sensor get all sensors
curl -X GET -G localhost:5000/sensor

#Scenario: sensor get individualsensor 
curl -X GET -d id=1 -G localhost:5000/sensor

#Scenario: sensor put sensor return status
curl -X PUT -d hardwareId=test -d name=test -d sensorAction=test -G localhost:5000/sensor

#Scenario: sensor put sensor validate sensor was inserted
curl -X GET -d id=4 -G localhost:5000/sensor

#Scenario: sensor post sensor validate status
curl -X POST -d sensorId=1 -d hardwareId=test -d name=test -d sensorAction=test -G localhost:5000/sensor

#Scenario: sensor post sensor validate appropriate sensor was changed
curl -X GET -d id=1 -G localhost:5000/sensor

#Scenario: sensor delete sensor validate response
curl -X DELETE -d sensorId=1 -G localhost:5000/sensor

#Scenario: sensor delete validate sensor deleted
curl -X GET -d id=1 -G localhost:5000/sensor

#Scenario: metadata get all metadatas
curl -X GET -G localhost:5000/uimetadata

#Scenario: metadata get individualmetadata 
curl -X GET -d metadataId=1 -G localhost:5000/uimetadata

#Scenario: metadata put metadata return status
curl -X PUT -d farmId=4 -d metadata=test -G localhost:5000/uimetadata

#Scenario: metadata put metadata validate metadata was inserted
curl -X GET -d id=4 -G localhost:5000/uimetadata

#Scenario: metadata post metadata validate parameters
curl -X POST -d farmId=1 -d metadata=test -G localhost:5000/uimetadata

#Scenario: metadata post metadata validate appropriate metadata was changed
curl -X GET -d id=1 -G localhost:5000/uimetadata

#Scenario: metadata delete metadata validate response
curl -X DELETE -d farmId=1 -G localhost:5000/uimetadata

#Scenario: metadata delete validate metadata deleted
curl -X GET -d id=1 -G localhost:5000/uimetadata

#Scenario: user get all users
curl -X GET -G localhost:5000/user

#Scenario: user get individualuser 
curl -X GET -d userId=1 -G localhost:5000/user

#Scenario: user put user return status
curl -X PUT -d firstName=test -d lastName=test -d email=test -G localhost:5000/user

#Scenario: user put user validate user was inserted
curl -X GET -d id=4 -G localhost:5000/user

#Scenario: user post user validate status
curl -X POST -d userId=1 -d firstName=test -d lastName=test -d email=test -G localhost:5000/user

#Scenario: user post user validate appropriate user was changed
curl -X GET -d id=1 -G localhost:5000/user

#Scenario: user delete user validate response
curl -X DELETE -d userId=1 -G localhost:5000/user

#Scenario: user delete validate user deleted
curl -X GET -d id=1 -G localhost:5000/user

#lcenario: data get data with data present
curl -X GET -d logId=1 -d dateStart=0 -d dateEnd=2  -G localhost:5000/data

#Scenario: data put data
curl -X PUT -d logId=1 -d timestamp=1 -d value=1.0  -G localhost:5000/data

