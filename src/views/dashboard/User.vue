<template>
  <section>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 px-14"
    >
      <div
        class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md"
      >
        <div class="h-full flex flex-col justify-center rounded-[25px] p-8">
          <div class="h-12">
            <StarIcon class="text-yellow-500 h-12 w-12" />
          </div>
          <div class="my-2">
            <h2 class="text-4xl font-bold"><span>4.7 / 5</span></h2>
          </div>

          <div>
            <p class="font-sans text-base font-medium text-gray-500">
              Kepuasan Layanan
            </p>
          </div>
        </div>
      </div>

      <div
        class="border-2 rounded-lg border-gray-300 dark:border-gray-600 h-12 md:h-64 bg-white shadow-md"
      >
        <div class="h-full flex flex-col justify-center rounded-[25px] p-8">
          <div class="h-12">
            <CheckBadgeIcon class="text-yellow-500 h-12 w-12" />
          </div>
          <div class="my-2">
            <h2 class="text-4xl font-bold">
              <span>100 / 150</span>
            </h2>
          </div>

          <div>
            <p class="font-sans text-base font-medium text-gray-500">
              Layanan Terselesaikan
            </p>
          </div>
        </div>
      </div>
      <!-- <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div>
      <div
        class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
      ></div> -->
    </div>
  </section>
</template>

<script setup>
import { CheckBadgeIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'
</script>
