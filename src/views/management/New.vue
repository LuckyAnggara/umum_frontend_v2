<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="emit('close')" class="relative z-50">
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
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="relative p-4 bg-white w-1/4 rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <!-- Modal header -->
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tambah User</h3>
                <button
                  @click="emit('close')"
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                >
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <!-- Modal body -->

              <form class="text-left" @submit.prevent="emit('submit')">
                <div v-if="authStore.validUsername" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                  <span class="font-medium">Alert!</span> Username sudah sudah ada.
                </div>
                <div class="grid gap-4 mb-4 flex-col">
                  <div>
                    <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor Induk Pegawai*</label>
                    <div class="relative">
                      <input
                        @keyup="search"
                        required
                        v-model="authStore.formNew.nip"
                        type="text"
                        id="nip"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Username"
                      />
                      <button
                        @click="cariPegawai"
                        type="button"
                        class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <svg v-if="!cariPegawaiLoading" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span v-else><ArrowPathIcon class="mx-auto w-4 h-4 animate-spin" /></span>
                      </button>
                    </div>
                  </div>

                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama*</label>
                    <input
                      required
                      v-model="authStore.formNew.name"
                      placeholder="Nama"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit*</label>
                    <input
                      required
                      v-model="authStore.formNew.unit"
                      placeholder="Unit Kerja"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role*</label>

                    <select
                      required
                      v-model="authStore.formNew.role"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </div>
                  <div class="text-left">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password*</label>
                    <input
                      required
                      v-model="authStore.formNew.password"
                      type="password"
                      placeholder="*****"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <button
                    :disabled="authStore.validUsername"
                    type="submit"
                    :class="authStore.validUsername ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'"
                    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <span v-if="authStore.isStoreLoading">
                      <ArrowPathIcon class="h-5 w-5 animate-spin" />
                    </span>
                    <span v-else> Submit </span>
                  </button>

                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="emit('close')"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import FilePond from '@/components/FilePond.vue'
import { onMounted, onUpdated, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { axiosPegawai } from '@/services/axios'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'
import { useMainStore } from '@/stores/main'
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue3-toastify'
const authStore = useAuthStore()
const mainStore = useMainStore()
const cariPegawaiLoading = ref(false)

const emit = defineEmits(['close', 'submit', 'fileChange'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmation ?',
  },
})

const search = useDebounceFn(() => {
  authStore.cekUserName()
}, 500)

async function cariPegawai() {
  cariPegawaiLoading.value = true
  const id = toast.loading('Cari data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  try {
    const response = await fetch(`https://lapkin.bbmakmur.com/api/employee-show/${authStore.formNew.nip}`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            if (data.success == true) {
              toast.update(id, {
                render: 'Berhasil',
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'success',
                autoClose: 1000,
                closeOnClick: true,
                closeButton: true,
                isLoading: false,
              })
              authStore.setDataNewAccount(data.data)
            } else {
              toast.update(id, {
                render: 'tidak dapat ditemukan',
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                autoClose: 1000,
                closeOnClick: true,
                closeButton: true,
                isLoading: false,
              })
            }
          })
          .catch((err) => {
            toast.update(id, {
              render: 'ada permasalahan',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
          })
          .finally(() => {
            toast.done(id)
          })
      })
      .catch((err) => {
        console.error(err)
        toast.update(id, {
          render: 'terjadi kesalahan',
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          autoClose: 1000,
          closeOnClick: true,
          closeButton: true,
          isLoading: false,
        })
      })
  } catch (error) {
    console.error(error)
  } finally {
    cariPegawaiLoading.value = false
  }
}
</script>
