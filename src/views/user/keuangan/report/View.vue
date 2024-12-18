<template>
  <div class="mx-auto w-full px-8 py-8">
    <!-- Start coding here -->
    <div class="flex flex-row justify-between mb-5">
      <div
        class="place-self-end w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <button
          @click="dialogReportPerjadin = true"
          type="button"
          class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <DocumentTextIcon class="h-5" /> <span>Laporan Perjalanan Dinas</span>
        </button>
      </div>
    </div>

    <PerjadinDialog
      :overflowVisible="true"
      :show="dialogReportPerjadin"
      @submit="downloadReportPerjadin()"
      @close="dialogReportPerjadin = !dialogReportPerjadin"
      :canSubmit="true"
    >
      <template #title>
        <h1>Laporan</h1>
      </template>

      <template #content>
        <div class="flex flex-col justify-between space-y-4">
          <h1>Isi dengan Tanggal Surat Tugas / Surat Perintah</h1>
          <div class="text-left">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="unit">Tanggal Awal</label>
            <VueDatePicker v-model="perjadinStore.report.tanggal_awal" required :format="'dd MMMM yyyy'" auto-apply date-picker locale="id"></VueDatePicker>
          </div>
          <div class="text-left">
            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Akhir</label>
            <VueDatePicker
              :min-date="perjadinStore.report.tanggal_awal"
              v-model="perjadinStore.report.tanggal_akhir"
              required
              :format="'dd MMMM yyyy'"
              auto-apply
              date-picker
              locale="id"
            ></VueDatePicker>
          </div>
        </div>
      </template>
    </PerjadinDialog>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinStore } from '@/stores/perjadin'
import { useRouter } from 'vue-router'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
import { baseUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import PerjadinDialog from '@/components/Dialog.vue'

const perjadinStore = usePerjadinStore()
const authStore = useAuthStore()
const router = useRouter()

const dialogReportPerjadin = ref(false)

function downloadReportPerjadin() {
  if (
    perjadinStore.report.tanggal_awal == null ||
    perjadinStore.report.tanggal_awal == '' ||
    perjadinStore.report.tanggal_akhir == null ||
    perjadinStore.report.tanggal_akhir == ''
  ) {
    toast.error('Tanggal data belum dilengkapi', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
    })
  } else {
    let startDate = perjadinStore.report.tanggal_awal.toISOString().split('T')[0] // 2024-12-17T08:07:00.000Z (UTC)
    let endDate = perjadinStore.report.tanggal_akhir.toISOString().split('T')[0] // 2024-12-17T08:07:00.000Z (UTC)

    window.open(`${baseUrl}/report/perjadin?tanggal_awal=${startDate}&tanggal_akhir=${endDate}`, '_blank')
    perjadinStore.report.tanggal_awal == null
    perjadinStore.report.tanggal_akhir == null
    dialogReportPerjadin.value = false
  }
}
</script>
