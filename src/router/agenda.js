const agenda = [
  // {
  //   meta: {
  //     title: 'Jadwal Peminjaman Ruang Rapat',
  //     requiresAuth: false,
  //     layout: 'layout-auth',
  //   },
  //   path: '/agenda/jadwal',
  //   name: 'jadwal-agenda',
  //   component: () => import('@/views/agenda/Schedule.vue'),
  // },
  {
    meta: {
      title: 'Booking Ruangan',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/agenda/booking',
    name: 'booking-agenda',
    component: () => import('@/views/user/agenda/Booking.vue'),
  },
  {
    meta: {
      title: 'Jadwal Booking',
      requiresAuth: false,
      layout: 'layout-guest',
    },
    path: '/user/agenda/calendar',
    name: 'calendar-agenda',
    component: () => import('@/views/user/agenda/Calendar.vue'),
  },
]

export default agenda
