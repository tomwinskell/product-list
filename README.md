# Product List Monorepo

A full-stack product management application with a React frontend and Express.js API backend.

## Structure

```
apps/
├── web/         # React + Redux Toolkit frontend
├── api/         # Express.js + MongoDB backend
```

## Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (running locally)
- Yarn

### Setup

```bash
# Install all dependencies
yarn install

# Start both applications
yarn dev
```

This will start:

- Web app: http://localhost:5173
- API server: http://localhost:3000
- API docs: http://localhost:3000/docs

### Individual Apps

```bash
# Start only the web app
yarn dev:web

# Start only the API
yarn dev:api
```

## Tech Stack

**Frontend (web):**

- React 19 + Redux Toolkit
- Vite + TypeScript
- Tailwind CSS + Flowbite React

**Backend (api):**

- Express.js + TypeScript
- MongoDB + Mongoose
- TSOA (auto-generated routes/docs)

## Features

- Product browsing with search, filtering, and pagination
- Product reviews and ratings
- Dark/light mode toggle
- Responsive design
- Auto-generated API documentation

For detailed setup and development information, see the README files in each app directory.
