<template>
  <div class="mx-auto w-full px-4">
    <section v-if="perjadinDetailStore.singleResponse == null">
      <span class="flex"
        ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
      /></span>
    </section>
    <template v-else>
      <div
        class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible"
      >
        <div
          class="justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div
            class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4"
          >
            <div
              class="flex flex-row justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
            >
              <Breadcumb />
              <span
                v-if="perjadinDetailStore.singleResponse.status == 'UNVERIFIED'"
                class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                >{{ perjadinDetailStore.singleResponse.status }}</span
              >
              <span
                v-else
                class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >{{ perjadinDetailStore.singleResponse.status }}</span
              >
            </div>
            <!-- Modal body -->
            <div
              v-if="authStore.user.role == 'ADMIN'"
              class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info!</span> Verifikasi kelengkapan
                data pertanggung jawaban
              </div>
            </div>
            <div
              v-else
              class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <svg
                class="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">Info!</span> Selalu periksa catatan
                untuk melihat catatan dari Verifikator !
              </div>
            </div>
            <div class="flex flex-col min-h-[75vh]">
              <div class="flex flex-row space-x-6 min-h-[75vh]">
                <ol class="space-y-4 w-1/5">
                  <li v-for="(step, index) in steps" :key="index">
                    <div
                      @click="currentStep = index"
                      :class="
                        currentStep == index
                          ? 'cursor-not-allowed w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400'
                          : 'cursor-pointer w-full p-4 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                      "
                      role="alert"
                    >
                      <div class="flex items-center justify-between">
                        <span class="sr-only">{{ step }}</span>
                        <h3 class="font-medium">{{ step }}</h3>
                        <ArrowRightIcon
                          v-if="currentStep == index"
                          class="w-4 h-4"
                        />
                      </div>
                    </div>
                  </li>
                </ol>

                <div class="w-4/5 flex flex-col justify-between">
                  <KeepAlive>
                    <Umum :key="umumRef" v-if="currentStep == 0" />
                  </KeepAlive>
                  <KeepAlive>
                    <UangHarian
                      :key="uhRef"
                      v-if="currentStep == 1"
                      :disabledForm="disabledForm"
                    />
                  </KeepAlive>
                  <KeepAlive>
                    <Hotel
                      :key="hotelRef"
                      v-if="currentStep == 2"
                      :disabledForm="disabledForm"
                    />
                  </KeepAlive>

                  <KeepAlive>
                    <Transport
                      :key="transportRef"
                      v-if="currentStep == 3"
                      :disabledForm="disabledForm"
                    />
                  </KeepAlive>
                  <KeepAlive>
                    <Representatif
                      :key="repRef"
                      v-if="currentStep == 4"
                      :disabledForm="disabledForm"
                    />
                  </KeepAlive>
                  <KeepAlive>
                    <Lampiran
                      :key="lampiranRef"
                      v-if="currentStep == 5"
                      :disabledForm="disabledForm"
                    />
                  </KeepAlive>

                  <Catatan v-if="currentStep == 6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row justify-between">
        <div class="flex items-center space-x-1 mt-4 text-center justify-end">
          <button
            @click="currentStep--"
            :disabled="currentStep == 0"
            :class="currentStep == 0 ? 'cursor-not-allowed' : ''"
            type="button"
            class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Back
          </button>

          <button
            @click="++currentStep"
            :disabled="currentStep == 4"
            :class="currentStep == 4 ? 'cursor-not-allowed' : ''"
            type="button"
            class="w-24 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
          >
            Next
          </button>
        </div>
        <div
          class="flex items-center space-x-1 mt-4 text-center justify-end"
          v-if="
            authStore.user.role == 'USER' &&
            perjadinDetailStore.singleResponse.status == 'UNVERIFIED'
          "
        >
          <button
            @click="perjadinDetailStore.reset()"
            type="button"
            class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Reset
          </button>

          <button
            @click="confirmSubmit()"
            type="button"
            class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
        <div
          class="flex items-center space-x-1 mt-4 text-center justify-end"
          v-if="authStore.user.role == 'ADMIN'"
        >
          <button
            v-if="perjadinDetailStore.singleResponse.status == 'UNVERIFIED'"
            @click="verifiedSubmit(true)"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Verified
          </button>

          <button
            @click="verifiedSubmit(false)"
            v-else-if="
              perjadinDetailStore.singleResponse.status == 'VERIFIED' &&
              perjadinDetailStore.singleResponse.master.status !== 'SELESAI'
            "
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Unverified
          </button>
        </div>
      </div>
      <ConfirmationDialog
        :overflowVisible="true"
        :show="confirmDialog"
        @submit="submit()"
        @close="confirmDialog = !confirmDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Confirmation</h1>
        </template>

        <template #content>
          <span class="text-justify w-full text-gray-700"
            >Pertanggung jawaban
            {{ perjadinDetailStore.singleResponse.nama }} akan di perbaharui
            untuk di Verifikasi Admin
          </span>
        </template>
      </ConfirmationDialog>

      <ConfirmationDialog
        :overflowVisible="true"
        :show="verifiedDialog"
        @submit="submitVerfied()"
        @close="verifiedDialog = !verifiedDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Verified ?</h1>
        </template>

        <template #content>
          <span
            v-if="perjadinDetailStore.updateData.status == 'VERIFIED'"
            class="text-justify w-full text-gray-700"
            >Apa anda yakin data pertanggung jawaban ini sudah lengkap?
          </span>
          <span v-else class="text-justify w-full text-gray-700"
            >Apa anda yakin data pertanggung jawaban ini akan dibatalkan
            Verifikasinya?
          </span>
        </template>
      </ConfirmationDialog>
    </template>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import Catatan from './dialog/component/realisasi/Catatan.vue'
import UangHarian from './dialog/component/realisasi/UangHarian.vue'
import Umum from './dialog/component/realisasi/Umum.vue'
import Hotel from './dialog/component/realisasi/Hotel.vue'
import Transport from './dialog/component/realisasi/Transport.vue'
import Representatif from './dialog/component/realisasi/Representatif.vue'
import Lampiran from './dialog/component/realisasi/Lampiran.vue'
import { toast } from 'vue3-toastify'
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { usePerjadinStore } from '@/stores/perjadin'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcumb from './component/Breadcumb.vue'
import ConfirmationDialog from '@/components/Dialog.vue'

const route = useRoute()
const umumRef = ref(null)
const uhRef = ref(null)
const hotelRef = ref(null)
const transportRef = ref(null)
const lampiranRef = ref(null)
const repRef = ref(null)

const perjadinDetailStore = usePerjadinDetailStore()
const authStore = useAuthStore()
const confirmDialog = ref(false)
const verifiedDialog = ref(false)

const currentStep = ref(0)
const steps = ref([
  'Umum',
  'Uang Harian',
  'Penginapan',
  'Transport',
  'Representatif',
  'Lampiran Lainnya',
  'Catatan',
])

const disabledForm = computed(() => {
  if (authStore.user.role == 'ADMIN') return true
  if (perjadinDetailStore.singleResponse.status == 'VERIFIED') return true
  return false
})

function confirmSubmit() {
  confirmDialog.value = true
}

function verifiedSubmit(x) {
  if (x == true) {
    perjadinDetailStore.$patch((state) => {
      state.updateData.status = 'VERIFIED'
      state.updateData.catatan =
        'SPPD NO ' +
        perjadinDetailStore.singleResponse.no_sppd +
        ' Telah di Verifikasi'
    })
  } else {
    perjadinDetailStore.$patch((state) => {
      state.updateData.status = 'UNVERIFIED'
      state.updateData.catatan =
        'SPPD NO ' +
        perjadinDetailStore.singleResponse.no_sppd +
        ' Telah di batalkan Verifikasinya'
    })
  }
  verifiedDialog.value = true
}

function resetComponent() {
  hotelRef.value++
  transportRef.value++
  uhRef.value++
  lampiranRef.value++
  repRef.value++
}

async function submit() {
  const id = toast.loading('Pertanggung jawaban sedang di perbaharui...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.store()
  if (success.status) {
    resetComponent()

    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    confirmDialog.value = !confirmDialog.value
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

async function submitVerfied() {
  const id = toast.loading('Pertanggung jawaban sedang di verifikasi...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.updateStatus()
  if (success.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    verifiedDialog.value = !verifiedDialog.value
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

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await perjadinDetailStore.show(id.value)
})
</script>
