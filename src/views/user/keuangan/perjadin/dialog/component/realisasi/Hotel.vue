<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Penginapan</h2>
    <div v-show="!disabledForm" class="flex items-center space-x-4 my-4">
      <button
        @click="perjadinDetailStore.tambahHotel"
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
              <th scope="col" class="px-4 py-3 w-3/12">Keterangan</th>
              <th scope="col" class="px-4 py-3 w-2/12">Perencanaan</th>
              <th scope="col" class="px-4 py-3 w-2/12">Realisasi</th>
              <th scope="col" class="px-4 py-3 w-3/12">Catatan</th>
              <th scope="col" class="px-4 py-3 w-1/12"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinDetailStore.singleResponse.hotel < 1">
              <td colspan="5" class="text-center">Tidak ada data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinDetailStore.singleResponse.hotel"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">{{ index + 1 }}</td>
              <td class="px-4 py-1">
                <input
                  :readonly="disabledForm"
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
                      :readonly="disabledForm"
                      type="number"
                      v-model="item.realisasi_hari"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <span class="font-bold">Biaya (IDR)</span>
                    <input
                      :readonly="disabledForm"
                      type="number"
                      v-model="item.realisasi_biaya"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col space-y-4">
                  <div class="flex items-center">
                    <input
                      :readonly="disabledForm"
                      id="link-checkbox"
                      type="checkbox"
                      v-model="item.bukti"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="link-checkbox"
                      :class="item.bukti ? '' : 'line-through'"
                      class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >Ada Bukti
                    </label>
                  </div>

                  <input
                    :readonly="disabledForm"
                    type="Text"
                    v-model="item.notes"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </td>
              <td class="py-1">
                <div
                  v-show="!disabledForm"
                  @click="perjadinDetailStore.deleteHotel(index)"
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
              {{ IDRCurrency.format(perjadinDetailStore.getTotal.hotel) }}
            </td>
            <td class="px-4 py-1 font-bold">
              {{ IDRCurrency.format(perjadinDetailStore.getTotal.hotel_real) }}
            </td>
            <td class="px-4 py-1 font-bold">
              Lebih / Kurang :
              {{
                IDRCurrency.format(
                  perjadinDetailStore.getTotal.hotel -
                    perjadinDetailStore.getTotal.hotel_real
                )
              }}
            </td>
          </tfoot>
        </table>
      </div>

      <div
        class="flex flex-col space-y-8"
        v-if="
          perjadinDetailStore.singleResponse.lampiran.filter(
            (x) => x.type == 'HOTEL'
          ).length > 0
        "
      >
        <div class="text-left">
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Lampiran</label
          >

          <small class="text-gray-600">
            <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
              <li
                v-for="(
                  item, index
                ) in perjadinDetailStore.singleResponse.lampiran.filter(
                  (x) => x.type == 'HOTEL'
                )"
                :key="index"
                class="text-base w-full rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
              >
                <a
                  :href="`${storageUrl + '/' + item.lampiran}`"
                  :download="item.file_name"
                >
                  <span class="text-gray-500">{{ index + 1 }}.</span>
                  {{ item.file_name }}
                </a>
                <TrashIcon
                  v-if="authStore.user.role == 'USER'"
                  @click="perjadinDetailStore.destroyLampiran(item)"
                  class="cursor-pointer h-5 w-5 hover:-translate-y-1 duration-300 ease-in-out text-red-500"
                />
              </li>
            </ol>
          </small>
        </div>
      </div>

      <div class="flex flex-col space-y-8 w-1/2" v-if="!disabledForm">
        <div class="text-left">
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Upload Lampiran</label
          >

          <FilePond
            :label="'Drop lampiran disini ...'"
            :multiple="true"
            @fileChange="fileChange"
            class="mt-4"
            :type="'application/pdf, application/msword,application/vnd.openxmlformats,application/vnd.ms-excel,officedocument.spreadsheetml.sheet, image/jpeg, image/png'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { storageUrl } from '@/services/helper'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { TrashIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const props = defineProps({
  disabledForm: {
    type: Boolean,
    default: false,
  },
})

const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })

  perjadinDetailStore.$patch((state) => {
    state.lampiran.hotel = b
  })
}
</script>
