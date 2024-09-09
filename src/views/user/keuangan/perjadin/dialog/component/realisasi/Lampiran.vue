<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Lampiran</h2>

    <div class="flex flex-col space-y-8">
      <div class="text-left">
        <label
          for="name"
          class="block text-sm font-medium text-gray-900 dark:text-white"
          >Upload Lampiran</label
        >

        <small class="text-gray-600">
          <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
            <li>Kuitansi Hotel</li>
            <li>Boarding Pass</li>
            <li>
              Lampiran lainnya untuk
              <span class="font-semibold">pertanggung jawaban</span>
            </li>
          </ol>
        </small>
        <FilePond
          :label="'Drop lampiran disini ...'"
          :multiple="true"
          @fileChange="fileChange"
          class="mt-4"
          :type="'application/pdf, application/msword,application/vnd.openxmlformats,application/vnd.ms-excel,officedocument.spreadsheetml.sheet, image/jpeg, image/png'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { TrashIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })

  perjadinStore.$patch((state) => {
    state.singleDetail.newLampiran = b
  })
}
</script>
