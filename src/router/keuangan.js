import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const keuangan = [
  {
    meta: {
      title: 'Perencanaan Belanja Perjalanan Dinas',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/keuangan/perjadin/new',
    name: 'perjadin-new',
    component: () => import('@/views/user/keuangan/perjadin/New.vue'),
  },
  {
    meta: {
      title: 'Detail Perencanaan Belanja Perjalanan Dinas',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/perjadin/detail/:id',
    name: 'perjadin-detail',
    component: () => import('@/views/user/keuangan/perjadin/Detail.vue'),
  },
  {
    meta: {
      title: 'Belanja Perjalanan Dinas',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/perjadin/list',
    name: 'perjadin-list',
    component: () => import('@/views/user/keuangan/perjadin/List.vue'),
  },
  {
    meta: {
      title: 'Kuitansi',
      requiresAuth: false,
      layout: 'layout-full',
    },
    path: '/keuangan/template',
    name: 'perjadin-template',
    component: () => import('@/views/user/keuangan/Template.vue'),
  },
  {
    meta: {
      title: 'Kuitansi',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/kuitansi/:id',
    name: 'perjadin-ptj-kuitansi',
    component: () => import('@/views/user/keuangan/template/Kuitansi.vue'),
  },
]

export default keuangan
