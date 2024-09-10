<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Representatif</h2>
    <div class="flex items-center space-x-4 my-4">
      <button
        @click="perjadinDetailStore.tambahRep"
        type="submit"
        class="bg-blue-100 hover:bg-blue-200 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <span> Tambah </span>
      </button>
    </div>
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
              <th scope="col" class="px-4 py-3 w-2/12">Keterangan</th>
              <th scope="col" class="px-4 py-3 w-3/12">Perencanaan</th>
              <th scope="col" class="px-4 py-3 w-3/12">Realisasi</th>
              <th scope="col" class="px-4 py-3 w-3/12">Catatan</th>
              <th scope="col" class="px-4 py-3 w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinDetailStore.singleResponse.representatif < 1">
              <td colspan="5" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinDetailStore.singleResponse
                .representatif"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">{{ index + 1 }}</td>
              <td class="px-4 py-1">
                <input
                  v-model="item.keterangan"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">Hari</span>
                  <span class="text-xs">{{ item.hari }}</span>
                  <span class="font-bold">Biaya</span>
                  <span class="text-xs">{{
                    IDRCurrency.format(item.biaya)
                  }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <div class="text-left">
                    <span class="font-bold">Hari</span>
                    <input
                      type="number"
                      v-model="item.realisasi_hari"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <span class="font-bold">Biaya (IDR)</span>
                    <input
                      type="number"
                      v-model="item.realisasi_biaya"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="Text"
                  v-model="item.notes"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </td>
              <td class="py-1">
                <div
                  @click="perjadinDetailStore.deleteRep(index)"
                  class="text-right flex flex-row justify-center"
                >
                  <TrashIcon class="h-5 cursor-pointer hover:text-blue-500" />
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="px-4 py-1 font-bold">Total</td>
            <td class="px-4 py-1 font-bold"></td>
            <td class="px-4 py-1 font-bold">
              {{
                IDRCurrency.format(perjadinDetailStore.getTotal.representatif)
              }}
            </td>
            <td class="px-4 py-1 font-bold">
              {{
                IDRCurrency.format(
                  perjadinDetailStore.getTotal.representatif_real
                )
              }}
            </td>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()
</script>
