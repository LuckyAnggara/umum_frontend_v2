<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Kuitansi</h2>
    <div class="flex flex-col space-y-2">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Sudah terima dari</label
        >
        <div class="relative w-full">
          <input
            value="Kuasa Pengguna Anggaran Inspektorat Jenderal"
            readonly
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Uang Sebesar</label
        >
        <input
          :value="
            IDRCurrency.format(
              perjadinStore.totalDetailBiaya(perjadinStore.singleDetail.nip)
            )
          "
          readonly
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Berdasarkan SPPD Nomor</label
        >
        <input
          :value="`ITJ.1-KU.03.02-${perjadinStore.singleDetail.no_sppd}`"
          readonly
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Tanggal SPPD</label
        >
        <input
          :value="perjadinStore.singleResponse.tanggal_st"
          readonly
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Guna Pembayaran</label
        >
        <textarea
          :value="`Kegiatan ${perjadinStore.singleResponse.nama_kegiatan} di ${perjadinStore.singleResponse.tempat_kegiatan}`"
          readonly
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        ></textarea>
      </div>
      <button
        @click="toKuitansi()"
        type="button"
        class="w-fit inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" /><span>Kuitansi</span>
      </button>
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
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { rupiah } from '@/services/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const perjadinStore = usePerjadinStore()
const mainStore = useMainStore()

function toKuitansi() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-kuitansi',
    params: { id: perjadinStore.singleDetail.id },
  })
  window.open(resolvedRoute.href, '_blank')
}
</script>
