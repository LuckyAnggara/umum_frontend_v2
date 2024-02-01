<template>
  <div class="max-w-md mx-auto md:max-w-lg p-4">
    <div class="py-4 flex flex-row items-center">
      <button
        @click="toDashboard()"
        class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ArrowLeftIcon class="h-5" />
      </button>
      <h5 class="ml-4 items-center font-semibold uppercase py-2">
        Daftar Permintaan
      </h5>
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
          v-model="userStore.searchTerm"
          type="text"
          id="simple-search"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="cari berdasarkan tiket"
        />
      </div>
    </div>

    <template v-if="userStore.items.length > 0">
      <ul class="my-4 space-y-3">
        <li v-for="item in userStore.items">
          <a
            @click="toDetail(item)"
            class="cursor-pointer flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-200 hover:bg-gray-300 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <div class="flex-1 flex flex-col">
              <span class="whitespace-nowrap">#{{ item.tiket }}</span>
              <span class="text-xs font-normal">{{ item.created_at }}</span>
            </div>
            <span
              v-if="item.tipe == 'BMN'"
              class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >{{ item.tipe }}</span
            >
            <span
              v-else
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >{{ item.tipe }}</span
            >
            <ArrowPathIcon v-if="!item.status" class="h-5 w-5 animate-spin" />
            <span
              v-else
              class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
            >
              {{ item.status }}
            </span>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="w-full h-96 flex flex-col text-center text-gray-700">
        <span class="mx-auto"> Tidak ada data... </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()

const router = useRouter()

function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function toDetail(item) {
  if (item.tipe == 'PERSEDIAAN') {
    router.push({
      name: 'output-permintaan-user',
      params: { tiket: item.tiket },
    })
  } else if (item.tipe == 'BMN') {
    router.push({
      name: 'output-permintaan-layanan-bmn',
      params: { tiket: item.tiket },
    })
  }
}

onMounted(() => {
  userStore.getStatus()
})
</script>
