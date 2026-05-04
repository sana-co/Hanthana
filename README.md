# Hanthana – Academic Collaboration Platform

## Overview

Hanthana is a campus-centric academic collaboration platform designed to unify communication, resource sharing, and academic engagement within a single system. It aims to replace fragmented tools (e.g., messaging apps, file sharing, LMS gaps) with a structured, purpose-driven environment for students and faculty.

## Tech Stack

### Frontend

* React (Vite + TypeScript)
* Tailwind CSS
* React Router
* Axios
* TanStack Query

### Backend (Planned)

* Node.js
* Express.js
* Supabase (PostgreSQL, Auth, Storage)

## Project Structure

```
Hanthana/
  frontend/     # React application
  backend/      # Express API (planned)
```

## Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/hanthana.git
cd hanthana
```

### 2. Setup Frontend

```
cd frontend
npm install
npm run dev
```

App will run at:

```
http://localhost:5173
```

## Current Progress

### Completed

* Project scaffolding (React + Vite)
* Tailwind CSS setup
* Basic routing
* Register page UI

### In Progress

* Login page
* Shared UI components
* Layout (navbar/sidebar)

### Planned Features

* Authentication (Supabase)
* Group creation & management
* Post feed and interactions
* File sharing system
* Messaging & notifications
* Event management
* Search & Q&A system
* Admin dashboard

## Development Approach

* Frontend-first development
* Backend integration after UI stabilization
* Modular and scalable architecture
* MVC-inspired separation of concerns

## Git Commit Convention

* `feat:` new feature
* `fix:` bug fix
* `chore:` setup/config
* `refactor:` code improvements

Example:

```
feat(frontend): add register page UI
```

## Notes

* This project is under active development.
* Backend and database integration will be added incrementally.
* Focus is on building a clean, maintainable, and scalable system.

## License

This project is for academic purposes.
