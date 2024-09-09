<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="relative p-4 bg-white w-2/4 rounded-lg shadow dark:bg-gray-800 sm:p-5 min-h-[75vh]"
            >
              <!-- Modal header -->
              <div
                class="flex justify-start items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  <span v-if="!isEdit">Tambah Data</span>
                  <span v-else>Update Data</span>
                </h3>
                <button
                  @click="emit('close')"
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
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
                            ? 'w-full p-4 text-blue-700 bg-blue-100 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400'
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
                    <Umum v-if="currentStep == 0" />
                    <Hotel v-else-if="currentStep == 1" />
                    <UangHarian v-else-if="currentStep == 2" />
                    <Transport v-else-if="currentStep == 3" />
                    <!-- <Pesawat v-else-if="currentStep == 4" />
                    <Darat v-else-if="currentStep == 5" /> -->
                    <Representatif v-else-if="currentStep == 4" />
                  </div>
                </div>
              </div>

              <div class="flex flex-row justify-between">
                <div
                  class="flex items-center space-x-1 mt-4 text-center justify-end"
                >
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
                >
                  <button
                    v-if="isEdit == false"
                    @click="perjadinStore.resetFormPegawai()"
                    type="button"
                    class="w-24 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    Reset
                  </button>
                  <button
                    v-else
                    @click="destroy()"
                    type="button"
                    class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                  >
                    Hapus
                  </button>
                  <button
                    @click="submit()"
                    type="button"
                    class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import Umum from './component/detail/Umum.vue'
import Hotel from './component/detail/Hotel.vue'
import UangHarian from './component/detail/UangHarian.vue'
import Transport from './component/detail/Transport.vue'

import Representatif from './component/detail/Representatif.vue'

import { usePerjadinStore } from '@/stores/perjadin'
const perjadinStore = usePerjadinStore()

const emit = defineEmits(['close', 'submit', 'update', 'destroy'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})
const currentStep = ref(0)
const steps = ref([
  'Umum',
  'Penginapan',
  'Uang Harian',
  'Transportasi',
  // 'Pesawat',
  // 'Darat',
  'Representatif',
])

function submit() {
  if (props.isEdit == true) {
    emit('update')
  } else {
    emit('submit')
  }
}

function destroy() {
  emit('destroy')
}
</script>
