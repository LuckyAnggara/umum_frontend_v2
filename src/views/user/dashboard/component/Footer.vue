<template>
  <div
    class="sticky bottom-2 p-4 px-6 m-2 flex items-center justify-evenly bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer"
  >
    <button
      @click="changeMenu(0)"
      :class="activeMenu == 0 ? 'text-white' : 'hover:text-blue-400'"
      class="flex flex-col items-center transition ease-in duration-200"
    >
      <SquaresPlusIcon class="w-8 h-8" />
    </button>
    <template v-if="authStore.user">
      <button
        @click="changeMenu(2)"
        :class="activeMenu == 2 ? 'text-white' : 'hover:text-blue-400'"
        class="flex flex-col items-center transition ease-in duration-200"
      >
        <BookmarkIcon class="h-8 w-8" />
      </button>
    </template>

    <button
      @click="changeMenu(3)"
      :class="activeMenu == 3 ? 'text-white' : 'hover:text-blue-400'"
      class="flex flex-col items-center transition ease-in duration-200"
    >
      <UserCircleIcon class="h-8 w-8" />
    </button>

    <button
      v-if="authStore.user"
      @click="popRate()"
      :class="activeMenu == 3 ? 'text-white' : 'hover:text-blue-400'"
      class="flex flex-col items-center transition ease-in duration-200"
    >
      <StarIcon class="h-8 w-8" />
    </button>
  </div>
</template>

<script setup>
import {
  StarIcon,
  BookmarkIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
} from '@heroicons/vue/24/solid'

import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useRateStore } from '@/stores/rate'
import { ref } from 'vue'

const activeMenu = defineModel()
const emit = defineEmits(['menu'])

function changeMenu(index) {
  activeMenu.value = index
  emit('menu', index)
}

const authStore = useAuthStore()
const userStore = useUserStore()
const rateStore = useRateStore()

function popRate() {
  rateStore.$patch((state) => {
    state.popShow = true
  })
}
</script>
