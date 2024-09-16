<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Umum</h2>

    <div class="flex flex-col space-y-2 text-lg">
      <div>
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Nomor Induk Pegawai</label
        >
        <div class="relative w-full">
          <span>{{ perjadinDetailStore.singleResponse.nip }}</span>
        </div>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Nama</label
        >
        <span>{{ perjadinDetailStore.singleResponse.nama }}</span>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Jabatan</label
        >
        <span>{{ perjadinDetailStore.singleResponse.jabatan }}</span>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Unit</label
        >
        <span>{{ perjadinDetailStore.singleResponse.unit }}</span>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Golongan/Pangkat</label
        >
        <span>{{ perjadinDetailStore.singleResponse.pangkat }}</span>
      </div>

      <div class="text-left">
        <label
          for="name"
          class="block mb-2 font-bold text-gray-900 dark:text-white"
          >Peran</label
        >
        <span>{{ perjadinDetailStore.singleResponse.peran }}</span>
      </div>

      <div class="flex flex-row justify-between space-x-4">
        <div class="text-left w-2/5">
          <label
            class="block mb-2 font-bold text-gray-900 dark:text-white"
            for="unit"
            >Tanggal Keberangkatan</label
          >
          <span>{{
            $moment(perjadinDetailStore.singleResponse.tanggal_awal).format(
              'DD MMMM YYYY'
            )
          }}</span>
        </div>
        <div class="text-left w-2/5">
          <label
            for="unit"
            class="block mb-2 font-bold text-gray-900 dark:text-white"
            >Tanggal Kepulangan</label
          >
          <span>{{
            $moment(perjadinDetailStore.singleResponse.tanggal_akhir).format(
              'DD MMMM YYYY'
            )
          }}</span>
        </div>

        <div class="text-left w-1/5">
          <label
            for="name"
            class="block mb-2 font-bold text-gray-900 dark:text-white"
            >Jumlah Hari</label
          >
          <span>{{ perjadinDetailStore.singleResponse.jumlah_hari }} hari</span>
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
import {
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
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
