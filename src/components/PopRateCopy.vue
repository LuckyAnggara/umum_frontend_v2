<template>
  <van-popup
    :show="rateStore.popShow"
    position="bottom"
    :style="{ height: '40%' }"
    round
    @click-close-icon="naon()"
    closeable
  >
    <div class="p-6 text-sm">
      <h5
        class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Nilai Layanan Kami
      </h5>
      <p class="font-normal text-gray-700 dark:text-gray-400">
        mohon beri nilai atas layanan yang telah kami berikan.
      </p>
      <div class="flex justify-center mt-4">
        <van-rate
          v-model="rateStore.form.value"
          :size="50"
          color="#ffd21e"
          void-icon="star"
          void-color="#eee"
        />
      </div>

      <form class="max-w-sm mx-auto mt-4">
        <label
          for="message"
          class="block mb-1 text-sm font-medium text-gray-600 dark:text-white"
          >Saran Perbaikan</label
        >
        <textarea
          v-model="rateStore.form.saran"
          id="message"
          rows="3"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="berikan komentar..."
        ></textarea>
      </form>

      <button
        @click="submit()"
        type="button"
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </div>
  </van-popup>
</template>

<script setup>
import { toast } from 'vue3-toastify'
import { ref, shallowRef } from 'vue'
import { useRateStore } from '@/stores/rate'

const rateStore = useRateStore()

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

function naon() {
  rateStore.popShow = false
}

async function submit() {
  const id = toast.loading('Rating sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const success = await rateStore.store()

  rateStore.$patch((state) => {
    state.popShow = false
    state.form.value = 0
    state.form.saran = null
  })
  if (success.status) {
    toast.update(id, {
      render: 'Terima kasih atas penilaian anda !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
  toast.done(id)
}
</script>
