import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const ptj = [
  {
    meta: {
      title: 'Cari',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/ptj/',
    name: 'user-ptj',
    component: () => import('@/views/user/ptj/Index.vue'),
  },
]

export default ptj
