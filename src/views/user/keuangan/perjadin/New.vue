<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <div class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4">
        <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li
            v-for="(step, index) in steps"
            :key="index"
            :class="currentStep == index ? 'text-blue-600 dark:text-blue-500' : ''"
            class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
          >
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <CheckCircleIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" />
              {{ step }} <span class="hidden sm:inline-flex sm:ms-2"></span>
            </span>
          </li>
        </ol>
        <!-- Modal content -->

        <Perencanaan v-if="currentStep == 0" />
        <Detail v-if="currentStep == 1" @openModal="openModal(false, x)" @deletePegawai="deletePegawai()" />
        <Lampiran v-if="currentStep == 2" />

        <div class="flex flex-row justify-between">
          <div class="flex items-center space-x-1 mt-4 text-center justify-end">
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
              :disabled="currentStep == 2"
              :class="currentStep == 2 ? 'cursor-not-allowed' : ''"
              type="button"
              class="w-24 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              Next
            </button>
          </div>
          <div class="flex items-center space-x-1 mt-4 text-center justify-end">
            <button
              @click="submit()"
              type="button"
              class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Submit
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
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useBmnStore } from '@/stores/bmn'
import { useMainStore } from '@/stores/main'
import { useMakStore } from '@/stores/mak'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { DocumentTextIcon, TrashIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

import { toast } from 'vue3-toastify'
import Perencanaan from './component/Perencanaan.vue'
import Detail from './component/Detail.vue'
import Lampiran from './component/Lampiran.vue'
import { usePerjadinStore } from '@/stores/perjadin'
import { useRouter } from 'vue-router'

const PegawaiModal = defineAsyncComponent(() => import('./dialog/ModalDetailPegawai.vue'))

const perjadinStore = usePerjadinStore()
const makStore = useMainStore()
const isEdit = ref(false)
const pegawaiModal = ref(false)
const currentStep = ref(0)
const steps = ref(['Perencanaan', 'Detail', 'Lampiran'])
const router = useRouter()

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

async function submit() {
  const id = toast.loading('Perencanaan perjalanan dinas sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinStore.store()
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
    perjadinStore.resetFormMain()
    router.push({ name: 'perjadin-list' })
  } else {
    toast.update(id, {
      render: success.message,
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
onMounted(() => {
  makStore.$reset()
})
</script>
