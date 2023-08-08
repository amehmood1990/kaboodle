## Multi-Container Application Setup Guide

This guide will help you set up our multi-container application locally.

### Prerequisites
- Docker
- Docker Compose
### Steps to Run
1. Clone the repository.
2. Install Docker and Docker Compose.
3. Build containers: `docker-compose build`.
4. Start the app: `docker-compose up -d`.

### Access
- kevents: [http://localhost:3000](http://localhost:3000)
- api: [http://localhost:5000](http://localhost:5000)

### Stop
To stop the app: `docker-compose down`.

### Default Users
1. User 1: john_doe / john@example.com / password1 (admin)
2. User 2: jane_smith / jane@example.com / password2 (user)

---
