<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'

const notes = useNotesStore()
const router = useRouter()
const route = useRoute()

// Current editing note id from route (optional)
const currentId = computed(() => (route.params.id as string | undefined) ?? undefined)

const localTitle = ref('')
const localContent = ref('')

// Initialize form when selecting a note or when creating a new one
watch(
  () => currentId.value,
  (id) => {
    if (id) {
      const found = notes.getById(id)
      localTitle.value = found?.title ?? ''
      localContent.value = found?.content ?? ''
    } else {
      localTitle.value = ''
      localContent.value = ''
    }
  },
  { immediate: true },
)

// PUBLIC_INTERFACE
function createNew() {
  const created = notes.createNote({ title: localTitle.value, content: localContent.value })
  router.replace({ name: 'note', params: { id: created.id } })
}

// PUBLIC_INTERFACE
function saveChanges() {
  if (!currentId.value) {
    // Creating from empty form
    return createNew()
  }
  notes.updateNote(currentId.value, { title: localTitle.value, content: localContent.value })
}

// PUBLIC_INTERFACE
function removeNote() {
  if (!currentId.value) return
  notes.deleteNote(currentId.value)
  router.replace({ name: 'home' })
  localTitle.value = ''
  localContent.value = ''
}
</script>

<template>
  <section class="note-editor">
    <div class="toolbar">
      <div class="left">
        <button class="btn primary" @click="currentId ? saveChanges() : createNew()">
          {{ currentId ? 'Save' : 'Create' }}
        </button>
        <button class="btn outline" @click="localTitle = ''; localContent = ''">Clear</button>
      </div>
      <div class="right" v-if="currentId">
        <button class="btn danger" @click="removeNote">Delete</button>
      </div>
    </div>

    <div class="form">
      <input
        v-model="localTitle"
        class="title-input"
        type="text"
        placeholder="Note title"
        aria-label="Note title"
      />
      <textarea
        v-model="localContent"
        class="content-input"
        rows="16"
        placeholder="Write your note here..."
        aria-label="Note content"
      ></textarea>
    </div>

    <div v-if="!currentId && !localTitle && !localContent" class="empty-hint">
      Start by typing a title and content, then click Create.
    </div>
  </section>
</template>

<style scoped>
.note-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-right: 8px;
}
.btn:last-child {
  margin-right: 0;
}
.btn.primary {
  background: var(--primary);
  color: white;
  border: 1px solid var(--primary);
}
.btn.outline {
  background: transparent;
}
.btn.danger {
  background: #fff5f5;
  border-color: #ffd7d7;
  color: #c53030;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-input {
  font-size: 20px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  outline: none;
}

.content-input {
  resize: vertical;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  outline: none;
  font-family: inherit;
  line-height: 1.6;
}

.empty-hint {
  font-size: 14px;
  color: #777;
}
</style>
