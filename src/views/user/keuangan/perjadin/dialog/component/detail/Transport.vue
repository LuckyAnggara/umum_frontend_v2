<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Transportasi</h2>

    <div class="flex flex-col space-y-2">
      <div class="grid grid-cols-2 gap-4">
        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Jenis
          </label>
          <select
            v-model="perjadinStore.newTransport.tipe"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="DARAT">DARAT</option>
            <option value="LAUT">LAUT</option>
            <option value="UDARA">UDARA</option>
            <option value="LAINNYA">LAINNYA</option>
          </select>
        </div>

        <div class="text-left">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Keterangan
          </label>
          <input
            placeholder="Jenis transportasi, contoh : Pesawat - Garuda"
            v-model="perjadinStore.newTransport.keterangan"
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
            v-model="perjadinStore.newTransport.biaya"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>

      <div class="flex items-center space-x-4 my-4">
        <button
          @click="perjadinStore.tambahTransport"
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
              <th scope="col" class="px-4 py-3">Tipe</th>
              <th scope="col" class="px-4 py-3">Keterangan</th>
              <th scope="col" class="px-4 py-3">Total Biaya</th>
              <th scope="col" class="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinStore.newPegawai.transport < 1">
              <td colspan="4" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinStore.newPegawai.transport"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">{{ index + 1 }}</td>
              <td class="px-4 py-1">{{ item.tipe }}</td>
              <td class="px-4 py-1">{{ item.keterangan }}</td>
              <td class="px-4 py-1">
                {{ IDRCurrency.format(item.biaya) }}
              </td>
              <td class="px-4 py-1">
                <div @click="perjadinStore.deleteTransport(index)">
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
            >Total Biaya
          </label>
          <input
            readonly
            :value="IDRCurrency.format(perjadinStore.getTotalTransport)"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'
import { usePerjadinStore } from '@/stores/perjadin'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
</script>
