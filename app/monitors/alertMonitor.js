var database = require('../database.js');
var mon_db = new database();
var emailer = require('../emailer.js');

class alertMonitor {
    run() {
        //console.log("tick");
        let sql = ` select a.alert_level, a.name, ld.value, max(ld.timestamp) as timestamp, u.email from alert a inner join log l on a.log_id  = l.log_id inner join logdata ld on l.log_id = ld.log_id inner join farm f on l.farm_id = f.farm_id inner join user u on f.user_id = u.user_id group by ld.log_id;`;
        mon_db.db.all(sql, [], (err, rows) => {
            if(err) {
                console.log("this is err");
            } else {
                rows.forEach((row) => {
                    if(row.value > row.alert_level) {
                        //console.log("ALERT!!");
                        emailer.sendMail(row.email, row.name, row.value);
                    }
                });
            }
        });
    }
}

module.exports = new alertMonitor();
