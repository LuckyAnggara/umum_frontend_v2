import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const bmn = [
  {
    meta: {
      title: 'Cari',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/service',
    name: 'service-bmn',
    component: () => import('@/views/user/bmn/Service.vue'),
  },
  {
    meta: {
      title: 'Cari',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/service',
    name: 'cari-bmn',
    component: () => import('@/views/user/bmn/Cari.vue'),
  },
  {
    meta: {
      title: 'Daftar Barang Milik Negara',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/bmn/list',
    name: 'list-bmn',
    component: () => import('@/views/bmn/List.vue'),
  },
  {
    meta: {
      title: 'Permintaan Layanan BMN',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/bmn/permintaan',
    name: 'permintaan-layanan-bmn-admin',
    component: () => import('@/views/bmn/permintaan/List.vue'),
  },
  {
    meta: {
      title: 'Detail Permintaan Layanan BMN',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/bmn/permintaan/:id/detail',
    name: 'detail-permintaan-layanan-bmn-admin',
    component: () => import('@/views/bmn/permintaan/Detail.vue'),
  },
  {
    meta: {
      title: 'Permintaan Layanan BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/bmn/permintaan/:tiket/penyelesaian',
    name: 'penyelesaian-permintaan-layanan-bmn',
    component: () => import('@/views/bmn/permintaan/Penyelesaian.vue'),
  },
  {
    meta: {
      title: 'Permintaan Layanan BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/permintaan/:tiket/output',
    name: 'output-permintaan-layanan-bmn',
    component: () => import('@/views/user/bmn/Output.vue'),
  },
  {
    meta: {
      title: 'Permintaan Layanan BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/permintaan/:id/detail',
    name: 'detail-permintaan-layanan-bmn',
    component: () => import('@/views/user/bmn/Detail.vue'),
  },
]

export default bmn
