import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
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
  {
    meta: {
      title: 'Rincian Biaya Perjalanan Dinas',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/:id/rpd',
    name: 'perjadin-ptj-rpd',
    component: () => import('@/views/user/keuangan/template/Rpd.vue'),
  },
  {
    meta: {
      title: 'Daftar Pengeluaran Rill',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/:id/rill',
    name: 'perjadin-ptj-rill',
    component: () => import('@/views/user/keuangan/template/Riil.vue'),
  },
  {
    meta: {
      title: 'Rincian Anggaran Biaya',
      requiresAuth: true,
      layout: 'layout-full',
    },
    path: '/keuangan/perjadin/ptj/:id/rab',
    name: 'perjadin-ptj-rab',
    component: () => import('@/views/user/keuangan/template/Rab.vue'),
  },
  {
    meta: {
      title: 'Mata Anggaran Kegiatan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/mak/list',
    name: 'mak-list',
    component: () => import('@/views/user/keuangan/mak/List.vue'),
  },
  {
    meta: {
      title: 'Detail Anggaran Kegiatan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/mak/:id/detail',
    name: 'mak-detail',
    component: () => import('@/views/user/keuangan/mak/Detail.vue'),
  },
  {
    meta: {
      title: 'Daftar Belanja Non Perjalanan Dinas',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/keuangan/nonperjadin/list',
    name: 'non-perjadin-list',
    component: () => import('@/views/user/keuangan/nonperjadin/List.vue'),
  },
  {
    meta: {
      title: 'Belanja Non Perjalanan Dinas',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/keuangan/nonperjadin/new',
    name: 'non-perjadin-new',
    component: () => import('@/views/user/keuangan/nonperjadin/New.vue'),
  },
]

export default keuangan
