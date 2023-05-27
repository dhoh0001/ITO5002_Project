#! /bin/bash
INIT=0

# Install nodejs, npm
sudo apt update
sudo apt install nodejs
sudo apt install npm

# create new app
if [ INIT -eq 1 ]; then
    npm init
fi

# setup main, and start scripts
if [ INIT -eq 1 ]; then
    ##TODO fix the line here
else
    git clone https://github.com/dhoh0001/ITO5002_Project.git
fi

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

# Install webserver
##TODO add webserver

