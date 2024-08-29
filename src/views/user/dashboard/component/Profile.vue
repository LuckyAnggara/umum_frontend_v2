<template>
  <div
    class="flex flex-col justify-center items-center h-[100vh] bg-contain bg-center bg-black-500/50"
  >
    <div
      class="relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
    >
      <div class="relative flex h-32 w-full justify-center rounded-xl bg-cover">
        <img
          src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/banner.ef572d78f29b0fee0a09.png"
          class="absolute flex h-32 w-full justify-center rounded-xl bg-cover"
        />
        <div
          class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700"
        >
          <img class="h-full w-full rounded-full" :src="Avatar" alt="" />
        </div>
      </div>
      <div class="mt-16 flex flex-col items-center">
        <h4 class="text-xl font-bold text-navy-700 dark:text-white">
          {{ authStore.user.name }}
        </h4>
        <p class="text-base font-normal text-gray-600">
          {{ authStore.user.nip }}
        </p>
        <p class="text-base font-normal text-gray-600">
          {{ authStore.user.unit }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from '@/assets/avatar.png'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'

const authStore = useAuthStore()
</script>
