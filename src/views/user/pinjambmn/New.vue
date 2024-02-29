<template>
  <div class="max-w-md mx-auto md:max-w-lg p-4">
    <div class="flex items-center">
      <button @click="toDashboard()" class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center">
        <ArrowLeftIcon class="h-5" />
      </button>
      <h2 class="ml-2 font-semibold text-gray-800 text-xl">Peminjaman BMN</h2>
    </div>
    <div class="flex items-center w-full my-4" autocomplete="off">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          @keyup="search"
          v-model="bmnStore.filter.searchQuery"
          type="text"
          id="simple-search"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Cari data BMN"
        />
      </div>
    </div>

    <template v-if="!bmnStore.isLoading">
      <template v-if="bmnStore.items.length > 0">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="item in bmnStore.items"
            :key="item.id"
            @click="pilihItem(item)"
            class="p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="mb-4">
              <img class="w-full h-36 object-cover rounded" :src="showImage(item)" alt="Product Image" />
              <a>
                <h5 class="text-xl font-semibold mt-2 tracking-tight text-gray-900 dark:text-white">
                  {{ item.nama }}
                </h5>
              </a>
            </div>
          </div>
        </div>
        <nav class="justify-end items-end flex mt-4">
          <ul class="inline-flex -space-x-px text-sm">
            <li @click="previousPage()">
              <a
                class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Previous</a
              >
            </li>
            <li @click="choosePage(num)" v-for="num in bmnStore.lastPage" :key="num">
              <a
                :class="num == bmnStore.currentPage ? 'text-blue-600 bg-blue-50' : 'text-gray-500'"
                class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{{ num }}</a
              >
            </li>
            <li @click="nextPage()">
              <a
                class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </template>
      <template v-else>
        <div class="w-full h-96 flex flex-col text-center text-gray-700">
          <span class="mx-auto"> Tidak ada data... </span>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="w-full h-96 flex flex-col text-center text-gray-700">
        <ArrowPathIcon class="animate-spin h-6 w-6 mx-auto" />
        <span class="mx-auto"> Fetching data... </span>
      </div>
    </template>

    <div>
      <TransitionRoot appear :show="showModal" as="template">
        <Dialog as="div" @close="showModal = !showModal" class="relative z-50">
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
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-2">
                    {{ itemShow.nama }}
                  </DialogTitle>

                  <div class="flex items-center border-gray-100 mt-4">
                    <span class="my-2 text-sm mr-2">Jumlah</span>
                    <span class="cursor-pointer rounded-l bg-red-100 py-1 px-3.5 duration-100 hover:bg-red-500 hover:text-red-50" @click="qty--"> - </span>
                    <input class="h-8 w-16 border bg-white text-center text-xs outline-none" type="number" v-model="qty" min="1" />
                    <span class="cursor-pointer rounded-r bg-blue-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" @click="qty++"> + </span>
                  </div>
                  <button
                    type="button"
                    class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="addItem"
                  >
                    Tambah
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ArrowLeftIcon, ArrowPathIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'

import { storageUrl } from '@/services/helper'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBmnStore } from '@/stores/bmn'
import { usePeminjamanBmn } from '@/stores/peminjamanBmn'
import { useUserStore } from '@/stores/user'

const bmnStore = useBmnStore()
const peminjamanBmnStore = usePeminjamanBmn()
const userStore = useUserStore()
const showModal = ref(false)
const qty = ref(1)
const itemShow = ref({})
const router = useRouter()

function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + item.image
  return a
}

function pilihItem(item) {
  bmnStore.setCurrentDataBmn(item)
  bmnStore.filter.searchQuery = null
  router.push({ name: 'detail-peminjaman-bmn' })
}

function choosePage(num) {
  bmnStore.$patch((state) => {
    state.filter.page = num
  })
  bmnStore.getDataUser()
}

function nextPage() {
  if (bmnStore.filter.page == bmnStore.lastPage) {
    return
  }

  bmnStore.$patch((state) => {
    state.filter.page = bmnStore.currentPage + 1
  })
  bmnStore.getDataUser()
}

function previousPage() {
  if (bmnStore.filter.page < 2) {
    return
  }
  bmnStore.$patch((state) => {
    state.filter.page = bmnStore.currentPage - 1
  })
  bmnStore.getDataUser()
}

const search = useDebounceFn(() => {
  bmnStore.getData()
}, 500)

onMounted(() => {
  bmnStore.$patch((state) => {
    state.filter.sewa = true
  })
})
</script>
