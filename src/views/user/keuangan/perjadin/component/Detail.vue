<template>
  <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
    <!-- Modal header -->
    <div
      class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 flex-row"
    >
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Detail
      </h3>
      <span
        v-if="perjadinStore.isDetail"
        class="bg-yellow-100 text-yellow-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
        >{{ perjadinStore.singleResponse.status }}</span
      >
    </div>
    <!-- Modal body -->
    <div class="mb-4 flex flex-col space-y-3">
      <!-- <div class="grid gap-4 sm:grid-cols-2" v-if="perjadinStore.form.mak">
        <div class="text-left">
          <label
            for="unit"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Anggaran</label
          >
          <input
            readonly
            :value="IDRCurrency.format(perjadinStore.form.mak.anggaran)"
            type="text"
            name="price"
            id="price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        <div class="text-left">
          <label
            for="price"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Sisa Anggaran</label
          >
          <input
            required
            type="text"
            name="price"
            id="price"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
      </div> -->

      <div
        v-if="perjadinStore.isDetail == false || isEdit == true"
        class="flex items-center space-x-4"
      >
        <button
          @click="emit('openModal', false)"
          type="submit"
          class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          Tambah Data
        </button>
      </div>

      <div
        class="w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700 z-10 overflow-auto min-h-64"
      >
        <table
          class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400 z-50"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3">Pegawai</th>
              <th scope="col" class="px-4 py-3">Tanggal</th>
              <th scope="col" class="px-4 py-3">Uang Harian</th>
              <th scope="col" class="px-4 py-3">Hotel</th>
              <th scope="col" class="px-4 py-3">Transport</th>
              <th scope="col" class="px-4 py-3">Representatif</th>
              <th scope="col" class="px-4 py-3">Total</th>
              <th
                scope="col"
                class="px-4 py-3"
                v-if="perjadinStore.isDetail == false || isEdit == true"
              ></th>
            </tr>
          </thead>
          <!-- NEW -->
          <template v-if="!perjadinStore.isDetail">
            <tbody>
              <tr v-if="perjadinStore.form.detail < 1">
                <td colspan="9" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in perjadinStore.form.detail"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-100 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ perjadinStore.from + index }}</td> -->
                <td class="px-4 py-1">
                  <span>{{ index + 1 }}</span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-bold">{{ item.nama }}</span>
                    <span class="text-xs">{{ item.nip }}</span>
                    <span class="text-xs">{{
                      item.pangkat.toUpperCase()
                    }}</span>
                    <span class="text-xs truncate">{{
                      item.jabatan.toUpperCase()
                    }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-bold">Darat</span>
                    <span class="text-xs">{{
                      $moment(item.tanggal_awal).format('DD MMMM YYYY')
                    }}</span>
                    <span class="font-bold">Kepulangan</span>
                    <span class="text-xs">{{
                      $moment(item.tanggal_akhir).format('DD MMMM YYYY')
                    }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.uang_harian.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(uh, index) in item.uang_harian" :key="index">
                      {{ uh.hari }} HARI @ {{ rupiah.format(uh.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.hotel.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(hotel, index) in item.hotel" :key="index">
                      {{ hotel.hari }} HARI @ {{ rupiah.format(hotel.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <template
                      v-if="
                        perjadinStore.kategoriTransport(index).darat.length > 0
                      "
                    >
                      <span class="font-bold">DARAT</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            darat, index
                          ) in perjadinStore.kategoriTransport(index).darat"
                          :key="index"
                        >
                          {{ darat.keterangan }} @
                          {{ rupiah.format(darat.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransport(index).udara.length > 0
                      "
                    >
                      <span class="font-bold">UDARA</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            udara, index
                          ) in perjadinStore.kategoriTransport(index).udara"
                          :key="index"
                        >
                          {{ udara.keterangan }} @
                          {{ rupiah.format(udara.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransport(index).laut.length > 0
                      "
                    >
                      <span class="font-bold">LAUT</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            laut, index
                          ) in perjadinStore.kategoriTransport(index).laut"
                          :key="index"
                        >
                          {{ laut.keterangan }} @
                          {{ rupiah.format(laut.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransport(index).lainnya.length >
                        0
                      "
                    >
                      <span class="font-bold">LAINNYA</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            lainnya, index
                          ) in perjadinStore.kategoriTransport(index).lainnya"
                          :key="index"
                        >
                          {{ lainnya.keterangan }} @
                          {{ rupiah.format(lainnya.biaya) }}
                        </li>
                      </ol>
                    </template>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.representatif.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(rep, index) in item.representatif" :key="index">
                      {{ rupiah.format(rep.hari * rep.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{
                    rupiah.format(perjadinStore.totalBiaya(item.nip))
                  }}</span>
                </td>
                <td class="px-4 py-1">
                  <div class="z-50">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
                        >
                          <EllipsisVerticalIcon
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
          </template>
          <!-- DETAIL -->
          <template v-else>
            <tbody>
              <tr v-if="perjadinStore.singleResponse.detail < 1">
                <td colspan="9" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in perjadinStore.singleResponse.detail"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-100 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ perjadinStore.from + index }}</td> -->
                <td class="px-4 py-1">
                  <span>{{ index + 1 }}</span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-bold">{{ item.nama }}</span>
                    <span class="text-xs">{{ item.nip }}</span>
                    <span class="text-xs">{{
                      item.pangkat.toUpperCase()
                    }}</span>
                    <span class="text-xs truncate">{{
                      item.jabatan.toUpperCase()
                    }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-bold">Keberangkatan</span>
                    <span class="text-xs">{{
                      $moment(item.tanggal_awal).format('DD MMMM YYYY')
                    }}</span>
                    <span class="font-bold">Kepulangan</span>
                    <span class="text-xs">{{
                      $moment(item.tanggal_akhir).format('DD MMMM YYYY')
                    }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.uang_harian.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(uh, index) in item.uang_harian" :key="index">
                      {{ uh.hari }} HARI @ {{ rupiah.format(uh.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.hotel.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(hotel, index) in item.hotel" :key="index">
                      {{ hotel.hari }} HARI @ {{ rupiah.format(hotel.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <template
                      v-if="
                        perjadinStore.kategoriTransportDetail(item.id).darat
                          .length > 0
                      "
                    >
                      <span class="font-bold">DARAT</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            darat, index
                          ) in perjadinStore.kategoriTransportDetail(item.id)
                            .darat"
                          :key="index"
                        >
                          {{ darat.keterangan }} @
                          {{ rupiah.format(darat.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransportDetail(item.id).udara
                          .length > 0
                      "
                    >
                      <span class="font-bold">UDARA</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            udara, index
                          ) in perjadinStore.kategoriTransportDetail(item.id)
                            .udara"
                          :key="index"
                        >
                          {{ udara.keterangan }} @
                          {{ rupiah.format(udara.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransportDetail(item.id).laut
                          .length > 0
                      "
                    >
                      <span class="font-bold">LAUT</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            laut, index
                          ) in perjadinStore.kategoriTransportDetail(item.id)
                            .laut"
                          :key="index"
                        >
                          {{ laut.keterangan }} @
                          {{ rupiah.format(laut.biaya) }}
                        </li>
                      </ol>
                    </template>

                    <template
                      v-if="
                        perjadinStore.kategoriTransportDetail(item.id).lainnya
                          .length > 0
                      "
                    >
                      <span class="font-bold">LAINNYA</span>
                      <ol class="space-y-1 list-decimal list-inside">
                        <li
                          v-for="(
                            lainnya, index
                          ) in perjadinStore.kategoriTransportDetail(item.id)
                            .lainnya"
                          :key="index"
                        >
                          {{ lainnya.keterangan }} @
                          {{ rupiah.format(lainnya.biaya) }}
                        </li>
                      </ol>
                    </template>
                  </div>
                </td>
                <td class="px-4 py-1">
                  <ol
                    v-if="item.representatif.length > 0"
                    class="space-y-1 list-decimal list-inside"
                  >
                    <li v-for="(rep, index) in item.representatif" :key="index">
                      {{ rupiah.format(rep.hari * rep.biaya) }}
                    </li>
                  </ol>
                  <span v-else>-</span>
                </td>
                <td class="px-4 py-1">
                  <span>{{
                    rupiah.format(perjadinStore.totalDetailBiaya(item.nip))
                  }}</span>
                </td>
                <td v-if="isEdit" class="px-4 py-1">
                  <div class="z-50">
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton
                          class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white"
                        >
                          <EllipsisVerticalIcon
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
          </template>
        </table>
      </div>

      <div class="w-full">
        <label
          for="name"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Mata Anggaran Kegiatan</label
        >
        <div v-if="!perjadinStore.isDetail">
          <v-select
            :loading="makStore.isLoading"
            @open="onOpenSelect"
            :filterable="false"
            @search="searchMak"
            :options="makStore.items"
            v-model="perjadinStore.form.mak"
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

        <div v-else>
          <v-select
            :disabled="!isEdit"
            :loading="makStore.isLoading"
            @open="onOpenSelect"
            :filterable="false"
            @search="searchMak"
            :options="makStore.items"
            v-model="perjadinStore.singleResponse.mak"
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
      <div>
        <dl
          class="text-md max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
        >
          <div class="flex flex-col">
            <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran</dt>
            <dd class="font-semibold">
              {{
                IDRCurrency.format(perjadinStore.singleResponse.mak.anggaran)
              }}
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="mb-1 text-gray-500 dark:text-gray-400">Sisa Anggaran</dt>
            <dd class="font-semibold">
              {{
                IDRCurrency.format(perjadinStore.singleResponse.mak.anggaran)
              }}
            </dd>
          </div>

          <div class="flex flex-col">
            <dt class="mb-1 text-gray-500 dark:text-gray-400">
              Anggaran yang belum di realisasikan
            </dt>
            <dd class="font-semibold">
              {{
                IDRCurrency.format(perjadinStore.singleResponse.mak.anggaran)
              }}
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="mb-1 text-gray-500 dark:text-gray-400">
              Anggaran Kegiatan Ini
            </dt>
            <dd class="font-semibold">
              {{ IDRCurrency.format(perjadinStore.getTotalAnggaranDetail) }}
            </dd>
          </div>
          <div class="flex flex-col">
            <dt class="mb-1 text-gray-500 dark:text-gray-400">
              Estimasi Sisa Anggaran
            </dt>
            <dd class="font-semibold">
              {{
                IDRCurrency.format(perjadinStore.singleResponse.mak.anggaran)
              }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {
  EllipsisVerticalIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  TrashIcon,
  ClipboardDocumentIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { usePerjadinStore } from '@/stores/perjadin'
import { onMounted, ref } from 'vue'
import { rupiah } from '@/services/helper'
import { IDRCurrency } from '@/utilities/formatter'
import { toast } from 'vue3-toastify'
import { useMakStore } from '@/stores/mak'
import { useDebounceFn } from '@vueuse/core'

const emit = defineEmits(['openModal', 'deletePegawai'])

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const value = ref(null)
const options = ref(['list', 'of', 'options'])
const makStore = useMakStore()
const perjadinStore = usePerjadinStore()
const itemMenu = [
  {
    function: onDetail,
    label: 'Detail',
    icon: DocumentTextIcon,
  },
  {
    function: onDuplicate,
    label: 'Duplicate',
    icon: ClipboardDocumentIcon,
  },
  {
    function: onDelete,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function onDetail(item) {
  let getIndex = null
  if (perjadinStore.isDetail == true) {
    getIndex = perjadinStore.singleResponse.detail.findIndex(
      (x) => x.nip == item.nip
    )
  } else {
    getIndex = perjadinStore.form.detail.findIndex((x) => x.nip == item.nip)
  }
  let d = JSON.parse(JSON.stringify(item))
  perjadinStore.$patch((state) => {
    state.newPegawai = d
    state.updateIndex = getIndex
  })
  emit('openModal', true)
}

function onDelete(item) {
  let getIndex = null
  if (perjadinStore.isDetail == true) {
    getIndex = perjadinStore.singleResponse.detail.findIndex(
      (x) => x.nip == item.nip
    )
  } else {
    getIndex = perjadinStore.form.detail.findIndex((x) => x.nip == item.nip)
  }
  console.info(getIndex)
  perjadinStore.$patch((state) => {
    state.updateIndex = getIndex
  })
  emit('deletePegawai')
}

function onDuplicate(item) {
  let d = JSON.parse(JSON.stringify(item))
  perjadinStore.$patch((state) => {
    state.newPegawai = d
    state.newPegawai.nip = null
  })
  toast.info('Copy data berhasil!', {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 500,
    closeOnClick: true,
    closeButton: true,
  })
  emit('openModal', false)
}

// function searchMak(search, loading) {
//   console.info(search)
//   console.info(loading)
// }

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
</script>
