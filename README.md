# TaskFlow — Task Tracker

A full-stack task tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

**Live Demo:**
- Frontend: [your-app.vercel.app](https://your-app.vercel.app) ← update after deploy
- Backend API: [your-api.onrender.com](https://your-api.onrender.com) ← update after deploy

---

## Features

- ✅ Full CRUD — Create, Read, Update, Delete tasks
- 🏷️ Task fields: Title, Description, Status, Priority, Due Date
- ⚡ Filter by status and priority (instant, client-side)
- ↕️ Sort by due date or priority
- 🔔 Toast notifications for all actions
- ⚠️ Overdue task highlighting
- 📱 Fully responsive (mobile-first)
- 🔒 Form validation (required fields, no past dates)

---

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React 18 + Vite               |
| Backend   | Node.js + Express 5           |
| Database  | MongoDB + Mongoose 8          |
| Styling   | Vanilla CSS (custom design system) |
| HTTP      | Axios                         |
| Toasts    | react-hot-toast               |
| Icons     | react-icons (Remix Icons)     |
| Deploy FE | Vercel                        |
| Deploy BE | Render                        |

---

## Project Structure

```
interncoll/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios instance + API calls
│   │   ├── components/     # React components
│   │   ├── hooks/          # useTasks custom hook
│   │   ├── utils/          # Formatters, helpers
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Design system
│   ├── .env                # Local env vars
│   ├── .env.example
│   └── vercel.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # DB connection
│   │   ├── controllers/    # Route logic
│   │   ├── middleware/     # Error handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routers
│   │   └── index.js        # Server entry point
│   ├── .env.example
│   └── package.json
├── render.yaml             # Render deploy config
├── .gitignore
└── README.md
```

---

## Environment Variables

### Server (`server/.env`)

| Variable       | Description                          | Example                                  |
|----------------|--------------------------------------|------------------------------------------|
| `PORT`         | Server port                          | `5000`                                   |
| `MONGODB_URI`  | MongoDB Atlas connection string      | `mongodb+srv://user:pass@cluster.mongodb.net/tasktracker` |
| `CLIENT_URL`   | Frontend origin (for CORS)           | `https://your-app.vercel.app`            |
| `NODE_ENV`     | Environment                          | `production`                             |

### Client (`client/.env`)

| Variable        | Description              | Example                                      |
|-----------------|--------------------------|----------------------------------------------|
| `VITE_API_URL`  | Backend API base URL     | `https://your-api.onrender.com/api`          |

---

## Local Development Setup

### Prerequisites

- Node.js v18+
- A MongoDB Atlas account (free tier works)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd interncoll
```

### 2. Setup the server

```bash
cd server
cp .env.example .env
# Fill in your MONGODB_URI in .env
npm install
npm run dev
```

Server runs at `http://localhost:5000`

### 3. Setup the client

```bash
cd client
# .env already has VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Reference

Base URL: `http://localhost:5000/api` (or your Render URL)

| Method | Endpoint         | Description       | Body                                      |
|--------|-----------------|-------------------|--------------------------------------------|
| GET    | `/tasks`        | Get all tasks     | —                                          |
| GET    | `/tasks/:id`    | Get one task      | —                                          |
| POST   | `/tasks`        | Create task       | `{ title, description, status, priority, dueDate }` |
| PUT    | `/tasks/:id`    | Update task       | `{ title, description, status, priority, dueDate }` |
| DELETE | `/tasks/:id`    | Delete task       | —                                          |
| GET    | `/health`       | Health check      | —                                          |

### Task Schema

```json
{
  "_id": "ObjectId",
  "title": "string (required, max 120)",
  "description": "string (optional, max 1000)",
  "status": "todo | in-progress | done",
  "priority": "low | medium | high",
  "dueDate": "ISO date string (required)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

---

## Deployment

### MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create free cluster
2. **Database Access** → Add a user with password
3. **Network Access** → Add `0.0.0.0/0` (allow all IPs, required for Render)
4. **Connect** → Drivers → Copy connection string
5. Replace `<password>` and set database name to `tasktracker`

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo → Set **Root Directory** to `server`
4. Build command: `npm install` | Start command: `npm start`
5. Add environment variables:
   - `MONGODB_URI` → your Atlas URI
   - `CLIENT_URL` → your Vercel URL (set after FE deploy)
   - `NODE_ENV` → `production`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → Import project
2. Set **Root Directory** to `client`
3. Framework preset: **Vite**
4. Add environment variable:
   - `VITE_API_URL` → your Render service URL + `/api`
5. Deploy → copy the URL → paste into Render's `CLIENT_URL` env var

---

## License

MIT
