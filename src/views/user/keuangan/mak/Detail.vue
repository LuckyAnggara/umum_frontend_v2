<template>
  <div class="mx-auto w-full px-4">
    <section v-if="makStore.singleResponse == null">
      <span class="flex"
        ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
      /></span>
    </section>
    <template v-else>
      <div
        class="flex flex-col space-y-4 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible"
      >
        <div class="relative p-4 w-full h-full md:h-auto">
          <div
            class="flex flex-row justify-between items-center pb-4 rounded-t border-b dark:border-gray-600"
          >
            <nav class="flex" aria-label="Breadcrumb">
              <ol
                class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
              >
                <li class="inline-flex items-center">
                  <router-link
                    :to="{
                      name: 'mak-list',
                    }"
                    class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    {{ makStore.singleResponse.keterangan }}</router-link
                  >
                </li>
                <li>
                  <div class="flex items-center">
                    <ChevronRightIcon
                      class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    />
                    <span
                      class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      {{ makStore.singleResponse.kode_mak }}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div
          class="w-full px-6 place-self-end text-left flex flex-row space-x-4"
        >
          <div class="flex flex-col space-y-2">
            <div>
              <label
                for="name"
                class="block font-bold text-gray-900 dark:text-white"
                >Tahun Anggaran</label
              >
              <div class="relative w-full">
                <span>{{ makStore.singleResponse.tahun_anggaran }}</span>
              </div>
            </div>
            <div>
              <label
                for="name"
                class="block font-bold text-gray-900 dark:text-white"
                >Mata Anggaran Kegiatan</label
              >
              <div class="relative w-full">
                <span
                  >{{ makStore.singleResponse.kode_mak }} -
                  {{ makStore.singleResponse.keterangan }}</span
                >
              </div>
            </div>

            <div class="text-left">
              <label
                for="name"
                class="block font-bold text-gray-900 dark:text-white"
                >Total Pagu</label
              >
              <span>{{
                IDRCurrency.format(makStore.singleResponse.anggaran)
              }}</span>
            </div>
            <div class="text-left">
              <label
                for="name"
                class="block font-bold text-gray-900 dark:text-white"
                >Realisasi</label
              >
              <span>{{
                IDRCurrency.format(makStore.totalSingleSudahRealisasi)
              }}</span>
            </div>
            <div class="text-left">
              <label
                for="name"
                class="block font-bold text-gray-900 dark:text-white"
                >Sisa Pagu</label
              >
              <span>{{
                IDRCurrency.format(
                  makStore.singleResponse.anggaran -
                    makStore.totalSingleSudahRealisasi
                )
              }}</span>
            </div>
          </div>
          <!-- <Pie :data="data" :options="options" /> -->
        </div>
        <div
          class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 w-full"
        >
          <div class="w-full flex flex-row space-x-3 items-center">
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

            <div class="flex items-center">
              <label
                for="years"
                class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                >Status</label
              >
              <select
                @change="makStore.filterSingleResponse()"
                v-model="makStore.filter.currentStatus"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">SEMUA</option>
                <option value="BELUM">BELUM</option>
                <option value="SUDAH">SUDAH</option>
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
                <th scope="col" class="px-4 py-3">Nama Kegiatan</th>
                <th scope="col" class="px-4 py-3">Jenis</th>
                <th scope="col" class="px-4 py-3">Total Anggaran</th>
                <th scope="col" class="px-4 py-3">Total Realisasi</th>
                <th scope="col" class="px-4 py-3">Lebih / Kurang</th>
                <th scope="col" class="px-4 py-3">Status Realisasi</th>

                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="makStore.isLoading">
                <td colspan="7" class="text-center">
                  <span class=""
                    ><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto"
                  /></span>
                </td>
              </tr>
              <tr
                v-else-if="
                  !makStore.isLoading &&
                  makStore.singleResponse.detail.length < 1
                "
              >
                <td colspan="7" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in makStore.singleResponse.detail"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ makStore.from + index }}</td> -->
                <td class="px-4 py-1">{{ 1 + index }}</td>
                <td class="px-4 py-1">
                  <span>{{ item.nama_kegiatan }}</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{ item.type }}</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{ IDRCurrency.format(item.total_anggaran) }}</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{ IDRCurrency.format(item.total_realisasi) }}</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{
                    IDRCurrency.format(
                      item.total_anggaran - item.total_realisasi
                    )
                  }}</span>
                </td>
                <td class="px-4 py-1">
                  <span
                    v-if="item.status_realisasi == 'BELUM'"
                    class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                  >
                    {{ item.status_realisasi }}</span
                  >
                  <span
                    v-if="item.status_realisasi == 'SELESAI'"
                    class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                  >
                    {{ item.status_realisasi }}</span
                  >
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
                                <component
                                  :is="menu.icon"
                                  class="w-5 h-5 mr-3"
                                />
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
                <span>{{
                  IDRCurrency.format(makStore.totalSingleAnggaran)
                }}</span>
              </td>
              <td class="px-4 py-1 font-semibold">
                <span>{{
                  IDRCurrency.format(makStore.totalSingleSudahRealisasi)
                }}</span>
              </td>
              <td class="px-4 py-1 font-semibold">
                <span>{{
                  IDRCurrency.format(
                    makStore.totalSingleAnggaran -
                      makStore.totalSingleSudahRealisasi
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
    </template>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { IDRCurrency } from '@/utilities/formatter'
import { useMakStore } from '@/stores/mak'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinStore } from '@/stores/perjadin'

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
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const makStore = useMakStore()
const authStore = useAuthStore()
const perjadinStore = usePerjadinStore()

const router = useRouter()
const route = useRoute()

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
  if (item.type == 'PERJADIN') {
    perjadinStore.$patch((state) => {
      state.isDetail = true
    })
    router.push({ name: 'perjadin-detail', params: { id: item.kegiatan_id } })
  } else if (item.type == 'NON PERJADIN') {
  }
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await makStore.show(id.value)
})
</script>
