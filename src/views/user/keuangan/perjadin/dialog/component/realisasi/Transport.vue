<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Transport</h2>

    <div class="flex flex-col space-y-8">
      <div
        class="w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 min-h-48 overflow-y-auto"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3 w-1/12">#</th>
              <th scope="col" class="px-4 py-3 w-1/12">Tipe</th>
              <th scope="col" class="px-4 py-3 w-2/12">Keterangan</th>
              <th scope="col" class="px-4 py-3 w-3/12">Perencanaan</th>
              <th scope="col" class="px-4 py-3 w-3/12">Realisasi</th>
              <th scope="col" class="px-4 py-3 w-3/12">Catatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinStore.singleDetail.transport < 1">
              <td colspan="5" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinStore.singleDetail.transport"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">{{ index + 1 }}</td>
              <td class="px-4 py-1">{{ item.tipe ?? '-' }}</td>
              <td class="px-4 py-1">{{ item.keterangan ?? '-' }}</td>
              <td class="px-4 py-1">
                <span class="text-xs">{{
                  IDRCurrency.format(item.biaya)
                }}</span>
              </td>
              <td class="px-4 py-1">
                <input
                  type="number"
                  v-model="item.realisasi_biaya"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </td>
              <td>
                <input
                  type="Text"
                  v-model="item.notes"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="px-4 py-1 font-bold">Total</td>
            <td class="px-4 py-1 font-bold"></td>
            <td class="px-4 py-1 font-bold"></td>
            <td class="px-4 py-1 font-bold">
              {{ IDRCurrency.format(perjadinStore.getTotal.transport) }}
            </td>
            <td class="px-4 py-1 font-bold">
              {{ IDRCurrency.format(perjadinStore.getTotal.transport_real) }}
            </td>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
</script>
