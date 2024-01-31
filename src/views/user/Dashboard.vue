<template>
  <div
    class="max-w-md mx-auto px-6 py-8 md:max-w-lg h-screen"
    :style="{
      background: 'url(' + logo + ')',
      'background-size': 'cover',
    }"
  >
    <h2 class="font-semibold text-gray-800 text-2xl">Layanan Umum</h2>
    <div class="mt-6">
      <span class="font-semibold">Menu</span>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <router-link
          v-for="i in menu"
          :key="i"
          :to="{ name: i.to }"
          class="shadow-lg cursor-pointer h-24 justify-center flex border p-4 text-center bg-gray-500 rounded-md text-lg text-white"
        >
          <span class="my-auto">
            {{ i.label.toUpperCase() }}
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/logo_itjen.png'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
const permintaanPersediaanStore = usePermintaanPersediaanStore()

function getImageUrl() {
  return new URL(`./assets/logo_itjen.png`, import.meta.url).href
}

const menu = [
  { label: 'Daftar Permintaan', to: 'list-permintaan' },
  { label: 'Persediaan', to: 'permintaan-persediaan' },
  { label: 'BMN', to: 'service-bmn' },
  { label: 'Peminjaman Tempat', to: 'permintaan-persediaan' },
]
</script>
