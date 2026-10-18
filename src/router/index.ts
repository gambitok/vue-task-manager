import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import CounterView from '@/views/CounterView.vue'

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
      path: '/counter',
      component: CounterView,
    },
  ],
})

export default router
