# Simple Notes - Frontend

A modern and minimalistic Vue 3 application for creating, editing, viewing, and deleting notes.  
Layout includes a header, a sidebar for the notes list and search, and a main content area for editing/viewing a note.

Features
- Create note
- Edit note
- Delete note
- List all notes
- View note details
- Local persistence via localStorage

Tech
- Vue 3 with Vite
- TypeScript
- Pinia (state management)
- Vue Router

Getting started
- Install dependencies: npm install
- Run dev server: npm run dev
- Build for production: npm run build
- Lint: npm run lint

Notes storage
- Notes are stored locally in the browser (localStorage) under key notes_frontend__notes
- No environment variables are required for this frontend app
