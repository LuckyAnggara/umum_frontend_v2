<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <!-- Start coding here -->
    <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
      <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 w-full">
        <div class="w-full flex flex-row space-x-3 items-center">
          <div class="flex items-center">
            <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
            <select
              @change="nonPerjadinStore.getData()"
              v-model="nonPerjadinStore.filter.currentLimit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :value="limit.value"
                :selected="nonPerjadinStore.filter.currentLimit == limit.value ? true : false"
                v-for="(limit, index) in mainStore.limitOptions"
                :key="index"
              >
                {{ limit.label }}
              </option>
            </select>
          </div>

          <div class="flex items-center w-1/3" autocomplete="off">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                @keyup.enter="nonPerjadinStore.getData()"
                v-model="nonPerjadinStore.filter.searchQuery"
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tekan enter untuk mencari"
              />
            </div>
          </div>

          <div class="flex items-center" v-show="authStore.user.role == 'ADMIN'">
            <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Unit</label>
            <select
              @change="nonPerjadinStore.getData()"
              v-model="nonPerjadinStore.filter.currentUnit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">SEMUA</option>
              <option value="2">INSPEKTORAT WILAYAH I</option>
              <option value="3">INSPEKTORAT WILAYAH II</option>
              <option value="4">INSPEKTORAT WILAYAH III</option>
              <option value="5">INSPEKTORAT WILAYAH IV</option>
              <option value="6">INSPEKTORAT WILAYAH V</option>
              <option value="7">INSPEKTORAT WILAYAH VI</option>
              <option value="8">BAGIAN PROGRAM DAN PELAPORAN</option>
              <option value="9">BAGIAN UMUM</option>
              <option value="10">KELOMPOK SDM</option>
              <option value="11">KELOMPOK KEUANGAN</option>
              <option value="12">KELOMPOK HSIP</option>
            </select>
          </div>
          <div class="text-left">
            <VueDatePicker
              v-model="nonPerjadinStore.filter.tanggalTransaksi"
              required
              @closed="nonPerjadinStore.getData()"
              :format="'dd MMMM yyyy'"
              auto-apply
              :is-24="false"
              date-picker
              :enable-time-picker="false"
              model-type="yyyy-MM-dd"
              locale="id"
              placeholder="Tanggal Transaksi"
            ></VueDatePicker>
          </div>

          <div class="flex items-center">
            <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Status</label>
            <select
              @change="nonPerjadinStore.getData()"
              v-model="nonPerjadinStore.filter.currentStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">SEMUA</option>
              <option value="PENGAJUAN">PENGAJUAN</option>
              <option value="VERIFIKASI">VERIFIKASI</option>
              <option value="SELESAI">SELESAI</option>
            </select>
          </div>

          <div
            class="place-self-end w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
          >
            <button
              v-if="authStore.role == 'USER'"
              @click="onNew()"
              type="button"
              class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Rencana Baru
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
        <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">No Transaksi</th>
              <th scope="col" class="px-4 py-3">Uraian</th>
              <th scope="col" class="px-4 py-3">Jumlah Pembayaran</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th scope="col" class="px-4 py-3" v-if="authStore.role == 'ADMIN'">Pembuat</th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="nonPerjadinStore.isLoading">
              <td colspan="5" class="text-center">
                <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
              </td>
            </tr>
            <tr v-else-if="!nonPerjadinStore.isLoading && nonPerjadinStore.items.length < 1">
              <td colspan="5" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in nonPerjadinStore.items"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <!-- <td class="px-4 py-1 text-center">{{ nonPerjadinStore.from + index }}</td> -->
              <td class="px-4 py-1">{{ nonPerjadinStore.from + index }}</td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.nomor_transaksi }}</span>
                  <span class="text-xs">{{ item.tanggal_transaksi }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <span class="font-bold">{{ item.uraian }}</span>
              </td>
              <td class="px-4 py-1">
                <span class="font-bold">{{ IDRCurrency.format(item.total_anggaran) }}</span>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">Tanggal Pengajuan</span>
                  <span class="">{{ item.created_at }}</span>
                  <span class="font-bold" v-if="item.tanggal_verifikasi">Tanggal Verifikasi</span>
                  <span class="text-xs">{{ item.tanggal_verifikasi }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <span
                  v-if="item.status == 'PENGAJUAN'"
                  class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {{ item.status }}</span
                >
                <span
                  v-if="item.status == 'VERIFIKASI'"
                  class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >
                  {{ item.status }}</span
                >
                <span
                  v-if="item.status == 'SELESAI'"
                  class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  {{ item.status }}</span
                >
              </td>
              <td class="px-4 py-1" v-if="authStore.role == 'ADMIN'">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.user.name }}</span>
                  <span class="text-xs">{{ item.unit.nama }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white">
                        <ArrowPathIcon v-if="nonPerjadinStore.isDestroyLoading && deleteId == item.id" class="h-5 w-5 animate-spin" />
                        <EllipsisVerticalIcon v-else class="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
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
                          <MenuItem v-for="menu in itemMenu" v-slot="{ active }" :key="menu.label">
                            <button
                              @click="menu.function(item)"
                              :class="[
                                active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
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
        </table>
      </div>
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">{{ nonPerjadinStore.from }} - {{ nonPerjadinStore.to }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{ nonPerjadinStore.total }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="nonPerjadinStore.currentPage == 1 ? '' : previousPage()"
              :disabled="nonPerjadinStore.currentPage == 1 ? true : false"
              :class="
                nonPerjadinStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="nonPerjadinStore.lastPage == nonPerjadinStore.currentPage ? '' : nextPage()"
              :class="
                nonPerjadinStore.lastPage == nonPerjadinStore.currentPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Next {{
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <DeleteDialog :show="confirmDialog" @submit="deleteData" @close="confirmDialog = !confirmDialog" />

  <!-- <DeleteDialog
    :show="confirmDialog"
    @submit="deleteData"
    @close="confirmDialog = !confirmDialog"
  /> -->

  <Dialog :overflowVisible="true" :show="sendDialog" @submit="updateStatusData" @close="sendDialog = !sendDialog" :canSubmit="true">
    <template #title>
      <h1>Kirim Berkas</h1>
    </template>

    <template #content>
      <div class="flex w-full flex-col space-y-4">
        <div class="text-left">
          <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Tujuan</label>
          <select
            v-model="nonPerjadinStore.updateData.status"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="VERIFIKASI">KEUANGAN</option>
          </select>
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
          <textarea
            placeholder="Isi catatan disini"
            v-model="nonPerjadinStore.updateData.catatan"
            id="message"
            rows="2"
            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import Dialog from '@/components/Dialog.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useNonPerjadinStore } from '@/stores/nonPerjadin'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { defineAsyncComponent, onMounted, ref } from 'vue'
import { EllipsisVerticalIcon, DocumentTextIcon, ArrowPathIcon, TrashIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const nonPerjadinStore = useNonPerjadinStore()
const mainStore = useMainStore()
const authStore = useAuthStore()
const confirmDialog = ref(false)
const sendDialog = ref(false)
const deleteId = ref(0)
const router = useRouter()

const itemMenu = computed(() => {
  return [
    ...(authStore.role === 'USER'
      ? [
          {
            function: onSend,
            label: 'Kirim',
            icon: PaperAirplaneIcon,
          },
        ]
      : []),
    {
      function: onDetail,
      label: 'Detail',
      icon: DocumentTextIcon,
    },
    {
      function: onDelete,
      label: 'Hapus',
      icon: TrashIcon,
    },
  ]
})

function onSend(item) {
  if (item.status == 'PERENCANAAN') {
    deleteId.value = item.id
    sendDialog.value = true
  } else {
    toast(`Tidak bisa mengirim berkas, status berkas ${item.status}`, {
      position: toast.POSITION.TOP_CENTER,
      type: 'error',
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

function onDelete(item) {
  if (item.status == 'PERENCANAAN') {
    deleteId.value = item.id
    confirmDialog.value = true
  } else if (authStore.user.role == 'ADMIN') {
    deleteId.value = item.id
    confirmDialog.value = true
  } else if (item.status == 'SELESAI' && authStore.user.role == 'USER') {
    toast(`Status berkas telah SELESAI, hubungi admin untuk menghapus`, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  } else {
    toast(`Tidak dapat menghapus berkas, proses masih berjalan`, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

function onDetail(item) {
  nonPerjadinStore.$patch((state) => {
    state.isDetail = true
  })
  router.push({ name: 'non-perjadin-detail', params: { id: item.id } })
}

function onNew() {
  nonPerjadinStore.resetFormMain()
  nonPerjadinStore.$patch((state) => {
    state.isDetail = false
  })
  router.push({ name: 'non-perjadin-new' })
}

function nextPage() {
  nonPerjadinStore.filter.page = nonPerjadinStore.currentPage + 1
  nonPerjadinStore.getData()
}

function previousPage() {
  nonPerjadinStore.filter.page = nonPerjadinStore.currentPage - 1
  nonPerjadinStore.getData()
}

async function deleteData() {
  confirmDialog.value = false
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await nonPerjadinStore.destroy(deleteId.value)
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

async function updateStatusData() {
  if (nonPerjadinStore.updateData.status == '' || nonPerjadinStore.updateData.status == null) {
    toast('Data belum lengkap', {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  } else {
    sendDialog.value = false
    const id = toast.loading('Data sedang dikirim...', {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'info',
      isLoading: true,
    })
    const success = await nonPerjadinStore.updateStatus(deleteId.value)
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
      const index = nonPerjadinStore.items.findIndex((p) => p.id == success.data.id)
      nonPerjadinStore.$patch((state) => {
        state.responses.data[index] = success.data
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
}

onMounted(() => {
  nonPerjadinStore.getData()
})
</script>
