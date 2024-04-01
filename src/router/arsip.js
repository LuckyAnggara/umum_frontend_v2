const arsip = [
  {
    meta: {
      title: 'Tambah Data Arsip',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/arsip/tambah',
    name: 'tambah-arsip',
    component: () => import('@/views/arsip/New.vue'),
  },
  {
    meta: {
      title: 'Arsip',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/arsip/list',
    name: 'list-arsip',
    // component: () => import('@/views/user/agenda/Booking.vue'),
  },
]

export default arsip
