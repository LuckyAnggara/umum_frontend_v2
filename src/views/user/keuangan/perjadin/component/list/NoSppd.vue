<template>
  <div>
    <div
      class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible"
    >
      <div class="p-4">
        <p class="font-semibold text-lg">Berdasarkan Nomor SPPD</p>
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
              @change="perjadinDetailStore.getData()"
              v-model="perjadinDetailStore.filter.currentLimit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :value="limit.value"
                :selected="
                  perjadinDetailStore.filter.currentLimit == limit.value
                    ? true
                    : false
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
                @keyup.enter="perjadinDetailStore.getData()"
                v-model="perjadinDetailStore.filter.searchQuery"
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
              @change="perjadinDetailStore.getData()"
              v-model="perjadinDetailStore.filter.currentUnit"
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

          <div class="flex items-center">
            <label
              for="years"
              class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
              >Status</label
            >
            <select
              @change="perjadinDetailStore.getData()"
              v-model="perjadinDetailStore.filter.currentStatus"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">SEMUA</option>
              <option value="VERIFIED">VERIFIED</option>
              <option value="UNVERIFIED">UNVERIFIED</option>
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
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">No SPPD</th>
              <th scope="col" class="px-4 py-3">No ST / No SP</th>
              <th scope="col" class="px-4 py-3">Nama Pegawai</th>
              <th scope="col" class="px-4 py-3">Nama & Tanggal Kegiatan</th>
              <th scope="col" class="px-4 py-3">Total Anggaran</th>
              <th scope="col" class="px-4 py-3">Total Realisasi</th>
              <th scope="col" class="px-4 py-3">Lebih / Kurang Bayar</th>
              <th scope="col" class="px-4 py-3">Status</th>
              <th
                scope="col"
                class="px-4 py-3"
                v-if="authStore.role == 'ADMIN'"
              >
                Pembuat
              </th>
              <th scope="col" class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="perjadinDetailStore.isLoading">
              <td colspan="9" class="text-center">
                <span class=""
                  ><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto"
                /></span>
              </td>
            </tr>
            <tr
              v-else-if="
                !perjadinDetailStore.isLoading &&
                perjadinDetailStore.items.length < 1
              "
            >
              <td colspan="9" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in perjadinDetailStore.items"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <!-- <td class="px-4 py-1 text-center">{{ perjadinDetailStore.from + index }}</td> -->
              <td class="px-4 py-1">{{ perjadinDetailStore.from + index }}</td>

              <td class="px-4 py-1">
                <span class="font-bold">{{ item.no_sppd }}</span>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.master.no_st }}</span>
                  <span class="">{{ item.master.tanggal_st }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.nama }}</span>
                  <span>{{ item.nip }}</span>
                </div>
              </td>
              <td class="px-4 py-1">
                <div class="flex flex-col">
                  <span class="font-bold">{{ item.master.nama_kegiatan }}</span>
                  <div>
                    <span class="text-xs">{{ item.tanggal_awal }}</span>
                    <span class="font-semibold"> s.d </span>
                    <span class="text-xs">{{ item.tanggal_akhir }}</span>
                  </div>
                </div>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(
                    perjadinDetailStore.totalDetailBiayaPerItem(item.id)
                  )
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(
                    perjadinDetailStore.totalDetailRealisasiBiayaPerItem(
                      item.id
                    )
                  )
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{
                  IDRCurrency.format(
                    perjadinDetailStore.totalDetailBiayaPerItem(item.id) -
                      perjadinDetailStore.totalDetailRealisasiBiayaPerItem(
                        item.id
                      )
                  )
                }}</span>
              </td>
              <td class="px-4 py-1">
                <span
                  v-if="item.status == 'VERIFIED'"
                  class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  {{ item.status }}</span
                >
                <span
                  v-if="item.status == 'UNVERIFIED'"
                  class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >
                  {{ item.status }}</span
                >
              </td>
              <td class="px-4 py-1" v-if="authStore.role == 'ADMIN'">
                <span class="text-xs">{{ item.master.unit.nama }}</span>
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
                            perjadinDetailStore.isDestroyLoading &&
                            deleteId == item.id
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
        </table>
      </div>
      <nav
        class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white"
            >{{ perjadinDetailStore.from }} - {{ perjadinDetailStore.to }}</span
          >
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{
            perjadinDetailStore.total
          }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="
                perjadinDetailStore.currentPage == 1 ? '' : previousPage()
              "
              :disabled="perjadinDetailStore.currentPage == 1 ? true : false"
              :class="
                perjadinDetailStore.currentPage == 1
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
                perjadinDetailStore.lastPage == perjadinDetailStore.currentPage
                  ? ''
                  : nextPage()
              "
              :class="
                perjadinDetailStore.lastPage == perjadinDetailStore.currentPage
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
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { IDRCurrency } from '@/utilities/formatter'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

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
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'

const perjadinDetailStore = usePerjadinDetailStore()
const mainStore = useMainStore()
const authStore = useAuthStore()

const deleteId = ref(0)
const router = useRouter()

const itemMenu = computed(() => {
  return [
    {
      function: onDetail,
      label: 'Detail',
      icon: DocumentTextIcon,
    },
  ]
})

function onDetail(item) {
  router.push({ name: 'perjadin-sppd-realisasi', params: { id: item.id } })
}

function nextPage() {
  perjadinDetailStore.filter.page = perjadinDetailStore.currentPage + 1
  perjadinDetailStore.getData()
}

function previousPage() {
  perjadinDetailStore.filter.page = perjadinDetailStore.currentPage - 1
  perjadinDetailStore.getData()
}

onMounted(() => {
  perjadinDetailStore.getData()
})
</script>
