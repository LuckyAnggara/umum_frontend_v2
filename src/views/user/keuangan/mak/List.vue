<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <!-- Start coding here -->
    <div
      class="flex flex-col space-y-4 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible"
    >
      <div
        class="w-full min-h-40 p-6 place-self-end text-right flex flex-row space-x-4"
      >
        <div
          class="w-72 h-40 flex flex-col items-start px-6 py-10 overflow-hidden bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="inline-flex text-sm text-gray-200 sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              2024
            </div>
          </div>
          <h1 class="text-2xl font-bold mt-6 text-gray-50">
            {{ IDRCurrency.format(makStore.totalAnggaran) }}
          </h1>
          <div class="flex flex-row justify-between text-gray-200">
            <p>Total Anggaran</p>
          </div>
        </div>
        <div
          class="w-72 h-40 flex flex-col items-start px-6 py-10 overflow-hidden bg-gradient-to-br from-purple-400 via-blue-400 to-blue-500 rounded-xl shadow-lg duration-300 hover:shadow-2xl group"
        >
          <div class="flex flex-row justify-between items-center">
            <div class="inline-flex text-sm text-gray-200 sm:text-base">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              2024
            </div>
          </div>
          <h1 class="text-5xl font-bold mt-2 text-gray-50">
            {{ makStore.capaianRealisasi }}%
          </h1>
          <div class="flex flex-row justify-between text-gray-200">
            <p>Capaian Realisasi</p>
          </div>
        </div>
        <!-- <Pie :data="data" :options="options" /> -->
      </div>
      <div
        class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 w-full"
      >
        <div class="w-full flex flex-row space-x-3 items-center">
          <div class="flex items-center">
            <label
              for="years"
              class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
              >Show</label
            >
            <select
              @change="makStore.getData()"
              v-model="makStore.filter.currentLimit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :value="limit.value"
                :selected="
                  makStore.filter.currentLimit == limit.value ? true : false
                "
                v-for="(limit, index) in mainStore.limitOptions"
                :key="index"
              >
                {{ limit.label }}
              </option>
            </select>
          </div>

          <div class="flex items-center w-1/3" autocomplete="off">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              >
                <MagnifyingGlassIcon
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                />
              </div>
              <input
                @keyup.enter="makStore.getData()"
                v-model="makStore.filter.searchQuery"
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tekan enter untuk mencari"
              />
            </div>
          </div>

          <div
            class="flex items-center"
            v-show="authStore.user.role == 'ADMIN'"
          >
            <label
              for="years"
              class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
              >Unit</label
            >
            <select
              @change="makStore.getData()"
              v-model="makStore.filter.currentUnit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="0">SEMUA</option>
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
        </div>
      </div>
      <div
        class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">Kode MAK</th>
              <th scope="col" class="px-4 py-3">Nama MAK</th>
              <th scope="col" class="px-4 py-3">Total Anggaran</th>
              <th scope="col" class="px-4 py-3">Sudah Realisasi</th>
              <th scope="col" class="px-4 py-3">Belum Realisasi</th>
              <th scope="col" class="px-4 py-3">Sisa Anggaran</th>
              <th
                scope="col"
                class="px-4 py-3"
                v-if="authStore.role == 'ADMIN'"
              >
                Unit
              </th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="makStore.isLoading">
              <td colspan="5" class="text-center">
                <span class=""
                  ><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto"
                /></span>
              </td>
            </tr>
            <tr v-else-if="!makStore.isLoading && makStore.items.length < 1">
              <td colspan="5" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in makStore.items"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <!-- <td class="px-4 py-1 text-center">{{ makStore.from + index }}</td> -->
              <td class="px-4 py-1">{{ makStore.from + index }}</td>
              <td class="px-4 py-1">
                <span>{{ item.kode_mak }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{ item.keterangan }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{ IDRCurrency.format(item.anggaran) }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(makStore.sudahRealisasiPerMak(item.id))
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(makStore.belumRealisasiPerMak(item.id))
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(
                    item.anggaran -
                      makStore.sudahRealisasiPerMak(item.id) -
                      makStore.belumRealisasiPerMak(item.id)
                  )
                }}</span>
              </td>
              <td class="px-4 py-1" v-if="authStore.role == 'ADMIN'">
                <span>{{ item.unit.nama }}</span>
              </td>
              <td class="px-4 py-1">
                <div>
                  <Menu as="div" class="relative inline-block text-left">
                    <div>
                      <MenuButton
                        class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
                      >
                        <ArrowPathIcon
                          v-if="
                            makStore.isDestroyLoading && deleteId == item.id
                          "
                          class="h-5 w-5 animate-spin"
                        />
                        <EllipsisVerticalIcon
                          v-else
                          class="h-5 w-5 text-black dark:text-white"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <transition
                      enter-active-class="transition duration-100 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-75 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >
                      <MenuItems
                        class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                      >
                        <div class="px-2 py-1">
                          <MenuItem
                            v-for="menu in itemMenu"
                            v-slot="{ active }"
                            :key="menu.label"
                          >
                            <button
                              @click="menu.function(item)"
                              :class="[
                                active
                                  ? 'bg-blue-500 text-white'
                                  : 'text-gray-900 dark:text-white',
                                'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                              ]"
                            >
                              <component :is="menu.icon" class="w-5 h-5 mr-3" />
                              {{ menu.label }}
                            </button>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="px-4 py-1 font-bold text-right" colspan="3">Total</td>
            <td class="px-4 py-1 font-semibold">
              <span>{{ IDRCurrency.format(makStore.totalAnggaran) }}</span>
            </td>
            <td class="px-4 py-1 font-semibold">
              <span>{{
                IDRCurrency.format(makStore.totalSudahRealisasi)
              }}</span>
            </td>
            <td class="px-4 py-1 font-semibold">
              <span>{{
                IDRCurrency.format(makStore.totalBelumRealisasi)
              }}</span>
            </td>
            <td class="px-4 py-1 font-semibold">
              <span>{{
                IDRCurrency.format(
                  makStore.totalAnggaran -
                    makStore.totalSudahRealisasi -
                    makStore.totalBelumRealisasi
                )
              }}</span>
            </td>
          </tfoot>
        </table>
      </div>
      <nav
        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white"
            >{{ makStore.from }} - {{ makStore.to }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            makStore.total
          }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="makStore.currentPage == 1 ? '' : previousPage()"
              :disabled="makStore.currentPage == 1 ? true : false"
              :class="
                makStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="
                makStore.lastPage == makStore.currentPage ? '' : nextPage()
              "
              :class="
                makStore.lastPage == makStore.currentPage
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Next {{
            }}</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <Dialog
    :overflowVisible="true"
    :show="detailMakDialog"
    @close="detailMakDialog = !detailMakDialog"
    :canSubmit="false"
    :size="'max-w-4xl'"
  >
    <template #title>
      <h1>Detail Mata Anggaran Kegiatan</h1>
    </template>

    <template #content>
      <div class="flex flex-col space-y-4 mt-6 w-3xl">
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">Detail</th>
              <th scope="col" class="px-4 py-3">Pagu</th>
              <th scope="col" class="px-4 py-3">Nominatif s.d Lalu</th>
              <th scope="col" class="px-4 py-3">Sisa Dana</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="makStore.isDetailLoading">
              <td colspan="2" class="text-center">
                <span class=""
                  ><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto"
                /></span>
              </td>
            </tr>
            <tr
              v-else-if="
                !makStore.isDetailLoading && makStore.itemNominatif.length < 1
              "
            >
              <td colspan="2" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in makStore.itemNominatif"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <td class="px-4 py-1">
                <span>{{ item.type == 'header' ? '> ' : '- ' }}</span>
                <span :class="item.type == 'header' ? 'font-bold' : ''">{{
                  item.uraian
                }}</span>
              </td>

              <td class="px-4 py-1">
                <span v-if="item.type == 'detail'">{{
                  IDRCurrency.format(item.jumlah)
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span v-if="item.type == 'detail'">{{
                  IDRCurrency.format(makStore.totalPaguDigunakan(item.id))
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span v-if="item.type == 'detail'">{{
                  IDRCurrency.format(
                    item.jumlah - makStore.totalPaguDigunakan(item.id)
                  )
                }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <td class="px-4 py-1 font-bold text-right">Total</td>
            <td class="px-4 py-1 font-bold">
              <span>{{ IDRCurrency.format(makStore.totalPaguNominatif) }}</span>
            </td>
            <td class="px-4 py-1 font-bold">
              <span>{{
                IDRCurrency.format(makStore.totalPenggunaanPaguNominatif)
              }}</span>
            </td>
            <td class="px-4 py-1 font-bold">
              <span>{{
                IDRCurrency.format(
                  makStore.totalPaguNominatif -
                    makStore.totalPenggunaanPaguNominatif
                )
              }}</span>
            </td>
          </tfoot>
        </table>
      </div>
    </template>
  </Dialog>
  <DeleteDialog
    :show="confirmDialog"
    @submit="deleteData"
    @close="confirmDialog = !confirmDialog"
  />
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import DeleteDialog from '@/components/DeleteDialog.vue'
import Dialog from '@/components/Dialog.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useMakStore } from '@/stores/mak'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const makStore = useMakStore()
const mainStore = useMainStore()
const authStore = useAuthStore()
const deleteData = ref(0)

const confirmDialog = ref(false)
const detailMakDialog = ref(false)
const deleteId = ref(0)
const router = useRouter()

const itemMenu = computed(() => {
  return [
    {
      function: onDetailNominatif,
      label: 'Detail MAK',
      icon: DocumentTextIcon,
    },
    {
      function: onDetail,
      label: 'Detail',
      icon: DocumentTextIcon,
    },
  ]
})

function onDetailNominatif(item) {
  detailMakDialog.value = true
  makStore.getDataNominatif(item.id)
}

function onDetail(item) {
  router.push({ name: 'mak-detail', params: { id: item.id } })
}

function nextPage() {
  makStore.filter.page = makStore.currentPage + 1
  makStore.getData()
}

function previousPage() {
  makStore.filter.page = makStore.currentPage - 1
  makStore.getData()
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
