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
  {
    meta: {
      title: 'Booking Ruangan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/tempat/booking',
    name: 'booking-tempat',
    component: () => import('@/views/user/tempat/Booking.vue'),
  },
  {
    meta: {
      title: 'Jadwal Booking',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/tempat/calendar',
    name: 'calendar-tempat',
    component: () => import('@/views/user/tempat/Calendar.vue'),
  },
]

export default tempat
