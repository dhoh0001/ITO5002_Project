const nodemailer = require("nodemailer");
class emailer {
    'use strict';
    sendMail(email, alert_name, value) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        let mailOptions = {
            from: 'vertiguard@gmail.com',
            to: email,
            subject: 'Vertiguard: ALERT',
            text: 'Alert Name: ' + alert_name + '\n Value: ' + value
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        }); 
    }
}
module.exports = new emailer();
