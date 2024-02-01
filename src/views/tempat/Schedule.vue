<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <FullCalendar :options="calendarOptions" />
    </div>
  </section>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import allLocales from '@fullcalendar/core/locales-all'

const calendarOptions = {
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  },
  editable: true,
  dayMaxEvents: true,
  locale: 'id', // the initial locale
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin, // needed for dateClick
  ],
  initialView: 'dayGridMonth',
  dateClick: handleDateClick,
  events: [
    {
      title: 'event 1',
      start: '2024-01-31T12:30:00',
      end: '2024-01-31T15:30:00',
    },
    { title: 'event 2', date: '2024-02-01' },
  ],
  color: 'black', // an option!
  textColor: 'yellow', // an option!
}

function handleDateClick(arg) {
  alert('date click! ' + arg.dateStr)
}
</script>
