import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import bmn from './bmn'
import ptj from './ptj'
import user from './user'
import tempat from './tempat'
import agenda from './agenda'
import arsip from './arsip'
import keuangan from './keuangan'
import dasboard from './dashboard'

const routes = [
  {
    meta: {
      title: 'Login',
      layout: 'layout-guest',
      requiresAuth: false,
    },
    path: '/admin',
    name: 'login-admin',
    component: () => import('@/views/login/Login.vue'),
  },

  {
    meta: {
      title: 'User Management',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/admin/user/management',
    name: 'user-management',
    component: () => import('@/views/management/List.vue'),
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
  ...arsip,
  ...keuangan,
  ...dasboard,
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

// router.beforeEach(async (to, from, next) => {
//   const authStore = useAuthStore()
//   const isAuth = await authStore.getAuthUser()
//   const authUser = authStore.userData
//   const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
//   const loginQuery = { path: '/' }
//   let dashboardQuery = { path: '/user/dashboard' }
//   if (reqAuth && authUser) {
//     if (to.fullPath == loginQuery) {
//     }
//     if (!isAuth) {
//       next(loginQuery)
//     } else {
//       next()
//     }
//   } else {
//     if (to.fullPath == '/admin') {
//       if (isAuth) {
//         next(dashboardQuery)
//       } else {
//         next()
//       }
//     } else {
//       next()
//     }
//   }
// })

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuth = await authStore.getAuthUser()
  const authUser = authStore.userData
  const reqAuth = to.matched.some((record) => record.meta.requiresAuth)
  const loginQuery = { path: '/' }
  const dashboardQuery = { path: '/user/dashboard' }
  if (reqAuth) {
    if (!authUser) {
      next(loginQuery)
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
