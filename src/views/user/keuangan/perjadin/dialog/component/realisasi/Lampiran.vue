<template>
  <div class="text-left w-full">
    <h2 class="text-2xl mb-4">Lampiran Lainnya</h2>

    <div class="flex flex-col space-y-8">
      <div class="flex flex-col space-y-8" v-if="perjadinDetailStore.singleResponse.lampiran.filter((x) => x.type == 'LAINNYA').length > 0">
        <div class="text-left">
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Lampiran</label>

          <small class="text-gray-600">
            <ol class="ps-5 mt-2 space-y-0 list-decimal list-inside">
              <li
                v-for="(item, index) in perjadinDetailStore.singleResponse.lampiran.filter((x) => x.type == 'LAINNYA')"
                :key="index"
                class="text-base w-full rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
              >
                <a :href="`${storageUrl + '/' + item.lampiran}`" :download="item.file_name">
                  <span class="text-gray-500">{{ index + 1 }}.</span>
                  {{ item.file_name }}
                </a>
                <TrashIcon
                  v-if="authStore.user.role == 'USER'"
                  @click="perjadinDetailStore.destroyLampiran(item)"
                  class="cursor-pointer h-5 w-5 hover:-translate-y-1 duration-300 ease-in-out text-red-500"
                />
              </li>
            </ol>
          </small>
        </div>
      </div>
      <div class="flex flex-col space-y-8 w-1/2" v-if="!disabledForm">
        <div class="text-left">
          <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Upload Lampiran</label>

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
  </div>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { IDRCurrency } from '@/utilities/formatter'
import { storageUrl } from '@/services/helper'
import { rupiah } from '@/services/helper'
import { ref } from 'vue'

import { usePerjadinStore } from '@/stores/perjadin'
import { useAuthStore } from '@/stores/auth'
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { TrashIcon, ArrowTopRightOnSquareIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import axiosIns from '@/services/axios'

const authStore = useAuthStore()
const router = useRouter()
const perjadinStore = usePerjadinStore()
const perjadinDetailStore = usePerjadinDetailStore()

const props = defineProps({
  disabledForm: {
    type: Boolean,
    default: false,
  },
})

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })

  perjadinDetailStore.$patch((state) => {
    state.lampiran.lainnya = b
  })
}
</script>
