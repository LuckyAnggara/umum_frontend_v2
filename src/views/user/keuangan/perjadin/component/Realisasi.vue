<template>
  <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <div
      class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 flex-row"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Realisasi
      </h3>
      <div v-if="perjadinStore.isDetail">
        <span
          v-if="perjadinStore.singleResponse.status == 'PERENCANAAN'"
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'VERIFIKASI'"
          class="bg-yellow-100 text-yellow-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'PERTANGGUNG JAWABAN'"
          class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'SELESAI'"
          class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
      </div>
    </div>
    <div class="mb-4 flex flex-col space-y-3">
      <div
        class="w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 z-10 overflow-auto min-h-96"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 z-50"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">No SPPD</th>
              <th scope="col" class="px-4 py-3">Pegawai</th>
              <th scope="col" class="px-4 py-3">Total Anggaran Biaya</th>
              <th scope="col" class="px-4 py-3">Total Realisasi</th>
              <th scope="col" class="px-4 py-3">Lebih / Kurang Bayar</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinStore.singleResponse.detail < 1">
              <td colspan="9" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinStore.singleResponse.detail"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-100 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <!-- <td class="px-4 py-1 text-center">{{ perjadinStore.from + index }}</td> -->
              <td class="px-4 py-1">
                <span>{{ index + 1 }}</span>
              </td>
              <td class="px-4 py-1">
                <span>ITJ.1-KU.03.02-{{ item.no_sppd }}</span>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.nama }}</span>
                  <span class="text-xs">{{ item.nip }}</span>
                  <span class="text-xs">{{ item.pangkat.toUpperCase() }}</span>
                  <span class="text-xs truncate">{{
                    item.jabatan.toUpperCase()
                  }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  rupiah.format(perjadinStore.totalDetailBiaya(item.nip))
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  rupiah.format(
                    perjadinStore.totalDetailBiayaRealisasi(item.nip)
                  )
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span class="text-red-500 font-semibold">{{
                  rupiah.format(
                    perjadinStore.totalDetailBiaya(item.nip) -
                      perjadinStore.totalDetailBiayaRealisasi(item.nip)
                  )
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span
                  v-if="item.status == 'UNVERIFIED'"
                  class="bg-red-100 text-red-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                >
                  {{ item.status }}</span
                >
                <span
                  v-if="item.status == 'VERIFIED'"
                  class="bg-green-100 text-green-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-4 py-1">
                <div class="z-50">
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <EllipsisVerticalIcon
                          class="h-5 w-5 text-black dark:text-white"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                      >
                        <div class="px-2 py-1">
                          <MenuItem
                            v-for="menu in itemMenu"
                            v-slot="{ active }"
                            :key="menu.label"
                          >
                            <button
                              @click="menu.function(item)"
                              :class="[
                                active
                                  ? 'bg-blue-500 text-white'
                                  : 'text-gray-900 dark:text-white',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              ]"
                            >
                              <component :is="menu.icon" class="w-5 h-5 mr-3" />
                              {{ menu.label }}
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="px-4 py-1 font-bold" colspan="3">Total</td>
            <td class="px-4 py-1 font-bold">
              {{ IDRCurrency.format(perjadinStore.getTotalAnggaranDetail) }}
            </td>
            <td class="px-4 py-1 font-bold">
              {{ IDRCurrency.format(perjadinStore.getTotalAnggaranRealisasi) }}
            </td>
            <td class="px-4 py-1 font-bold text-red-500">
              {{
                IDRCurrency.format(
                  perjadinStore.getTotalAnggaranDetail -
                    perjadinStore.getTotalAnggaranRealisasi
                )
              }}
            </td>
          </tfoot>
        </table>
      </div>
    </div>

    <DialogDocument
      @close="documentDialog = !documentDialog"
      :show="documentDialog"
    />
    <DialogRealisasi
      @submit="submitRealisasi()"
      @close="realisasiDialog = !realisasiDialog"
      :show="realisasiDialog"
    />
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  TrashIcon,
  ClipboardDocumentIcon,
  XCircleIcon,
  XMarkIcon,
  BanknotesIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/outline'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { rupiah } from '@/services/helper'
import { IDRCurrency } from '@/utilities/formatter'
import { toast } from 'vue3-toastify'
import { useMakStore } from '@/stores/mak'
import { useDebounceFn } from '@vueuse/core'

import DialogDocument from '../dialog/DialogDocument.vue'
import DialogRealisasi from '../dialog/DialogRealisasi.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

const emit = defineEmits(['openModal', 'deletePegawai'])

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const documentDialog = ref(false)
const realisasiDialog = ref(false)
const makStore = useMakStore()
const perjadinStore = usePerjadinStore()
const authStore = useAuthStore()
const perjadinDetailStore = usePerjadinDetailStore()
const itemMenu = computed(() => {
  return [
    {
      function: onRealisasi,
      label: 'Realisasi',
      icon: BanknotesIcon,
    },
    ...(authStore.role === 'USER'
      ? [
          {
            function: toKuitansi,
            label: 'Kuitansi',
            icon: ArrowTopRightOnSquareIcon,
          },
          {
            function: toSPD,
            label: 'SPD',
            icon: ArrowTopRightOnSquareIcon,
          },
        ]
      : []),
  ]
})

function onDocument() {
  documentDialog.value = true
}

async function onRealisasi(item) {
  // await perjadinStore.$patch((state) => {
  //   state.singleDetail = item
  // })

  // await perjadinDetailStore.$patch((state) => {
  //   state.singleResponse = item
  // })
  // realisasiDialog.value = true

  router.push({ name: 'perjadin-sppd-realisasi', params: { id: item.id } })
}

async function toKuitansi() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-kuitansi',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function toSPD() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-spd',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function submitRealisasi() {
  const id = toast.loading('Realisasi sedang di Proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.update()
  const index = perjadinStore.singleResponse.detail.findIndex(
    (d) => d.id == perjadinDetailStore.singleResponse.id
  )
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
    perjadinStore.$patch((state) => {
      state.singleResponse.detail[index] = success.data
    })
    realisasiDialog.value = false
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
</script>
