#!/bin/bash

docker image build --rm --no-cache -t catalog-web-app-bff:latest -f Dockerfile .
