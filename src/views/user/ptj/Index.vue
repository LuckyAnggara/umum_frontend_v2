<template>
  <div>
    <div class="max-w-xl mx-auto px-6 py-8 md:max-w-lg">
      <div class="flex items-center">
        <button
          @click="toDashboard()"
          class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
        >
          <ArrowLeftIcon class="h-5" />
        </button>
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">
          Pertanggung Jawaban
        </h2>
      </div>

      <div
        class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400"
      >
        <form @submit.prevent="submit()" class="p-4 flex flex-col space-y-2">
          <div class="py-2 border-b border-gray-200">
            <h2 class="font-semibold text-gray-800">Detail</h2>
          </div>
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nama Kegiatan / Pertanggung Jawaban*</label
            >
            <input
              type="text"
              id="nama"
              v-model="ptjStore.form.nama_kegiatan"
              placeholder="Isi dengan Nama Kegiatan"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Jumlah Penggunaan Anggaran*</label
            >
            <CurrencyInput
              :required="true"
              v-model="ptjStore.form.realisasi"
              :options="{ currency: 'IDR' }"
            />
          </div>
          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Tanggal</label
            >
            <VueDatePicker
              required
              v-model="ptjStore.form.tanggal"
              :format="'dd MMMM yyyy'"
              auto-apply
              date-picker
              locale="id"
            ></VueDatePicker>
          </div>

          <div class="py-2 border-b border-gray-200">
            <h2 class="font-semibold text-gray-800">Lampiran</h2>
          </div>
          <div>
            <label
              for="nama"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Isi lampiran dengan Nama Detail yang Jelas!
            </label>
            <small class="text-gray-600"
              >Contoh :
              <ul>
                <li>1. Notula</li>
                <li>2. Kwintansi</li>
                <li>3. Pesawat an XXXX</li>
              </ul>
            </small>

            <FilePond
              :label="'Drop lampiran disini ...'"
              :multiple="true"
              @fileChange="fileChange"
              class="mt-4"
              :type="'application/pdf'"
            />

            <small class="text-gray-600">
              Tipe yang di perbolehkan adalah PDF
            </small>
          </div>

          <div class="py-2 border-b border-gray-200">
            <h2 class="font-semibold text-gray-800">Data Diri</h2>
          </div>
          <div>
            <label
              for="nip"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >NIP</label
            >
            <div class="relative">
              <input
                v-model="ptjStore.form.nip"
                type="text"
                id="nip"
                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              >Nama*</label
            >
            <input
              v-model="ptjStore.form.nama"
              type="text"
              id="nama"
              placeholder="Nama pengguna fasilitas"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Unit*</label
            >
            <input
              v-model="ptjStore.form.unit"
              type="text"
              id="unit"
              placeholder="Unit pengguna fasilitas"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              for="unit"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Nomor WhatsApp*</label
            >
            <input
              v-model="ptjStore.form.no_wa"
              type="text"
              placeholder="menggunakan format (0821111xxxx)"
              id="unit"
              class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div class="flex items-center justify-between py-2 bg-gray-100">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import CurrencyInput from '@/components/CurrencyInput.vue'
import { usePtjStore } from '@/stores/ptj'

const cariPegawaiLoading = ref(false)
const ptjStore = usePtjStore()
const file = ref([])

const router = useRouter()
function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  console.info(b)
  file.value = b
}

async function submit() {
  const id = toast.loading('Pengajuan sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  try {
    const success = await ptjStore.store({ uploadFile: file.value })
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
  } catch (err) {
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
  } finally {
    toast.done(id)
  }
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
      `https://lapkin.bbmakmur.com/api/employee-show/${ptjStore.form.nip}`
    )
      .then((response) => {
        response
          .json()
          .then((data) => {
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
              // ptjStore.setDataPegawai(data.data)
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
          .catch((err) => {
            toast.update(id, {
              render: 'ada permasalahan',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
          })
          .finally(() => {
            toast.done(id)
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
</script>
