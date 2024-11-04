<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <!-- Start coding here -->
    <div class="flex flex-col space-y-4 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible divide-y divide-dashed">
      <div class="p-2">
        <div class="flex items-center text-center justify-end">
          <button
            @click="submitDialog = true"
            type="button"
            class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Submit
          </button>
        </div>
      </div>

      <div class="p-4">
        <div class="my-4">
          <span class="text-lg font-semibold my-4">Umum</span>
        </div>
        <div class="mb-4 flex flex-col space-y-3 w-1/3">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Tahun Anggaran</label>

            <select
              required
              v-model="makStore.form.tahun_anggaran"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option v-for="(item, index) in mainStore.tahunOptions" :key="index" :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div class="">
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Unit</label>
            <select
              v-model="makStore.form.unit"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0" disabled>Pilih Unit</option>
              <option value="2">INSPEKTORAT WILAYAH I</option>
              <option value="3">INSPEKTORAT WILAYAH II</option>
              <option value="4">INSPEKTORAT WILAYAH III</option>
              <option value="5">INSPEKTORAT WILAYAH IV</option>
              <option value="6">INSPEKTORAT WILAYAH V</option>
              <option value="7">INSPEKTORAT WILAYAH VI</option>
              <option value="8">BAGIAN PROGRAM DAN PELAPORAN</option>
              <option value="9">BAGIAN UMUM</option>
              <option value="10">KELOMPOK SDM</option>
              <option value="11">KELOMPOK KEUANGAN</option>
              <option value="12">KELOMPOK HSIP</option>
            </select>
          </div>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Kode MAK</label>
            <input
              required
              v-model="makStore.form.kode_mak"
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>

          <div class="text-left">
            <label for="unit" class="block text-sm font-medium text-gray-900 dark:text-white">Uraian</label>
            <input
              required
              v-model="makStore.form.keterangan"
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
          <div class="text-left">
            <label for="unit" class="block text-sm font-medium text-gray-900 dark:text-white">Jumlah Pagu</label>
            <input
              readonly
              :model-modifiers="{ number: true }"
              v-money3="config"
              :value="makStore.totalPaguNewDetail"
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="my-4">
          <span class="text-lg font-semibold my-4">Detail</span>
        </div>
        <div
          class="place-self-start w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
        >
          <button
            v-if="authStore.role == 'ADMIN'"
            @click="makStore.pushNewDetail()"
            type="button"
            class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <FolderPlusIcon class="h-5" /> <span>Tambah</span>
          </button>
        </div>

        <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3 w-1/5">Tipe</th>
                <th scope="col" class="px-4 py-3"></th>
                <th scope="col" class="px-4 py-3 w-2/5">Uraian</th>
                <th scope="col" class="px-4 py-3 w-1/5">Pagu</th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="makStore.form.detail.length < 1">
                <td colspan="4" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in makStore.form.detail"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ makStore.from + index }}</td> -->

                <td class="px-4 py-1">
                  <select
                    v-model="item.type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="header">HEADER</option>
                    <option value="detail">DETAIL</option>
                  </select>
                </td>

                <td class="pl-2 py-1 text-right font-bold">
                  <span>{{ item.type == 'header' ? '> ' : '- ' }}</span>
                </td>

                <td class="px-4 py-1">
                  <input
                    required
                    v-model="item.uraian"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </td>

                <td class="px-4 py-1">
                  <input
                    v-if="item.type == 'detail'"
                    :model-modifiers="{ number: true }"
                    v-model="item.jumlah"
                    v-money3="config"
                    required
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </td>

                <td class="px-4 py-1">
                  <TrashIcon class="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td class="px-4 py-1 font-bold text-right" colspan="3">Total</td>
              <td class="px-4 py-1 font-semibold">
                <span>{{ IDRCurrency.format(makStore.totalPaguNewDetail) }}</span>
              </td>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <Dialog :overflowVisible="true" :show="submitDialog" @submit="submitData()" @close="submitDialog = !submitDialog" :canSubmit="true">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-6">
          <div class="text-left">Apa anda yakin data sudah benar ?</div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { IDRCurrency } from '@/utilities/formatter'
import { useMakStore } from '@/stores/mak'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

import { defineAsyncComponent, onMounted, ref } from 'vue'

const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  FolderPlusIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const makStore = useMakStore()
const mainStore = useMainStore()
const authStore = useAuthStore()
const router = useRouter()
const submitDialog = ref(false)

const config = {
  prefix: 'IDR. ',
  suffix: '',
  thousands: ',',
  decimal: '.',
  masked: true,
  precision: 0,
  disableNegative: false,
  disabled: false,
  min: null,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
  shouldRound: false,
  focusOnRight: false,
}

async function submitData() {
  const id = toast.loading('Mata anggaran baru sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  submitDialog.value = false
  const success = await makStore.store()
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
    makStore.resetForm()
    router.push({ name: 'mak-list' })
  } else {
    toast.update(id, {
      render: 'Ada permasalahan',
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

onMounted(() => {
  makStore.$patch((state) => {
    state.filter.currentUnit == 0
    if (authStore.user.role == 'USER') {
      state.filter.currentUnit == authStore.user.unit_id
    }
  })

  makStore.getData()
})
</script>
