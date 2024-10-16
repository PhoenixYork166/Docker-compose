#!/bin/bash

# $(pwd) = projectFolder/backend
docker build -t ai-react:latest -f ./react.Dockerfile .