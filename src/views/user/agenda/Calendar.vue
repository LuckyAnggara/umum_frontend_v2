<template>
  <div class="max-w-xl mx-auto px-6 py-8 md:max-w-lg">
    <div class="flex items-center">
      <button
        @click="toBooking()"
        class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ArrowLeftIcon class="h-5" />
      </button>
      <h2 class="ml-2 font-semibold text-gray-800 text-xl">
        Kalender Kegiatan
      </h2>
    </div>
    <div
      class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
    >
      <div class="px-4 py-4 border-b border-gray-200">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Pimpinan</label
          >
          <select
            @change="agendaStore.getData()"
            v-model="agendaStore.form.pimpinan"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option
              :key="item.id"
              v-for="item in mainStore.pimpinanOptions"
              :value="item.id"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col divide-y divide-gray-200 p-5">
        <div v-if="agendaStore.isLoading" class="flex flex-col py-4">
          <ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" />
          <span class="mx-auto">Mencari Data..</span>
        </div>
        <FullCalendar v-else :options="calendarOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import allLocales from '@fullcalendar/core/locales-all'
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

import { useAgendaStore } from '@/stores/agenda'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
const agendaStore = useAgendaStore()

import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'

const router = useRouter()

const calendarOptions = computed(() => {
  return {
    editable: false,
    dragable: false,
    dayMaxEvents: true,
    locale: 'id', // the initial locale
    plugins: [listPlugin, interactionPlugin],
    initialView: 'listWeek',
    dateClick: handleDateClick,
    events: agendaStore.dataCalendar,
  }
})

function toBooking() {
  router.push({ name: 'booking-agenda' })
}

function handleDateClick(arg) {
  alert('date click! ' + arg.dateStr)
}

onMounted(() => {
  agendaStore.getData()
  agendaStore.clearForm()
})
</script>
