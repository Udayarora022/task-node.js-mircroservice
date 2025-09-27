📝 Task Management Microservices App

A microservices-based Task Management Application built with Node.js, Express.js, MongoDB, RabbitMQ, and Docker.
The system demonstrates scalable backend design, asynchronous communication, and containerized deployment.

🚀 Features

User Service → Create and manage users (REST APIs).

Task Service → Add tasks, publish events to RabbitMQ.

Notification Service → Consume RabbitMQ events and send notifications.

Asynchronous Messaging → Decoupled communication between services via RabbitMQ.

Microservices Architecture → Independent services for scalability and fault tolerance.

Containerized Deployment → Each service has its own Dockerfile.

Orchestration → docker-compose.yaml manages MongoDB, RabbitMQ, and all the services.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Messaging Queue: RabbitMQ (amqplib)

Containerization: Docker, Docker Compose

Version Control: Git & GitHub

📂 Project Structure
task-node.js-microservice/
│── docker-compose.yaml
│── user-service/         # Handles user CRUD APIs
│── task-service/         # Task creation + RabbitMQ publisher
│── notification-service/ # RabbitMQ consumer for notifications

🔗 Architecture
flowchart LR
    A[User Service] -->|REST API| B[Task Service]
    B -->|Publish Task| C[(RabbitMQ Queue)]
    C -->|Consume Event| D[Notification Service]
    B --> E[(MongoDB)]
    A --> E

⚡ Quick Start

Clone the repo

git clone https://github.com/Udayarora022/task-node.js-microservice.git
cd task-node.js-microservice


Run with Docker Compose

docker-compose up --build


Access Services

User Service → http://localhost:4000/users

Task Service → http://localhost:5000/tasks

RabbitMQ Dashboard → http://localhost:15672 (default user/pass: guest/guest)

📈 What This Project Demonstrates

✔️ Microservices design & inter-service communication
✔️ Event-driven architecture using RabbitMQ
✔️ REST API development with Node.js & Express.js
✔️ Containerization & orchestration using Docker + Compose
✔️ Production-like deployment setup

🎯 Why This Project Matters

This project highlights real-world backend engineering skills:

Designing scalable systems

Working with messaging queues

Using Docker for deployment-readiness

Managing asynchronous workflows
