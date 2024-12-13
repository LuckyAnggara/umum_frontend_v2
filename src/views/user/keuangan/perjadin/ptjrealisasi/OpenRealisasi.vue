<template>
  <div class="p-4 min-h-screen h-auto pt-20 bg-gray-200 w-screen">
    <template v-if="codeToken.master == null">
      <div class="w-full items-center justify-center flex min-h-lvh flex-col space-y-4">
        <svg class="w-12 h-12 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-900"
          ></path>
        </svg>
        <span class="text-gray-500">Getting Data ...</span>
      </div>
    </template>
    <template v-else-if="codeToken.master == false">
      <div class="w-full items-center justify-center flex flex-col space-y-4">
        <h5 class="text-5xl font-bold">Link Expire</h5>
      </div>
    </template>
    <template v-else>
      <div class="mx-auto">
        <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">No</th>
                <th scope="col" class="px-4 py-3">Nama Pegawai</th>
              </tr>
            </thead>
            <tbody>
              <tr
                @click="onRealisasi(item)"
                v-for="(item, index) in codeToken.master.detail"
                :key="index"
                class="cursor-pointer odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <td class="px-4 py-1 w-1/12">
                  <span>{{ ++index }}</span>
                </td>
                <td class="px-4 py-1 flex flex-col w-11/12">
                  <span>{{ item.nama }}</span>
                  <span>NIP {{ item.nip }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted, computed } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { useRoute, useRouter } from 'vue-router'
import { useCodeToken } from '@/stores/codeToken'

const router = useRouter()

const route = useRoute()
const perjadinStore = usePerjadinStore()
const codeToken = useCodeToken()

async function onRealisasi(item) {
  router.push({ name: 'perjadin-sppd-input-realisasi', params: { id: item.id } })
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(() => {
  codeToken.showMaster(id.value)
})
</script>
