<template>
  <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <!-- Modal header -->
    <div
      class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 flex-row"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Lampiran
      </h3>
      <div v-if="perjadinStore.isDetail">
        <span
          v-if="perjadinStore.singleResponse.status == 'PERENCANAAN'"
          class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'VERIFIKASI'"
          class="bg-yellow-100 text-yellow-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'PERTANGGUNG JAWABAN'"
          class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
        <span
          v-if="perjadinStore.singleResponse.status == 'SELESAI'"
          class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
          >{{ perjadinStore.singleResponse.status }}</span
        >
      </div>
    </div>
    <!-- Modal body -->

    <div class="mb-4 flex flex-col space-y-3">
      <div class="text-left" v-if="perjadinStore.isDetail">
        <label
          for="name"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Lampiran</label
        >

        <small class="text-gray-600">
          <span v-if="perjadinStore.singleResponse.lampiran.length < 1"
            >Tidak ada lampiran</span
          >
          <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside" v-else>
            <li
              :key="index"
              v-for="(item, index) in perjadinStore.singleResponse.lampiran"
              class="text-base w-full py-2 rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
            >
              <a
                :href="`${storageUrl + '/' + item.lampiran}`"
                :download="item.file_name"
              >
                <span class="text-gray-500">{{ index + 1 }}.</span>
                {{ item.file_name }}
              </a>
              <TrashIcon
                v-if="isEdit"
                @click="perjadinStore.destroyLampiran(index, item)"
                class="cursor-pointer h-5 w-5 hover:-translate-y-1 duration-300 ease-in-out text-red-500"
              />
            </li>
          </ol>
        </small>
      </div>

      <div
        class="text-left"
        v-if="perjadinStore.isDetail == false || isEdit == true"
      >
        <label
          for="name"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Upload Lampiran</label
        >

        <small class="text-gray-600">
          <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
            <li>Surat Tugas / Surat Perintah</li>
            <li>Rencana Anggaran Biaya (RAB)</li>
            <li>Daftar Nominatif</li>
          </ol>
        </small>
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
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { usePerjadinStore } from '@/stores/perjadin'
import { storageUrl } from '@/services/helper'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const perjadinStore = usePerjadinStore()

// FUNGSI LAMPIRAN UPLOAD
function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  if (perjadinStore.isDetail == true) {
    perjadinStore.$patch((state) => {
      state.singleResponse.newLampiran = b
    })
  } else {
    perjadinStore.$patch((state) => {
      state.form.lampiran = b
    })
  }
}
</script>
