#! /bin/bash
##-----------------------------------------
## This script install dependencies for the app.
##-----------------------------------------


# Install nodejs, npm
sudo apt update
sudo apt install nodejs
sudo apt install npm

# Install packages
##axios
npm install axios --save
##body-parser
npm install body-parser --save
##express
npm install express --save
##pm2
npm install pm2 --save
##sqlite3
npm install sqlite3 --save

##set up routes for aws
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
