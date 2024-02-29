<template>
  <div>
    <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
      <div class="flex items-center">
        <button @click="toDashboard()" class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center">
          <ArrowLeftIcon class="h-5" />
        </button>
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">Peminjaman BMN</h2>
      </div>

      <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Data BMN</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200"></div>
        <div v-if="peminjamanBmnStore.singleResponses" class="p-4 flex flex-col space-y-2">
          <div>
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Tiket</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.tiket"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.status"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Pengajuan</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.created_at"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
            <div class="flex justify-center">
              <img class="w-60 h-fit object-cover rounded" :src="showImage(peminjamanBmnStore.singleResponses.bmn.image)" alt="Product Image" />
            </div>
          </div>

          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NUP</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.bmn.nup"
              type="text"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama BMN</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.bmn.nama"
              type="text"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Layanan</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.jenis_layanan"
              type="text"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Pengembalian</label>
            <input
              v-model="peminjamanBmnStore.singleResponses.tanggal_pengembalian"
              type="text"
              id="unit"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>
          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
            <div class="relative">
              <input
                readonly
                v-model="peminjamanBmnStore.singleResponses.nip"
                type="text"
                id="nip"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
            </div>
          </div>
          <div>
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Penerima Layanan</label>
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.nama_peminta"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
            <input
              v-model="peminjamanBmnStore.singleResponses.unit"
              type="text"
              id="unit"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>
          <div class="text-left">
            <label for="no_wa" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor WhatsApp*</label>
            <input
              placeholder="menggunakan format (0821111xxxx)"
              v-model="peminjamanBmnStore.singleResponses.no_wa"
              type="text"
              id="no_wa"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>
          <div class="text-left">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
            <textarea
              readonly
              v-model="peminjamanBmnStore.singleResponses.catatan"
              rows="3"
              placeholder="Isi dengan catatan yang perlu admin ketahui"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowPathIcon, MagnifyingGlassIcon, QrCodeIcon, TrashIcon } from '@heroicons/vue/24/outline'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { useBmnStore } from '@/stores/bmn'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, onMounted, ref, watch } from 'vue'
import { usePeminjamanBmn } from '@/stores/peminjamanBmn'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

const peminjamanBmnStore = usePeminjamanBmn()

const showModal = ref(false)
const cariPegawaiLoading = ref(false)

function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + image
  return a
}

const tiket = computed(() => {
  return route.params.tiket ?? null
})

onMounted(async () => {
  await peminjamanBmnStore.show(tiket.value)
})
</script>
