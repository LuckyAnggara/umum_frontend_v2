<template>
  <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <!-- Modal header -->
    <div
      class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 flex-row"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Perencanaan
      </h3>
      <span
        v-if="perjadinStore.isDetail"
        class="bg-yellow-100 text-yellow-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
        >{{ perjadinStore.singleResponse.status }}</span
      >
    </div>
    <!-- Modal body -->
    <div v-if="!perjadinStore.isDetail">
      <div class="mb-4 flex flex-col space-y-3">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Tahun Anggaran</label
          >

          <select
            required
            v-model="perjadinStore.form.tahun_anggaran"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option
              v-for="(item, index) in mainStore.tahunOptions"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
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
    </div>

    <div v-else>
      <div class="mb-4 flex flex-col space-y-3">
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Tahun Anggaran</label
          >

          <select
            required
            :disabled="!isEdit"
            v-model="perjadinStore.singleResponse.tahun_anggaran"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option
              v-for="(item, index) in mainStore.tahunOptions"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
        <div>
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Nomor Surat Tugas / Surat Perintah</label
          >
          <input
            required
            :readonly="!isEdit"
            v-model="perjadinStore.singleResponse.no_st"
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
            v-model="perjadinStore.singleResponse.tanggal_st"
            :readonly="!isEdit"
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
            :readonly="!isEdit"
            v-model="perjadinStore.singleResponse.nama_kegiatan"
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
              :readonly="!isEdit"
              v-model="perjadinStore.singleResponse.tanggal_awal"
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
              :readonly="!isEdit"
              v-model="perjadinStore.singleResponse.tanggal_akhir"
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
            :readonly="!isEdit"
            required
            v-model="perjadinStore.singleResponse.tempat_kegiatan"
            id="message"
            rows="2"
            class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { usePerjadinStore } from '@/stores/perjadin'
import { useMainStore } from '@/stores/main'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const mainStore = useMainStore()
const perjadinStore = usePerjadinStore()
</script>
