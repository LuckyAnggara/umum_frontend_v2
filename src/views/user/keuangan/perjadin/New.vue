<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <div class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4">
        <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li
            @click="currentStep = index"
            v-for="(step, index) in steps"
            :key="index"
            :class="currentStep == index ? 'text-blue-600 dark:text-blue-500' : ''"
            class="cursor-pointer flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
          >
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <CheckCircleIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" />
              {{ step }} <span class="hidden sm:inline-flex sm:ms-2"></span>
            </span>
          </li>
        </ol>
        <!-- Modal content -->

        <Perencanaan v-if="currentStep == 0" />
        <Detail v-if="currentStep == 1" @openModal="openModal(false, x)" @deletePegawai="deletePegawai()" @openMasalModal="openMasalModal(false, x)" />
        <Lampiran v-if="currentStep == 2" />

        <div class="flex flex-row justify-between">
          <div class="flex items-center space-x-1 text-center justify-end">
            <button
              @click="currentStep--"
              :disabled="currentStep == 0"
              :class="currentStep == 0 ? 'cursor-not-allowed' : ''"
              type="button"
              class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <ChevronLeftIcon class="h-5" /><span>Back</span>
            </button>

            <button
              @click="++currentStep"
              :disabled="currentStep == steps.length - 1"
              :class="currentStep == steps.length - 1 ? 'cursor-not-allowed' : ''"
              type="button"
              class="text-gray-900 w-fit flex flex-row space-x-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <span>Next</span>
              <ChevronRightIcon class="h-5" />
            </button>
          </div>
          <div class="flex items-center space-x-1 mt-4 text-center justify-end">
            <!-- <button
              @click="restore()"
              type="button"
              class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <BookmarkIcon class="h-5" /><span> Load </span>
            </button>
            <button
              @click="save()"
              type="button"
              class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <BookmarkIcon class="h-5" /><span> Save </span>
            </button> -->
            <button
              @click="submit()"
              type="button"
              class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <CheckCircleIcon class="h-5" /><span> Submit </span>
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

    <DialogMassPegawai :show="pegawaiMasalDialog" @close="pegawaiMasalDialog = !pegawaiMasalDialog" />
    <Dialog :overflowVisible="true" :show="submitDialog" @submit="submitData()" @close="submitDialog = !submitDialog" :canSubmit="true">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-6">
          <div class="text-left">Apa anda yakin data sudah benar ?</div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useBmnStore } from '@/stores/bmn'
import { useMainStore } from '@/stores/main'
import { useMakStore } from '@/stores/mak'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { DocumentTextIcon, TrashIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, BookmarkIcon } from '@heroicons/vue/24/outline'

import { toast } from 'vue3-toastify'
import Perencanaan from './component/Perencanaan.vue'
import Detail from './component/Detail.vue'
import Lampiran from './component/Lampiran.vue'
import { usePerjadinStore } from '@/stores/perjadin'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))

const PegawaiModal = defineAsyncComponent(() => import('./dialog/ModalDetailPegawai.vue'))
const DialogMassPegawai = defineAsyncComponent(() => import('./dialog/DialogMassPegawai.vue'))

const perjadinStore = usePerjadinStore()
const makStore = useMainStore()
const isEdit = ref(false)
const pegawaiModal = ref(false)
const submitDialog = ref(false)
const pegawaiMasalDialog = ref(false)
const currentStep = ref(0)
const steps = ref(['Perencanaan', 'Detail', 'Lampiran'])
const router = useRouter()

function openModal(value) {
  isEdit.value = value
  pegawaiModal.value = true
}

function openMasalModal(value) {
  isEdit.value = value
  pegawaiMasalDialog.value = true
}

function submit() {
  submitDialog.value = true
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
    perjadinStore.$patch((state) => {
      state.isNewEdit = false
    })
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

// function save() {
//   useStorage('new-perjadin', JSON.stringify(perjadinStore.form))
//   toast.success('Data berhasil di simpan', {
//     position: toast.POSITION.BOTTOM_CENTER,
//     autoClose: 1000,
//     closeOnClick: true,
//     closeButton: true,
//   })
// }

// function restore() {
//   perjadinStore.$patch((state) => {
//     state.form = JSON.parse(useStorage('new-perjadin'))
//   })
//   toast.success('Data berhasil di simpan', {
//     position: toast.POSITION.BOTTOM_CENTER,
//     autoClose: 1000,
//     closeOnClick: true,
//     closeButton: true,
//   })
// }

async function submitData() {
  submitDialog.value = false

  const id = toast.loading('Perencanaan perjalanan dinas sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const result = await perjadinStore.store()

  if (result.status) {
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
      render: result.message,
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
  perjadinStore.$reset()
})
</script>
