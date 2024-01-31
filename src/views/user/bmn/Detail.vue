<template>
  <section v-if="permintaanLayananBmnStore.singleResponses == null">
    <span class="flex"
      ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
    /></span>
  </section>
  <section v-else>
    <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
      <div class="flex items-center">
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">
          Nomor Tiket : {{ permintaanLayananBmnStore.singleResponses.tiket }}
        </h2>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200 flex flex-row">
          <h2 class="font-semibold text-gray-800">Status</h2>
          <span
            v-if="permintaanLayananBmnStore.singleResponses.status == 'ORDER'"
            class="ml-4 bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >{{ permintaanLayananBmnStore.singleResponses.status }}</span
          >
          <span
            v-else-if="
              permintaanLayananBmnStore.singleResponses.status == 'DONE'
            "
            class="ml-4 bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
            >{{ permintaanLayananBmnStore.singleResponses.status }}</span
          >
          <span
            v-else-if="
              permintaanLayananBmnStore.singleResponses.status == 'PROCESS'
            "
            class="ml-4 bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300"
            >{{ permintaanLayananBmnStore.singleResponses.status }}</span
          >
          <span
            v-else
            class="bg-red-100 ml-4 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
            >REJECTED</span
          >
        </div>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Data BMN</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div
            v-if="permintaanLayananBmnStore.singleResponses"
            class="p-4 flex flex-col space-y-2"
          >
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Gambar</label
              >
              <div class="flex justify-center">
                <img
                  class="w-60 h-fit object-cover rounded"
                  :src="
                    showImage(
                      permintaanLayananBmnStore.singleResponses.bmn.image
                    )
                  "
                  alt="Product Image"
                />
              </div>
            </div>

            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NUP</label
              >
              <input
                readonly
                v-model="permintaanLayananBmnStore.singleResponses.bmn.nup"
                type="text"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama BMN</label
              >
              <input
                readonly
                v-model="permintaanLayananBmnStore.singleResponses.bmn.nama"
                type="text"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Data Penerima Layanan</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="p-4 flex flex-col space-y-2">
            <div class="text-left">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Jenis Layanan</label
              >
              <input
                readonly
                v-model="
                  permintaanLayananBmnStore.singleResponses.jenis_layanan
                "
                type="text"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div v-if="permintaanLayananBmnStore.singleResponses.nip">
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NIP</label
              >
              <input
                v-model="permintaanLayananBmnStore.singleResponses.nip"
                type="text"
                id="nip"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
            </div>
            <div>
              <label
                for="nama"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama Penerima Layanan</label
              >
              <input
                required
                v-model="permintaanLayananBmnStore.singleResponses.nama_peminta"
                type="text"
                id="nama"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="unit"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Unit</label
              >
              <input
                v-model="permintaanLayananBmnStore.singleResponses.unit"
                type="text"
                id="unit"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div class="text-left">
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Catatan</label
              >
              <textarea
                readonly
                v-model="permintaanLayananBmnStore.singleResponses.catatan"
                rows="3"
                placeholder="Isi dengan catatan yang perlu admin ketahui"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { usePermintaanLayananBmn } from '@/stores/permintaanLayananBmn'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { computed, onMounted, ref } from 'vue'

const permintaanLayananBmnStore = usePermintaanLayananBmn()
const showModal = ref(false)

const route = useRoute()
const router = useRouter()

function confirm() {
  showModal.value = true
}

const id = computed(() => {
  return route.params.id ?? null
})

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'public/' + image
  return a
}

onMounted(async () => {
  await permintaanLayananBmnStore.show(id.value)
})
</script>
