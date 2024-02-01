const tempat = [
  {
    meta: {
      title: 'Jadwal Peminjaman Ruang Rapat',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/tempat/jadwal',
    name: 'jadwal-tempat',
    component: () => import('@/views/tempat/Schedule.vue'),
  },
]

export default tempat
