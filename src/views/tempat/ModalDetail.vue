<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="close" class="relative z-50">
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
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="relative p-4 bg-white w-2/4 rounded-lg shadow dark:bg-gray-800 sm:p-5"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
              >
                <h3
                  class="flex flex-row space-x-4 justify-center text-lg font-semibold text-gray-900 dark:text-white"
                >
                  <span>Detail Kegiatan</span>
                  <span
                    v-if="tempatStore.singleResponse.status == 'BELUM SELESAI'"
                    class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                    >{{ tempatStore.singleResponse.status }}</span
                  >
                  <span
                    v-else-if="tempatStore.singleResponse.status == 'SELESAI'"
                    class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                    >{{ tempatStore.singleResponse.status }}</span
                  >
                </h3>
                <button
                  @click="close"
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->

              <div class="w-full mx-auto text-left">
                <div class="py-2 border-b border-gray-200 mb-4">
                  <h2 class="font-semibold text-gray-800">Kegiatan</h2>
                </div>
                <div class="flex flex-col space-y-4">
                  <div>
                    <label
                      for="nip"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Nama Kegiatan</label
                    >
                    <textarea
                      readonly
                      :value="tempatStore.singleResponse.title"
                      type="text"
                      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ></textarea>
                  </div>
                  <div class="flex flex-row space-x-2">
                    <div class="flex-1">
                      <label
                        for="nip"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Tanggal</label
                      >
                      <input
                        readonly
                        :value="
                          moment(tempatStore.singleResponse.tanggal).format(
                            'DD MMMM YYYY'
                          )
                        "
                        type="text"
                        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        for="nip"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Jam Mulai</label
                      >
                      <input
                        readonly
                        :value="
                          moment(tempatStore.singleResponse.jam_mulai).format(
                            'HH:mm'
                          )
                        "
                        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        for="nip"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Jam Berakhir</label
                      >
                      <input
                        readonly
                        :value="
                          moment(tempatStore.singleResponse.jam_akhir).format(
                            'HH:mm'
                          )
                        "
                        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full mx-auto text-left">
                <div class="py-2 border-b border-gray my-4">
                  <h2 class="font-semibold text-gray-800">Peminjam</h2>
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2 my-3">
                  <div>
                    <label
                      for="nip"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >NIP</label
                    >
                    <input
                      readonly
                      :value="tempatStore.singleResponse.nip ?? '-'"
                      type="text"
                      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="nip"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Nama</label
                    >
                    <input
                      readonly
                      v-model="tempatStore.singleResponse.nama"
                      type="text"
                      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="nip"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Unit</label
                    >
                    <input
                      readonly
                      v-model="tempatStore.singleResponse.unit"
                      type="text"
                      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      for="nip"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Nomor WhatsApp</label
                    >
                    <div class="w-full flex flex-row space-x-2">
                      <input
                        readonly
                        v-model="tempatStore.singleResponse.no_wa"
                        type="text"
                        class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />

                      <a
                        :href="`https://web.whatsapp.com/send/?phone=${tempatStore.singleResponse.no_wa}&text&type=phone_number&app_absent=0`"
                        target="_blank"
                        class="text-center text-sm font-medium text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Chat WhatsApp
                        <span class="sr-only">Search</span>
                      </a>
                    </div>

                    <!-- 
                    <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor WhatsApp</label>
                    <input
                  
                      type="text"
                      class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    /> -->
                  </div>
                </div>
              </div>

              <div class="flex items-center mt-8">
                <button
                  v-if="tempatStore.singleResponse.status == 'BELUM SELESAI'"
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  @click="emit('destroy')"
                >
                  Hapus
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'

import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { computed, onMounted, onUpdated, ref } from 'vue'
import moment from 'moment'
import { useTempatStore } from '@/stores/tempat'

const tempatStore = useTempatStore()

const emit = defineEmits(['close', 'destroy'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

function close() {
  emit('close')
}
</script>
