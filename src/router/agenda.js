const agenda = [
  {
    meta: {
      title: 'Booking Ruangan',
      requiresAuth: true,
      layout: 'layout-guest',
    },
    path: '/user/agenda/booking',
    name: 'booking-agenda',
    component: () => import('@/views/user/agenda/Booking.vue'),
  },
  {
    meta: {
      title: 'Jadwal Booking',
      requiresAuth: true,
      layout: 'layout-guest',
    },
    path: '/user/agenda/calendar',
    name: 'calendar-agenda',
    component: () => import('@/views/user/agenda/Calendar.vue'),
  },
  {
    meta: {
      title: 'Daftar Agenda Pimpinan',
      requiresAuth: true,
      layout: 'layout-auth',
    },
    path: '/agenda/list',
    name: 'list-agenda-pimpinan',
    component: () => import('@/views/agenda/Schedule.vue'),
  },
]

export default agenda
