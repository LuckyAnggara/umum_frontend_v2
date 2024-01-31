const user = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user',
    name: 'dashboard-user',
    component: () => import('@/views/user/Dashboard.vue'),
  },
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/dashboard',
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
]

export default user
