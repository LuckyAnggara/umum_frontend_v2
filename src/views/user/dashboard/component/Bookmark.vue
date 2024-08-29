<template>
  <div class="p-3 space-y-8 z-0 flex flex-col h-[100vh]">
    <div>
      <h4 class="font-semibold mt-2">Layanan yang diajukan</h4>

      <div class="container flex mx-auto w-full items-center justify-center">
        <ul class="flex flex-col p-4 w-full">
          <li
            class="border-gray-50 flex flex-row mb-2"
            v-for="data in userStore.mergedData"
          >
            <template v-if="data.tipe == 'PERSEDIAAN'">
              <div
                @click="toDetail(data)"
                class="shadow-md select-none cursor-pointer bg-gray-50 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
                >
                  <img :src="persediaanIcon" />
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium">Persediaan</div>
                  <div class="text-gray-600 text-sm">
                    No Tiket : {{ data.tiket }}
                  </div>
                </div>
                <div class="flex-1 text-gray-600 text-xs text-right mr-4">
                  <span>{{
                    $moment(data.created_at).format('DD MMMM YYYY')
                  }}</span>
                </div>
                <div
                  class="flex-1 text-gray-600 text-xs flex flex-col text-right"
                >
                  <span
                    class="text-center bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                    >{{ data.status }}</span
                  >
                </div>
              </div>
            </template>
            <template v-else-if="data.tipe == 'TEMPAT'">
              <div
                @click="toDetail(data)"
                class="shadow-md select-none cursor-pointer bg-gray-50 rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  class="flex flex-col rounded-md w-10 h-10 bg-gray-300 justify-center items-center mr-4"
                >
                  <img :src="ruanganIcon" />
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium">Ruangan</div>
                  <div class="text-gray-600 text-sm">{{ data.title }}</div>
                </div>
                <div
                  class="flex-1 text-gray-600 text-xs flex flex-col text-right mr-4"
                >
                  <span>{{ $moment(data.start).format('DD MMMM YYYY') }}</span
                  ><span
                    >{{ $moment(data.start).format('kk:mm') }} -
                    {{ $moment(data.end).format('kk:mm') }}</span
                  >
                </div>
                <div
                  class="text-gray-600 text-xs flex flex-col text-right flex-1"
                >
                  <span
                    class="text-center bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300"
                    >{{ data.status }}</span
                  >
                </div>
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import persediaanIcon from '@/assets/icon/persediaan.png'
import { inject } from 'vue'

import pimpinanIcon from '@/assets/icon/pimpinan2.png'
import keuanganIcon from '@/assets/icon/keuangan.png'
import bmnIcon from '@/assets/icon/bmn.png'
import ruanganIcon from '@/assets/icon/ruangan.png'
import adminIcon from '@/assets/icon/pimpinan1.png'

import { onUpdated } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const authStore = useAuthStore()
const router = useRouter()

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
  } else if (item.tipe == 'PEMINJAMAN BMN') {
    router.push({
      name: 'output-peminjaman-bmn',
      params: { tiket: item.tiket },
    })
  }
}
</script>
