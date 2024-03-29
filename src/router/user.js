const user = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/',
    name: 'dashboard-user',
    component: () => import('@/views/user/Dashboard.vue'),
  },
  {
    meta: {
      title: 'Daftar Permintaan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/permintaan/list',
    name: 'list-permintaan',
    component: () => import('@/views/user/ListPermintaan.vue'),
  },
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

export default user
