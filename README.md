# Vue Task Manager

A simple task management application built with **Vue 3 and TypeScript** to practice modern Vue development, state management, and REST API integration.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia — global state management
- Vue Router — navigation
- Fetch API — HTTP requests
- JSON Server — mock REST API
- LocalStorage — local data persistence

## Features

**Tasks — Pinia + REST API**
- Create, view, edit, and delete tasks
- Toggle task completion status
- Clear all tasks
- Task statistics (total, completed, pending)
- API integration with JSON Server
- Loading states and error handling

**Tests — Vue Composables**
- Local state management using `ref` and `computed`
- Data persistence using `watch` and `localStorage`
- Lifecycle management with `onMounted`

## Getting Started

### Install dependencies

```bash
npm install
```

### Start JSON Server

```bash
npx json-server db.json --port 3000
```

### Start development server

Open another terminal:

```bash
npm run dev
```

## Other Commands

```bash
npm run build    # Type-check and build for production
npm run lint     # Run ESLint
```
