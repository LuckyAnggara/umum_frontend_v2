<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div class="flex flex-col w-full md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full flex space-x-3">
            <div class="flex items-center">
              <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
              <select
                @change="authStore.getData()"
                v-model="authStore.filter.currentLimit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  :value="limit.value"
                  :selected="authStore.filter.currentLimit == limit.value ? true : false"
                  v-for="(limit, index) in mainStore.limitOptions"
                  :key="index"
                >
                  {{ limit.label }}
                </option>
              </select>
            </div>

            <div class="flex items-center w-full" autocomplete="off">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  @keyup.enter="authStore.getData()"
                  v-model="authStore.filter.searchQuery"
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tekan enter untuk mencari"
                />
              </div>
            </div>

            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                @click="newModal = true"
                type="button"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">Nomor Induk Pegawai</th>
                <th scope="col" class="px-4 py-3">Nama</th>
                <th scope="col" class="px-4 py-3">Unit</th>
                <th scope="col" class="px-4 py-3">Last Login</th>
                <th scope="col" class="px-4 py-3">Role</th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="authStore.isGetLoading">
                <td colspan="5" class="text-center">
                  <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                </td>
              </tr>
              <tr v-else-if="!authStore.isGetLoading && authStore.items.length < 1">
                <td colspan="5" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in authStore.items"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ authStore.from + index }}</td> -->
                <td class="px-4 py-1">{{ authStore.from + index }}</td>
                <td class="px-4 py-1">{{ item.nip }}</td>
                <td class="px-4 py-1">{{ item.name }}</td>
                <td class="px-4 py-1">{{ item.unit }}</td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span>{{ item.last_login }}</span
                    ><span>{{ item.last_ip_login }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">{{ item.role }}</td>

                <td class="px-4 py-1">
                  <div>
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white">
                          <EllipsisVerticalIcon class="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
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
                            <MenuItem v-for="menu in itemMenu" v-slot="{ active }" :key="menu.label">
                              <button
                                @click="menu.function(item)"
                                :class="[
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
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
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{ authStore.from }} - {{ authStore.to }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ authStore.total }}</span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a
                @click="authStore.currentPage == 1 ? '' : previousPage()"
                :disabled="authStore.currentPage == 1 ? true : false"
                :class="
                  authStore.currentPage == 1
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                "
                class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                >Previous</a
              >
            </li>

            <li>
              <a
                @click="authStore.lastPage == authStore.currentPage ? '' : nextPage()"
                :class="
                  authStore.lastPage == authStore.currentPage
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
  </section>
  <NewModal :show="newModal" @close="newModal = false" @submit="newStore" />

  <DetailModal :show="editModal" @close="editModal = false" @submit="newUpdate" />

  <DeleteDialog :show="deleteDialog" @submit="deleteData" @close="deleteDialog = !deleteDialog" />
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import { useMainStore } from '@/stores/main'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { EllipsisVerticalIcon, DocumentTextIcon, ArrowPathIcon, TrashIcon, ArrowsRightLeftIcon, ArrowsUpDownIcon } from '@heroicons/vue/24/outline'

import DeleteDialog from '@/components/DeleteDialog.vue'
import { toast } from 'vue3-toastify'
import { storageUrl } from '@/services/helper'

const NewModal = defineAsyncComponent(() => import('./New.vue'))
const DetailModal = defineAsyncComponent(() => import('./Detail.vue'))

const authStore = useAuthStore()
const mainStore = useMainStore()

const newModal = ref(false)
const editModal = ref(false)
const file = ref(null)
const deleteDialog = ref(false)
const deleteId = ref(0)

const itemMenu = [
  {
    function: onDetail,
    label: 'Detail',
    icon: DocumentTextIcon,
  },
  {
    function: onDelete,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function onDelete(item) {
  deleteId.value = item.id
  deleteDialog.value = true
}
function onDetail(item) {
  authStore.setCurrentUser(item)
  editModal.value = true
}

function nextPage() {
  authStore.filter.page = authStore.currentPage + 1
  authStore.getData()
}

function previousPage() {
  authStore.filter.page = authStore.currentPage - 1
  authStore.getData()
}

async function deleteData() {
  deleteDialog.value = false
  if (deleteId.value == authStore.user.id) {
    toast.error('Tidak bisa menghapus user ini...', {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
    })
    return false
  }
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await authStore.destroy(deleteId.value)
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
    toast.done(id)
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
}

async function newStore() {
  const id = toast.loading('Membuat data baru...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await authStore.store({ uploadFile: file.value })
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
    toast.done(id)
    newModal.value = !newModal.value
    authStore.getData()
    file.value = null
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
    file.value = null
  }
}

async function newUpdate() {
  const id = toast.loading('Update data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await authStore.update({ uploadFile: file.value })
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
    toast.done(id)
    editModal.value = !editModal.value
    authStore.getData()
    file.value = null
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
    file.value = null
  }
}

onMounted(() => {
  authStore.getData()
})
</script>
