import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const ptj = [
  {
    meta: {
      title: 'Daftar Pertanggung Jawaban',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/ptj/list',
    name: 'list-ptj',
    component: () => import('@/views/ptj/List.vue'),
  },
]

export default ptj
