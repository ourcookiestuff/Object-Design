#!/bin/bash

echo "Building Docker image..."
docker build -t bubble-sort-app .

echo "Running Docker container..."
docker run --rm bubble-sort-app