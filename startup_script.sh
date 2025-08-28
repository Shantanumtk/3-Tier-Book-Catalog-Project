#!/bin/bash
echo "Stopping Docker Compose Containers ============"
docker compose down -v
sleep 5
echo "Building Docker Images ============="
docker compose build --no-cache
sleep 10
echo "Start the Docker Compose ============="
docker compose up -d

