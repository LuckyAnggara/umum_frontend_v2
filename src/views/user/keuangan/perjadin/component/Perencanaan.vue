<template>
  <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <!-- Modal header -->
    <div
      class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Perencaan
      </h3>
    </div>
    <!-- Modal body -->
    <form action="#" @submit.prevent="onNext">
      <div class="mb-4 flex flex-col space-y-3">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Nomor Surat Tugas / Surat Perintah</label
          >
          <input
            required
            v-model="perjadinStore.form.no_st"
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="text-left">
          <label
            for="unit"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Tanggal Surat</label
          >
          <VueDatePicker
            v-model="perjadinStore.form.tanggal_st"
            required
            :format="'dd MMMM yyyy'"
            auto-apply
            date-picker
            locale="id"
          ></VueDatePicker>
        </div>

        <div>
          <label
            for="price"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Nama Kegiatan</label
          >
          <input
            required
            v-model="perjadinStore.form.nama_kegiatan"
            type="text"
            name="price"
            id="price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="text-left">
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tanggal Awal Kegiatan</label
            >
            <VueDatePicker
              v-model="perjadinStore.form.tanggal_awal"
              required
              :format="'dd MMMM yyyy'"
              auto-apply
              date-picker
              locale="id"
            ></VueDatePicker>
          </div>
          <div class="text-left">
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tanggal Akhir Kegiatan</label
            >
            <VueDatePicker
              v-model="perjadinStore.form.tanggal_akhir"
              required
              :format="'dd MMMM yyyy'"
              auto-apply
              date-picker
              locale="id"
            ></VueDatePicker>
          </div>
        </div>

        <div>
          <label
            for="price"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Tempat Kegiatan</label
          >
          <textarea
            required
            v-model="perjadinStore.form.tempat_kegiatan"
            id="message"
            rows="2"
            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button
          type="submit"
          class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Lanjut
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { usePerjadinStore } from '@/stores/perjadin'

const perjadinStore = usePerjadinStore()

const currentStep = defineModel()

function onNext() {
  currentStep.value++
}
</script>
