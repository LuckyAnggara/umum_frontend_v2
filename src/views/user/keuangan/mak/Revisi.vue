<template>
  <div class="mx-auto w-full px-4">
    <div
      class="flex flex-col space-y-4 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible"
    >
      <div
        class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 w-full"
      >
        <div class="w-full flex flex-row space-x-3 items-center">
          <div class="w-full flex flex-row space-x-3 items-center">
            <div class="flex items-center">
              <label
                for="years"
                class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                >Show</label
              >
              <select
                @change="makStore.getData()"
                v-model="makStore.filter.currentLimit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  :value="limit.value"
                  :selected="
                    makStore.filter.currentLimit == limit.value ? true : false
                  "
                  v-for="(limit, index) in mainStore.limitOptions"
                  :key="index"
                >
                  {{ limit.label }}
                </option>
              </select>
            </div>

            <div class="flex items-center w-1/3" autocomplete="off">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <MagnifyingGlassIcon
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  />
                </div>
                <input
                  @keyup.enter="makStore.getData()"
                  v-model="makStore.filter.searchQuery"
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tekan enter untuk mencari"
                />
              </div>
            </div>

            <div
              class="flex items-center"
              v-show="authStore.user.role == 'ADMIN'"
            >
              <label
                for="years"
                class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                >Unit</label
              >
              <select
                @change="makStore.getData()"
                v-model="makStore.filter.currentUnit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="0">SEMUA</option>
                <option value="2">INSPEKTORAT WILAYAH I</option>
                <option value="3">INSPEKTORAT WILAYAH II</option>
                <option value="4">INSPEKTORAT WILAYAH III</option>
                <option value="5">INSPEKTORAT WILAYAH IV</option>
                <option value="6">INSPEKTORAT WILAYAH V</option>
                <option value="7">INSPEKTORAT WILAYAH VI</option>
                <option value="8">BAGIAN PROGRAM DAN PELAPORAN</option>
                <option value="9">BAGIAN UMUM</option>
                <option value="10">KELOMPOK SDM</option>
                <option value="11">KELOMPOK KEUANGAN</option>
                <option value="12">KELOMPOK HSIP</option>
              </select>
            </div>
          </div>
          <div class="flex items-center justify-center flex-row">
            <div
              class="place-self-end w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                @click="onReset()"
                type="button"
                class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <ArrowPathIcon class="h-5" /> <span>Reset</span>
              </button>
            </div>
            <div
              class="place-self-end w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
            >
              <button
                v-if="uploadedFiles == null"
                @click="addFiles()"
                class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <ArrowUpTrayIcon class="h-5" /> <span>Import</span>
              </button>
              <button
                v-else
                @click="addFiles()"
                class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                <ArrowUpTrayIcon class="h-5" /> <span>Pemadanan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <input
        accept=".xlsx"
        class="hidden"
        type="file"
        id="files"
        ref="refUpload"
        multiple
        @change="handleFilesUpload()"
      />
      <div
        class="p-4 overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
      >
        <p class="font-semibold text-md mb-4">Data from Import</p>
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th
                v-for="header in makStore.headerImport"
                :key="header"
                scope="col"
                class="px-4 py-3"
                rowspan="2"
              >
                {{ header }}
              </th>
              <th class="px-4 py-3 text-center" colspan="3">Pemadanan</th>
            </tr>

            <tr>
              <th class="px-4 py-3">Mak</th>
              <th class="px-4 py-3">Anggaran</th>
              <th class="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="makStore.dataImport.length < 1">
              <td :colspan="makStore.headerImport.length" class="text-center">
                Import Data
              </td>
            </tr>
            <tr
              v-for="item in makStore.dataImport"
              :key="item.NO"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1" v-for="header in headers" :key="header">
                {{ item[header] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'
import { useMakStore } from '@/stores/mak'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const makStore = useMakStore()
const mainStore = useMainStore()
const authStore = useAuthStore()

const router = useRouter()
import { ref, onMounted } from 'vue'
import { read, utils, writeFileXLSX } from 'xlsx'
import XLSX from 'xlsx'
import {} from '@vueuse/core'

const rows = ref([])
const data = ref([])
const headers = ref([])
const refUpload = ref(null)
const uploadedFiles = ref(null)
const html = ref('')
const tableau = ref()

function addFiles() {
  refUpload.value.click()
}

function handleFilesUpload() {
  uploadedFiles.value = refUpload.value.files[0]
  var f = uploadedFiles.value
  var reader = new FileReader()
  reader.onload = function (e) {
    var data = e.target.result
    data = new Uint8Array(data)
    var workbook = XLSX.read(data, {
      type: 'array',
    })

    /* DO SOMETHING WITH workbook HERE */
    var first_sheet_name = workbook.SheetNames[0]
    /* Get worksheet */
    var worksheet = workbook.Sheets[first_sheet_name]
    //It will prints with header and contents ex) Name, Home...
    makStore.$patch((state) => {
      state.dataImport = utils.sheet_to_json(worksheet)
      state.headerImport = Object.keys(state.dataImport[0])
    })
    rows.value = utils.sheet_to_json(worksheet, { header: 1 })
    data.value = utils.sheet_to_json(worksheet)
    headers.value = Object.keys(data.value[0])
  }
  reader.readAsArrayBuffer(f)
}

function onReset() {
  refUpload.value.files = null
  uploadedFiles.value = null
  makStore.$patch((state) => {
    state.dataImport = []
    state.headerImport = []
  })
}

function onPemadanan() {
  makStore.padanKan()
}
</script>
