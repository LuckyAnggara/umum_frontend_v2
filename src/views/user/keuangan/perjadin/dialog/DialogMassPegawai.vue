<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="relative p-4 bg-white w-3/4 rounded-lg shadow dark:bg-gray-800 sm:p-5 min-h-[75vh]">
              <!-- Modal header -->
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  <span>Batch Duplicate Data Pegawai</span>
                </h3>
                <button @click="emit('close')">
                  <XMarkIcon class="h-5 w-5" />
                </button>
              </div>
              <!-- Modal body -->

              <div class="flex flex-col min-h-[75vh]">
                <div class="flex flex-row justify-between">
                  <div class="flex items-center space-x-2 text-center justify-between w-full">
                    <div class="flex flex-row space-x-2">
                      <button
                        @click="onAdd()"
                        type="button"
                        class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        <FolderPlusIcon class="h-5" />
                        <span>Add</span>
                      </button>

                      <button
                        @click="onSubmit()"
                        type="button"
                        class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        <CheckCircleIcon class="h-5" />

                        <span>Submit</span>
                      </button>
                    </div>
                    <div class="flex flex-row space-x-2">
                      <button
                        v-if="uploadedFiles == null"
                        @click="importFile()"
                        type="button"
                        class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        <ArrowUpTrayIcon class="h-5" />

                        <span>Upload</span>
                      </button>

                      <button
                        v-if="perjadinStore.batchCopyPegawai.length > 0"
                        @click="onFetchData()"
                        type="button"
                        class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        <CircleStackIcon class="h-5" />

                        <span>Fetch Data</span>
                      </button>

                      <button
                        @click="onTemplate()"
                        type="button"
                        class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      >
                        <ArrowDownTrayIcon class="h-5" />

                        <span>Template</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex flex-row space-x-6 min-h-[75vh] justify-start items-start">
                  <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 min-h-[75v]">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-4 py-03 w-0.5">#</th>
                        <th scope="col" class="px-4 py-3">NIP</th>
                        <th scope="col" class="px-4 py-3">Nama</th>
                        <th scope="col" class="px-4 py-3">Jabatan</th>
                        <th scope="col" class="px-4 py-3">Golongan / Pangkat</th>
                        <th scope="col" class="px-4 py-3">Unit</th>
                        <th scope="col" class="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(pegawai, index) in perjadinStore.batchCopyPegawai"
                        :key="index"
                        class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
                      >
                        <td class="px-4 py-1">{{ index + 1 }}</td>
                        <td class="px-4 py-1">
                          <input
                            v-model="pegawai.nip"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </td>
                        <td class="px-4 py-1">
                          <input
                            v-model="pegawai.nama"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </td>
                        <td class="px-4 py-1">
                          <input
                            v-model="pegawai.jabatan"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </td>
                        <td class="px-4 py-1">
                          <input
                            v-model="pegawai.pangkat"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </td>
                        <td class="px-4 py-1">
                          <input
                            v-model="pegawai.unit"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </td>
                        <td class="px-4 py-1 flex flex-row space-x-2 justify-center items-center">
                          <span>
                            <ArrowPathIcon v-if="pegawai.status == 'search'" class="w-5 animate-spin" />
                            <CheckCircleIcon v-else-if="pegawai.status == 'ada'" class="w-5 text-green-500" />
                            <XMarkIcon v-else-if="pegawai.status == 'tidak ada'" class="w-5 text-red-50" />
                          </span>
                          <a class="cursor-pointer" @click="perjadinStore.deleteBatchPegawai(index)"><TrashIcon class="w-5" /></a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>

      <input accept=".xlsx" class="" type="file" id="files" ref="refUpload" @change="handleFilesUpload()" />
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

import { usePerjadinStore } from '@/stores/perjadin'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  CircleStackIcon,
  FolderIcon,
  FolderPlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import { read, utils, writeFileXLSX } from 'xlsx'
import XLSX from 'xlsx'
import { ref } from 'vue'
import { reactive } from 'vue'
const emit = defineEmits(['close'])

const perjadinStore = usePerjadinStore()
const refUpload = ref(null)
const dataPegawai = ref([])
const uploadedFiles = ref(null)

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
    dataPegawai.value = utils.sheet_to_json(worksheet)
    perjadinStore.$patch((state) => {
      state.batchCopyPegawai.push(...dataPegawai.value)
    })
  }
  reader.readAsArrayBuffer(f)

  dataPegawai.value = []
  uploadedFiles.value = null
}

function importFile() {
  refUpload.value.click()
}

function onTemplate() {
  window.open(
    ' https://docs.google.com/spreadsheets/d/1PMvI-McQ7ve2ClRYNECDLoeQ7eOnLnRt/edit?usp=sharing&ouid=116020739719030205312&rtpof=true&sd=true',
    '_blank'
  )
}

function onAdd() {
  perjadinStore.tambahBatchPegawai()
}

async function onFetchData() {
  for (const e of perjadinStore.batchCopyPegawai) {
    e.status = 'search'
    if (e.nip == null || e.nip === '') {
      continue // Skip jika nip kosong
    }

    try {
      let result = await perjadinStore.searchLapkinBatch(e.nip)
      // Update data dari hasil pencarian
      e.nip = result.data.nip
      e.nama = result.data.nama
      e.jabatan = result.data.jabatan
      e.pangkat = result.data.pangkat
      e.unit = result.data.unit
      e.status = result.data.status
    } catch (error) {
      e.status = 'tidak ada' // Tandai sebagai error jika fetch gagal
    }
  }
}

function onSubmit() {
  perjadinStore.$patch((state) => {
    for (const e of state.batchCopyPegawai) {
      // Jika NIP sudah ada, lewati iterasi
      const findSame = state.form.detail.some((x) => x.nip === e.nip)
      if (findSame) {
        continue // Lanjutkan ke iterasi berikutnya
      }

      // Duplikasi data
      let d = JSON.parse(JSON.stringify(state.dataToBatchDuplicate))
      d.nip = e.nip
      d.nama = e.nama
      d.jabatan = e.jabatan
      d.pangkat = e.pangkat
      d.unit = e.unit
      d.status = e.status

      // Tambahkan ke detail
      state.form.detail.push(d)
    }
    state.batchCopyPegawai = []
    state.dataToBatchDuplicate = {}
  })
  emit('close')
}

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
</script>
