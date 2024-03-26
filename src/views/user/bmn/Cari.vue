<template>
  <div class="hello">
    <div v-if="!loaded">
      <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span class="font-medium">Info!</span> harap di tunggu.
      </div>
    </div>
    <StreamBarcodeReader @decode="(a, b, c) => onDecode(a, b, c)" @loaded="onLoaded"></StreamBarcodeReader>
  </div>
</template>

<script setup>
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useBmnStore } from '@/stores/bmn'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const bmnStore = useBmnStore()
const text = ref(null)
const loaded = ref(false)

function onDecode(a, b, c) {
  bmnStore.$patch((state) => {
    state.nup = a
  })
  bmnStore.showNup(a)
  router.push({
    name: 'service-bmn',
    params: {
      nup: a,
    },
  })
}

function onLoaded() {
  loaded.value = true
}
</script>
