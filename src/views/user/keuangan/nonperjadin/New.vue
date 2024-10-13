<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <div
      class="justify-center items-center w-full md:inset-0 h-modal md:h-full b"
    >
      <div
        class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4 bg-white rounded-lg shadow"
      >
        <!-- Modal body -->
        <div>
          <div class="mb-4 flex flex-col space-y-3">
            <div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Tahun Anggaran</label
              >
              <select
                required
                v-model="nonPerjadinStore.form.tahun_anggaran"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option
                  v-for="(item, index) in mainStore.tahunOptions"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>

            <div class="text-left">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Tanggal Transaksi</label
              >
              <VueDatePicker
                v-model="nonPerjadinStore.form.tanggal_transaksi"
                required
                :format="'dd MMMM yyyy'"
                auto-apply
                date-picker
                locale="id"
              ></VueDatePicker>
            </div>

            <div>
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Uraian / Peruntukan</label
              >
              <textarea
                v-model="nonPerjadinStore.form.uraian"
                required
                id="message"
                rows="3"
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
            <div class="flex flex-row space-x-4 justify-end items-end">
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Mata Anggaran Kegiatan</label
                >
                <div>
                  <v-select
                    :loading="makStore.isLoading"
                    @open="onOpenSelect"
                    :filterable="false"
                    @search="searchMak"
                    :options="makStore.items"
                    v-model="nonPerjadinStore.form.mak"
                  >
                    <template #no-options> Tidak ada data .. </template>
                    <template #option="option">
                      <div class="d-center">
                        {{ option.kode_mak }} - {{ option.keterangan }}
                      </div>
                    </template>
                    <template #selected-option="option">
                      <div>{{ option.kode_mak }} - {{ option.keterangan }}</div>
                    </template>
                  </v-select>
                </div>
              </div>
              <button
                v-if="nonPerjadinStore.form.mak !== null"
                @click="makDetailDialog = true"
                type="button"
                class="place-self-end w-24 h-fit text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-300 dark:text-blue-300 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"
              >
                Detail
              </button>
            </div>

            <div class="flex flex-row space-x-4">
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Sisa Anggaran (IDR)</label
                >
                <input
                  readonly
                  :value="IDRCurrency.format(sisaAnggaran)"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div class="w-full">
                <label
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Jumlah Pembayaran (IDR)</label
                >
                <input
                  required
                  v-model="nonPerjadinStore.form.total_anggaran"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
            </div>
            <div
              v-if="nonPerjadinStore.form.total_anggaran > sisaAnggaran"
              class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Alert!</span> sisa anggaran tidak
                memenuhi pengajuan transaksi
              </div>
            </div>
            <div class="flex flex-row space-x-4">
              <div class="text-left w-full">
                <label
                  for="years"
                  class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                  >Bendahara Pengeluaran*</label
                >
                <v-select
                  :label="'nama'"
                  :options="mainStore.bendaharaOptions"
                  v-model="nonPerjadinStore.form.bendahara"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!nonPerjadinStore.form.bendahara"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template #no-options> Tidak ada data .. </template>
                  <template #option="option">
                    <div class="flex flex-col">
                      <span>{{ option.nama }}</span>
                      <span>{{ option.nip }}</span>
                    </div>
                  </template>
                </v-select>
              </div>
              <div class="text-left w-full">
                <label
                  for="years"
                  class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                  >Pejabat Pembuat Komitmen*</label
                >
                <v-select
                  :label="'nama'"
                  :options="mainStore.ppkOptions"
                  v-model="nonPerjadinStore.form.ppk"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!nonPerjadinStore.form.ppk"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template #no-options> Tidak ada data .. </template>
                  <template #option="option">
                    <div class="flex flex-col">
                      <span>{{ option.nama }}</span>
                      <span>{{ option.nip }}</span>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>

            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Penerima</label
              >
              <div class="relative w-full">
                <input
                  v-model="nonPerjadinStore.form.nip_penerima"
                  type="text"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Isi dengan NIP Penerima"
                  required
                />

                <button
                  @click="nonPerjadinStore.searchLapkin()"
                  type="button"
                  class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <MagnifyingGlassIcon
                    class="w-4 h-4"
                    v-if="!nonPerjadinStore.isSearching"
                  />
                  <ArrowPathIcon class="w-4 h-4 animate-spin" v-else />
                </button>
              </div>

              <div
                v-if="nonPerjadinStore.form.penerima"
                id="alert-3"
                class="mt-2 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <svg
                  class="flex-shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                  />
                </svg>
                <span class="sr-only">Info</span>
                <div class="ms-3 text-sm font-medium">
                  {{ nonPerjadinStore.form.penerima }}
                </div>
                <button
                  @click="penerimaReset()"
                  type="button"
                  class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                  data-dismiss-target="#alert-3"
                  aria-label="Close"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="text-left">
              <label
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Upload Lampiran</label
              >

              <small class="text-gray-600">
                <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                  <li>Bukti Pembayaran</li>
                </ol>
              </small>
              <FilePond
                :label="'Drop lampiran disini ...'"
                :multiple="true"
                @fileChange="fileChange"
                class="mt-4"
                :type="'application/pdf, application/msword,application/vnd.openxmlformats,application/vnd.ms-excel,officedocument.spreadsheetml.sheet, image/jpeg, image/png'"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-1 mt-4 text-center justify-end">
        <button
          @click="submitDialog = true"
          type="button"
          class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
    <Dialog
      :overflowVisible="true"
      :show="makDetailDialog"
      @close="makDetailDialog = !makDetailDialog"
      :canSubmit="false"
    >
      <template #title>
        <h1>Detail MAK</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-3">
          <dl
            class="text-md max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
          >
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran</dt>
              <dd class="font-semibold">
                {{
                  IDRCurrency.format(nonPerjadinStore.form?.mak?.anggaran ?? 0)
                }}
              </dd>
            </div>

            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">
                Anggaran yang belum di realisasikan
              </dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(totalSingleBelumRealisasi ?? 0) }}
              </dd>
            </div>

            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">
                Anggaran yang belum di realisasikan
              </dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(totalSingleSudahRealisasi ?? 0) }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">
                Sisa Anggaran
              </dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(sisaAnggaran) }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">
                Anggaran Transaksi Ini
              </dt>
              <dd class="font-semibold">
                {{
                  IDRCurrency.format(nonPerjadinStore.form.jumlah_pembayaran)
                }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">
                Estimasi Sisa Anggaran
              </dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(estimasiSisaAnggaran) }}
              </dd>
            </div>
          </dl>
        </div>
      </template>
    </Dialog>

    <Dialog
      :overflowVisible="true"
      :show="submitDialog"
      @close="submitDialog = !submitDialog"
      :canSubmit="true"
      @submit="submit()"
    >
      <template #title>
        <h1>Proses Pengajuan ?</h1>
      </template>

      <template #content>
        <div class="flex w-full flex-col space-y-2">
          <p>Pastikan data sudah sesuai!</p>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { useMakStore } from '@/stores/mak'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { IDRCurrency } from '@/utilities/formatter'
import { toast } from 'vue3-toastify'
import FilePond from '@/components/FilePond.vue'
import { useNonPerjadinStore } from '@/stores/nonPerjadin'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { computed } from 'vue'

const nonPerjadinStore = useNonPerjadinStore()
const makStore = useMakStore()
const router = useRouter()
const mainStore = useMainStore()
const makDetailDialog = ref(false)
const submitDialog = ref(false)
const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))

const searchMak = useDebounceFn((search) => {
  if (search == null || search == '') {
  } else {
    makStore.$patch((state) => {
      state.filter.searchQuery = search
    })
    makStore.getData()
  }
}, 500)

function onOpenSelect() {
  if (makStore.items.length == 0) {
    makStore.$patch((state) => {
      state.filter.searchQuery = ''
    })
    makStore.getData()
  }
}

async function submit() {
  submitDialog.value = !submitDialog.value
  const id = toast.loading(
    'Transaksi belanjan non perjalanan dinas sedang di proses...',
    {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'info',
      isLoading: true,
    }
  )

  const success = await nonPerjadinStore.store()
  if (success.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })

    nonPerjadinStore.resetFormMain()
    router.push({
      name: 'non-perjadin-list',
    })
  } else {
    toast.update(id, {
      render: success.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
  toast.done(id)
}

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  if (nonPerjadinStore.isDetail == true) {
    nonPerjadinStore.$patch((state) => {
      state.singleResponse.newLampiran = b
    })
  } else {
    nonPerjadinStore.$patch((state) => {
      state.form.lampiran = b
    })
  }
}

function penerimaReset() {
  nonPerjadinStore.$patch((state) => {
    state.form.penerima = null
    state.form.nip_penerima = null
  })
}

const totalSingleSudahRealisasi = computed(() => {
  // Use reduce to accumulate the total_realisasi from the detail array of each record
  return nonPerjadinStore.form.mak?.detail?.reduce((total, item) => {
    return total + item.total_realisasi
  }, 0)
})
const totalSingleBelumRealisasi = computed(() => {
  // Use reduce to accumulate the total_realisasi from the detail array of each record
  return nonPerjadinStore.form.mak?.detail?.reduce((total, item) => {
    return total + item.total_anggaran
  }, 0)
})

const sisaAnggaran = computed(() => {
  return (
    nonPerjadinStore.form.mak.anggaran -
    (totalSingleBelumRealisasi.value + totalSingleSudahRealisasi.value)
  )
})

const estimasiSisaAnggaran = computed(() => {
  return sisaAnggaran.value - nonPerjadinStore.form.jumlah_pembayaran
})

onMounted(() => {
  nonPerjadinStore.resetFormMain()
})
</script>
