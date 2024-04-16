<template>
  <section>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-14">
      <div class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md">
        <div class="h-full flex flex-col justify-center rounded-[25px] p-8">
          <div class="h-12">
            <StarIcon class="text-yellow-500 h-12 w-12" />
          </div>
          <div class="my-2">
            <h2 class="text-4xl font-bold">
              <span v-if="dashboardStore.isLoading" class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
              <span v-else>{{ dashboardStore.items.rate ?? '0' }}</span>
            </h2>
          </div>

          <div>
            <p class="font-sans text-base font-medium text-gray-500">Kepuasan Layanan Bulan ini</p>
          </div>
        </div>
      </div>

      <div class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md">
        <div class="h-full flex flex-col justify-center rounded-[25px] p-8">
          <div class="h-12">
            <CheckBadgeIcon class="text-yellow-500 h-12 w-12" />
          </div>
          <div class="my-2">
            <h2 class="text-4xl font-bold">
              <span v-if="dashboardStore.isLoading" class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
              <span v-else>{{ dashboardStore.items.layanan?.selesai }} / {{ dashboardStore.items.layanan?.belum }}</span>
            </h2>
          </div>

          <div>
            <p class="font-sans text-base font-medium text-gray-500">Layanan Terselesaikan Bulan ini</p>
          </div>
        </div>
      </div>

      <div class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md">
        <div class="h-full flex flex-col justify-center rounded-[25px] p-8">
          <div class="h-12">
            <DocumentIcon class="text-yellow-500 h-12 w-12" />
          </div>
          <div class="my-2">
            <h2 class="text-4xl font-bold">
              <span v-if="dashboardStore.isLoading" class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
              <span v-else>{{ dashboardStore.items?.arsip }}</span>
            </h2>
          </div>

          <div>
            <p class="font-sans text-base font-medium text-gray-500">Jumlah Arsip Aktif</p>
          </div>
        </div>
      </div>

      <!-- <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div> -->
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 px-14">
      <div class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md">
        <div class="h-full flex flex-col rounded-[25px] p-8">
          <p class="font-sans text-xl font-medium mb-2">Daftar Kegiatan Hari Ini</p>
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">Tempat</th>
                <th scope="col" class="px-4 py-3">Nama Kegiatan</th>
                <th scope="col" class="px-4 py-3">Estimasi Peserta</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dashboardStore.isLoading">
                <td colspan="8" class="text-center">
                  <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                </td>
              </tr>
              <tr v-else-if="!dashboardStore.isLoading && dashboardStore.items.tempat?.length < 1">
                <td colspan="8" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(kegiatan, index) in dashboardStore.items.tempat"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <td class="px-4 py-1">{{ index + 1 }}</td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-semibold">{{ getRuangan(kegiatan.ruangan) }}</span>
                    <span>{{ moment(kegiatan.start).format('HH:MM') }} - {{ moment(kegiatan.end).format('HH:MM') }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">{{ kegiatan.kegiatan }}</td>
                <td class="px-4 py-1">{{ kegiatan.jumlah_peserta }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md">
        <div class="h-full flex flex-col rounded-[25px] p-8">
          <p class="font-sans text-xl font-medium mb-2">Agenda Pimpinan Hari Ini</p>
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">Pimpinan</th>
                <th scope="col" class="px-4 py-3">Agenda Kegiatan</th>
                <th scope="col" class="px-4 py-3">Tempat</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="dashboardStore.isLoading">
                <td colspan="8" class="text-center">
                  <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                </td>
              </tr>
              <tr v-else-if="!dashboardStore.isLoading && dashboardStore.items.agenda?.length < 1">
                <td colspan="8" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(agenda, index) in dashboardStore.items.agenda"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <td class="px-4 py-1">{{ index + 1 }}</td>
                <td class="px-4 py-1">
                  <div class="flex flex-col">
                    <span class="font-semibold">{{ getPimpinan(agenda.pimpinan) }}</span>
                    <span>{{ moment(agenda.start).format('HH:MM') }} - {{ moment(agenda.end).format('HH:MM') }}</span>
                  </div>
                </td>
                <td class="px-4 py-1">{{ agenda.kegiatan }}</td>
                <td class="px-4 py-1">{{ agenda.tempat }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { CheckBadgeIcon, ArrowPathIcon, DocumentIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
import moment from 'moment'

import { useDashboardStore } from '@/stores/dashboard'
import { useMainStore } from '@/stores/main'
import { onMounted } from 'vue'

const dashboardStore = useDashboardStore()
const mainStore = useMainStore()

function getRuangan(id) {
  const result = mainStore.ruangOptions.find((x) => {
    return x.id == id
  })
  return result.label
}

function getPimpinan(id) {
  const result = mainStore.pimpinanOptions.find((x) => {
    return x.id == id
  })
  return result.label
}

onMounted(() => {
  dashboardStore.getData()
})
</script>
