<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <div
      class="justify-center items-center w-full md:inset-0 h-modal md:h-full"
    >
      <div class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4">
        <ol
          class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
        >
          <li
            v-for="(step, index) in steps"
            :key="index"
            :class="
              currentStep == index ? 'text-blue-600 dark:text-blue-500' : ''
            "
            class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
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

        <Perencanaan v-if="currentStep == 0" v-model="currentStep" />
        <Detail v-if="currentStep == 1" @openModal="openModal" />
      </div>
    </div>
    <NewModal
      :show="newModal"
      @close="newModal = false"
      @submit="tambahPegawai()"
    />
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useBmnStore } from '@/stores/bmn'
import { useMainStore } from '@/stores/main'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

import { toast } from 'vue3-toastify'
import Perencanaan from './component/Perencanaan.vue'
import Detail from './component/Detail.vue'
import { usePerjadinStore } from '@/stores/perjadin'

const NewModal = defineAsyncComponent(() =>
  import('./dialog/ModalNewDetailPegawai.vue')
)

const perjadinStore = usePerjadinStore

const newModal = ref(false)
const currentStep = ref(1)
const steps = ref(['Perencanaan', 'Detail'])

const itemMenu = [
  {
    label: 'Detail',
    icon: DocumentTextIcon,
  },
  {
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function openModal() {
  newModal.value = true
}
function tambahPegawai() {
  const id = toast.loading('Proses tambah data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  if (perjadinStore.tambahPegawai == true) {
    toast.update(id, {
      render: 'Pegawai berhasil ditambahkan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    newModal.value = false
    perjadinStore.resetForm()
  } else {
    toast.update(id, {
      render: 'Data tidak lengkap',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}
</script>
