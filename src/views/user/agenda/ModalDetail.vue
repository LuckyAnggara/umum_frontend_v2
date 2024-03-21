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
        <div class="fixed inset-0 bg-black/25"></div>
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
              class="relative p-4 bg-white w-fit rounded-lg shadow dark:bg-gray-800 sm:p-5"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
              >
                <h3
                  class="space-x-4 justify-center text-lg font-semibold text-gray-900 dark:text-white"
                >
                  <span>Detail Kegiatan</span>
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

              <div
                @submit.prevent="submit()"
                class="mt-4 bg-white rounded-lg max-h-full overflow-visible text-left"
              >
                <div class="border-b border-gray-200 flex flex-col space-y-4">
                  <div class="text-left">
                    <label
                      for="unit"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Nama Kegiatan</label
                    >
                    <textarea
                      :value="agendaStore.singleResponse?.kegiatan"
                      type="text"
                      id="unit"
                      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      readonly
                    >
                    </textarea>
                  </div>

                  <div>
                    <label
                      for="nama"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Tanggal Kegiatan</label
                    >
                    <input
                      :value="agendaStore.singleResponse?.tanggal"
                      id="nama"
                      class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>

                  <div class="flex flex-row space-x-4">
                    <div class="text-left">
                      <label
                        for="unit"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Jam Mulai</label
                      >
                      <input
                        :value="agendaStore.singleResponse?.jam_mulai"
                        id="nama"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readonly
                      />
                    </div>

                    <div class="text-left">
                      <label
                        for="unit"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Jam Berakhir</label
                      >
                      <input
                        :value="agendaStore.singleResponse?.jam_akhir"
                        id="nama"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readonly
                      />
                    </div>
                  </div>

                  <section>
                    <div
                      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      <ul>
                        <li
                          class="w-full py-2 rounded-t-lg dark:border-gray-600 font-medium border-b border-gray-200"
                        >
                          Lampiran kegiatan
                        </li>
                        <li
                          :key="index"
                          v-for="(item, index) in agendaStore.singleResponse
                            ?.lampiran"
                          class="w-full py-2 rounded-t-lg dark:border-gray-600"
                        >
                          <a
                            :href="`${storageUrl + '/' + item.lampiran}`"
                            :download="item.file_name"
                          >
                            {{ index + 1 }}. {{ item.file_name }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>
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

import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { computed, onMounted, onUpdated, ref } from 'vue'
import moment from 'moment'

import {
  ArrowPathIcon,
  EyeIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'

import { useAgendaStore } from '@/stores/agenda'

const agendaStore = useAgendaStore()

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
