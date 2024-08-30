<template>
  <div>
    <div
      class="sm:mx-auto sm:w-full lg:w-1/3 md:w-1/2 overflow-y-auto space-y-3 p-5 border-8 rounded-3xl bg-white shadow-2xl z-10"
    >
      <div class="flex items-center">
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">
          Serah Terima Peminjaman BMN
        </h2>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Data BMN</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200"></div>
        <div
          v-if="peminjamanBmnStore.singleResponses"
          class="p-4 flex flex-col space-y-2"
        >
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nomor Tiket</label
            >
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.tiket"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Status</label
            >
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.status"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tanggal Pengajuan</label
            >
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.created_at"
              type="text"
              id="nama"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tanggal Pengembalian</label
            >
            <input
              v-model="peminjamanBmnStore.singleResponses.tanggal_kembali"
              type="text"
              id="unit"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>
          <div>
            <label
              for="nip"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >NIP</label
            >
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
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nama Penerima Layanan</label
            >
            <input
              readonly
              v-model="peminjamanBmnStore.singleResponses.nama"
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
              v-model="peminjamanBmnStore.singleResponses.unit"
              type="text"
              id="unit"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>
          <div class="text-left">
            <label
              for="no_wa"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nomor WhatsApp*</label
            >
            <input
              placeholder="menggunakan format (0821111xxxx)"
              v-model="peminjamanBmnStore.singleResponses.no_wa"
              type="text"
              id="no_wa"
              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              readonly
            />
          </div>

          <div
            class="my-8 bg-white rounded-lg overflow-hidden border border-gray-400"
          >
            <div class="px-4 py-2 border-b border-gray-200">
              <h2 class="font-semibold text-gray-800">Daftar BMN</h2>
            </div>
            <div class="flex flex-col divide-y divide-gray-200">
              <div
                v-for="(item, index) in peminjamanBmnStore.singleResponses
                  ?.detail"
                class="flex items-center py-4 px-6"
                :key="index"
              >
                <img
                  class="w-24 h-24 object-cover rounded"
                  :src="showImage(item.bmn?.image)"
                  alt="Product Image"
                />
                <div class="ml-5">
                  <h3 class="text-gray-900 font-semibold">
                    {{ item.bmn?.nama }}
                  </h3>
                  <div class="flex text-gray-500 w-full">
                    <p w-full>{{ item.bmn?.keterangan }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="py-2 border-b border-gray-200">
            <h2 class="font-semibold text-gray-800">Tanda Terima</h2>
          </div>
          <form
            v-if="peminjamanBmnStore.singleResponses.status == 'APPROVE'"
            @submit.prevent="submit()"
          >
            <button
              @click.prevent="$refs.ttdCanvas.reset()"
              type="button"
              class="w-fit text-xstext-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Reset
            </button>

            <div class="border-2 rounded-xl p-2">
              <vue-drawing-canvas
                ref="ttdCanvas"
                :width="410"
                :height="300"
                :lineWidth="2"
                backgroundColor="#FFFFFF"
                saveAs="png"
              />
            </div>

            <div class="my-2">
              <label
                for="nama"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama</label
              >
              <input
                v-model="peminjamanBmnStore.doneForm.name"
                type="text"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              class="w-fit focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Terima
            </button>
          </form>

          <div class="flex flex-col space-y-4" v-else>
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Penerima</label
              >

              <input
                readonly
                :value="peminjamanBmnStore.singleResponses.penerima"
                type="text"
                id="nip"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi dengan nama penerima"
              />
            </div>
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tanggal Penerimaan</label
              >
              <input
                readonly
                :value="peminjamanBmnStore.singleResponses.tanggal_diterima"
                type="text"
                id="nip"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi dengan tanggal penerimaan"
              />
            </div>
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Penerima</label
              >
              <div class="border-2 rounded-xl p-2">
                <vue-drawing-canvas
                  :width="410"
                  :height="300"
                  :lineWidth="2"
                  :lock="true"
                  backgroundColor="#FFFFFF"
                  :initial-image="
                    JSON.parse(peminjamanBmnStore.singleResponses.ttd)
                  "
                  saveAs="png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PopRate :show="showPopRate" @close="showPopRate = !showPopRate" />
  </div>
</template>

<script setup>
import {
  ArrowLeftIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
  QrCodeIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
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
import VueDrawingCanvas from 'vue-drawing-canvas'
import PopRate from '@/components/PopRate.vue'

const ttdCanvas = ref(null)

const router = useRouter()
const route = useRoute()
const showPopRate = ref(false)

const peminjamanBmnStore = usePeminjamanBmn()

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + image
  return a
}

const tiket = computed(() => {
  return route.params.tiket ?? null
})

async function submit() {
  const id = toast.loading('Sedang memproses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  peminjamanBmnStore.$patch((state) => {
    state.doneForm.image = JSON.stringify(ttdCanvas.value.getAllStrokes())
  })

  const success = await peminjamanBmnStore.updateDone()
  if (success) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    showPopRate.value = true
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
  toast.done(id)
}

onMounted(async () => {
  await peminjamanBmnStore.show(tiket.value)
})
</script>
