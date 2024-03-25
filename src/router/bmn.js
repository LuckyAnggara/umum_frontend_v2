import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
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
    path: '/bmn/permintaan/:tiket/pengembalian',
    name: 'pengembalian-permintaan-layanan-bmn',
    component: () => import('@/views/bmn/permintaan/Pengembalian.vue'),
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
  {
    meta: {
      title: 'Peminjaman BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/peminjaman',
    name: 'cari-peminjaman-bmn',
    component: () => import('@/views/user/pinjambmn/New.vue'),
  },
  {
    meta: {
      title: 'Peminjaman BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/peminjaman/detail',
    name: 'detail-peminjaman-bmn',
    component: () => import('@/views/user/pinjambmn/Detail.vue'),
  },
  {
    meta: {
      title: 'Peminjaman BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/bmn/peminjaman/:tiket/output',
    name: 'output-peminjaman-bmn',
    component: () => import('@/views/user/pinjambmn/Output.vue'),
  },
  {
    meta: {
      title: 'Daftar Peminjaman BMN',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/bmn/peminjaman',
    name: 'peminjaman-bmn-admin',
    component: () => import('@/views/bmn/peminjaman/List.vue'),
  },
  {
    meta: {
      title: 'Serah Terima Peminjaman BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/bmn/peminjaman/:tiket/serahterima',
    name: 'serah-terima-bmn-admin',
    component: () => import('@/views/bmn/peminjaman/SerahTerima.vue'),
  },
  {
    meta: {
      title: 'Pengembalian BMN',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/bmn/peminjaman/:tiket/pengembalian',
    name: 'pengembalian-bmn-admin',
    component: () => import('@/views/bmn/peminjaman/Pengembalian.vue'),
  },
]

export default bmn
