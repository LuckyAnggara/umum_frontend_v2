<template>
  <section v-if="permintaanPersediaanStore.singleResponses == null">
    <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
  </section>
  <section v-else class="px-16 flex flex-col space-y-4 py-5 bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <span class="font-semibold text-3xl text-gray-600">Tiket #</span>
          <span class="font-semibold text-3xl text-gray-600">{{ permintaanPersediaanStore.singleResponses.tiket }}</span>
          <div class="ml-2">
            <span
              v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'"
              class="bg-blue-100 text-blue-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span
              v-else-if="permintaanPersediaanStore.singleResponses.status == 'APPROVE'"
              class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span
              v-else-if="permintaanPersediaanStore.singleResponses.status == 'DONE'"
              class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span
              v-else-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'"
              class="bg-green-100 text-yellow-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span v-else class="bg-red-100 text-red-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">REJECTED</span>
          </div>
        </div>
        <span class="text-lg text-gray-400 mt-1">{{ permintaanPersediaanStore.singleResponses.created_at }}</span>
      </div>

      <div v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'" class="flex flex-row place-self-end">
        <button
          @click="approveConfirm()"
          type="button"
          class="w-24 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Approve
        </button>

        <button
          @click="rejectConfirm()"
          type="button"
          class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
        >
          Reject
        </button>
      </div>

      <div v-if="permintaanPersediaanStore.singleResponses.status == 'APPROVE'" class="flex flex-row place-self-end">
        <button
          @click="undoConfirm()"
          type="button"
          class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Undo
        </button>
        <button
          @click="shippingConfirm()"
          type="button"
          class="w-24 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        >
          Kirim
        </button>
      </div>

      <div v-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'" class="flex flex-row place-self-end">
        <button
          @click="qrDialog = true"
          type="button"
          class="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        >
          <QrCodeIcon class="h-6" />
        </button>
      </div>
    </div>

    <div class="flex flex-row space-x-8">
      <div class="w-3/4 flex flex-col space-y-8">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
          <div class="flex flex-col w-2/3 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <span class="text-gray-700 text-xl font-semibold">Detail Permintaan</span>
          </div>
          <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
            <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'" scope="col" class="px-4 py-3">
                    <input
                      v-model="permintaanPersediaanStore.selectAll"
                      @change="permintaanPersediaanStore.checkAll"
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                  <th scope="col" class="px-2 py-3">Barang</th>
                  <th scope="col" class="px-4 py-3" v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'">Saldo Persediaan</th>
                  <th scope="col" class="px-4 py-3">Jumlah Permintaan</th>
                  <th scope="col" class="px-4 py-3">Jumlah disetujui</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="permintaanPersediaanStore.isLoading">
                  <td colspan="6" class="text-center">
                    <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                  </td>
                </tr>
                <tr v-else-if="!permintaanPersediaanStore.isLoading && permintaanPersediaanStore.singleResponses.detail.length < 1">
                  <td colspan="6" class="text-center">No Data</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in permintaanPersediaanStore.detail"
                  :key="index"
                  class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
                >
                  <td v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'" class="px-4 py-1">
                    <input
                      @change="permintaanPersediaanStore.checkSingle"
                      id="default-checkbox"
                      type="checkbox"
                      v-model="item.checked"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td class="px-2 py-1">
                    <div class="flex flex-row space-x-2 items-center">
                      <img class="w-16 h-16" :src="showImage(item.persediaan)" />
                      <span class="font-bold">
                        {{ item.persediaan.nama }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-1" v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'">
                    {{ item.persediaan.saldo }} {{ item.persediaan.satuan }}
                  </td>
                  <td class="px-4 py-1">{{ item.jumlah }} {{ item.persediaan.satuan }}</td>

                  <td class="px-4 py-1">
                    <div class="flex flex-row space-x-4 items-center">
                      <input
                        v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'"
                        v-model="item.confirm_permintaan"
                        type="number"
                        id="nama"
                        class="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <span v-else>
                        {{ item.jumlah_accept }}
                      </span>
                      <span>
                        {{ item.persediaan.satuan }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-1">
                    <section v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'">
                      <span
                        v-if="item.confirm_permintaan <= item.persediaan.saldo"
                        class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        >STOK TERSEDIA</span
                      >

                      <span v-else class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                        >STOK KURANG</span
                      >
                    </section>
                    <section v-else>
                      <span
                        v-if="item.checked == true"
                        class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        >OK</span
                      >
                      <span v-else class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                        >DITOLAK</span
                      >
                    </section>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <div class="w-full flex flex-row justify-end">
              <span class="font-semibold">Total </span>
              <span class="mx-4">: </span>
              <span class="font-semibold">
                {{ permintaanPersediaanStore.singleResponses.detail.length }}
                Item
              </span>
            </div>
          </nav>
        </div>

        <div class="bg-white dark:bg-gray-800 relative shadow-md rounded-lg">
          <div class="flex flex-col w-2/3 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <span class="text-gray-700 text-xl font-semibold">Log</span>
          </div>
          <div class="p-6 mb-3">
            <ol class="relative border-s border-gray-200 dark:border-gray-700">
              <li v-for="(log, index) in permintaanPersediaanStore.singleResponses.log" :key="index" class="mb-10 ms-6">
                <span
                  class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
                >
                  <svg
                    class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                    />
                  </svg>
                </span>
                <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {{ log.status }}
                </h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Tanggal {{ log.created_at }}</time>
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                  {{ log.catatan }}
                </p>
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">oleh : {{ log.created_by }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="w-1/4">
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible py-4 px-3">
          <div class="flex flex-col md:flex-row items-center mb-4">
            <span class="text-gray-700 text-xl font-semibold">Detail Pemohon</span>
          </div>
          <div class="flex flex-col space-y-2 mb-3">
            <div class="flex flex-col">
              <label class="font-bold">Nama</label>
              <span class="">{{ permintaanPersediaanStore.singleResponses.nama }}</span>
              <span v-if="permintaanPersediaanStore.singleResponses.nip !== ''" class="text-md font-thin text-gray-600">
                NIP
                <span>{{ permintaanPersediaanStore.singleResponses.nip }}</span></span
              >
            </div>
            <div class="flex flex-col">
              <label class="font-bold">Unit Pemohon</label>
              <span> {{ permintaanPersediaanStore.singleResponses.unit }}</span>
            </div>
            <div class="flex flex-col">
              <label class="font-bold">Catatan</label>
              <span> {{ permintaanPersediaanStore.singleResponses.catatan }}</span>
            </div>
            <section v-if="permintaanPersediaanStore.singleResponses.status == 'DONE'">
              <div class="flex flex-col">
                <label class="font-bold">Penerima</label>
                <span> {{ permintaanPersediaanStore.singleResponses.penerima }}</span>
              </div>
              <div class="flex flex-col">
                <label class="font-bold">Tanggal diterima</label>
                <span> {{ permintaanPersediaanStore.singleResponses.tanggal_diterima }}</span>
              </div>
              <div class="flex flex-col">
                <label class="font-bold">Tanda Penerima</label>
                <div class="border-2 rounded-xl p-2">
                  <vue-drawing-canvas
                    :width="200"
                    :height="400"
                    :lineWidth="2"
                    :lock="true"
                    backgroundColor="#FFFFFF"
                    :initial-image="JSON.parse(permintaanPersediaanStore.singleResponses.ttd)"
                    saveAs="png"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <ApproveDialog :show="approveDialog" @submit="approved" @close="approveDialog = !approveDialog">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #subTitle>
        <p>Apa anda menyetujui permintaan ini ?</p>
      </template>

      <template #confirmTitle> <span>Approve</span> </template>
    </ApproveDialog>

    <RejectDialog :show="rejectDialog" @submit="reject" @close="rejectDialog = !rejectDialog">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #subTitle>
        <p>Apa anda akan menolak permintaan ini ?</p>
      </template>

      <template #confirmTitle> <span>Reject</span> </template>
    </RejectDialog>

    <UndoDialog :show="undoDialog" @submit="undo" @close="undoDialog = !undoDialog">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #subTitle>
        <p>Permintaan ini akan dikembalikan ke status awal ?</p>
      </template>

      <template #confirmTitle> <span>Setuju</span> </template>
    </UndoDialog>

    <ShippingDialog :show="shippingDialog" @submit="shipping" @close="shippingDialog = !shippingDialog">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #subTitle>
        <p>Apa anda akan melakukan pengiriman ?</p>
      </template>

      <template #confirmTitle> <span>Shipping</span> </template>
    </ShippingDialog>

    <QRDialog :show="qrDialog" @close="qrDialog = !qrDialog">
      <template #title>
        <h1>Scan This QR Code</h1>
      </template>

      <template #content>
        <div class="flex flex-col justify-center items-center space-y-4 mt-6">
          <QRCodeVue3 :value="shippingUrl" />
          <span class="text-sm text-gray-600">Scan QRCode pada saat pengiriman persediaan</span>
        </div>
      </template>
    </QRDialog>
  </section>
</template>

<script setup>
import ApproveDialog from '@/components/ConfirmDialog.vue'
import RejectDialog from '@/components/ConfirmDialog.vue'
import ShippingDialog from '@/components/ConfirmDialog.vue'
import UndoDialog from '@/components/ConfirmDialog.vue'
import QRDialog from '@/components/Dialog.vue'
import QRCodeVue3 from 'qrcode-vue3'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
import VueDrawingCanvas from 'vue-drawing-canvas'

import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { storageUrl } from '@/services/helper'
import { ArrowPathIcon, QrCodeIcon, RocketLaunchIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const permintaanPersediaanStore = usePermintaanPersediaanStore()

const approveDialog = ref(false)
const rejectDialog = ref(false)
const shippingDialog = ref(false)
const undoDialog = ref(false)
const qrDialog = ref(false)

function approveConfirm() {
  approveDialog.value = true
}

function rejectConfirm() {
  rejectDialog.value = true
}

function undoConfirm() {
  undoDialog.value = true
}

function shippingConfirm() {
  shippingDialog.value = true
}

async function approved() {
  approveDialog.value = false
  const id = toast.loading('Sedang dalam proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.update({ status: 'APPROVE' })
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

async function shipping() {
  shippingDialog.value = false
  const id = toast.loading('Persiapan proses pengiriman permintaan...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.update({ status: 'PROCESS' })
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
    qrDialog.value = true
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

async function reject() {
  rejectDialog.value = false
  const id = toast.loading('Sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.update({ status: 'REJECT' })
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

async function undo() {
  undoDialog.value = false
  const id = toast.loading('Sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.updateUndo({ status: 'UNDO' })
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

const shippingUrl = computed(() => {
  const firstSegment = window.location.origin + '/#/user/persediaan/permintaan'
  return `${firstSegment}/${tiket.value}/pengiriman`
})

const tiket = computed(() => {
  return route.params.tiket ?? null
})

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + item.image
  return a
}

onMounted(async () => {
  await permintaanPersediaanStore.show(tiket.value)
})
</script>
