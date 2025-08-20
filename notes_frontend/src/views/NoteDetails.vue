<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'

const route = useRoute()
const router = useRouter()
const store = useNotesStore()

const note = computed(() => store.getById(route.params.id as string))

// PUBLIC_INTERFACE
function editNote() {
  router.push({ name: 'note', params: { id: route.params.id } })
}

// PUBLIC_INTERFACE
function deleteNote() {
  const id = route.params.id as string
  store.deleteNote(id)
  router.replace({ name: 'home' })
}
</script>

<template>
  <div v-if="note" class="details">
    <div class="header">
      <h1>{{ note.title }}</h1>
      <div class="actions">
        <button class="btn" @click="editNote">Edit</button>
        <button class="btn danger" @click="deleteNote">Delete</button>
      </div>
    </div>
    <div class="meta">
      <span>Created: {{ new Date(note.createdAt).toLocaleString() }}</span>
      <span>Updated: {{ new Date(note.updatedAt).toLocaleString() }}</span>
    </div>
    <article class="content">
      <pre>{{ note.content }}</pre>
    </article>
  </div>
  <div v-else class="empty">Note not found.</div>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions .btn {
  margin-left: 8px;
}
.btn {
  appearance: none;
  border: 1px solid #dcdcdc;
  background: white;
  color: #333;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}
.btn.danger {
  background: #fff5f5;
  border-color: #ffd7d7;
  color: #c53030;
}
.meta {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 13px;
}
.content {
  border: 1px solid var(--color-border);
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  white-space: pre-wrap;
}
.empty {
  color: #777;
}
</style>
