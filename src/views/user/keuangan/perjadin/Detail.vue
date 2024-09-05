<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->
    <section v-if="perjadinStore.singleResponse == null">
      <span class="flex"
        ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
      /></span>
    </section>
    <template v-else>
      <div
        class="justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div
          class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4"
        >
          <ol
            class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
          >
            <li
              @click="currentStep = index"
              v-for="(step, index) in steps"
              :key="index"
              :class="
                currentStep == index ? 'text-blue-600 dark:text-blue-500' : ''
              "
              class="cursor-pointer flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span
                class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
              >
                <CheckCircleIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" />
                {{ step }} <span class="hidden sm:inline-flex sm:ms-2"></span>
              </span>
            </li>
          </ol>
          <!-- Modal content -->
          <span
            v-if="isEditAll"
            class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-2.5 rounded dark:bg-green-900 dark:text-green-300"
          >
            EDIT MODE</span
          >
          <Perencanaan v-if="currentStep == 0" :isEdit="isEditAll" />
          <Detail
            :isEdit="isEditAll"
            v-if="currentStep == 1"
            @openModal="openModal"
            @deletePegawai="deletePegawai()"
          />
          <Lampiran v-if="currentStep == 2" :isEdit="isEditAll" />
          <Realisasi v-if="currentStep == 3" @openModal="openModal" />

          <div class="flex flex-row justify-between">
            <div
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                @click="currentStep--"
                :disabled="currentStep == 0"
                :class="currentStep == 0 ? 'cursor-not-allowed' : ''"
                type="button"
                class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Back
              </button>

              <button
                @click="++currentStep"
                :disabled="currentStep == steps.length"
                :class="currentStep == steps.length ? 'cursor-not-allowed' : ''"
                type="button"
                class="w-24 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              >
                Next
              </button>
            </div>
            <div
              v-if="
                authStore.role == 'USER' &&
                perjadinStore.singleResponse.status == 'PERENCANAAN'
              "
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                v-if="isEditAll"
                @click="openConfirm()"
                type="button"
                class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Update
              </button>
              <button
                v-else
                @click="isEditAll = true"
                type="button"
                class="w-24 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
              >
                Edit
              </button>
              <button
                v-if="isEditAll"
                @click="cancelEditAll()"
                type="button"
                class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-green-800"
              >
                Cancel
              </button>
            </div>
            <div
              v-else-if="
                authStore.role == 'ADMIN' &&
                perjadinStore.singleResponse.status == 'VERIFIKASI'
              "
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                @click="openVerifikasi()"
                type="button"
                class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      </div>
      <PegawaiModal
        :isEdit="isEdit"
        :show="pegawaiModal"
        @destroy="deletePegawai()"
        @close="pegawaiModal = false"
        @submit="tambahPegawai()"
        @update="updatePegawai()"
      />

      <Dialog
        :overflowVisible="true"
        :show="confirmDialog"
        @submit="update()"
        @close="confirmDialog = !confirmDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Konfirmasi</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-4 mt-6">
            <div class="text-left">Apa anda yakin akan mengubah data ?</div>
          </div>
        </template>
      </Dialog>

      <Dialog
        :overflowVisible="true"
        :show="verifikasiDialog"
        @submit="updateStatusData()"
        @close="verifikasiDialog = !verifikasiDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Verifikasi</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-4 mt-3">
            <div class="text-left font-medium text-xl">
              Pastikan seluruh dokumen sudah lengkap!
            </div>
            <small>Nomor SPPD akan diterbikan!</small>

            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Catatan</label
              >
              <textarea
                placeholder="Isi catatan disini"
                v-model="perjadinStore.updateData.catatan"
                id="message"
                rows="2"
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </template>
      </Dialog>
    </template>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useMainStore } from '@/stores/main'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'

import { toast } from 'vue3-toastify'
import Perencanaan from './component/Perencanaan.vue'
import Detail from './component/Detail.vue'
import Lampiran from './component/Lampiran.vue'
import Realisasi from './component/Realisasi.vue'
import Dialog from '@/components/Dialog.vue'
import { usePerjadinStore } from '@/stores/perjadin'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const PegawaiModal = defineAsyncComponent(() =>
  import('./dialog/ModalDetailPegawai.vue')
)

const authStore = useAuthStore()
const route = useRoute()
const perjadinStore = usePerjadinStore()
const isEdit = ref(false)
const isEditAll = ref(false)
const pegawaiModal = ref(false)
const currentStep = ref(3)

const steps = computed(() => {
  return [
    'Perencanaan',
    'Detail',
    'Lampiran',
    ...(perjadinStore.singleResponse.status == 'PERTANGGUNG JAWABAN'
      ? ['Realisasi']
      : []),
  ]
})

// const steps = ref([ ''])
const confirmDialog = ref(false)
const verifikasiDialog = ref(false)
function openModal(value) {
  isEdit.value = value
  pegawaiModal.value = true
}

async function tambahPegawai() {
  const id = toast.loading('Proses tambah data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const result = await perjadinStore.tambahPegawai()
  if (result.status) {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    pegawaiModal.value = false
    perjadinStore.resetFormPegawai()
  } else {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function updatePegawai() {
  const id = toast.loading('Memperbaharui data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const result = await perjadinStore.updatePegawai()
  if (result.status) {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    pegawaiModal.value = false
    perjadinStore.resetFormPegawai()
  } else {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function deletePegawai() {
  const result = perjadinStore.deletePegawai()
  toast.success(result.message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1000,
    closeOnClick: true,
    closeButton: true,
  })
  pegawaiModal.value = false
  perjadinStore.resetFormPegawai()
}

async function update() {
  confirmDialog.value = false
  const id = toast.loading(
    'Perencanaan perjalanan dinas sedang di perbaharui...',
    {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'info',
      isLoading: true,
    }
  )

  const success = await perjadinStore.update()
  if (success.status) {
    toast.update(id, {
      render: 'Data berhasil di perbaharui !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    perjadinStore.resetFormMain()
    isEditAll.value = false
    isEdit.value = false
    currentStep.value = 0
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

async function updateStatusData() {
  verifikasiDialog.value = false
  perjadinStore.$patch((state) => {
    state.updateData.status = 'PERTANGGUNG JAWABAN'
  })
  const id = toast.loading('Dokumen sedang di Proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const success = await perjadinStore.updateStatus(
    perjadinStore.singleResponse.id
  )
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
    perjadinStore.$patch((state) => {
      state.singleResponse = response.data.data
    })
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

function openVerifikasi() {
  verifikasiDialog.value = true
}

function openConfirm() {
  confirmDialog.value = true
}
function cancelEditAll() {
  perjadinStore.cancelEdit()
  isEditAll.value = !isEditAll.value
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  perjadinStore.$patch((state) => {
    state.isDetail = true
  })
  await perjadinStore.show(id.value)
})
</script>
