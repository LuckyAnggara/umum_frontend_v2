<template>
  <div>
    <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
      <div class="flex items-center">
        <button
          @click="toDashboard()"
          class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
        >
          <ArrowLeftIcon class="h-5" />
        </button>
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">
          Permintaan Pelayanan BMN
        </h2>
      </div>
      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Cari BMN</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200 p-4">
          <div
            class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span class="font-medium">Info!</span> scan barcode nup untuk
            mempermudah pencarian
          </div>

          <div>
            <label class="inline-flex items-center cursor-pointer my-2">
              <input
                type="checkbox"
                v-model="cariByNama"
                class="sr-only peer"
              />
              <div
                class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                >Cari dari Nama</span
              >
            </label>
            <template v-if="cariByNama">
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama</label
              >
              <div class="relative">
                <input
                  v-model="bmnStore.filter.searchQuery"
                  @keyup="searchNama"
                  type="text"
                  id="nip"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari berdasarkan Nama BMN"
                />
                <button
                  type="button"
                  class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <MagnifyingGlassIcon
                    v-if="!bmnStore.isLoading"
                    class="w-5 h-5"
                  />
                  <ArrowPathIcon v-else class="w-5 h-5 animate-spin" />
                </button>
              </div>
            </template>
            <template v-else>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NUP</label
              >
              <div class="relative">
                <input
                  v-model="bmnStore.nup"
                  @keyup="search"
                  type="text"
                  id="nip"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi dengan nomor NUP"
                />
                <button
                  @click="toQrCode"
                  type="button"
                  class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <QrCodeIcon class="w-5 h-5" />
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
      <template v-if="showItem">
        <form
          autocomplete="off"
          class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
          @submit.prevent="confirm()"
        >
          <div class="px-4 py-2 border-b border-gray-200">
            <h2 class="font-semibold text-gray-800">Data BMN</h2>
          </div>
          <div class="flex flex-col divide-y divide-gray-200"></div>
          <div
            v-if="bmnStore.singleResponsesPermintaan"
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
                  :src="showImage(bmnStore.singleResponsesPermintaan.image)"
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
                v-model="bmnStore.singleResponsesPermintaan.nup"
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
                v-model="bmnStore.singleResponsesPermintaan.nama"
                type="text"
                class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div class="flex flex-col divide-y divide-gray-200"></div>
            <div class="text-left">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Jenis Layanan</label
              >
              <select
                required
                v-model="layananBmnStore.form.jenis_layanan"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Perbaikan</option>
                <option>Pengembalian</option>
              </select>
            </div>
            <div>
              <label
                for="nip"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NIP</label
              >
              <div class="relative">
                <input
                  v-model="layananBmnStore.form.nip"
                  type="text"
                  id="nip"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="kosongkan jika tidak punya nip"
                />
                <button
                  @click="cariPegawai"
                  type="button"
                  class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    v-if="!cariPegawaiLoading"
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span v-else
                    ><ArrowPathIcon class="mx-auto w-4 h-4 animate-spin"
                  /></span>
                </button>
              </div>
            </div>
            <div>
              <label
                for="nama"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nama Penerima Layanan</label
              >
              <input
                required
                v-model="layananBmnStore.form.nama_peminta"
                type="text"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div>
              <label
                for="unit"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Unit</label
              >
              <input
                v-model="layananBmnStore.form.unit"
                type="text"
                id="unit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                v-model="layananBmnStore.form.no_wa"
                type="text"
                id="no_wa"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                v-model="layananBmnStore.form.catatan"
                rows="3"
                placeholder="Isi dengan catatan yang perlu admin ketahui"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              ></textarea>
            </div>
          </div>
          <div
            v-else
            class="p-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span class="font-medium">Info!</span> Tidak ada data, silahkan cari
            data pada kolom diatas.
          </div>
          <div
            v-if="bmnStore.isSearching"
            class="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span v-if="!bmnStore.isLoading">
              <span class="font-medium">Oopss!</span> BMN tidak ditemukan,
              periksa kembali NUP dengan baik
            </span>
            <span class="flex" v-else
              ><ArrowPathIcon class="mx-auto w-5 h-5 animate-spin"
            /></span>
          </div>

          <div
            v-if="bmnStore.singleResponsesPermintaan"
            class="flex items-center justify-between p-3 bg-gray-100"
          >
            <h3 class="text-gray-900 font-semibold"></h3>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Confirm
            </button>
          </div>
        </form>
      </template>
      <template v-else>
        <div class="mt-4 bg-white rounded-lg overflow-hidden">
          <div class="grid grid-cols-2 gap-4">
            <div
              @click="click(item)"
              v-for="item in bmnStore.items"
              :key="item.id"
              class="p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <div class="mb-4">
                <img
                  class="w-full h-36 object-cover rounded"
                  :src="showImage(item.image)"
                  alt="Product Image"
                />
                <a>
                  <h5
                    class="text-md font-semibold mt-2 tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ item.nama }}
                  </h5>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
      <div>
        <TransitionRoot appear :show="showModal" as="template">
          <Dialog
            as="div"
            @close="showModal = !showModal"
            class="relative z-50"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-gray-900"
                    >
                      Proses Permintaan
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Permintaan layanan akan di proses ke Admin pada Bagian
                        Umum Inspektorat Jenderal
                      </p>
                    </div>

                    <div class="mt-4 flex space-x-4">
                      <button
                        :disabled="layananBmnStore.isStoreLoading"
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="submit"
                      >
                        <span v-if="!layananBmnStore.isStoreLoading">
                          Proses
                        </span>
                        <span class="flex" v-else
                          ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
                        /></span>
                      </button>

                      <button
                        :disabled="layananBmnStore.isStoreLoading"
                        type="button"
                        class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        @click="showModal = !showModal"
                      >
                        Batal!
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>
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
  MagnifyingGlassIcon,
  QrCodeIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import { useDebounceFn, useStorage } from '@vueuse/core'
import { useBmnStore } from '@/stores/bmn'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, onMounted, ref, watch } from 'vue'
import { usePermintaanLayananBmn } from '@/stores/permintaanLayananBmn'
import { useUserStore } from '@/stores/user'
const bmnStore = useBmnStore()
const userStore = useUserStore()

const router = useRouter()

const layananBmnStore = usePermintaanLayananBmn()
const showModal = ref(false)
const cariPegawaiLoading = ref(false)

const cariByNama = ref(false)
const showItem = ref(true)

function confirm() {
  showModal.value = true
}

async function submit() {
  const id = toast.loading('Permintaan sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await layananBmnStore.store(
    bmnStore.singleResponsesPermintaan.nup
  )
  if (success.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    showModal.value = !showModal.value
    userStore.updateBmn(success.data)
    router.push({
      name: 'output-permintaan-layanan-bmn',
      params: { tiket: success.data.tiket },
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

async function cariPegawai() {
  cariPegawaiLoading.value = true
  const id = toast.loading('Cari data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  try {
    const response = await fetch(
      `https://lapkin.bbmakmur.com/api/employee-show/${layananBmnStore.form.nip}`
    )
      .then((response) => {
        response.json().then((data) => {
          if (data.success == true) {
            toast.update(id, {
              render: 'Berhasil',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'success',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
            layananBmnStore.setDataPegawai(data.data)
          } else {
            toast.update(id, {
              render: 'tidak dapat ditemukan',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
          }
        })
      })
      .catch((err) => {
        console.error(err)
        toast.update(id, {
          render: 'terjadi kesalahan',
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          autoClose: 1000,
          closeOnClick: true,
          closeButton: true,
          isLoading: false,
        })
      })
  } catch (error) {
    console.error(error)
  } finally {
    cariPegawaiLoading.value = false
  }
}

function toQrCode() {
  router.push({ name: 'cari-bmn' })
}

function toDashboard() {
  router.push({ name: 'user-dashboard' })
}

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + image
  return a
}

const search = useDebounceFn(() => {
  bmnStore.showNup(bmnStore.nup)
}, 1000)

const searchNama = useDebounceFn(() => {
  bmnStore.getData(bmnStore.nup)
}, 1000)

watch(cariByNama, (value) => {
  if (value == true) {
    showItem.value = false
  }
})

function click(item) {
  bmnStore.setCurrentDataBmn(item)
  showItem.value = true
}
</script>
