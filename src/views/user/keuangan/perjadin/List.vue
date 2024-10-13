<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->
    <div class="flex flex-row justify-between mb-5">
      <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex flex-wrap -mb-px">
          <li class="me-2">
            <a
              @click="currentStep = 0"
              :class="
                currentStep == 0
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              "
              class="cursor-pointer"
              >Surat Perintah</a
            >
          </li>

          <li class="me-2">
            <a
              @click="currentStep = 1"
              :class="
                currentStep == 1
                  ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                  : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              "
              class="cursor-pointer"
              aria-current="page"
              >Nomor SPPD</a
            >
          </li>
        </ul>
      </div>

      <div
        class="place-self-end w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0"
      >
        <button
          v-if="authStore.role == 'USER'"
          @click="onNew()"
          type="button"
          class="text-gray-900 w-fit flex flex-row space-x-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <FolderPlusIcon class="h-5" /> <span>Baru</span>
        </button>
      </div>
    </div>

    <div>
      <SuratPerintah v-if="currentStep == 0" />
      <NoSppd v-if="currentStep == 1" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinStore } from '@/stores/perjadin'
import { useRouter } from 'vue-router'
import { FolderPlusIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
const authStore = useAuthStore()
const router = useRouter()

const SuratPerintah = defineAsyncComponent(() =>
  import('./component/list/SuratPerintah.vue')
)
const NoSppd = defineAsyncComponent(() => import('./component/list/NoSppd.vue'))

const currentStep = ref(0)

function onNew() {
  perjadinStore.resetFormMain()
  perjadinStore.$patch((state) => {
    state.isDetail = false
  })
  router.push({ name: 'perjadin-new' })
}
</script>
