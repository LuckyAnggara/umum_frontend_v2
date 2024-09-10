<script setup>
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
const perjadinDetailStore = usePerjadinDetailStore()
</script>

<template>
  <nav
    class="flex"
    aria-label="Breadcrumb"
    v-if="perjadinDetailStore.singleResponse != null"
  >
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
    >
      <li class="inline-flex items-center">
        <span
          class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400"
        >
          Realisasi
        </span>
      </li>
      <li>
        <div class="flex items-center">
          <ChevronRightIcon class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
          <router-link
            :to="{
              name: 'perjadin-detail',
              params: { id: perjadinDetailStore.singleResponse.perjadin_id },
            }"
            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ perjadinDetailStore.singleResponse.master?.no_st }}</router-link
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <ChevronRightIcon class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
          <span
            class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
          >
            {{ perjadinDetailStore.singleResponse.no_sppd }}</span
          >
        </div>
      </li>
    </ol>
  </nav>
</template>
