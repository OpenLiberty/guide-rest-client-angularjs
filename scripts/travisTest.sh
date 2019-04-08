#!/bin/bash
set -euxo pipefail

##############################################################################
##
##  Travis CI test script
##
##############################################################################

mvn -q clean install

mvn -q liberty:start-server

status="$(curl --write-out "%{http_code}\n" --silent --output /dev/null "http://localhost:9080/artists")"; if [ "$status" == "200" ]; then echo ENDPOINT OK; else echo "$status"; echo ENDPOINT NOT OK; exit 1; fi;

mvn -q liberty:stop-server
