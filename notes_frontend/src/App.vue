<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()
onMounted(() => {
  notesStore.load()
})

const route = useRoute()
</script>

<template>
  <div class="app-root">
    <header class="app-header">
      <div class="brand">
        <span class="brand-accent">✦</span>
        <span class="brand-name">Simple Notes</span>
      </div>
      <nav class="main-nav">
        <RouterLink :to="{ name: 'home' }" :class="{ active: route.name === 'home' }">Notes</RouterLink>
        <RouterLink :to="{ name: 'about' }" :class="{ active: route.name === 'about' }">About</RouterLink>
      </nav>
    </header>

    <div class="app-body">
      <aside class="sidebar">
        <RouterLink :to="{ name: 'home' }" class="create-btn">+ New note</RouterLink>

        <div class="search">
          <input
            v-model="notesStore.searchQuery"
            type="text"
            placeholder="Search notes..."
            aria-label="Search notes"
          />
        </div>

        <ul class="notes-list" v-if="notesStore.filteredNotes.length">
          <li v-for="n in notesStore.filteredNotes" :key="n.id">
            <RouterLink :to="{ name: 'note', params: { id: n.id } }" class="note-item">
              <div class="title">{{ n.title }}</div>
              <div class="meta">{{ new Date(n.updatedAt).toLocaleString() }}</div>
            </RouterLink>
          </li>
        </ul>
        <div v-else class="empty">No notes yet.</div>
      </aside>

      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary: #42b983;
  --secondary: #35495e;
  --accent: #ffcc00;
}

.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
}

.app-header {
  height: 56px;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: white;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary);
  font-weight: 700;
}

.brand-accent {
  color: var(--accent);
}

.brand-name {
  color: var(--secondary);
  letter-spacing: 0.3px;
}

.main-nav a {
  color: var(--secondary);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  margin-left: 6px;
}
.main-nav a.active {
  background: rgba(66, 185, 131, 0.12);
  color: var(--primary);
}

.app-body {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 0;
  flex: 1;
  min-height: 0;
}

.sidebar {
  border-right: 1px solid var(--color-border);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #fafafa;
}

.create-btn {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 10px 12px;
  border-radius: 8px;
  font-weight: 600;
}
.create-btn:hover {
  filter: brightness(0.95);
}

.search input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
}

.notes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: auto;
}

.note-item {
  display: block;
  padding: 10px 8px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  border: 1px solid transparent;
}
.note-item:hover {
  background: #fff;
  border-color: var(--color-border);
}
.title {
  font-weight: 600;
  color: var(--secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  font-size: 12px;
  color: #777;
}

.content {
  padding: 16px;
  min-width: 0;
}

@media (max-width: 900px) {
  .app-body {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: sticky;
    top: 56px;
    z-index: 1;
  }
}
</style>
