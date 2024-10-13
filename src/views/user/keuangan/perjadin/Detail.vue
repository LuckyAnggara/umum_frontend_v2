<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->
    <section v-if="perjadinStore.singleResponse == null">
      <span class="flex"
        ><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin"
      /></span>
    </section>
    <template v-else>
      <div
        class="justify-center items-center w-full md:inset-0 h-modal md:h-full"
      >
        <div
          class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4"
        >
          <ol
            class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base"
          >
            <li
              @click="currentStep = index"
              v-for="(step, index) in steps"
              :key="index"
              :class="
                currentStep == index ? 'text-blue-600 dark:text-blue-500' : ''
              "
              class="cursor-pointer flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
            >
              <span
                class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
              >
                <CheckCircleIcon class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" />
                {{ step }} <span class="hidden sm:inline-flex sm:ms-2"></span>
              </span>
            </li>
          </ol>
          <!-- Modal content -->
          <span
            v-if="isEditAll"
            class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-2.5 rounded dark:bg-green-900 dark:text-green-300"
          >
            EDIT MODE</span
          >
          <Perencanaan v-if="currentStep == 0" :isEdit="isEditAll" />
          <Detail
            :isEdit="isEditAll"
            v-if="currentStep == 1"
            @openModal="openModal"
            @deletePegawai="deletePegawai()"
            @openRabModal="openRabModal"
          />
          <Lampiran v-if="currentStep == 2" :isEdit="isEditAll" />
          <Realisasi v-if="currentStep == 3" />

          <div>
            <div class="flex items-center space-x-1 text-center justify-start">
              <button
                @click="openLogDrawer()"
                type="button"
                class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Log
              </button>
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex items-center space-x-1 text-center justify-end">
              <button
                @click="currentStep--"
                :disabled="currentStep == 0"
                :class="currentStep == 0 ? 'cursor-not-allowed' : ''"
                type="button"
                class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Back
              </button>

              <button
                @click="++currentStep"
                :disabled="currentStep == steps.length - 1"
                :class="
                  currentStep == steps.length - 1 ? 'cursor-not-allowed' : ''
                "
                type="button"
                class="w-24 text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              >
                Next
              </button>
            </div>
            <div
              v-if="
                authStore.role == 'USER' &&
                perjadinStore.singleResponse.status == 'PERENCANAAN'
              "
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                v-if="isEditAll"
                @click="openConfirm()"
                type="button"
                class="w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Update
              </button>
              <button
                v-if="isEditAll"
                @click="cancelEditAll()"
                type="button"
                class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-green-800"
              >
                Cancel
              </button>
              <!-- <button
                v-if="!isEditAll"
                @click="isEditAll = true"
                type="button"
                class="flex flex-row w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <span>
                  <PaperAirplaneIcon class="h-5 w-5 mr-2" />
                </span>
                Kirim
              </button> -->
              <div v-if="!isEditAll" class="flex flex-row space-x-2">
                <button
                  @click="onSend()"
                  type="button"
                  class="flex flex-row w-24 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                >
                  <span>
                    <PaperAirplaneIcon class="h-5 w-5 mr-2" />
                  </span>
                  Kirim
                </button>

                <button
                  @click="isEditAll = true"
                  type="button"
                  class="flex flex-row w-24 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
                >
                  <span>
                    <PencilSquareIcon class="h-5 w-5 mr-2" />
                  </span>
                  Edit
                </button>

                <button
                  @click="onDelete()"
                  type="button"
                  class="flex flex-row w-fit text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                >
                  <span>
                    <TrashIcon class="h-5 w-5 mr-2" />
                  </span>
                  Hapus
                </button>
              </div>
            </div>

            <div
              v-else-if="
                authStore.role == 'ADMIN' &&
                perjadinStore.singleResponse.status == 'VERIFIKASI'
              "
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                @click="openVerifikasi()"
                type="button"
                class="w-48 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                TERBITKAN KUITANSI
              </button>
            </div>
            <div
              v-else-if="
                authStore.role == 'ADMIN' &&
                perjadinStore.singleResponse.status == 'PERTANGGUNG JAWABAN' &&
                perjadinStore.allRealisasiVerified
              "
              class="flex items-center space-x-1 mt-4 text-center justify-end"
            >
              <button
                @click="openSelesai()"
                type="button"
                class="w-48 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                SELESAI
              </button>
            </div>
          </div>
        </div>
      </div>

      <Log :is-show="showLog" @close="showLog = !showLog" />
      <PegawaiModal
        :isEdit="isEdit"
        :show="pegawaiModal"
        @destroy="deletePegawai()"
        @close="pegawaiModal = false"
        @submit="tambahPegawai()"
        @update="updatePegawai()"
      />

      <Dialog
        :overflowVisible="true"
        :show="confirmDialog"
        @submit="update()"
        @close="confirmDialog = !confirmDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Konfirmasi</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-4 mt-6">
            <div class="text-left">Apa anda yakin akan mengubah data ?</div>
          </div>
        </template>
      </Dialog>

      <Dialog
        :overflowVisible="true"
        :show="verifikasiDialog"
        @submit="updateStatusData({ status: 'kuitansi' })"
        @close="verifikasiDialog = !verifikasiDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Terbitkan Kuitansi</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-4 mt-3">
            <div class="text-left font-medium text-xl">
              Pastikan seluruh dokumen sudah lengkap!
            </div>
            <small class="text-gray-700"
              >Kuitansi dan Nomor SPPD akan diterbikan! <br />
              Asumsi anggaran menggunakan LS!</small
            >
            <div class="flex flex-col space-y-2">
              <div class="text-left">
                <label
                  for="years"
                  class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                  >Bendahara Pengeluaran*</label
                >
                <v-select
                  :label="'nama'"
                  :options="mainStore.bendaharaOptions"
                  v-model="perjadinStore.updateData.bendahara"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!perjadinStore.updateData.bendahara"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template #no-options> Tidak ada data .. </template>
                  <template #option="option">
                    <div class="flex flex-col">
                      <span>{{ option.nama }}</span>
                      <span>{{ option.nip }}</span>
                    </div>
                  </template>
                </v-select>
              </div>
              <div class="text-left">
                <label
                  for="years"
                  class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                  >Pejabat Pembuat Komitmen*</label
                >
                <v-select
                  :label="'nama'"
                  :options="mainStore.ppkOptions"
                  v-model="perjadinStore.updateData.ppk"
                >
                  <template #search="{ attributes, events }">
                    <input
                      class="vs__search"
                      :required="!perjadinStore.updateData.ppk"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                  <template #no-options> Tidak ada data .. </template>
                  <template #option="option">
                    <div class="flex flex-col">
                      <span>{{ option.nama }}</span>
                      <span>{{ option.nip }}</span>
                    </div>
                  </template>
                </v-select>
              </div>
            </div>
            <div>
              <label
                for="message"
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Catatan</label
              >
              <textarea
                placeholder="Isi catatan disini"
                v-model="perjadinStore.updateData.catatan"
                id="message"
                rows="2"
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </template>
      </Dialog>

      <Dialog
        :overflowVisible="true"
        :show="selesaiDialog"
        @submit="updateStatusData({ status: 'ptj' })"
        @close="selesaiDialog = !selesaiDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Confirmation</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-4 mt-3">
            <div class="text-left font-medium text-xl">
              Apa anda yakin seluruh pegawai telah melakukan pertanggung jawaban
              ??
            </div>
            <small class="text-gray-700"
              >Status Berkas akan di ubah menjadi SELESAI!</small
            >
          </div>
        </template>
      </Dialog>

      <DeleteDialog
        :show="deleteDialog"
        @submit="deleteData"
        @close="deleteDialog = !deleteDialog"
      />

      <Dialog
        :overflowVisible="true"
        :show="sendDialog"
        @submit="sendData"
        @close="sendDialog = !sendDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Kirim Berkas</h1>
          <small>Berkas akan di kirim untuk dilakukan Verifikasi</small>
        </template>

        <template #content>
          <div class="flex w-full flex-col space-y-4">
            <div class="text-left">
              <label
                for="years"
                class="block text-sm font-medium text-gray-900 dark:text-white mr-2"
                >Tujuan</label
              >
              <select
                v-model="perjadinStore.updateData.status"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="VERIFIKASI">KEUANGAN</option>
              </select>
            </div>
            <div>
              <label
                for="price"
                class="block text-sm font-medium text-gray-900 dark:text-white"
                >Catatan</label
              >
              <textarea
                placeholder="Isi catatan disini"
                v-model="perjadinStore.updateData.catatan"
                id="message"
                rows="2"
                class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
        </template>
      </Dialog>

      <Dialog
        :overflowVisible="true"
        :show="rabDialog"
        @submit="updateStatusData({ status: 'rab' })"
        @close="rabDialog = !rabDialog"
        :canSubmit="true"
      >
        <template #title>
          <h1>Rencana Anggaran Biaya</h1>
        </template>

        <template #content>
          <div class="flex flex-col space-y-2 mt-3">
            <div class="text-left font-medium text-xl">
              Pastikan detail RAB sudah lengkap!
            </div>
            <small class="text-gray-700"
              >RAB akan di buat, tolong isikan penandatangan</small
            >
            <div class="flex flex-col space-y-2">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Koordinator Keuangan</label
                >
                <div class="relative w-full">
                  <input
                    v-model="perjadinStore.singleResponse.nip_kapokja"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Isi dengan NIP Koordinator Keuangan"
                    required
                  />

                  <button
                    @click="perjadinStore.searchLapkin({ jenis: 'kapokja' })"
                    type="button"
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <MagnifyingGlassIcon
                      class="w-4 h-4"
                      v-if="!perjadinStore.isSearching"
                    />
                    <ArrowPathIcon class="w-4 h-4 animate-spin" v-else />
                  </button>
                </div>

                <div
                  v-if="perjadinStore.singleResponse.kapokja"
                  id="alert-3"
                  class="mt-2 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <svg
                    class="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-3 text-sm font-medium">
                    {{ perjadinStore.singleResponse.kapokja }}
                  </div>
                  <button
                    @click="kapokjaReset()"
                    type="button"
                    class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-3"
                    aria-label="Close"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Pengusul*</label
                >
                <div class="relative w-full">
                  <input
                    v-model="perjadinStore.singleResponse.nip_pengusul"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Isi dengan Nomor Induk Pegawai"
                    required
                  />
                  <button
                    @click="perjadinStore.searchLapkin({ jenis: 'pengusul' })"
                    type="button"
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <MagnifyingGlassIcon
                      class="w-4 h-4"
                      v-if="!perjadinStore.isSearching"
                    />
                    <ArrowPathIcon class="w-4 h-4 animate-spin" v-else />
                  </button>
                </div>

                <div
                  v-if="perjadinStore.singleResponse.pengusul"
                  id="alert-3"
                  class="mt-2 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <svg
                    class="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-3 text-sm font-medium">
                    {{ perjadinStore.singleResponse.pengusul }}
                  </div>
                  <button
                    @click="pengusulReset()"
                    type="button"
                    class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-3"
                    aria-label="Close"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="text-left">
                <label
                  for="unit"
                  class="block text-sm font-medium text-gray-900 dark:text-white"
                  >Tanggal RAB</label
                >
                <VueDatePicker
                  v-model="perjadinStore.singleResponse.tanggal_rab"
                  required
                  :format="'dd MMMM yyyy'"
                  auto-apply
                  date-picker
                  locale="id"
                ></VueDatePicker>
              </div>
            </div>
            <div class="place-self-end mt-4">
              <button
                @click="toRab()"
                type="submit"
                class="w-32 flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-xs font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                <span>Lihat RAB</span
                ><ArrowTopRightOnSquareIcon class="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </template>
      </Dialog>
    </template>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useMainStore } from '@/stores/main'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  ArrowDownTrayIcon,
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/outline'

import { toast } from 'vue3-toastify'

import { usePerjadinStore } from '@/stores/perjadin'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

import DeleteDialog from '@/components/DeleteDialog.vue'
const router = useRouter()

const PegawaiModal = defineAsyncComponent(() =>
  import('./dialog/ModalDetailPegawai.vue')
)
const Perencanaan = defineAsyncComponent(() =>
  import('./component/Perencanaan.vue')
)
const Detail = defineAsyncComponent(() => import('./component/Detail.vue'))
const Realisasi = defineAsyncComponent(() =>
  import('./component/Realisasi.vue')
)
const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))
const Lampiran = defineAsyncComponent(() => import('./component/Lampiran.vue'))
const Log = defineAsyncComponent(() => import('./component/Log.vue'))

const mainStore = useMainStore()
const authStore = useAuthStore()
const route = useRoute()
const perjadinStore = usePerjadinStore()
const isEdit = ref(false)
const isEditAll = ref(false)
const pegawaiModal = ref(false)
const currentStep = ref(0)
const rabDialog = ref(false)

const steps = computed(() => {
  return [
    'Perencanaan',
    'Detail',
    'Lampiran',
    ...(perjadinStore.singleResponse.status == 'PERTANGGUNG JAWABAN' ||
    perjadinStore.singleResponse.status == 'SELESAI'
      ? ['Realisasi']
      : []),
  ]
})

// const steps = ref([ ''])
const showLog = ref(false)
const deleteDialog = ref(false)
const sendDialog = ref(false)
const deleteId = ref(0)
const confirmDialog = ref(false)
const verifikasiDialog = ref(false)
const selesaiDialog = ref(false)

function openRabModal(value) {
  rabDialog.value = true
}

function openModal(value) {
  isEdit.value = value
  pegawaiModal.value = true
}

function openLogDrawer() {
  showLog.value = true
}

async function tambahPegawai() {
  const id = toast.loading('Proses tambah data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const result = await perjadinStore.tambahPegawai()
  if (result.status) {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    pegawaiModal.value = false
    perjadinStore.resetFormPegawai()
  } else {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function updatePegawai() {
  const id = toast.loading('Memperbaharui data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const result = await perjadinStore.updatePegawai()
  if (result.status) {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    pegawaiModal.value = false
    perjadinStore.resetFormPegawai()
  } else {
    toast.update(id, {
      render: result.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function deletePegawai() {
  const result = perjadinStore.deletePegawai()
  toast.success(result.message, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: 1000,
    closeOnClick: true,
    closeButton: true,
  })
  pegawaiModal.value = false
  perjadinStore.resetFormPegawai()
}

async function update() {
  confirmDialog.value = false
  const id = toast.loading(
    'Perencanaan perjalanan dinas sedang di perbaharui...',
    {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'info',
      isLoading: true,
    }
  )

  const success = await perjadinStore.update()
  if (success.status) {
    toast.update(id, {
      render: 'Data berhasil di perbaharui !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    perjadinStore.resetFormMain()
    isEditAll.value = false
    isEdit.value = false
    currentStep.value = 0
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

async function updateStatusData({ status = 'ptj' }) {
  if (status == 'kuitansi') {
    if (
      perjadinStore.updateData.ppk == null ||
      perjadinStore.updateData.ppk == '' ||
      perjadinStore.updateData.bendahara == '' ||
      perjadinStore.updateData.bendahara == ''
    ) {
      toast('Data belum lengkap...', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        type: 'error',
      })
      return
    }
    verifikasiDialog.value = false
    perjadinStore.$patch((state) => {
      state.updateData.status = 'PERTANGGUNG JAWABAN'
    })
  } else if (status == 'selesai') {
    perjadinStore.$patch((state) => {
      state.updateData.status = 'SELESAI'
      state.updateData.total_realisasi = perjadinStore.getTotalAnggaranRealisasi
    })
    selesaiDialog.value = false
  } else if (status == 'rab') {
    if (
      perjadinStore.singleResponse.kapokja == null ||
      perjadinStore.singleResponse.kapokja == '' ||
      perjadinStore.singleResponse.nip_kapokja == null ||
      perjadinStore.singleResponse.nip_kapokja == '' ||
      perjadinStore.singleResponse.pengusul == null ||
      perjadinStore.singleResponse.pengusul == '' ||
      perjadinStore.singleResponse.nip_pengusul == null ||
      perjadinStore.singleResponse.nip_pengusul == '' ||
      perjadinStore.singleResponse.tanggal_rab == null ||
      perjadinStore.singleResponse.tanggal_rab == ''
    ) {
      toast('Data belum lengkap...', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        type: 'error',
      })
      return
    }
    rabDialog.value = false
    perjadinStore.$patch((state) => {
      state.updateData.status = 'RAB'
    })
  }

  const id = toast.loading('Dokumen sedang di Proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const result = await perjadinStore.updateStatus(
    perjadinStore.singleResponse.id
  )
  if (result.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
    perjadinStore.$patch((state) => {
      state.singleResponse = result.data
    })
    if (status == 'rab') {
      toRab()
    }
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
}

function openVerifikasi() {
  verifikasiDialog.value = true
}

function openSelesai() {
  selesaiDialog.value = true
}

function openConfirm() {
  confirmDialog.value = true
}
function cancelEditAll() {
  perjadinStore.cancelEdit()
  isEditAll.value = !isEditAll.value
}

function onSend() {
  if (perjadinStore.singleResponse.status == 'PERENCANAAN') {
    deleteId.value = perjadinStore.singleResponse.id
    sendDialog.value = true
  } else {
    toast(
      `Tidak bisa mengirim berkas, status berkas ${perjadinStore.singleResponse.status}`,
      {
        position: toast.POSITION.TOP_CENTER,
        type: 'error',
        autoClose: 3000,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      }
    )
  }
}

function onDelete() {
  if (perjadinStore.singleResponse.status == 'PERENCANAAN') {
    deleteId.value = perjadinStore.singleResponse.id
    deleteDialog.value = true
  } else if (authStore.user.role == 'ADMIN') {
    deleteId.value = perjadinStore.singleResponse.id
    deleteDialog.value = true
  } else if (
    perjadinStore.singleResponse.status == 'SELESAI' &&
    authStore.user.role == 'USER'
  ) {
    toast(`Status berkas telah SELESAI, hubungi admin untuk menghapus`, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  } else {
    toast(`Tidak dapat menghapus berkas, proses masih berjalan`, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 5000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function sendData() {
  if (
    perjadinStore.updateData.status == '' ||
    perjadinStore.updateData.status == null
  ) {
    toast('Data belum lengkap', {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  } else {
    sendDialog.value = false
    const toastId = toast.loading('Data sedang dikirim...', {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'info',
      isLoading: true,
    })
    const success = await perjadinStore.updateStatus(deleteId.value)
    if (success.status) {
      toast.update(toastId, {
        render: 'Berhasil !!',
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'success',
        autoClose: 1000,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      })
      toast.done(toastId)
      await perjadinStore.show(id.value)
    } else {
      toast.update(toastId, {
        render: 'Terjadi kesalahan',
        position: toast.POSITION.BOTTOM_CENTER,
        type: 'error',
        autoClose: 1000,
        closeOnClick: true,
        closeButton: true,
        isLoading: false,
      })
    }
  }
}

async function deleteData() {
  confirmDialog.value = false
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await perjadinStore.destroy(deleteId.value)
  if (success) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
    router.push({ name: 'perjadin-list' })
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
  file.value = null
}

function kapokjaReset() {
  perjadinStore.$patch((state) => {
    state.singleResponse.kapokja = null
    state.singleResponse.nip_kapokja = null
  })
}

function pengusulReset() {
  perjadinStore.$patch((state) => {
    state.singleResponse.pengusul = null
    state.singleResponse.nip_pengusul = null
  })
}

async function toRab() {
  let resolvedRoute = router.resolve({
    name: 'perjadin-ptj-rab',
    params: { id: perjadinStore.singleResponse.id },
  })

  window.open(resolvedRoute.href, '_blank')
}

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  perjadinStore.$patch((state) => {
    state.isDetail = true
  })
  await perjadinStore.show(id.value)
})
</script>
