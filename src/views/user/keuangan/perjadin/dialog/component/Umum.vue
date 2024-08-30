<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Umum</h2>
    <small class="text-gray-500"
      >Gunakan fitur pencarian pegawai, jika data tidak ditemukan, lakukan
      penginputan <span class="font-medium">Manual</span></small
    >
    <div
      v-if="perjadinStore.validNip"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-bold">Alert!</span> Pegawai dengan NIP ini sudah ada
    </div>

    <div class="flex flex-col space-y-2">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nomor Induk Pegawai*</label
        >
        <div class="relative w-full">
          <input
            v-model="perjadinStore.newPegawai.nip"
            type="search"
            id="search-dropdown"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Isi dengan Nomor Induk Pegawai"
            required
          />
          <button
            @click="perjadinStore.searchLapkin()"
            type="button"
            class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <MagnifyingGlassIcon
              class="w-4 h-4"
              v-if="!perjadinStore.isSearching"
            />
            <ArrowPathIcon class="w-4 h-4 animate-spin" v-else />
          </button>
        </div>
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nama*</label
        >
        <input
          v-model="perjadinStore.newPegawai.nama"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Jabatan*</label
        >
        <input
          v-model="perjadinStore.newPegawai.jabatan"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Unit*</label
        >
        <input
          v-model="perjadinStore.newPegawai.unit"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>
      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Golongan/Pangkat*</label
        >
        <input
          v-model="perjadinStore.newPegawai.pangkat"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <div class="text-left">
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Peran*</label
        >
        <select
          v-model="perjadinStore.newPegawai.peran"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        >
          <option
            :value="item"
            v-for="(item, index) in mainStore.peranOptions"
            :key="index"
          >
            {{ item }}
          </option>
        </select>
      </div>

      <div class="flex flex-row justify-between space-x-4">
        <div class="text-left w-2/5">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="unit"
            >Tanggal Keberangkatan</label
          >
          <VueDatePicker
            v-model="perjadinStore.newPegawai.tanggal_awal"
            required
            :format="'dd MMMM yyyy'"
            auto-apply
            date-picker
            locale="id"
          ></VueDatePicker>
        </div>
        <div class="text-left w-2/5">
          <label
            for="unit"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Tanggal Kepulangan</label
          >
          <VueDatePicker
            v-model="perjadinStore.newPegawai.tanggal_akhir"
            required
            :format="'dd MMMM yyyy'"
            auto-apply
            date-picker
            locale="id"
          ></VueDatePicker>
        </div>

        <div class="text-left w-1/5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Jumlah Hari</label
          >
          <input
            v-model="perjadinStore.newPegawai.jumlah_hari"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'

const perjadinStore = usePerjadinStore()
const mainStore = useMainStore()
const cariPegawaiLoading = ref(false)

// async function cariPegawai() {
//   perjadinStore.isSearching = true
//   const id = toast.loading('Cari data...', {
//     position: toast.POSITION.BOTTOM_CENTER,
//     type: 'info',
//     isLoading: true,
//   })
//   try {
//     const response = await fetch(
//       `https://lapkin.bbmakmur.com/api/employee-show/${perjadinStore.newPegawai.nip}`
//     )
//       .then((response) => {
//         response.json().then((data) => {
//           if (data.success == true) {
//             toast.update(id, {
//               render: 'Berhasil',
//               position: toast.POSITION.BOTTOM_CENTER,
//               type: 'success',
//               autoClose: 1000,
//               closeOnClick: true,
//               closeButton: true,
//               isLoading: false,
//             })
//             perjadinStore.setDataPegawaiLapkin(data.data)
//           } else {
//             toast.update(id, {
//               render: 'tidak dapat ditemukan',
//               position: toast.POSITION.BOTTOM_CENTER,
//               type: 'error',
//               autoClose: 1000,
//               closeOnClick: true,
//               closeButton: true,
//               isLoading: false,
//             })
//           }
//         })
//       })
//       .catch((err) => {
//         console.error(err)
//         toast.update(id, {
//           render: 'terjadi kesalahan',
//           position: toast.POSITION.BOTTOM_CENTER,
//           type: 'error',
//           autoClose: 1000,
//           closeOnClick: true,
//           closeButton: true,
//           isLoading: false,
//         })
//       })
//   } catch (error) {
//     console.error(error)
//   } finally {
//     perjadinStore.isSearching = false
//   }
// }
</script>
