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
            <div class="relative p-4 bg-white w-2/4 rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <!-- Modal header -->
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Detail Data</h3>
                <button
                  @click="close"
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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

              <form class="text-left" @submit.prevent="submit()">
                <div v-if="bmnStore.validNup" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span class="font-medium">Alert!</span> Nomor Urut Pendaftaran sudah ada.
                </div>
                <div class="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Urut Pendaftaran*</label>
                    <input
                      :readonly="!isEdit"
                      @keyup="search"
                      required
                      v-model="bmnStore.singleResponses.nup"
                      placeholder="Isi dengan nomor urut pendaftaran"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama*</label>
                    <input
                      :readonly="!isEdit"
                      required
                      v-model="bmnStore.singleResponses.nama"
                      placeholder="isi dengan nama barang"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun Perolehan*</label>
                    <select
                      :readonly="!isEdit"
                      v-model="bmnStore.singleResponses.tahun_perolehan"
                      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option :value="tahun" v-for="(tahun, index) in mainStore.tahunOptions" :key="index">
                        {{ tahun }}
                      </option>
                    </select>
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ruangan</label>
                    <input
                      :readonly="!isEdit"
                      v-model="bmnStore.singleResponses.ruangan"
                      required
                      placeholder="isi dengan nama bmn disimpan"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penanggung Jawab</label>
                    <input
                      :readonly="!isEdit"
                      v-model="bmnStore.singleResponses.penanggung_jawab"
                      required
                      placeholder="isi dengan penanggung jawab"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>

                  <div class="text-left">
                    <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keterangan</label>
                    <textarea
                      :readonly="!isEdit"
                      v-model="bmnStore.singleResponses.keterangan"
                      rows="2"
                      placeholder="Keterangan BMN"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    ></textarea>
                  </div>

                  <div v-if="bmnStore.singleResponses.image">
                    <div class="flex justify-between items-center">
                      <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                      <button
                        v-if="isEdit"
                        @click="deleteImage()"
                        type="button"
                        class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <TrashIcon class="h-6 w-6" />
                      </button>
                    </div>
                    <div class="border p-4 rounded-lg">
                      <img class="w-48 h-fit mx-auto" :src="showImage" />
                    </div>
                  </div>

                  <div v-else>
                    <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                      <FilePond v-if="isEdit" :allow-mutiple="false" @fileChange="fileChange" />
                      <div v-else>
                        <div class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                          <span class="font-medium">Tidak ada gambar!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    v-if="!isEdit"
                    type="button"
                    @click="isEdit = true"
                    :class="bmnStore.validNup ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'"
                    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Edit
                  </button>
                  <button
                    v-else
                    :disabled="bmnStore.validNup"
                    type="submit"
                    :class="bmnStore.validNup ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'"
                    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <span v-if="bmnStore.isUpdateLoading">
                      <ArrowPathIcon class="h-5 w-5 animate-spin" />
                    </span>
                    <span v-else> Submit </span>
                  </button>

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="close"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'

import { ArrowPathIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useBmnStore } from '@/stores/bmn'
import { useMainStore } from '@/stores/main'
import { useDebounceFn } from '@vueuse/core'
import { storageUrl } from '@/services/helper'

const bmnStore = useBmnStore()
const mainStore = useMainStore()
const isEdit = ref(false)

const emit = defineEmits(['close', 'submit', 'fileChange'])
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

const search = useDebounceFn(() => {
  bmnStore.cekNup()
}, 500)

function fileChange(event) {
  emit('fileChange', event)
}

function deleteImage() {
  bmnStore.$patch((state) => {
    state.singleResponses.image = null
  })
}

function close() {
  emit('close')
  isEdit.value = false
}

function submit() {
  emit('submit')
  isEdit.value = false
}

const showImage = computed(() => {
  if (bmnStore.singleResponses.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + bmnStore.singleResponses.image
  return a
})
</script>
