<template>
  <div class="max-w-xl mx-auto px-6 py-8 md:max-w-lg">
    <div class="flex items-center">
      <button
        @click="toDashboard()"
        class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ArrowLeftIcon class="h-5" />
      </button>
      <h2 class="ml-2 font-semibold text-gray-800 text-xl">Agenda Pimpinan</h2>
    </div>

    <form
      @submit.prevent="confirm()"
      class="mt-4 bg-white rounded-lg border border-gray-400 max-h-full overflow-visible"
    >
      <div class="p-4">
        <div
          id="alert-additional-content-1"
          class="p-4 mb-2 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <div class="flex items-center">
            <InformationCircleIcon class="flex-shrink-0 w-4 h-4 me-2" />
            <h3 class="text-lg font-medium">Info</h3>
          </div>
          <div class="mt-2 mb-2 text-sm">Periksa agenda Pimpinan.</div>
          <div class="flex">
            <button
              @click="toCalendar()"
              type="button"
              class="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <EyeIcon class="me-2 h-3 w-3" />

              Agenda Pimpinan
            </button>
          </div>
        </div>
      </div>

      <div class="px-4 py-2 border-b border-gray-200">
        <h2 class="font-semibold text-gray-800">Detail</h2>
      </div>

      <div class="px-4 py-4 border-b border-gray-200 flex flex-col space-y-4">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Pimpinan</label
          >

          <select
            @change="find()"
            v-model="agendaStore.form.pimpinan"
            class="w-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            @cleared="agendaStore.responses = null"
            required
            v-model="agendaStore.form.tanggal"
            :format="'dd MMMM yyyy'"
            auto-apply
            date-picker
            locale="id"
          ></VueDatePicker>
        </div>
        <section>
          <div
            v-if="agendaStore.items.length > 0 && agendaStore.form.tanggal"
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span class="font-medium"
              >Daftar kegiatan di tanggal
              {{
                moment(agendaStore.form.tanggal).format('DD MMMM YYYY')
              }}</span
            >
            <ul>
              <li
                :key="index"
                v-for="(item, index) in agendaStore.items"
                class="w-full py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                {{ index + 1 }}. {{ item.title }}
                {{ moment(item.start).format('HH:mm') }} -
                {{ moment(item.end).format('HH:mm') }}
              </li>
            </ul>
          </div>
          <div
            v-if="agendaStore.isLoading"
            class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span class="font-medium mx-auto flex flex-col"
              ><ArrowPathIcon class="mx-auto w-5 h-5 animate-spin" />
              <span class="mx-auto">Mencari data</span></span
            >
          </div>
        </section>

        <div class="text-left">
          <label
            for="unit"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nama Kegiatan*</label
          >
          <textarea
            v-model="agendaStore.form.kegiatan"
            placeholder="Isi dengan nama kegiatan"
            type="text"
            id="unit"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
          </textarea>
        </div>

        <div class="flex flex-row space-x-4">
          <div class="text-left">
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Jam Mulai</label
            >
            <VueDatePicker
              required
              v-model="agendaStore.form.jam_mulai"
              time-picker
              auto-apply
              locale="id"
            ></VueDatePicker>
          </div>

          <div class="text-left">
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Jam Berakhir</label
            >
            <VueDatePicker
              required
              v-model="agendaStore.form.jam_akhir"
              time-picker
              auto-apply
              locale="id"
            ></VueDatePicker>
          </div>
        </div>

        <div>
          <label
            for="nama"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tempat Kegiatan</label
          >
          <input
            v-model="agendaStore.form.tempat"
            type="text"
            id="nama"
            placeholder="isi dengan tempat kegiatan"
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </div>

      <div class="px-4 py-2 border-b border-gray-200">
        <h2 class="font-semibold text-gray-800">Lampiran</h2>
      </div>
      <div class="px-4">
        <label
          for="nama"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Isi lampiran
        </label>
        <small class="text-gray-600"
          >Contoh :
          <ul>
            <li>Paparan Kegiatan</li>
            <li>Transcript Paparan Pimpinan</li>
            <li>Undangan</li>
          </ul>
        </small>

        <FilePond
          :label="'Drop lampiran disini ...'"
          :multiple="true"
          @fileChange="fileChange"
          class="mt-4"
          :type="'application/pdf'"
        />
      </div>

      <div
        v-if="agendaStore.items.length == 0"
        class="flex items-center justify-between p-3 bg-gray-100"
      >
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>

    <div>
      <TransitionRoot appear :show="showModal" as="template">
        <Dialog as="div" @close="showModal = !showModal" class="relative z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
              class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900"
                  >
                    Proses Permintaan
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Permintaan persediaan akan di proses ke Admin pada Bagian
                      Umum Inspektorat Jenderal
                    </p>
                  </div>

                  <div class="mt-4 flex space-x-4">
                    <button
                      :disabled="agendaStore.isStoreLoading"
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="submit"
                    >
                      <span v-if="!agendaStore.isStoreLoading"> Proses </span>
                      <span class="flex" v-else
                        ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
                      /></span>
                    </button>

                    <button
                      :disabled="agendaStore.isStoreLoading"
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      @click="showModal = !showModal"
                    >
                      Batal!
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import {
  ArrowLeftIcon,
  ArrowPathIcon,
  EyeIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import { useMainStore } from '@/stores/main'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useAgendaStore } from '@/stores/agenda'

const mainStore = useMainStore()
const agendaStore = useAgendaStore()
const userStore = useUserStore()
const file = ref(null)

const router = useRouter()
const showModal = ref(false)
import { toast } from 'vue3-toastify'

function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function toCalendar() {
  router.push({ name: 'calendar-agenda' })
}

function find() {
  agendaStore.$patch((state) => {
    state.responses = null
  })
  if (agendaStore.form.tanggal && agendaStore.form.pimpinan) {
    agendaStore.getData()
  }
}

async function submit() {
  const id = toast.loading('Permintaan sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await agendaStore.store({ uploadFile: file.value })
  console.info(success.status)
  if (success.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    showModal.value = !showModal.value
    toCalendar()
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
  toast.done(id)
}

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  file.value = b
}

function confirm() {
  showModal.value = true
}

onMounted(() => {
  agendaStore.clearForm()
})
</script>
