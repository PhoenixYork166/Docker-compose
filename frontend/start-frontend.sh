#!/bin/bash

container_name = 'ai-frontend';
docker run --name $container_name --rm -it -v "$(pwd)":/app/src --network fullstack-network1 -p 3000:3000 ai-react:latest;