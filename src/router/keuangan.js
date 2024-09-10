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
    path: '/keuangan/perjadin/:id/detail',
    name: 'perjadin-detail',
    component: () => import('@/views/user/keuangan/perjadin/Detail.vue'),
  },
  {
    meta: {
      title: 'Realisasi Perjalanan Dinas',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/perjadin/sppd/:id/realisasi',
    name: 'perjadin-sppd-realisasi',
    component: () => import('@/views/user/keuangan/perjadin/Realisasi.vue'),
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
  // {
  //   meta: {
  //     title: 'Kuitansi',
  //     requiresAuth: false,
  //     layout: 'layout-full',
  //   },
  //   path: '/keuangan/template',
  //   name: 'perjadin-template',
  //   component: () => import('@/views/user/keuangan/Template.vue'),
  // },
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
    path: '/keuangan/perjadin/ptj/:id/kuitansi',
    name: 'perjadin-ptj-kuitansi',
    component: () => import('@/views/user/keuangan/template/Kuitansi.vue'),
  },
  {
    meta: {
      title: 'Surat Perjalanan Dinas',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/:id/spd',
    name: 'perjadin-ptj-spd',
    component: () => import('@/views/user/keuangan/template/Spd.vue'),
  },
  {
    meta: {
      title: 'Dop',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/:id/dop',
    name: 'perjadin-ptj-dop',
    component: () => import('@/views/user/keuangan/template/Dop.vue'),
  },
]

export default keuangan
