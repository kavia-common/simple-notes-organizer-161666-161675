import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

const STORAGE_KEY = 'notes_frontend__notes'

// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', () => {
  /** All notes in memory */
  const notes = ref<Note[]>([])

  /** Load notes from localStorage (lightweight persistence) */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Note[]
        // Basic validation and sorting by updatedAt desc
        notes.value = parsed
          .filter((n) => n && typeof n.id === 'string')
          .sort((a, b) => b.updatedAt - a.updatedAt)
      }
    } catch {
      // ignore corrupt storage
      notes.value = []
    }
  }

  /** Save notes to localStorage */
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes.value))
  }

  /** Create a new note */
  // PUBLIC_INTERFACE
  function createNote(partial?: Partial<Note>) {
    const now = Date.now()
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: partial?.title?.trim() || 'Untitled note',
      content: partial?.content || '',
      createdAt: now,
      updatedAt: now,
    }
    notes.value.unshift(newNote)
    save()
    return newNote
  }

  /** Update an existing note by id */
  // PUBLIC_INTERFACE
  function updateNote(id: string, data: Partial<Pick<Note, 'title' | 'content'>>) {
    const idx = notes.value.findIndex((n) => n.id === id)
    if (idx !== -1) {
      notes.value[idx] = {
        ...notes.value[idx],
        ...data,
        title: (data.title ?? notes.value[idx].title).trim() || 'Untitled note',
        updatedAt: Date.now(),
      }
      // Keep most recent on top
      notes.value.sort((a, b) => b.updatedAt - a.updatedAt)
      save()
    }
  }

  /** Delete a note by id */
  // PUBLIC_INTERFACE
  function deleteNote(id: string) {
    notes.value = notes.value.filter((n) => n.id !== id)
    save()
  }

  /** Get a note by id */
  // PUBLIC_INTERFACE
  function getById(id: string) {
    return notes.value.find((n) => n.id === id)
  }

  /** Search/filter by title */
  const searchQuery = ref('')

  const filteredNotes = computed(() => {
    if (!searchQuery.value.trim()) return notes.value
    const q = searchQuery.value.toLowerCase()
    return notes.value.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q),
    )
  })

  return {
    notes,
    searchQuery,
    filteredNotes,
    load,
    save,
    createNote,
    updateNote,
    deleteNote,
    getById,
  }
})
