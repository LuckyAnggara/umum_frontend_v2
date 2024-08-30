<template>
  <section v-if="permintaanPersediaanStore.singleResponses == null">
    <span class="flex"
      ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
    /></span>
  </section>
  <section v-else>
    <div
      class="sm:mx-auto sm:w-full lg:w-1/3 md:w-1/2 overflow-y-auto space-y-3 p-5 border-8 rounded-3xl bg-white shadow-2xl z-10"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center my-1">
          <span class="mr-2 rounded-full bg-white">
            <img src="@/assets/logo_itjen.png" class="h-12 w-fit" />
          </span>
          <h2 class="font-medium flex flex-col text-sm">
            <span>Inspektorat Jenderal</span>
            <span>Kementerian Hukum dan Hak Asasi Manusia</span>
          </h2>
        </div>
      </div>

      <div class="flex items-center mt-4">
        <h2 class="ml-2 font-semibold text-gray-800 text-md">
          Nomor Tiket : {{ permintaanPersediaanStore.singleResponses.tiket }}
        </h2>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Data Pemohon</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="p-4 flex flex-col space-y-2">
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tanggal Pengiriman</label
              >

              <input
                readonly
                :value="moment().format('DD MMMM YYYY')"
                @keyup="search"
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
            </div>

            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NIP</label
              >

              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.nip"
                @keyup="search"
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
            </div>
            <div>
              <label
                for="nama"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama</label
              >
              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.nama"
                type="text"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="unit"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Unit</label
              >
              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.unit"
                type="text"
                id="unit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Detail</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div
            v-for="(item, index) in permintaanPersediaanStore.singleResponses
              ?.detail"
            class="flex items-center py-4 px-6"
            :key="item.id"
          >
            <img
              class="w-24 h-24 object-cover rounded"
              :src="showImage(item.persediaan)"
              alt="Product Image"
            />
            <div class="ml-5">
              <h3 class="text-gray-900 font-semibold">
                {{ item.persediaan.nama }}
              </h3>
              <div class="flex mt-4">
                <p>{{ item.jumlah }}</p>

                <p class="text-gray-700 ml-2">{{ item.persediaan.satuan }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Tanda Terima</h2>
        </div>
        <div class="flex flex-col p-6">
          <form
            v-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'"
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
                v-model="permintaanPersediaanStore.doneForm.name"
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
                :value="permintaanPersediaanStore.singleResponses.penerima"
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
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
                :value="
                  permintaanPersediaanStore.singleResponses.tanggal_diterima
                "
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
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
                    JSON.parse(permintaanPersediaanStore.singleResponses.ttd)
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
  </section>
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
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, onMounted, ref } from 'vue'
import VueDrawingCanvas from 'vue-drawing-canvas'
import moment from 'moment'
import PopRate from '@/components/PopRate.vue'

const permintaanPersediaanStore = usePermintaanPersediaanStore()
const showModal = ref(false)
const file = ref(null)
const showPopRate = ref(false)

const route = useRoute()
const router = useRouter()

const ttdCanvas = ref(null)

const tiket = computed(() => {
  return route.params.tiket ?? null
})

async function submit() {
  const id = toast.loading('Sedang memproses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  permintaanPersediaanStore.$patch((state) => {
    state.doneForm.image = JSON.stringify(ttdCanvas.value.getAllStrokes())
  })

  const success = await permintaanPersediaanStore.updateDone()
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

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + item.image
  return a
}

onMounted(async () => {
  await permintaanPersediaanStore.show(tiket.value)
})
</script>
