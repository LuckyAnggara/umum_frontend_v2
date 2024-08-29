const dashboard = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/',
    name: 'user-dashboard',
    component: () => import('@/views/user/DashboardAlt.vue'),
  },
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/keuangan/dashboard',
    name: 'keuangan-dashboard',
    component: () => {
      return import('@/views/user/dashboard/Keuangan.vue')
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

export default dashboard
