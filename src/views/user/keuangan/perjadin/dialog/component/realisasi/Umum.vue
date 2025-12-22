<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Umum</h2>

    <div class="flex flex-col space-y-2 text-sm">
      <div class="grid grid-cols-2">
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Surat Tugas / Perintah</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.master.no_st }}</span>
            <span>{{ perjadinDetailStore.singleResponse.master.tanggal_st }}</span>
          </div>
        </div>
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Tanggal Surat Tugas / Perintah</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.master.tanggal_st }}</span>
          </div>
        </div>
      </div>
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Nama Kegiatan</label>
        <div class="relative w-full">
          <span>{{ perjadinDetailStore.singleResponse.master.nama_kegiatan }}</span>
        </div>
      </div>
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Tempat Kegiatan</label>
        <div class="relative w-full">
          <span>{{ perjadinDetailStore.singleResponse.master.tempat_kegiatan }}</span>
        </div>
      </div>
      <hr />
      <div>
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Nomor SPPD</label>
        <div class="relative w-full flex items-center space-x-2">
          <span class="text-gray-700 dark:text-gray-300">ITJ.1-KU.03.02-</span>
          <input
            v-model="editableNoSppd"
            @input="onNoSppdInput"
            @blur="onNoSppdBlur"
            @keyup.enter="onNoSppdEnter"
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Nomor"
          />
          <ArrowPathIcon v-if="isCheckingNoSppd" class="w-5 h-5 animate-spin text-blue-500" />
        </div>
        <small v-if="noSppdValidationMessage" :class="noSppdIsAvailable ? 'text-green-600' : 'text-red-600'">
          {{ noSppdValidationMessage }}
        </small>
      </div>
      <div class="grid grid-cols-2">
        <div>
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Nomor Induk Pegawai</label>
          <div class="relative w-full">
            <span>{{ perjadinDetailStore.singleResponse.nip }}</span>
          </div>
        </div>
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Nama</label>
          <span>{{ perjadinDetailStore.singleResponse.nama }}</span>
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Golongan/Pangkat</label>
          <span>{{ perjadinDetailStore.singleResponse.pangkat }}</span>
        </div>
        <div class="text-left">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Jabatan</label>
          <span>{{ perjadinDetailStore.singleResponse.jabatan }}</span>
        </div>
      </div>
      <div class="text-left">
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Unit</label>
        <span>{{ perjadinDetailStore.singleResponse.unit }}</span>
      </div>

      <div class="text-left">
        <label for="name" class="block font-bold text-gray-900 dark:text-white">Peran</label>
        <span>{{ perjadinDetailStore.singleResponse.peran }}</span>
      </div>

      <div class="flex flex-row justify-between space-x-4">
        <div class="text-left w-2/5">
          <label class="block font-bold text-gray-900 dark:text-white" for="unit">Tanggal Keberangkatan</label>
          <span>{{ $moment(perjadinDetailStore.singleResponse.tanggal_awal).format('DD MMMM YYYY') }}</span>
        </div>
        <div class="text-left w-2/5">
          <label for="unit" class="block font-bold text-gray-900 dark:text-white">Tanggal Kepulangan</label>
          <span>{{ $moment(perjadinDetailStore.singleResponse.tanggal_akhir).format('DD MMMM YYYY') }}</span>
        </div>

        <div class="text-left w-1/5">
          <label for="name" class="block font-bold text-gray-900 dark:text-white">Jumlah Hari</label>
          <span>
            {{ $moment(perjadinDetailStore.singleResponse.tanggal_akhir).diff($moment(perjadinDetailStore.singleResponse.tanggal_awal), 'days') + 1 }}
            hari</span
          >
        </div>
      </div>
    </div>

    <div class="mt-4 flex flex-col space-y-1 border-2 p-4 mb-6">
      <small class="text-gray-600 italic">Lampiran dibawah ini mungkin belum di <span class="font-semibold">tanda tangani</span> oleh pelaku SPD</small>
      <div class="grid grid-rows-3 grid-flow-col gap-2">
        <div>
          <button
            @click="toKuitansi()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>Kuitansi</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Kuitansi Perjalanan Dinas</small>
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
            @click="downloadSPTJM()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPTJM</span><ArrowDownTrayIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Download Draft Surat Pertanggung Jawaban Mutlak (SPTJM)</small>
        </div>
        <div>
          <button
            @click="toSptjm()"
            type="submit"
            class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            <span>SPTJM</span><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
          </button>
          <small>Cetak Surat Pertanggung Jawaban Mutlak (SPTJM)</small>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, computed, watch } from 'vue'
import { IDRCurrency } from '@/utilities/formatter'
import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { ArrowTopRightOnSquareIcon, ArrowDownTrayIcon, ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'
import { rupiah } from '@/services/helper'
import { useRouter } from 'vue-router'

const router = useRouter()
const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()
const mainStore = useMainStore()

const editableNoSppd = ref(perjadinDetailStore.singleResponse?.no_sppd || '')
const isCheckingNoSppd = ref(false)
const noSppdValidationMessage = ref('')
const noSppdIsAvailable = ref(false)
const debounceTimer = ref(null)
const lastCheckedValue = ref('')

// Watch for changes in singleResponse
watch(() => perjadinDetailStore.singleResponse?.no_sppd, (newVal) => {
  if (newVal) {
    editableNoSppd.value = newVal
    lastCheckedValue.value = newVal
  }
})

// Debounced validation check (tidak langsung update)
async function onNoSppdInput() {
  // Clear previous timer
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  const newNoSppd = editableNoSppd.value
  const currentNoSppd = perjadinDetailStore.singleResponse.no_sppd
  const newNoSppdStr = String(newNoSppd ?? '')
  const currentNoSppdStr = String(currentNoSppd ?? '')

  // If unchanged or empty, clear validation
  if (newNoSppdStr.trim() === '' || newNoSppdStr === currentNoSppdStr) {
    noSppdValidationMessage.value = ''
    noSppdIsAvailable.value = false
    return
  }

  // Set debounce timer
  debounceTimer.value = setTimeout(async () => {
    await checkNoSppdAvailability(newNoSppdStr)
  }, 500)
}

// Check availability without updating
async function checkNoSppdAvailability(noSppdToCheck) {
  const currentNoSppd = perjadinDetailStore.singleResponse.no_sppd
  const currentNoSppdStr = String(currentNoSppd ?? '')

  // Skip if same as current
  if (noSppdToCheck === currentNoSppdStr) {
    noSppdValidationMessage.value = ''
    noSppdIsAvailable.value = false
    return
  }

  isCheckingNoSppd.value = true
  noSppdValidationMessage.value = `Memeriksa nomor ${noSppdToCheck}...`

  try {
    const checkResult = await perjadinDetailStore.checkNoSppd(noSppdToCheck, perjadinDetailStore.singleResponse.id)
    lastCheckedValue.value = noSppdToCheck
    
    console.log('=== CHECK NO SPPD RESULT ===')
    console.log('Checking number:', noSppdToCheck)
    console.log('Current ID:', perjadinDetailStore.singleResponse.id)
    console.log('Full Response:', checkResult)
    console.log('=========================')
    
    // Handle different response formats
    let isAvailable = false
    let debugInfo = ''
    
    // Format 1: {available: boolean, message: string, debug: object}
    if (checkResult.hasOwnProperty('available')) {
      isAvailable = checkResult.available
      if (checkResult.debug) {
        console.log('Debug Info:', checkResult.debug)
        debugInfo = ` (ID: ${checkResult.debug.existing_record_id})`
      }
    }
    // Format 2: {success: boolean, data: any, message: string} (from BaseController)
    else if (checkResult.hasOwnProperty('success')) {
      // Jika success=true dan message berisi "tersedia", berarti nomor available
      isAvailable = checkResult.success && checkResult.message.toLowerCase().includes('tersedia')
      console.log('Using BaseController format, isAvailable:', isAvailable)
    }
    
    if (isAvailable) {
      noSppdIsAvailable.value = true
      noSppdValidationMessage.value = `Nomor ${noSppdToCheck} tersedia dan dapat digunakan`
    } else {
      noSppdIsAvailable.value = false
      noSppdValidationMessage.value = `Nomor ${noSppdToCheck} sudah digunakan${debugInfo}`
    }
  } catch (error) {
    console.error('Error checking no_sppd:', error)
    noSppdIsAvailable.value = false
    noSppdValidationMessage.value = `Error memeriksa nomor ${noSppdToCheck}`
  } finally {
    isCheckingNoSppd.value = false
  }
}

// Handle blur - validate and update if different
async function onNoSppdBlur() {
  await updateNoSppdIfValid()
}

// Handle enter key - validate and update
async function onNoSppdEnter() {
  await updateNoSppdIfValid()
}

// Update nomor SPPD jika valid
async function updateNoSppdIfValid() {
  const newNoSppd = editableNoSppd.value
  const currentNoSppd = perjadinDetailStore.singleResponse.no_sppd
  const newNoSppdStr = String(newNoSppd ?? '')
  const currentNoSppdStr = String(currentNoSppd ?? '')

  // Clear any pending debounce
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }

  // If unchanged, do nothing
  if (newNoSppdStr === currentNoSppdStr) {
    noSppdValidationMessage.value = ''
    return
  }

  // Validate not empty
  if (newNoSppdStr.trim() === '') {
    noSppdValidationMessage.value = 'Nomor SPPD tidak boleh kosong'
    noSppdIsAvailable.value = false
    editableNoSppd.value = currentNoSppdStr
    toast.error('Nomor SPPD tidak boleh kosong', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    })
    return
  }

  // Check if we need to validate first
  if (lastCheckedValue.value !== newNoSppdStr) {
    await checkNoSppdAvailability(newNoSppdStr)
    // Wait a bit for the check to complete
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // Check if available before updating
  if (!noSppdIsAvailable.value) {
    toast.error(`Nomor ${newNoSppdStr} sudah digunakan, tidak dapat disimpan`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    })
    // Revert to original value
    editableNoSppd.value = currentNoSppdStr
    noSppdValidationMessage.value = ''
    return
  }


  const toastUpdateSPPD = toast.loading(`Menyimpan SPPD ${newNoSppdStr}...`, {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  try {
    const updateResult = await perjadinDetailStore.updateNoSppd(perjadinDetailStore.singleResponse.id, newNoSppdStr)
    
    
    // Log debug info if available
    if (updateResult.debug) {
      console.log('Debug Update No SPPD:', updateResult.debug)
    }
    
    if (updateResult.status) {
      noSppdValidationMessage.value = `Nomor ${newNoSppdStr} berhasil disimpan`
      noSppdIsAvailable.value = false
      lastCheckedValue.value = newNoSppdStr
      
       toast.update(toastUpdateSPPD, {
      render: `Nomor SPPD berhasil diubah menjadi ${newNoSppdStr}`,
      autoClose: true,
      closeOnClick: true,
      closeButton: true,
      type: 'success',
      isLoading: false,
      autoClose: 1000,
    });
        
      
      setTimeout(() => {
        noSppdValidationMessage.value = ''
      }, 3000)
    } else {
      noSppdValidationMessage.value = updateResult.message
      noSppdIsAvailable.value = false
      
      const debugMsg = updateResult.debug ? ` (Bentrok dengan ID: ${updateResult.debug.existing_id})` : ''
      toast.error(`Gagal: ${updateResult.message}${debugMsg}`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 4000,
      })
      // Revert to original value
      editableNoSppd.value = currentNoSppdStr
    }
  } catch (error) {
    console.error('Error updating no_sppd:', error)
    toast.done(toastUpdateSPPD)
    noSppdValidationMessage.value = `Error menyimpan nomor ${newNoSppdStr}`
    noSppdIsAvailable.value = false
    toast.error(`Terjadi kesalahan saat menyimpan nomor ${newNoSppdStr}`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
    })
    // Revert to original value
    editableNoSppd.value = currentNoSppdStr
  } finally {
    toast.done(toastUpdateSPPD)
  }
}

async function validateAndUpdateNoSppd() {
  // This function is deprecated, use onNoSppdBlur or onNoSppdEnter instead
  await updateNoSppdIfValid()
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

async function downloadSPTJM() {
  perjadinDetailStore.downloadSptjm()
}

async function toSptjm() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-sptjm',
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
