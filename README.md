# Microservices Student Management (Node.js + MongoDB)

This sample project demonstrates a modern microservices architecture in Node.js with TypeScript, using MongoDB for persistence, an API Gateway, and a static Web UI (Nginx). Everything runs via Docker Compose.

## Services

- student-service: Fastify + Mongoose CRUD for students (create, list)
- gateway-service: Fastify gateway proxying web requests to services
- web-ui: Nginx hosting a static SPA; proxies /api to the gateway for same-origin
- mongodb: MongoDB database

## Quick Start

```bash
docker compose up -d --build
# Web UI: http://localhost:8080
# Gateway (direct): http://localhost:8081/health
# Student service (direct): http://localhost:3001/health
```

## Endpoints

- POST /api/students
  - Body: { name: string, email: string, age: number }
  - Creates a student
- GET /api/students
  - Returns list of students

The web UI calls the same endpoints via the Nginx proxy at `/api`.

## Local Development (without Docker)

You can run services locally if you have Node.js 20+ and MongoDB:

```bash
cd services/student-service && cp .env.example .env && npm i && npm run dev
cd services/gateway-service && cp .env.example .env && npm i && npm run dev
# Open web-ui/public/index.html with a live server, or use the provided Docker setup
```

If MongoDB is not installed locally, prefer the Docker Compose setup.

## Project Structure

```
services/
  gateway-service/
  student-service/
  web-ui/
docker-compose.yml
```

# backendSample
backendSample test with Cursor
