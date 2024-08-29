import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const keuangan = [
  {
    meta: {
      title: 'Perencanaan Perjadin',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/keuangan/perjadin/new',
    name: 'perjadin-new',
    component: () => import('@/views/user/keuangan/perjadin/New.vue'),
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

export default keuangan
