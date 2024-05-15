<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="close" class="relative z-50">
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
            <div class="relative p-4 bg-white w-2/4 rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <!-- Modal header -->
              <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Detail Data</h3>
                <button
                  @click="close"
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

              <section v-if="peminjamanBmnStore.singleResponses == null">
                <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
              </section>
              <section v-else>
                <div class="w-full mx-auto px-6 text-left">
                  <div class="flex items-center">
                    <h2 class="ml-2 font-semibold text-gray-800 text-xl">
                      Nomor Tiket :
                      {{ peminjamanBmnStore.singleResponses.tiket }}
                    </h2>
                  </div>

                  <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
                    <div class="px-4 py-2 border-b border-gray-200 flex flex-row">
                      <h2 class="font-semibold text-gray-800">Status</h2>
                      <span class="ml-4 bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{{
                        peminjamanBmnStore.singleResponses.status
                      }}</span>
                    </div>
                  </div>

                  <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
                    <div class="px-4 py-2 border-b border-gray-200">
                      <h2 class="font-semibold text-gray-800">Data BMN</h2>
                    </div>
                    <div class="flex flex-col divide-y divide-gray-200">
                      <div v-if="peminjamanBmnStore.singleResponses" class="p-4 flex flex-col space-y-2">
                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
                          <div class="flex justify-center">
                            <img class="w-60 h-fit object-cover rounded" :src="showImage(peminjamanBmnStore.singleResponses.bmn.image)" alt="Product Image" />
                          </div>
                        </div>

                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NUP</label>
                          <input
                            readonly
                            v-model="peminjamanBmnStore.singleResponses.bmn.nup"
                            type="text"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama BMN</label>
                          <input
                            readonly
                            v-model="peminjamanBmnStore.singleResponses.bmn.nama"
                            type="text"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="px-4 py-2 border-b border-gray-200">
                      <h2 class="font-semibold text-gray-800">Data Penerima Layanan</h2>
                    </div>
                    <div class="flex flex-col divide-y divide-gray-200">
                      <div class="p-4 flex flex-col space-y-2">
                        <div class="text-left">
                          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jenis Layanan</label>
                          <input
                            readonly
                            v-model="peminjamanBmnStore.singleResponses.jenis_layanan"
                            type="text"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
                            <input
                              v-model="peminjamanBmnStore.singleResponses.nip"
                              type="text"
                              id="nip"
                              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="kosongkan jika tidak punya nip"
                            />
                          </div>
                          <div>
                            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Penerima Layanan</label>
                            <input
                              required
                              v-model="peminjamanBmnStore.singleResponses.nama_peminta"
                              type="text"
                              id="nama"
                              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                            <input
                              v-model="peminjamanBmnStore.singleResponses.unit"
                              type="text"
                              id="unit"
                              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor WA</label>
                            <input
                              v-model="peminjamanBmnStore.singleResponses.no_wa"
                              type="text"
                              id="unit"
                              class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              required
                            />
                          </div>
                        </div>
                        <div class="text-left">
                          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
                          <textarea
                            readonly
                            v-model="peminjamanBmnStore.singleResponses.catatan"
                            rows="3"
                            placeholder="Isi dengan catatan yang perlu admin ketahui"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="peminjamanBmnStore.singleResponses.status == 'VERIFIKASI ADMIN'" class="mt-4 flex space-x-4">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="approve"
                    >
                      <span v-if="!peminjamanBmnStore.isStoreLoading"> Approve </span>
                      <span class="flex" v-else><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
                    </button>

                    <button
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      @click="reject"
                    >
                      Reject
                    </button>
                  </div>

                  <div v-if="peminjamanBmnStore.singleResponses.status == 'DONE'" class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
                    <div class="px-4 py-2 border-b border-gray-200">
                      <h2 class="font-semibold text-gray-800">Tanda Terima</h2>
                    </div>
                    <div class="flex flex-col p-6">
                      <div class="text-left flex flex-col space-y-4">
                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerima</label>

                          <input
                            readonly
                            :value="peminjamanBmnStore.singleResponses.penerima"
                            type="text"
                            id="nip"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Isi dengan nama penerima"
                          />
                        </div>
                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Penerimaan</label>
                          <input
                            readonly
                            :value="peminjamanBmnStore.singleResponses.tanggal_diterima"
                            type="text"
                            id="nip"
                            class="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Isi dengan tanggal penerimaan"
                          />
                        </div>
                        <div>
                          <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerima</label>
                          <div class="border-2 rounded-xl p-2">
                            <vue-drawing-canvas
                              :width="410"
                              :height="300"
                              :lineWidth="2"
                              :lock="true"
                              backgroundColor="#FFFFFF"
                              :initial-image="JSON.parse(peminjamanBmnStore.singleResponses.ttd)"
                              saveAs="png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <ApproveDialog :show="approveDialog" @close="approveDialog = !approveDialog" @submit="approveConfirmation">
    <template #title>
      <h1>Konfirmasi ?</h1>
    </template>

    <template #subTitle>
      <span> Apakah Peminjaman BMN ini akan di setujui ?</span>
    </template>
    <template #confirmTitle> <span>Approve</span> </template>
  </ApproveDialog>
  <RejectDialog :show="rejectDialog" @close="rejectDialog = !rejectDialog" @submit="rejectConfirmation">
    <template #title>
      <h1>Konfirmasi ?</h1>
    </template>

    <template #subTitle>
      <span> Apakah Peminjaman BMN ini akan di tolak ?</span>
    </template>
    <template #confirmTitle> <span>Approve</span> </template>
  </RejectDialog>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog } from '@headlessui/vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import { usePeminjamanBmn } from '@/stores/peminjamanBmn'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { computed, inject, onMounted, onUpdated, ref } from 'vue'

import ApproveDialog from '@/components/ConfirmDialog.vue'
import RejectDialog from '@/components/ConfirmDialog.vue'

import VueDrawingCanvas from 'vue-drawing-canvas'

const swal = inject('$swal')

const rejectDialog = ref(false)
const approveDialog = ref(false)

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'approve', 'reject'])

function close() {
  emit('close')
}

const peminjamanBmnStore = usePeminjamanBmn()

const route = useRoute()

async function approveConfirmation() {
  const result = await peminjamanBmnStore.update({ status: 'APPROVE' })
}

function approve() {
  approveDialog.value = true
  // swal.fire({
  //   title: 'Setujui Peminjaman?',
  //   text: 'Peminjaman BMN ini akan di setujui!',
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonText: 'Approve!',
  //   cancelButtonText: 'Cancel!',
  //   showLoaderOnConfirm: true,
  //   reverseButtons: true,
  //   preConfirm: async () => {
  //     const result = await peminjamanBmnStore.update({ status: 'APPROVE' })
  //     if (result) {
  //       swal.fire({
  //         title: 'Approved!',
  //         text: 'Perminjaman di Setujui.',
  //         icon: 'success',
  //       })
  //     } else {
  //       swal.fire({
  //         title: 'Oopss',
  //         text: 'Error',
  //         icon: 'error',
  //       })
  //     }
  //   },
  //   allowOutsideClick: () => !peminjamanBmnStore.isStoreLoading,
  //   backdrop: true,
  // })
}
function reject() {
  rejectDialog.value = true
}

function showImage(image) {
  if (image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + '/' + image
  return a
}

onUpdated(async () => {
  await peminjamanBmnStore.show(peminjamanBmnStore.tiketToShow)
})
</script>
