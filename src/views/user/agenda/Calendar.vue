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
      <div class="px-4 py-4 border-b border-gray-200 flex-col space-y-4">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Pimpinan</label
          >
          <select
            @change="find()"
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

        <div class="text-left">
          <label
            for="unit"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tanggal</label
          >
          <VueDatePicker
            @closed="find()"
            @cleared="clear()"
            required
            v-model="agendaStore.form.tanggal"
            :format="'dd MMMM yyyy'"
            auto-apply
            date-picker
            locale="id"
          ></VueDatePicker>
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

    <DetailModal
      :show="detailDialog"
      @close="detailDialog = false"
      @destroy="deleteConfirm()"
    />
  </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import timeGridPlugin from '@fullcalendar/timegrid'
import moment from 'moment'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import allLocales from '@fullcalendar/core/locales-all'
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

import { useAgendaStore } from '@/stores/agenda'
import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
const agendaStore = useAgendaStore()

import { useRouter } from 'vue-router'
import {
  computed,
  defineAsyncComponent,
  onBeforeMount,
  onMounted,
  watch,
} from 'vue'
import { ref } from 'vue'

const DetailModal = defineAsyncComponent(() => import('./ModalDetail.vue'))

const detailDialog = ref(false)
const router = useRouter()

const calendarOptions = computed(() => {
  return {
    editable: false,
    dayMaxEvents: true,
    initialDate: agendaStore.form.tanggal,
    locale: 'id', // the initial locale
    plugins: [dayGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridDay',
    headerToolbar: {
      start: '', // will normally be on the left. if RTL, will be on the right
      center: '',
      end: '', // will normally be on the right. if RTL, will be on the left
    },
    eventClick: handleEventClick,
    events: agendaStore.dataCalendar,
  }
})

function find() {
  agendaStore.$patch((state) => {
    state.responses = null
  })
  if (agendaStore.form.tanggal && agendaStore.form.pimpinan) {
    agendaStore.getData()
  }
}

function clear() {
  agendaStore.$patch((state) => {
    state.responses = null
  })
}

function toBooking() {
  router.push({ name: 'booking-agenda' })
}

async function handleEventClick(arg) {
  await agendaStore.setDataSingle(arg.event._def.publicId)
  detailDialog.value = true
}

onMounted(() => {
  agendaStore.clearForm()
  agendaStore.$patch((state) => {
    state.form.tanggal = moment().format('YYYY-MM-DD')
  })
  agendaStore.getData()
})
</script>
