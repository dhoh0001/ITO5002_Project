
const sqlite3 = require('sqlite3');
module.exports = function(){
    'use strict';
    this.db = getDatabase();
    
}

function getDatabase() {
    return new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err && err.code == "SQLITE_CANTOPEN") {
            console.log("Cant open error " + err);
            createDatabase();
        } else if (err) {
                console.log("Getting error " + err);
                exit(1);
        }
    });

}

function createDatabase() {
    var newdb = new sqlite3.Database('test.db', (err) => {
        if (err && err.code == "SQLITE_CANTOPEN") {
        console.log("Cant open error " + err);
        createDatabase();
        return;
        } else if (err) {
                console.log("Getting error " + err);
                exit(1);
            }
            createTables(newdb);
        });
    return newdb;
}

function createTables(newdb) {
    newdb.exec(`
        create table user (
            user_id int primary key not null,
            first_name varchar(100),
            last_name varchar(100),
            email varchar(100),
            password varchar(100),
            salt varchar(100)
        );
        create table farm (
            farm_id int primary key not null,
            name varchar(100),
            user_id int
        );
        create table userInterfaceData (
            farm_id int,
            metadata text
        );
        create table farmAlert (
            farm_id int,
            alert_id int
        );
        create table alert (
            alert_id int primary key not null,
            name varchar(100),
            alert_level double,
            timeframe int
        );
        create table log (
            log_id int primary key not null,
            name varchar(100),
            sensor_id int
        );
        create table sensor (
            sensor_id int primary key not null,
            name varchar(100),
            hardware_id varchar(100),
            sensor_action varchar(100)
        );
        create table logdata (
            log_id int,
            timestamp varchar(100),
            value double
        );
    `);
}


