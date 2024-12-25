# Todo App Server

A RESTful API backend for the Todo application built with Express.js, TypeScript, Prisma, and MySQL.

## Features

- RESTful API endpoints for task management
- MySQL database integration with Prisma ORM
- Input validation and error handling
- Docker support for MySQL database
- TypeScript for type safety
- CORS enabled for frontend integration

## Prerequisites

- Node.js 18.x or later
- Docker and Docker Compose
- npm or yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/devcrati/todo-app-server.git
cd todo-app-server
```

2. Install dependencies:

```bash
npm install
```

3. Start the MySQL Database:

```bash
docker compose up -d
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start the server:

```bash
npm run dev
```


The server will start on http://localhost:3000

## API Endpoints

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task
