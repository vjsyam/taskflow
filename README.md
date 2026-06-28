# TaskFlow

A full-stack task tracking application built using the MERN stack (MongoDB, Express, React, and Node.js). 

This project was built as a technical assessment for the Full Stack Developer Intern position.

## Live Deployments

* Frontend: [taskflow-nu-dun-40.vercel.app](https://taskflow-nu-dun-40.vercel.app)
* Backend API: [taskflow-swqc.onrender.com/api](https://taskflow-swqc.onrender.com/api)

## Key Functionality

* Full CRUD operations: Create, view, edit, and delete tasks dynamically.
* Core fields: Title, description, status (todo, in-progress, done), priority (low, medium, high), and due date.
* Client-side filters: Instant filtering by status and priority without page reloads.
* Custom sorting: Sort tasks by due date or priority.
* UX enhancements: Toast feedback notifications for operations, overdue status highlighting, and modal-based editing.
* Responsive interface: Works across mobile, tablet, and desktop viewports.
* Strict validation: Front-end checking for required inputs and preventing past due dates.

## Architecture & Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Axios, React Icons, React Hot Toast |
| Backend | Node.js, Express, Cors, Dotenv |
| Database | MongoDB, Mongoose |
| Styling | Custom Vanilla CSS (Design system, responsive layout) |
| Deployments | Vercel (Client), Render (API) |

## Repository Structure

```
interncoll/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # API client configuration
│   │   ├── components/     # UI components
│   │   ├── hooks/          # useTasks state manager hook
│   │   ├── utils/          # Date and sorting formatters
│   │   ├── App.jsx         # App container
│   │   ├── main.jsx        # Mount point
│   │   └── index.css       # Custom stylesheets
│   ├── .env.example
│   └── vercel.json         # Vercel configuration
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # MongoDB setup
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Global error and 404 handlers
│   │   ├── models/         # Task schemas
│   │   ├── routes/         # Express routing definitions
│   │   └── index.js        # Main entry point
│   ├── .env.example
│   └── package.json
├── render.yaml             # Render blueprint file
├── .gitignore
└── README.md
```

## Environment Setup

### Backend (server/.env)

* `PORT`: Local server port (defaults to 5000)
* `MONGODB_URI`: Connection string to MongoDB Atlas instance
* `CLIENT_URL`: URL of the client application (controls CORS policies)
* `NODE_ENV`: Runs environment modes (e.g. development, production)

### Frontend (client/.env)

* `VITE_API_URL`: Root path of the Express API (e.g., https://your-domain.com/api)

## Local Development Instructions

### Prerequisites
* Node.js v18 or later
* Access to a MongoDB Atlas cluster or local database instance

### 1. Backend Server Setup
From the repository root:
```bash
cd server
cp .env.example .env
# Open .env and add your MONGODB_URI and CLIENT_URL
npm install
npm run dev
```
The server starts up locally on `http://localhost:5000`.

### 2. Frontend Client Setup
From the repository root:
```bash
cd client
# By default, client/.env is preconfigured for http://localhost:5000/api
npm install
npm run dev
```
The development server boots up on `http://localhost:5173`.

## API Documentation

Base Endpoint: `/api`

| Method | Endpoint | Description | Request Body Parameters |
|---|---|---|---|
| GET | `/tasks` | Retrieves all tasks | None |
| GET | `/tasks/:id` | Retrieves a single task | None |
| POST | `/tasks` | Creates a new task | title, description, status, priority, dueDate |
| PUT | `/tasks/:id` | Updates a task | title, description, status, priority, dueDate |
| DELETE | `/tasks/:id` | Removes a task | None |
| GET | `/health` | Server uptime check | None |

### Schema details
* Title: String (required, maximum 120 characters)
* Description: String (optional, maximum 1000 characters)
* Status: String (todo, in-progress, done)
* Priority: String (low, medium, high)
* Due Date: Date (required)
