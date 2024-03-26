import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import bmn from './bmn'
import ptj from './ptj'
import user from './user'
import tempat from './tempat'
import agenda from './agenda'

const routes = [
  {
    meta: {
      title: 'Login',
      layout: 'layout-guest',
      requiresAuth: false,
    },
    path: '/admin',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),
  },

  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/User.vue'),
  },

  {
    meta: {
      title: 'Account Setting',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/admin/account-setting',
    name: 'account-setting',
    component: () => import('@/views/dashboard/AccountSetting.vue'),
  },
  {
    meta: {
      title: 'Persediaan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/persediaan/produk',
    name: 'persediaan-admin',
    component: () => import('@/views/persediaan/AdminView.vue'),
  },
  {
    meta: {
      title: 'Permintaan Persediaan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/persediaan/permintaan',
    name: 'permintaan-admin',
    component: () => import('@/views/persediaan/permintaan/List.vue'),
  },
  {
    meta: {
      title: 'Detail Permintaan Persediaan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/persediaan/permintaan/:tiket',
    name: 'detail-permintaan-admin',
    component: () => import('@/views/persediaan/permintaan/Detail.vue'),
  },
  {
    meta: {
      title: 'Pengiriman',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/persediaan/permintaan/:tiket/pengiriman',
    name: 'shipping-permintaan-admin',
    component: () => import('@/views/persediaan/permintaan/Shipping.vue'),
  },

  {
    meta: {
      title: 'Permintaan Persediaan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/persediaan/permintaan',
    name: 'permintaan-persediaan',
    component: () => import('@/views/user/persediaan/New.vue'),
  },
  {
    meta: {
      title: 'Permintaan Persediaan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/persediaan/permintaan/cart',
    name: 'cart-permintaan-user',
    component: () => import('@/views/user/persediaan/Cart.vue'),
  },
  {
    meta: {
      title: 'Permintaan Persediaan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/persediaan/permintaan/:id/detail',
    name: 'detail-permintaan-user',
    component: () => import('@/views/user/persediaan/Detail.vue'),
  },
  {
    meta: {
      title: 'Permintaan Persediaan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/persediaan/permintaan/:tiket/output',
    name: 'output-permintaan-user',
    component: () => import('@/views/user/persediaan/Output.vue'),
  },
  ...user,
  ...bmn,
  ...tempat,
  ...ptj,
  ...agenda,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const authUser = authStore.userData
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loginQuery = { path: '/admin' }
  const dashboardQuery = { path: '/admin/dashboard' }

  if (reqAuth && !authUser) {
    const isAuth = await authStore.getAuthUser()
    if (to.fullPath == loginQuery) {
    }
    if (!isAuth) {
      next(loginQuery)
    } else {
      next()
    }
  } else {
    if (to.fullPath == '/admin') {
      const isAuth = await authStore.getAuthUser()
      if (isAuth) {
        next(dashboardQuery)
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
