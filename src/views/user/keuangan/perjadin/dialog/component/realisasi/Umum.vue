<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Umum</h2>

    <div class="flex flex-col space-y-2 text-sm">
      <div class="grid grid-cols-2">
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Surat Tugas / Perintah</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.master.no_st }}</span>
            <span>{{ perjadinDetailStore.singleResponse.master.tanggal_st }}</span>
          </div>
        </div>
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Tanggal Surat Tugas / Perintah</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.master.tanggal_st }}</span>
          </div>
        </div>
      </div>
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Nama Kegiatan</label>
        <div class="relative w-full">
          <span>{{ perjadinDetailStore.singleResponse.master.nama_kegiatan }}</span>
        </div>
      </div>
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Tempat Kegiatan</label>
        <div class="relative w-full">
          <span>{{ perjadinDetailStore.singleResponse.master.tempat_kegiatan }}</span>
        </div>
      </div>
      <hr />
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Nomor SPPD</label>
        <div class="relative w-full">
          <span>ITJ.1-KU.03.02-{{ perjadinDetailStore.singleResponse.no_sppd }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Nomor Induk Pegawai</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.nip }}</span>
          </div>
        </div>
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Nama</label>
          <span>{{ perjadinDetailStore.singleResponse.nama }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Golongan/Pangkat</label>
          <span>{{ perjadinDetailStore.singleResponse.pangkat }}</span>
        </div>
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Jabatan</label>
          <span>{{ perjadinDetailStore.singleResponse.jabatan }}</span>
        </div>
      </div>
      <div class="text-left">
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Unit</label>
        <span>{{ perjadinDetailStore.singleResponse.unit }}</span>
      </div>

      <div class="text-left">
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Peran</label>
        <span>{{ perjadinDetailStore.singleResponse.peran }}</span>
      </div>

      <div class="flex flex-row justify-between space-x-4">
        <div class="text-left w-2/5">
          <label class="block font-bold text-gray-900 dark:text-white" for="unit">Tanggal Keberangkatan</label>
          <span>{{ $moment(perjadinDetailStore.singleResponse.tanggal_awal).format('DD MMMM YYYY') }}</span>
        </div>
        <div class="text-left w-2/5">
          <label for="unit" class="block font-bold text-gray-900 dark:text-white">Tanggal Kepulangan</label>
          <span>{{ $moment(perjadinDetailStore.singleResponse.tanggal_akhir).format('DD MMMM YYYY') }}</span>
        </div>

        <div class="text-left w-1/5">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Jumlah Hari</label>
          <span>
            {{ $moment(perjadinDetailStore.singleResponse.tanggal_akhir).diff($moment(perjadinDetailStore.singleResponse.tanggal_awal), 'days') + 1 }}
            hari</span
          >
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-col space-y-1 border-2 p-4 mb-6">
      <small class="text-gray-600 italic">Lampiran dibawah ini mungkin belum di <span class="font-semibold">tanda tangani</span> oleh pelaku SPD</small>
      <div class="grid grid-rows-3 grid-flow-col gap-2">
        <div>
          <button
            @click="toKuitansi()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Kuitansi</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Kuitansi Perjalanan Dinas</small>
        </div>
        <div>
          <button
            @click="toSPD()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPD</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Surat Perjalanan Dinas (SPD)</small>
        </div>
        <div>
          <button
            @click="toRPD()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>RPD</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Rincian Biaya Perjalanan Dinas (RPD)</small>
        </div>
        <div>
          <button
            @click="toRill()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>DPR</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Daftar Pengeluaran Rill (DPR)</small>
        </div>
        <div>
          <button
            @click="downloadSPTJM()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPTJM</span><ArrowDownTrayIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Download Draft Surat Pertanggung Jawaban Mutlak (SPTJM)</small>
        </div>
        <div>
          <button
            @click="toSptjm()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPTJM</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Surat Pertanggung Jawaban Mutlak (SPTJM)</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { ArrowTopRightOnSquareIcon, ArrowDownTrayIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { rupiah } from '@/services/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()
const mainStore = useMainStore()

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

async function toRPD() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-rpd',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}
async function toRill() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-rill',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function downloadSPTJM() {
  perjadinDetailStore.downloadSptjm()
}

async function toSptjm() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-sptjm',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function kuitansiUpdate() {
  const id = toast.loading('Memproses kuitansi...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.update(perjadinStore.singleDetail)
  if (success.status) {
    toast.done(id)
    toKuitansi()
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
