const agenda = [
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
    component: () => import('@/views/user/agenda/Calendar2.vue'),
  },
  {
    meta: {
      title: 'Daftar Agenda Pimpinan',
      requiresAuth: false,
      layout: 'layout-auth',
    },
    path: '/agenda/list',
    name: 'list-agenda-pimpinan',
    component: () => import('@/views/agenda/Schedule.vue'),
  },
]

export default agenda
