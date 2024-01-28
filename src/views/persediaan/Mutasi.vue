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
              class="relative p-4 bg-white max-w-4xl rounded-lg shadow dark:bg-gray-800 sm:p-5"
            >
              <!-- Modal header -->
              <div
                class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Mutasi Produk
                </h3>
                <button
                  @click="emit('close')"
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
              <div class="flex flex-col space-y-4">
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div class="text-left">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Nama Produk</label
                    >
                    <input
                      readonly
                      :value="mutasiPersediaanStore.item.nama"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label
                      for="brand"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Saldo Akhir</label
                    >
                    <input
                      readonly
                      :value="mutasiPersediaanStore.item.saldo"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <div
                    class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
                  >
                    <table
                      class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
                      >
                        <tr>
                          <th scope="col" class="px-4 py-3">#</th>
                          <th scope="col" class="px-4 py-3">Tanggal</th>
                          <th scope="col" class="px-4 py-3">Keterangan</th>
                          <th scope="col" class="px-4 py-3">Debit</th>
                          <th scope="col" class="px-4 py-3">Kredit</th>
                          <th scope="col" class="px-4 py-3">Saldo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-if="mutasiPersediaanStore.isLoading">
                          <td colspan="6" class="text-center">
                            <span class=""
                              ><ArrowPathIcon
                                class="w-6 h-6 animate-spin mx-auto"
                            /></span>
                          </td>
                        </tr>
                        <tr
                          v-else-if="
                            !mutasiPersediaanStore.isLoading &&
                            mutasiPersediaanStore.items.length < 1
                          "
                        >
                          <td colspan="5" class="text-center">No Data</td>
                        </tr>
                        <tr
                          v-else
                          v-for="(item, index) in mutasiPersediaanStore.items"
                          :key="index"
                          class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-100 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
                        >
                          <!-- <td class="px-4 py-1 text-center">{{ mutasiPersediaanStore.from + index }}</td> -->
                          <td class="px-4 py-1">
                            {{ mutasiPersediaanStore.from + index }}
                          </td>

                          <td class="px-4 py-1">
                            {{ item.created_at }}
                          </td>
                          <td class="px-4 py-1">
                            {{ item.keterangan }}
                          </td>
                          <td class="px-4 py-1">{{ item.debit ?? '-' }}</td>
                          <td class="px-4 py-1">{{ item.kredit ?? '-' }}</td>
                          <td class="px-4 py-1">{{ item.saldo ?? '-' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
import { onMounted, onUpdated, ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { useMutasiPersediaanStore } from '@/stores/mutasiPersediaan'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmation ?',
  },
})

const mutasiPersediaanStore = useMutasiPersediaanStore()

onUpdated(() => {
  if (props.show == true) {
    mutasiPersediaanStore.getData(mutasiPersediaanStore.showId)
  }
})
</script>
