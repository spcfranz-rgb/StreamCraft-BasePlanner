# StreamCraft Base Planner

A web-based dashboard and planning tool for SpaceCraft planetary outpost logistics. Calculates aggregate raw material costs and net power draw in real-time.

## Local Development
To run this project locally without Docker:
```bash
npm install
npm run dev
```
Navigate to `http://localhost:5173`.

## Docker Deployment (ARM64 Optimized with Node 'serve')
This project includes a multi-stage Dockerfile designed for lightweight deployment via Node `serve`, avoiding the need for Nginx and root privileges inside the container. It is optimized for ARM64 architectures like the Raspberry Pi 5.

To build and run:
```bash
docker buildx build --platform linux/arm64 -t spacecraft-planner:latest .
docker-compose up -d
```
