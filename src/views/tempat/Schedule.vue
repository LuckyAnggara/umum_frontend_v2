<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div class="py-4 border-gray-200 w-fit">
        <div class="text-left">
          <label for="name" class="block font-medium text-gray-900 dark:text-white">Ruangan</label>
          <select
            @change="tempatStore.getData()"
            v-model="tempatStore.form.ruangan"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option :key="item.id" v-for="item in mainStore.ruangOptions" :value="item.id">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full mx-auto">
        <span v-if="tempatStore.isLoading"><ArrowPathIcon class="h-6 w-6 animate-spin" /></span>
        <FullCalendar v-else :options="calendarOptions">
          <template v-slot:eventContent="arg">
            <div class="cursor-pointer flex flex-col bg-blue-500 p-2 rounded-md shadow-md">
              <b>{{ arg.event.title }}</b>
              <span>{{ moment(arg.event.start).format('HH:mm') }} - {{ moment(arg.event.end).format('HH:mm') }} </span>
            </div>
          </template>
        </FullCalendar>
      </div>
    </div>

    <DetailModal :show="detailDialog" @close="detailDialog = false" />
  </section>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'

import { useTempatStore } from '@/stores/tempat'
import { useMainStore } from '@/stores/main'

import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const DetailModal = defineAsyncComponent(() => import('./ModalDetail.vue'))

const tempatStore = useTempatStore()
const mainStore = useMainStore()

const detailDialog = ref(false)

const calendarOptions = computed(() => {
  return {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    editable: false,
    dayMaxEvents: true,
    locale: 'id', // the initial locale
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      interactionPlugin, // needed for dateClick
    ],
    initialView: 'dayGridMonth',
    eventClick: handleDateClick,
    events: tempatStore.items,
  }
})

function handleDateClick(arg) {
  tempatStore.setDataSingle(arg.event._def.publicId)
  detailDialog.value = true
}

onMounted(() => {
  tempatStore.getData()
})
</script>
