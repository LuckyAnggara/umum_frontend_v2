<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Nilai Layanan Kami
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  mohon beri nilai atas layanan yang telah kami berikan.
                </p>
              </div>
              <div class="flex flex-col space-y-4 w-full">
                <div class="flex flex-row justify-center">
                  <button
                    type="button"
                    v-for="i in 5"
                    :class="{ 'mr-1': i < 5 }"
                    @click="clickRate(i)"
                    :key="i"
                  >
                    <svg
                      class="block h-12 w-12"
                      :class="[
                        rateStore.form.value >= i
                          ? 'text-yellow-500'
                          : 'text-black',
                      ]"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                      />
                    </svg>
                  </button>
                </div>

                <form class="mx-auto mt-4 w-full">
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
              </div>

              <button
                @click="submit()"
                type="button"
                class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { toast } from 'vue3-toastify'
import { ref, shallowRef } from 'vue'
import { useRateStore } from '@/stores/rate'

const rateStore = useRateStore()

function setIsOpen(value) {
  console.info(value)
}

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

function clickRate(i) {
  rateStore.$patch((state) => {
    state.form.value = i
  })
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
    emit('close')
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
