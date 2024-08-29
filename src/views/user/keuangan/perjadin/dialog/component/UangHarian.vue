<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Uang Harian</h2>

    <div class="flex flex-col space-y-2">
      <div>
        <label
          for="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Keterangan</label
        >
        <input
          placeholder="Isi keterangan disini untuk penjelas"
          v-model="perjadinStore.newUangHarian.keterangan"
          required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Hari
          </label>
          <input
            type="number"
            v-model="perjadinStore.newUangHarian.hari"
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
            v-model="perjadinStore.newUangHarian.biaya"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4 my-4">
        <button
          @click="perjadinStore.tambahUH"
          type="submit"
          class="bg-blue-100 hover:bg-blue-200 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <span> Tambah </span>
        </button>
      </div>

      <div
        class="w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 h-48 overflow-y-auto"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
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
            <tr v-if="perjadinStore.newPegawai.uang_harian < 1">
              <td colspan="5" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinStore.newPegawai.uang_harian"
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
                <div @click="perjadinStore.deleteUH(index)">
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
            :value="perjadinStore.getTotalUH.hari"
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
            :value="IDRCurrency.format(perjadinStore.getTotalUH.biaya)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
</script>
