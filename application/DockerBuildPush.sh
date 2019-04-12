#!/bin/sh

cd src/main/angular
ng build --output-path ../resources/static
cd ../../../
mvn -DskipTests=true clean package docker:build
docker push elastest/demonstrator-noelastest_full-teaching:latest