<template>
  <div class="max-w-md mx-auto md:max-w-lg p-4">
    <div class="py-4 flex flex-row items-center justify-between">
      <button
        @click="toDashboard()"
        class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ArrowLeftIcon class="h-5" />
      </button>
      <h5 class="items-center font-semibold uppercase py-2">Daftar BMN</h5>
      <button
        @click="toCart()"
        class="bg-transparent relative hover:-translate-y-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ShoppingBagIcon class="h-8" />
        <span class="sr-only">Notifications</span>
        <div
          v-if="peminjamanBmn.form.detail.length > 0"
          class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900"
        >
          {{ peminjamanBmn.form.detail.length }}
        </div>
      </button>
    </div>
    <div class="flex items-center w-full my-4" autocomplete="off">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          placeholder="Cari data persediaan"
        />
      </div>
    </div>

    <template v-if="!bmnStore.isLoading">
      <template v-if="bmnStore.items.length > 0">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="item in bmnStore.items"
            :key="item.id"
            @click="addItem(item)"
            class="p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="mb-4">
              <img
                class="w-full h-36 object-cover rounded"
                :src="showImage(item)"
                alt="Product Image"
              />
              <a>
                <h5
                  class="text-xl font-semibold mt-2 tracking-tight text-gray-900 dark:text-white"
                >
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
            <li
              @click="choosePage(num)"
              v-for="num in displayedPages"
              :key="num"
            >
              <a
                :class="
                  num == bmnStore.currentPage
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500'
                "
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
  </div>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ShoppingBagIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePeminjamanBmn } from '@/stores/peminjamanBmn'
import { useBmnStore } from '@/stores/bmn'
const peminjamanBmn = usePeminjamanBmn()

import { storageUrl } from '@/services/helper'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const bmnStore = useBmnStore()
const showModal = ref(false)
const qty = ref(1)
const itemShow = ref({})
const router = useRouter()

function toCart() {
  router.push({ name: 'cart-permintaan-bmn-dua' })
}

function toDashboard() {
  router.push({ name: 'user-dashboard' })
}

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + item.image
  return a
}

function addItem(item) {
  peminjamanBmn.addCart(item)
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
  bmnStore.getDataUser()
}, 500)

const displayedPages = computed(() => {
  const pages = []
  const { currentPage, lastPage } = bmnStore

  if (lastPage <= 5) {
    // If total pages are less or equal to 5, display all pages
    for (let i = 1; i <= lastPage; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 2) {
      pages.push(1, 2, '...', lastPage - 1, lastPage)
    } else if (currentPage >= lastPage - 1) {
      pages.push(1, 2, '...', lastPage - 1, lastPage)
    } else {
      pages.push(1, 2, '...', currentPage, '...', lastPage - 1, lastPage)
    }
  }

  return pages
})

onMounted(() => {
  bmnStore.getDataUser()
})
</script>
