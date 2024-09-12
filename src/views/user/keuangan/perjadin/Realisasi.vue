<template>
  <div class="mx-auto w-full px-4">
    <section v-if="perjadinDetailStore.singleResponse == null">
      <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
    </section>
    <template v-else>
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
          <div class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4">
            <div class="flex flex-row justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <Breadcumb />
              <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{{
                perjadinDetailStore.singleResponse.status
              }}</span>
            </div>
            <!-- Modal body -->
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
                        <ArrowRightIcon v-if="currentStep == index" class="w-4 h-4" />
                      </div>
                    </div>
                  </li>
                </ol>

                <div class="w-4/5 flex flex-col justify-between">
                  <Umum v-show="currentStep == 0" />
                  <UangHarian v-show="currentStep == 1" />
                  <Hotel v-show="currentStep == 2" />
                  <Transport v-show="currentStep == 3" />
                  <Representatif v-show="currentStep == 4" />
                  <Catatan v-show="currentStep == 5" />
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
              <div class="flex items-center space-x-1 mt-4 text-center justify-end">
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
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog :overflowVisible="true" :show="confirmDialog" @submit="submit()" @close="confirmDialog = !confirmDialog" :canSubmit="true">
        <template #title>
          <h1>Confirmation</h1>
        </template>

        <template #content>
          <span class="text-justify w-full text-gray-700"
            >Apa anda yakin pertanggung jawaban {{ perjadinDetailStore.singleResponse.nama }} selesai di Input?</span
          >
        </template>
      </ConfirmationDialog>
    </template>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

import Catatan from './dialog/component/realisasi/Catatan.vue'
import UangHarian from './dialog/component/realisasi/UangHarian.vue'
import Umum from './dialog/component/realisasi/Umum.vue'
import Hotel from './dialog/component/realisasi/Hotel.vue'
import Transport from './dialog/component/realisasi/Transport.vue'
import Representatif from './dialog/component/realisasi/Representatif.vue'
import { toast } from 'vue3-toastify'
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import { usePerjadinStore } from '@/stores/perjadin'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Breadcumb from './component/Breadcumb.vue'
import ConfirmationDialog from '@/components/Dialog.vue'

const route = useRoute()

const perjadinDetailStore = usePerjadinDetailStore()
const confirmDialog = ref(false)

const emit = defineEmits(['close'])

const currentStep = ref(0)
const steps = ref(['Umum', 'Uang Harian', 'Penginapan', 'Transport', 'Representatif', 'Catatan'])

function confirmSubmit() {
  confirmDialog.value = true
}

async function submit() {
  const id = toast.loading('Pertanggung jawaban sedang di buat...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinDetailStore.store()
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

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await perjadinDetailStore.show(id.value)
})
</script>
