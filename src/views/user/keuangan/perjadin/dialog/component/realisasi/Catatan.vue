<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Catatan</h2>
    <div class="flex flex-col space-y-5">
      <div class="flex flex-col space-y-4">
        <label for="price" class="block text-sm font-medium text-gray-900 dark:text-white">Buat catatan</label>
        <textarea
          required
          v-model="perjadinCatatan.form.catatan"
          id="message"
          rows="2"
          class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
        <button
          @click="perjadinCatatan.store"
          type="submit"
          class="place-self-end bg-blue-100 hover:bg-blue-200 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <span> Kirim </span>
        </button>
      </div>
      <div class="flex flex-col space-y-8 h-96 overflow-y-scroll overflow-hidden border p-4 rounded-md" v-if="perjadinCatatan.responses">
        <ol class="relative border-s border-gray-200 dark:border-gray-700">
          <li class="mb-5 ms-4" v-for="(item, index) in perjadinCatatan.sortedData" :key="index">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{ item.created_at }}</time>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ item.user.name }}
            </h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {{ item.catatan }}
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from 'vue'

import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { usePerjadinCatatanStore } from '@/stores/perjadinCatatan'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinCatatan = usePerjadinCatatanStore()
const perjadinDetailStore = usePerjadinDetailStore()

onMounted(() => {
  perjadinCatatan.$patch((state) => {
    state.form.perjadin_detail_id = perjadinDetailStore.singleResponse.id
  })
  perjadinCatatan.show(perjadinDetailStore.singleResponse.id)
})
</script>
