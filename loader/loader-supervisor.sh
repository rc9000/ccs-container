#!/bin/bash

# reload incoming configs every SLEEP seconds. This is meant to be launched from the 
# supervisor in the Docker container

SLEEP=${1:-600}

echo "refreshing configs every $SLEEP seconds"

# give solr some time to become ready on first launch
sleep 120 

while true ; do
    /opt/ccs/loader/loader.sh
    sleep $SLEEP
done
