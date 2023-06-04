#!/bin/bash

## This script triggers a test sensor to send data to the server every minute(as a sensor should)

endpoint=localhost:5000
value=1

while [ true ]; do
    timestamp=`date +%s`

    number=$RANDOM
    let "number %= 2"

    if [[ $number -eq 1 ]]; then
        let "value++"
    else
        let "value--"
    fi
    
    curl -X PUT -d logId=1 -d timestamp=$timestamp -d value=$value -G $endpoint/data

    sleep 60
done
