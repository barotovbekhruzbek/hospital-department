import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/department',
      name: 'department',
      component: () => import('../views/department.vue')
    },
    {
      path: '/spec',
      name: 'spec',
      component: () => import('../views/spec.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/room.vue')
    }
  ]
})

export default router
