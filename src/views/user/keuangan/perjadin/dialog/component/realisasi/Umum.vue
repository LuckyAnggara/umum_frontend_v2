<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Umum</h2>
    <div class="flex flex-col space-y-2">
      <div class="w-fit mt-4 flex flex-col space-y-5">
        <div>
          <button
            @click="toKuitansi()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Kuitansi</span
            ><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small
            >Cetak kuitansi sebanyak 3 lembar, ttd dan upload kembali</small
          >
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
      </div>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import {
  ArrowTopRightOnSquareIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { rupiah } from '@/services/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()
const mainStore = useMainStore()

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

async function kuitansiUpdate() {
  const id = toast.loading('Memproses kuitansi...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.update(perjadinStore.singleDetail)
  if (success.status) {
    toast.done(id)
    toKuitansi()
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
  toast.done(id)
}
</script>
