<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div class="flex flex-col items-cnter justify-between space-y-4 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Data Arsip</h3>
          <form action="#" class="">
            <div class="grid gap-3 mb-4 sm:grid-cols-2">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Surat</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Surat</label>
                <VueDatePicker :format="'dd MMMM yyyy'" auto-apply date-picker locale="id"></VueDatePicker>
              </div>
              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Klasifikasi</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pencipta Arsip</label>
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(item, index) in mainStore.unitOptions" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>
              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pengolah Arsip</label>
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(item, index) in mainStore.unitOptions" :key="index" :value="item">{{ item }}</option>
                </select>
              </div>

              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tingkat Perkembangan</label>
                <select
                  id="category"
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
                <label for="jumlah" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label for="uraian" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Uraian</label>
                <textarea
                  rows="4"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                ></textarea>
              </div>

              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lokasi</label>
                <select
                  id="category"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected="">Lantai 16 - Inspektorat Jenderal</option>
                  <option selected="">Lantai 15 - Inspektorat Jenderal</option>
                  <option selected="">Lantai B2 - Gedung Imigrasi</option>
                  <option selected="">Gedung Arsip - Tanggerang</option>
                </select>
              </div>

              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Roll O'Pack / Lemari </label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kompartemen Rak</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label for="Klasifikasi" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Box</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No Folder</label>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div>
                <label for="Media" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Media</label>
                <select
                  type="text"
                  id="Media"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="kertas">Kertas</option>
                  <option value="elektronik">Elektronik</option>
                </select>
              </div>

              <div>
                <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File </label>
                <FilePond :label="'Drop lampiran disini ...'" :multiple="true" @fileChange="fileChange" :type="'application/pdf'" />
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <button
                type="submit"
                class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { useMainStore } from '@/stores/main'

const mainStore = useMainStore()
</script>
