#!/bin/bash

docker rmi goals-react:latest;
docker build -t ai-react:latest -f ./react.Dockerfile .