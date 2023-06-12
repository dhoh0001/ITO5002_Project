#! /bin/bash
##-----------------------------------------
## This script install dependencies for the app.
##-----------------------------------------


# Install nodejs, npm
sudo apt update
sudo apt install nodejs
sudo apt install npm

## move into app directory
cd app

##install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 16.15.1

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
##firebse
npm install firebase --save
npm install firebase-admin --save
##axios
npm install axios --save
##nodemailer
npm install nodemailer --save
##cors
npm install cors --save

##set up routes for aws
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080

##set up pm2
pm2 start index.js
