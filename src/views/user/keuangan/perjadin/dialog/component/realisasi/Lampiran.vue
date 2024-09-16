<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Lampiran Lainnya</h2>

    <div class="flex flex-col space-y-2 border-2 p-4 mb-6">
      <small class="text-gray-600 italic"
        >Lampiran dibawah ini mungkin belum di
        <span class="font-semibold">tanda tangani</span> oleh pelaku SPD</small
      >
      <div class="w-fit flex flex-col space-y-5">
        <div>
          <button
            @click="toKuitansi()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Kuitansi</span
            ><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak kuitansi Perjalanan Dinas</small>
        </div>
        <div>
          <button
            @click="toSPD()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPD</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Surat Perjalanan Dinas (SPD)</small>
        </div>
        <div>
          <button
            @click="toRPD()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>RPD</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Rincian Biaya Perjalanan Dinas (RPD)</small>
        </div>
        <div>
          <button
            @click="toRill()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>DPR</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Daftar Pengeluaran Rill (DPR)</small>
        </div>
        <div>
          <button
            @click="toSptjm()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPTJM</span><ArrowDownTrayIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Download Draft Surat Pertanggung Jawaban Mutlak (SPTJM)</small>
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-8">
      <div
        class="flex flex-col space-y-8"
        v-if="
          perjadinDetailStore.singleResponse.lampiran.filter(
            (x) => x.type == 'LAINNYA'
          ).length > 0
        "
      >
        <div class="text-left">
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Lampiran</label
          >

          <small class="text-gray-600">
            <ol class="ps-5 mt-2 space-y-0 list-decimal list-inside">
              <li
                v-for="(
                  item, index
                ) in perjadinDetailStore.singleResponse.lampiran.filter(
                  (x) => x.type == 'LAINNYA'
                )"
                :key="index"
                class="text-base w-full rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
              >
                <a
                  :href="`${storageUrl + '/' + item.lampiran}`"
                  :download="item.file_name"
                >
                  <span class="text-gray-500">{{ index + 1 }}.</span>
                  {{ item.file_name }}
                </a>
                <TrashIcon
                  v-if="authStore.user.role == 'USER'"
                  @click="perjadinDetailStore.destroyLampiran(item)"
                  class="cursor-pointer h-5 w-5 hover:-translate-y-1 duration-300 ease-in-out text-red-500"
                />
              </li>
            </ol>
          </small>
        </div>
      </div>
      <div class="flex flex-col space-y-8 w-1/2" v-if="!disabledForm">
        <div class="text-left">
          <label
            for="name"
            class="block text-sm font-medium text-gray-900 dark:text-white"
            >Upload Lampiran</label
          >

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
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { storageUrl } from '@/services/helper'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import {
  TrashIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import axiosIns from '@/services/axios'

const authStore = useAuthStore()
const router = useRouter()
const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()

const props = defineProps({
  disabledForm: {
    type: Boolean,
    default: false,
  },
})

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })

  perjadinDetailStore.$patch((state) => {
    state.lampiran.lainnya = b
  })
}

async function toKuitansi() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-kuitansi',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function toSPD() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-spd',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}
async function toRPD() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-rpd',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}
async function toRill() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-rill',
    params: { id: perjadinDetailStore.singleResponse.id },
  })
  window.open(resolvedRoute.href, '_blank')
}

async function toSptjm() {
  perjadinDetailStore.downloadSptjm()
}
</script>
