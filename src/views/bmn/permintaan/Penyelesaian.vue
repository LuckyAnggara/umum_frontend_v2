<template>
  <section v-if="permintaanLayananBmnStore.singleResponses == null">
    <span class="flex"
      ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
    /></span>
  </section>
  <section v-else>
    <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
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
          Nomor Tiket : {{ permintaanLayananBmnStore.singleResponses.tiket }}
        </h2>
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

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Tanda Terima</h2>
        </div>
        <div class="flex flex-col p-6">
          <form
            v-if="permintaanLayananBmnStore.singleResponses.status == 'ORDER'"
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
                v-model="permintaanLayananBmnStore.doneForm.name"
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
                :value="permintaanLayananBmnStore.singleResponses.penerima"
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
                :value="
                  permintaanLayananBmnStore.singleResponses.tanggal_diterima
                "
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
                    JSON.parse(permintaanLayananBmnStore.singleResponses.ttd)
                  "
                  saveAs="png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { usePermintaanLayananBmn } from '@/stores/permintaanLayananBmn'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, onMounted, ref } from 'vue'
import VueDrawingCanvas from 'vue-drawing-canvas'

const permintaanLayananBmnStore = usePermintaanLayananBmn()
const route = useRoute()

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
  permintaanLayananBmnStore.$patch((state) => {
    state.doneForm.image = JSON.stringify(ttdCanvas.value.getAllStrokes())
  })

  const success = await permintaanLayananBmnStore.updateDone()
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

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + image
  return a
}

onMounted(async () => {
  await permintaanLayananBmnStore.show(tiket.value)
})
</script>
