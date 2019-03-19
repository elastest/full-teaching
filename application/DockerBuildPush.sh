#!/bin/sh
cd angular-cli-project
ng build --output-path ./../spring/backend/src/main/resources/static
cd ../spring/backend
mvn clean package docker:build
docker push pablofuente/full-teaching
