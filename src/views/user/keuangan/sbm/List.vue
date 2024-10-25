<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->

    <!-- Start coding here -->
    <div class="flex flex-col space-y-4 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
      <div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4 p-4 w-full">
        <div class="w-full flex flex-row space-x-3 items-center">
          <div class="flex items-center">
            <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
            <select
              @change="sbmStore.getData()"
              v-model="sbmStore.filter.currentLimit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option
                :value="limit.value"
                :selected="sbmStore.filter.currentLimit == limit.value ? true : false"
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
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MagnifyingGlassIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input
                @keyup.enter="sbmStore.getData()"
                v-model="sbmStore.filter.searchQuery"
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tekan enter untuk mencari"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
        <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">Jenis Biaya</th>
              <th scope="col" class="px-4 py-3">Daerah</th>
              <th scope="col" class="px-4 py-3">Satuan</th>
              <th scope="col" class="px-4 py-3">Nilai</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sbmStore.isLoading">
              <td colspan="5" class="text-center">
                <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
              </td>
            </tr>
            <tr v-else-if="!sbmStore.isLoading && sbmStore.items.length < 1">
              <td colspan="5" class="text-center">No Data</td>
            </tr>
            <tr
              v-else
              v-for="(item, index) in sbmStore.items"
              :key="index"
              class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
            >
              <!-- <td class="px-4 py-1 text-center">{{ sbmStore.from + index }}</td> -->
              <td class="px-4 py-1">{{ sbmStore.from + index }}</td>
              <td class="px-4 py-1">
                <span>{{ item.biaya }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{ item.daerah }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{ item.satuan }}</span>
              </td>
              <td class="px-4 py-1">
                <span>{{ item.nilai }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span class="font-semibold text-gray-900 dark:text-white">{{ sbmStore.from }} - {{ sbmStore.to }}</span>
          of
          <span class="font-semibold text-gray-900 dark:text-white">{{ sbmStore.total }}</span>
        </span>
        <ul class="inline-flex items-stretch -space-x-px">
          <li>
            <a
              @click="sbmStore.currentPage == 1 ? '' : previousPage()"
              :disabled="sbmStore.currentPage == 1 ? true : false"
              :class="
                sbmStore.currentPage == 1
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
              "
              class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >Previous</a
            >
          </li>

          <li>
            <a
              @click="sbmStore.lastPage == sbmStore.currentPage ? '' : nextPage()"
              :class="
                sbmStore.lastPage == sbmStore.currentPage
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
import DeleteDialog from '@/components/DeleteDialog.vue'
import Dialog from '@/components/Dialog.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useSbmStore } from '@/stores/sbm'
import { useMainStore } from '@/stores/main'
import { useAuthStore } from '@/stores/auth'

import { defineAsyncComponent, onMounted, ref } from 'vue'
import { EllipsisVerticalIcon, DocumentTextIcon, ArrowPathIcon, TrashIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const sbmStore = useSbmStore()
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

function nextPage() {
  sbmStore.filter.page = sbmStore.currentPage + 1
  sbmStore.getData()
}

function previousPage() {
  sbmStore.filter.page = sbmStore.currentPage - 1
  sbmStore.getData()
}

onMounted(() => {
  sbmStore.$patch((state) => {
    state.filter.currentUnit == 0
    if (authStore.user.role == 'USER') {
      state.filter.currentUnit == authStore.user.unit_id
    }
  })

  sbmStore.getData()
})
</script>
