const user = [
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
  {
    meta: {
      title: 'Login',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user',
    name: 'login-user',
    component: () => import('@/views/login/UserLogin.vue'),
  },
]

export default user
