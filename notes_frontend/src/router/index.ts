import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/NotesHome.vue'),
    },
    {
      path: '/note/:id',
      name: 'note',
      component: () => import('@/views/NotesHome.vue'),
      props: true,
    },
    {
      path: '/note/:id/view',
      name: 'note-view',
      component: () => import('@/views/NoteDetails.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
