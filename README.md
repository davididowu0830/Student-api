# Student Management REST API

A lightweight, modular Node.js REST API built using the native `http` module. This project implements full CRUD functionality to manage student profiles using an in-memory database array.

## Features
- **Create**: Add a new student profile (`POST /students`)
- **Read**: Fetch all records or target specific IDs (`GET /students` / `GET /students/:id`)
- **Update**: Modify student details on the fly (`PUT /students/:id`)
- **Delete**: Remove records cleanly (`DELETE /students/:id`)

## Data Schema
Each student record contains:
- `name`
- `email`
- `homeAddress`
- `nextOfKin`

## How to Run Locally
1. Clone this repository.
2. Open your terminal in the project folder.
3. Run the application:
   ```bash
   node server.js
