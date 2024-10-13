<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Penginapan</h2>

    <div class="flex flex-col space-y-2">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Detail MAK</label
        >

        <select
          v-model="perjadinStore.newPegawai.nominatif_hotel"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
        >
          <option
            :value="item"
            v-for="(item, index) in nominatif"
            :key="index"
            :disabled="item.type == 'header'"
          >
            <span v-if="item.type == 'header'" class="font-semibold">
              > {{ item.uraian }}
            </span>
            <span v-else-if="item.type == 'detail'">
              - {{ item.uraian }} ----- [
              {{ IDRCurrency.format(item.jumlah) }}]</span
            >
          </option>
        </select>
      </div>

      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Sisa Dana</label
        >
        <input
          readonly
          :value="
            IDRCurrency.format(
              perjadinStore.totalSisaPaguNominatif(
                perjadinStore.newPegawai.nominatif_hotel
              )
            )
          "
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <hr />
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Keterangan</label
        >
        <input
          placeholder="Isi keterangan disini, misal nama Hotel"
          v-model="perjadinStore.newHotel.keterangan"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Hari
          </label>
          <input
            type="number"
            v-model="perjadinStore.newHotel.hari"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Biaya (IDR)*</label
          >
          <input
            type="number"
            v-model="perjadinStore.newHotel.biaya"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Total (IDR)*</label
          >
          <input
            readonly
            :value="
              IDRCurrency.format(
                perjadinStore.newHotel.hari * perjadinStore.newHotel.biaya
              )
            "
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4 my-4">
        <button
          @click="perjadinStore.tambahHotel"
          type="submit"
          class="bg-blue-100 hover:bg-blue-200 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <span> Tambah </span>
        </button>
      </div>

      <div
        class="w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 h-48 overflow-y-auto border-2"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">Keterangan</th>
              <th scope="col" class="px-4 py-3">Hari</th>
              <th scope="col" class="px-4 py-3">Biaya</th>
              <th scope="col" class="px-4 py-3">Total</th>
              <th scope="col" class="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinStore.newPegawai.hotel < 1">
              <td colspan="5" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinStore.newPegawai.hotel"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">{{ index + 1 }}</td>
              <td class="px-4 py-1">{{ item.keterangan }}</td>
              <td class="px-4 py-1">{{ item.hari }}</td>
              <td class="px-4 py-1">
                {{ IDRCurrency.format(item.biaya) }}
              </td>
              <td class="px-4 py-1">
                {{ IDRCurrency.format(item.hari * item.biaya) }}
              </td>
              <td class="px-4 py-1">
                <div @click="perjadinStore.deleteHotel(index)">
                  <TrashIcon class="h-5 cursor-pointer hover:text-blue-500" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-row justify-start space-x-4">
        <div class="text-left w-32 mt-4">
          <label
            for="name"
            class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >Hari
          </label>
          <input
            readonly
            :value="perjadinStore.getTotalHotel.hari"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="text-left w-64 mt-4">
          <label
            for="name"
            class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >Total
          </label>
          <input
            readonly
            :value="IDRCurrency.format(perjadinStore.getTotalHotel.biaya)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      <!-- <div
        v-if="
          perjadinStore.getTotalHotel.hari * perjadinStore.getTotalHotel.biaya >
          perjadinStore.totalSisaPaguNominatif(
            perjadinStore.newPegawai.nominatif_hotel
          )
        "
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">Alert!</span> anggaran melebihi sisa dana
        detail
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'

import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
import { computed } from 'vue'

const nominatif = computed(() => {
  if (perjadinStore.isDetail) {
    return perjadinStore.singleResponse.mak.nominatif
  }
  return perjadinStore.form.mak.nominatif
})
</script>
