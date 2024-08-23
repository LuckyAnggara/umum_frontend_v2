const user = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/',
    name: 'dashboard-user',
    component: () => import('@/views/user/DashboardAlt.vue'),
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
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'layout-user',
    },
    path: '/user/dashboard',
    name: 'user-dashboard',
    component: () => {
      return import('@/views/user/dashboard/Ptj.vue')
    },
  },
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/dashboard/User.vue'),
  },
]

export default user
