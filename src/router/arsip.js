const arsip = [
  {
    meta: {
      title: 'Tambah Data Arsip',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/arsip/tambah',
    name: 'tambah-arsip',
    component: () => import('@/views/arsip/New.vue'),
  },
  {
    meta: {
      title: 'Daftar Arsip',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/arsip/list',
    name: 'list-arsip',
    component: () => import('@/views/arsip/List.vue'),
  },
  {
    meta: {
      title: 'Detail Arsip',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/arsip/detail/:id',
    name: 'detail-arsip',
    component: () => import('@/views/arsip/Detail.vue'),
  },
]

export default arsip
