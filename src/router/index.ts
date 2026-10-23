import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import TestsView from '@/views/TestsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/tasks',
      component: TasksView,
    },
    {
      path: '/tests',
      component: TestsView,
    },
  ],
})

export default router
