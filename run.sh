#!/bin/bash

xhost +local:root

# Default values of arguments
ENTERYPOINT=0

# Loop through arguments and process them
# Taken from: https://pretzelhands.com/posts/command-line-flags
for arg in "$@"
do
    case $arg in
        --entrypoint)
        ENTERYPOINT=1
        shift # Remove
        ;;
    esac
done

if [ $ENTERYPOINT -eq 1 ]; then
	docker container run --rm -it --entrypoint /bin/sh -p 8080:8080 --name catalog-web-app-bff-container catalog-web-app-bff:latest
else
	docker container run --rm -p 8080:8080 --name catalog-web-app-bff-container catalog-web-app-bff:latest &
fi
