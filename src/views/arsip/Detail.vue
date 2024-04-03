<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div class="flex flex-col items-cnter justify-between space-y-4 p-6">
          <div v-if="arsipStore.isLoading" class="w-full items-center flex flex-col space-y-2">
            <span>Load Data</span>
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <form v-else @submit.prevent="submit()" class="">
            <div class="grid gap-3 mb-4 sm:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Surat</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.nomor_surat"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Surat</label>
                <VueDatePicker
                  required
                  v-model="arsipStore.singleResponse.tanggal_surat"
                  :format="'dd MMMM yyyy'"
                  auto-apply
                  date-picker
                  locale="id"
                ></VueDatePicker>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Klasifikasi</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.klasifikasi"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pencipta Arsip</label>
                <select
                  required
                  v-model="arsipStore.singleResponse.pencipta_arsip"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(item, index) in mainStore.unitOptions" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pengolah Arsip</label>
                <select
                  required
                  v-model="arsipStore.singleResponse.pengolah_arsip"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(item, index) in mainStore.unitOptions" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tingkat Perkembangan</label>
                <select
                  required
                  v-model="arsipStore.singleResponse.tingkat_perkembangan"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="asli">Asli</option>
                  <option value="tembusan">Tembusan</option>
                  <option value="copy">Copy</option>
                  <option value="salinan">Salinan</option>
                  <option value="pertinggal">Pertinggal</option>
                </select>
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.jumlah"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Uraian</label>
                <textarea
                  required
                  v-model="arsipStore.singleResponse.uraian"
                  rows="2"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi</label>
                <select
                  required
                  v-model="arsipStore.singleResponse.lokasi"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Lantai 16 - Inspektorat Jenderal</option>
                  <option selected="">Lantai 15 - Inspektorat Jenderal</option>
                  <option selected="">Lantai B2 - Gedung Imigrasi</option>
                  <option selected="">Gedung Arsip - Tanggerang</option>
                </select>
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roll O'Pack / Lemari </label>
                <input
                  required
                  v-model="arsipStore.singleResponse.lemari"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kompartemen Rak</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.rak"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Box</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.no_box"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Folder</label>
                <input
                  required
                  v-model="arsipStore.singleResponse.no_folder"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Media</label>
                <select
                  required
                  v-model="arsipStore.singleResponse.jenis_media"
                  id="Media"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="kertas">Kertas</option>
                  <option value="elektronik">Elektronik</option>
                </select>
              </div>
              <div class="mb-4">
                <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
                <ul class="w-full space-y-1 text-gray-500 list-inside dark:text-gray-400" v-if="arsipStore.singleResponse.lampiran.length > 0">
                  <li v-for="(lampiran, i) in arsipStore.singleResponse.lampiran" :key="i" class="flex items-center border-b-2">
                    <a :href="`${storageUrl + '/' + lampiran.lampiran}`" :download="lampiran.file_name">
                      <ArrowDownTrayIcon
                        class="w-5 h-5 me-2 text-green-500 dark:text-green-400 flex-shrink-0 hover:-translate-y-1 duration-200 ease-in-out cursor-pointer"
                      />
                    </a>

                    <span>{{ lampiran.file_name }}</span>

                    <TrashIcon
                      @click="deleteLampiran(i, lampiran)"
                      class="ml-1 w-5 h-5 me-2 text-red-500 dark:text-red-400 flex-shrink-0 hover:-translate-y-1 duration-200 ease-in-out cursor-pointer"
                    />
                  </li>
                </ul>
                <FilePond v-else :label="'Drop lampiran disini ...'" :multiple="true" @fileChange="fileChange" :type="'application/pdf'" />
              </div>

              <div v-if="arsipStore.singleResponse.lampiran.length > 0" class="mb-4">
                <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tambah File</label>

                <FilePond :label="'Drop lampiran disini ...'" :multiple="true" @fileChange="fileChange" :type="'application/pdf'" />
              </div>
            </div>

            <div class="flex items-center space-x-4 mt-8 border-t-2 py-4">
              <button
                type="submit"
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>

              <button
                type="button"
                @click="arsipStore.resetData()"
                class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <ConfirmDialog :overflowVisible="true" :show="confirmDialog" @submit="update()" @close="confirmDialog = !confirmDialog" :canSubmit="true">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-6">
          <div class="text-left">Apa anda yakin akan menyimpan data ?</div>
        </div>
      </template>
    </ConfirmDialog>
  </section>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { storageUrl } from '@/services/helper'
import ConfirmDialog from '@/components/Dialog.vue'
import { toast } from 'vue3-toastify'
import { useMainStore } from '@/stores/main'
import { useArsipStore } from '@/stores/arsip'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowDownTrayIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const mainStore = useMainStore()
const arsipStore = useArsipStore()

const confirmDialog = ref(false)
const file = ref(null)

function submit() {
  confirmDialog.value = true
}

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  file.value = b
}

function deleteLampiran(index, item) {
  arsipStore.$patch((state) => {
    state.singleResponse.lampiran.splice(index, 1)
    state.deleteLampiran.push(item)
  })
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(() => {
  arsipStore.show(id.value)
})

async function update() {
  const id = toast.loading('Memperbaharui Data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  confirmDialog.value = false
  const success = await arsipStore.update({ uploadFile: file.value })
  if (success) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
    file.value = []
    arsipStore.resetForm()
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}
</script>
