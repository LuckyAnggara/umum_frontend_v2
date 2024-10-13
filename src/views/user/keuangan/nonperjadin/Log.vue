<template>
  <div
    :class="isShow == true ? '-translate-x-0' : 'translate-x-full'"
    class="fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800 shadow-lg"
    tabindex="-1"
    aria-labelledby="drawer-right-label"
  >
    <h5
      id="drawer-navigation-label"
      class="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
    >
      Log Belanja Non Perjadin
    </h5>
    <button
      @click="emit('close')"
      type="button"
      data-drawer-hide="drawer-navigation"
      aria-controls="drawer-navigation"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="py-4 overflow-y-auto px-6">
      <ol class="relative border-s border-gray-200 dark:border-gray-700">
        <li
          class="mb-10 ms-4"
          v-for="(item, index) in nonPerjadinStore.singleResponse.log"
          :key="index"
        >
          <div
            class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
          ></div>
          <time
            class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
            >{{ item.created_at }}</time
          >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ item.status }}
          </h3>
          <p
            class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400"
          >
            {{ item.catatan }}
          </p>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { useNonPerjadinStore } from '@/stores/nonperjadin'

const emit = defineEmits(['close'])
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
})

const nonPerjadinStore = useNonPerjadinStore()
</script>
