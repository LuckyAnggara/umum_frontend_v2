import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const perjadin = [
  {
    meta: {
      title: 'Perencanaan Perjadin Baru',
      requiresAuth: false,
      layout: 'layout-user',
    },
    path: '/perjadin/new',
    name: 'perjadin-new',
    component: () => import('@/views/user/perjadin/New.vue'),
  },
  {
    meta: {
      title: 'Belanja Perjalanan Dinas',
      requiresAuth: false,
      layout: 'layout-full',
    },
    path: '/belanja/perjadin',
    name: 'belanja-perjadin',
    component: () => import('@/views/ptj/List.vue'),
  },
]

export default perjadin
