<template>
  <section class="dark:bg-gray-900 p-3 sm:p-5">
    <div
      class="mx-auto max-w-screen-2xl px-6 py-4 bg-white shadow-lg rounded-lg"
    >
      <div
        class="py-4 border-gray-200 w-full flex flex-row justify-between items-center"
      >
        <div class="text-left">
          <label
            for="name"
            class="block font-medium text-gray-900 dark:text-white"
            >Ruangan</label
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
        <button
          @click="newKegiatan()"
          type="button"
          class="h-fit flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-md text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          Tambah Kegiatan
        </button>
      </div>
      <div class="w-full mx-auto">
        <FullCalendar :options="calendarOptions">
          <template v-slot:eventContent="arg">
            <div
              class="cursor-pointer flex flex-col bg-blue-500 p-2 rounded-md shadow-md"
            >
              <span class="text-gray-200">{{ arg.event.title }}</span>
              <span class="text-gray-200"
                >{{ moment(arg.event.start).format('HH:mm') }} -
                {{ moment(arg.event.end).format('HH:mm') }}
              </span>
            </div>
          </template>
        </FullCalendar>
      </div>
    </div>

    <DetailModal
      :show="detailDialog"
      @close="detailDialog = false"
      @destroy="deleteConfirm()"
    />

    <DeleteDialog
      :show="confirmDialog"
      @close="confirmDialog = !confirmDialog"
      :can-submit="true"
      @submit="deleteData()"
    >
      <template #title>
        <h1>Kegiatan {{ agendaStore.singleResponse.title }} akan di hapus!</h1>
      </template>
      <template #content>
        <span class="text-gray-500">Berikan pesan kepada pemilik kegiatan</span>
        <textarea
          v-model="agendaStore.pesanDelete"
          type="text"
          class="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </template>
    </DeleteDialog>

    <BookingModal :show="bookingDialog" @close="bookingDialog = false" />
  </section>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import DeleteDialog from '@/components/Dialog.vue'
import { toast } from 'vue3-toastify'
import { useAgendaStore } from '@/stores/agenda'
import { useMainStore } from '@/stores/main'

import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const DetailModal = defineAsyncComponent(() => import('./ModalDetail.vue'))
const BookingModal = defineAsyncComponent(() => import('./ModalBooking.vue'))

const agendaStore = useAgendaStore()
const mainStore = useMainStore()

const detailDialog = ref(false)
const bookingDialog = ref(false)
const confirmDialog = ref(false)

function newKegiatan() {
  bookingDialog.value = true
  agendaStore.form.nama = 'Administrator'
  agendaStore.form.unit = 'Administrator'
  agendaStore.form.no_wa = '088'
}
function deleteConfirm() {
  detailDialog.value = false
  confirmDialog.value = true
}

async function deleteData() {
  confirmDialog.value = false
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await agendaStore.destroy(agendaStore.singleResponse.id)
  if (success) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

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
    events: agendaStore.items,
  }
})

function handleDateClick(arg) {
  agendaStore.setDataSingle(arg.event._def.publicId)
  detailDialog.value = true
}

onMounted(() => {
  agendaStore.$patch((state) => {
    state.form.tanggal = null
  })
  agendaStore.getData()
})
</script>
