<template>
  <div class="mx-auto w-full px-4">
    <!-- Start coding here -->
    <section v-if="nonPerjadinStore.singleResponse == null">
      <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
    </section>
    <template v-else>
      <div class="justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div class="relative p-4 w-full h-full md:h-auto flex flex-col space-y-4 bg-white">
          <!-- Modal content -->
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600 flex-row">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Umum</h3>
            <div>
              <span
                v-if="nonPerjadinStore.singleResponse.status == 'PENGAJUAN'"
                class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                >{{ nonPerjadinStore.singleResponse.status }}</span
              >
              <span
                v-if="nonPerjadinStore.singleResponse.status == 'VERIFIKASI'"
                class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                >{{ nonPerjadinStore.singleResponse.status }}</span
              >

              <span
                v-if="nonPerjadinStore.singleResponse.status == 'SELESAI'"
                class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                >{{ nonPerjadinStore.singleResponse.status }}</span
              >
            </div>
          </div>
          <!-- Modal body -->

          <div>
            <div class="mb-4 flex flex-col space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-white">Tahun Anggaran</label>
                <select
                  :disabled="!isEditAll"
                  v-model="nonPerjadinStore.singleResponse.tahun_anggaran"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option v-for="(item, index) in mainStore.tahunOptions" :key="index" :value="item">
                    {{ item }}
                  </option>
                </select>
              </div>

              <div class="w-full">
                <label class="block text-sm font-medium text-gray-900 dark:text-white">Nomor Transaksi</label>
                <input
                  readonly
                  required
                  v-model="nonPerjadinStore.singleResponse.nomor_transaksi"
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>

              <div class="text-left">
                <label class="block text-sm font-medium text-gray-900 dark:text-white">Tanggal Transaksi</label>
                <VueDatePicker
                  :disabled="!isEditAll"
                  v-model="nonPerjadinStore.singleResponse.tanggal_transaksi"
                  required
                  :format="'dd MMMM yyyy'"
                  auto-apply
                  date-picker
                  locale="id"
                ></VueDatePicker>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-900 dark:text-white">Uraian / Peruntukan</label>
                <textarea
                  :readonly="!isEditAll"
                  v-model="nonPerjadinStore.singleResponse.uraian"
                  required
                  id="message"
                  rows="3"
                  class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ></textarea>
              </div>
              <div class="flex flex-row space-x-4 justify-end items-end">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-900 dark:text-white">Mata Anggaran Kegiatan</label>
                  <div>
                    <v-select
                      :disabled="!isEditAll"
                      :loading="makStore.isLoading"
                      @open="onOpenSelect"
                      :filterable="false"
                      @search="searchMak"
                      :options="makStore.items"
                      v-model="nonPerjadinStore.singleResponse.mak"
                    >
                      <template #no-options> Tidak ada data .. </template>
                      <template #option="option">
                        <div class="d-center">{{ option.kode_mak }} - {{ option.keterangan }}</div>
                      </template>
                      <template #selected-option="option">
                        <div>{{ option.kode_mak }} - {{ option.keterangan }}</div>
                      </template>
                    </v-select>
                  </div>
                </div>
                <button
                  v-if="nonPerjadinStore.singleResponse.mak !== null"
                  @click="makDetailDialog = true"
                  type="button"
                  class="place-self-end w-24 h-fit text-blue-400 hover:text-white border border-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-300 dark:text-blue-300 dark:hover:text-white dark:hover:bg-blue-400 dark:focus:ring-blue-900"
                >
                  Detail
                </button>
              </div>

              <div class="flex flex-row space-x-4">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-900 dark:text-white">Sisa Anggaran (IDR)</label>
                  <input
                    readonly
                    :value="IDRCurrency.format(sisaAnggaran)"
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-900 dark:text-white">Jumlah Pembayaran (IDR)</label>
                  <input
                    v-if="isEditAll"
                    required
                    v-model="nonPerjadinStore.singleResponse.total_anggaran"
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  <input
                    v-else
                    readonly
                    :value="IDRCurrency.format(nonPerjadinStore.singleResponse.total_anggaran)"
                    type="text"
                    name="name"
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <div
                v-if="nonPerjadinStore.singleResponse.total_anggaran > sisaAnggaran"
                class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                  />
                </svg>
                <span class="sr-only">Info</span>
                <div><span class="font-medium">Alert!</span> sisa anggaran tidak memenuhi pengajuan transaksi</div>
              </div>
              <div class="flex flex-row space-x-4">
                <div class="text-left w-full">
                  <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Bendahara Pengeluaran*</label>
                  <v-select :disabled="!isEditAll" :label="'nama'" :options="mainStore.bendaharaOptions" v-model="nonPerjadinStore.singleResponse.bendahara">
                    <template #search="{ attributes, events }">
                      <input class="vs__search" :required="!nonPerjadinStore.singleResponse.bendahara" v-bind="attributes" v-on="events" />
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
                <div class="text-left w-full">
                  <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Pejabat Pembuat Komitmen*</label>
                  <v-select :disabled="!isEditAll" :label="'nama'" :options="mainStore.ppkOptions" v-model="nonPerjadinStore.singleResponse.ppk">
                    <template #search="{ attributes, events }">
                      <input class="vs__search" :required="!nonPerjadinStore.singleResponse.ppk" v-bind="attributes" v-on="events" />
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
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penerima</label>
                <div class="relative w-full">
                  <input
                    :readonly="!isEditAll"
                    v-model="nonPerjadinStore.singleResponse.nip_penerima"
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Isi dengan NIP Penerima"
                    required
                  />

                  <button
                    v-if="isEditAll"
                    @click="nonPerjadinStore.searchLapkin()"
                    type="button"
                    class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <MagnifyingGlassIcon class="w-4 h-4" v-if="!nonPerjadinStore.isSearching" />
                    <ArrowPathIcon class="w-4 h-4 animate-spin" v-else />
                  </button>
                </div>

                <div
                  v-if="nonPerjadinStore.singleResponse.penerima"
                  id="alert-3"
                  class="mt-2 flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                    />
                  </svg>
                  <span class="sr-only">Info</span>
                  <div class="ms-3 text-sm font-medium">{{ nonPerjadinStore.singleResponse.penerima }}</div>
                  <button
                    v-if="isEditAll"
                    @click="penerimaReset()"
                    type="button"
                    class="ms-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-3"
                    aria-label="Close"
                  >
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="text-left" v-if="isEditAll">
                <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Lampiran</label>

                <small class="text-gray-600">
                  <span v-if="nonPerjadinStore.singleResponse.lampiran.length < 1">Tidak ada lampiran</span>
                  <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside" v-else>
                    <li
                      :key="index"
                      v-for="(item, index) in nonPerjadinStore.singleResponse.lampiran"
                      class="text-base w-full rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
                    >
                      <a :href="`${storageUrl + '/' + item.lampiran}`" :download="item.file_name">
                        <span class="text-gray-500">{{ index + 1 }}.</span>
                        {{ item.file_name }}
                      </a>
                      <TrashIcon
                        @click="nonPerjadinStore.destroyLampiran(index, item)"
                        class="cursor-pointer h-5 w-5 hover:-translate-y-1 duration-300 ease-in-out text-red-500"
                      />
                    </li>
                  </ol>
                </small>

                <label class="block text-sm font-medium text-gray-900 dark:text-white">Upload Lampiran Tambahan</label>

                <small class="text-gray-600">
                  <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside">
                    <li>Bukti Pembayaran</li>
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

              <div class="text-left" v-else>
                <label for="name" class="block text-sm font-medium text-gray-900 dark:text-white">Lampiran</label>

                <small class="text-gray-600">
                  <span v-if="nonPerjadinStore.singleResponse.lampiran.length < 1">Tidak ada lampiran</span>
                  <ol class="ps-5 mt-2 space-y-1 list-decimal list-inside" v-else>
                    <li
                      :key="index"
                      v-for="(item, index) in nonPerjadinStore.singleResponse.lampiran"
                      class="text-base w-full rounded-t-lg dark:border-gray-600 text-blue-600 flex flex-row space-x-2 items-center"
                    >
                      <a :href="`${storageUrl + '/' + item.lampiran}`" :download="item.file_name">
                        <span class="text-gray-500">{{ index + 1 }}.</span>
                        {{ item.file_name }}
                      </a>
                    </li>
                  </ol>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-1 mt-4 text-center justify-start" v-if="authStore.user.role == 'USER'">
          <button
            @click="toSpb()"
            type="button"
            class="w-32 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Cetak SPB
          </button>
        </div>

        <div class="flex items-center space-x-1 mt-4 text-center justify-end">
          <div
            v-if="nonPerjadinStore.singleResponse.status == 'PENGAJUAN' && authStore.user.role == 'USER'"
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

            <div v-if="!isEditAll" class="flex flex-row space-x-2">
              <button
                @click="onSend()"
                type="button"
                class="flex flex-row w-fit text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                <span>
                  <PaperAirplaneIcon class="h-5 w-5 mr-2" />
                </span>
                Kirim
              </button>

              <button
                @click="isEditAll = true"
                type="button"
                class="flex flex-row w-fit text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
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

          <div v-else-if="authStore.user.role == 'ADMIN'" class="flex flex-row space-x-2">
            <button
              v-if="nonPerjadinStore.singleResponse.status == 'VERIFIKASI'"
              @click="openSelesai()"
              type="button"
              class="flex flex-row w-fit text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              <span>
                <CheckCircleIcon class="h-5 w-5 mr-2" />
              </span>
              Submit
            </button>

            <!-- <button
              type="button"
              class="flex flex-row w-fit text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-800"
            >
              <span>
                <PencilSquareIcon class="h-5 w-5 mr-2" />
              </span>
              Reject
            </button> -->

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
      </div>
    </template>
    <Dialog :overflowVisible="true" :show="makDetailDialog" @close="makDetailDialog = !makDetailDialog" :canSubmit="false">
      <template #title>
        <h1>Detail MAK</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-3">
          <dl class="text-md max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(nonPerjadinStore.singleResponse?.mak?.anggaran ?? 0) }}
              </dd>
            </div>

            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran yang belum di realisasikan</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(totalSingleBelumRealisasi ?? 0) }}
              </dd>
            </div>

            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran yang belum di realisasikan</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(totalSingleSudahRealisasi ?? 0) }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Sisa Anggaran</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(sisaAnggaran) }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Anggaran Transaksi Ini</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(nonPerjadinStore.singleResponse.total_anggaran) }}
              </dd>
            </div>
            <div class="flex flex-col">
              <dt class="mb-1 text-gray-500 dark:text-gray-400">Estimasi Sisa Anggaran</dt>
              <dd class="font-semibold">
                {{ IDRCurrency.format(estimasiSisaAnggaran) }}
              </dd>
            </div>
          </dl>
        </div>
      </template>
    </Dialog>
    <Dialog :overflowVisible="true" :show="sendDialog" @submit="sendData" @close="sendDialog = !sendDialog" :canSubmit="true">
      <template #title>
        <h1>Kirim Berkas</h1>
        <small>Berkas akan di kirim untuk dilakukan Verifikasi</small>
      </template>

      <template #content>
        <div class="flex w-full flex-col space-y-4">
          <div class="text-left">
            <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Tujuan</label>
            <select
              v-model="nonPerjadinStore.updateData.status"
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="VERIFIKASI">KEUANGAN</option>
            </select>
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
            <textarea
              placeholder="Isi catatan disini"
              v-model="nonPerjadinStore.updateData.catatan"
              id="message"
              rows="2"
              class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </template>
    </Dialog>

    <Dialog :overflowVisible="true" :show="selesaiDialog" @submit="onSelesai()" @close="selesaiDialog = !selesaiDialog" :canSubmit="true">
      <template #title>
        <h1>Confirmation</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-3">
          <div class="text-left font-medium text-xl">Apa anda ??</div>
          <small class="text-gray-700">Status Berkas akan di ubah menjadi SELESAI!, Anggaran akan terealisasi!</small>
        </div>
      </template>
    </Dialog>

    <Dialog :overflowVisible="true" :show="confirmDialog" @submit="update()" @close="confirmDialog = !confirmDialog" :canSubmit="true">
      <template #title>
        <h1>Konfirmasi</h1>
      </template>

      <template #content>
        <div class="flex flex-col space-y-4 mt-6">
          <div class="text-left">Apa anda yakin akan mengubah data ?</div>
        </div>
      </template>
    </Dialog>

    <DeleteDialog :show="deleteDialog" @submit="deleteData" @close="deleteDialog = !deleteDialog" />
  </div>
</template>

<script setup>
import { useMainStore } from '@/stores/main'
import { useMakStore } from '@/stores/mak'
import { useAuthStore } from '@/stores/auth'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import {
  DocumentTextIcon,
  TrashIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { storageUrl } from '@/services/helper'
import { IDRCurrency } from '@/utilities/formatter'
import { toast } from 'vue3-toastify'
import FilePond from '@/components/FilePond.vue'
import { useNonPerjadinStore } from '@/stores/nonPerjadin'
import { useRouter, useRoute } from 'vue-router'
import DeleteDialog from '@/components/DeleteDialog.vue'
import { useDebounceFn } from '@vueuse/core'
import { computed } from 'vue'

const nonPerjadinStore = useNonPerjadinStore()
const makStore = useMakStore()
const router = useRouter()
const authStore = useAuthStore()
const mainStore = useMainStore()
const makDetailDialog = ref(false)
const sendDialog = ref(false)
const deleteDialog = ref(false)
const selesaiDialog = ref(false)
const confirmDialog = ref(false)
const deleteId = ref(0)
const Dialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))
const route = useRoute()
const isEdit = ref(false)
const isEditAll = ref(false)

const searchMak = useDebounceFn((search) => {
  if (search == null || search == '') {
  } else {
    makStore.$patch((state) => {
      state.filter.searchQuery = search
    })
    makStore.getData()
  }
}, 500)

function onOpenSelect() {
  if (makStore.items.length == 0) {
    makStore.$patch((state) => {
      state.filter.searchQuery = ''
    })
    makStore.getData()
  }
}
function cancelEditAll() {
  nonPerjadinStore.cancelEdit()
  isEditAll.value = !isEditAll.value
}

function onDelete() {
  if (nonPerjadinStore.singleResponse.status == 'PENGAJUAN') {
    deleteId.value = nonPerjadinStore.singleResponse.id
    deleteDialog.value = true
  } else if (authStore.user.role == 'ADMIN') {
    deleteId.value = nonPerjadinStore.singleResponse.id
    deleteDialog.value = true
  } else if (nonPerjadinStore.singleResponse.status == 'SELESAI' && authStore.user.role == 'USER') {
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

function onSend() {
  if (nonPerjadinStore.singleResponse.status == 'PENGAJUAN') {
    deleteId.value = nonPerjadinStore.singleResponse.id
    sendDialog.value = true
  } else {
    toast(`Tidak bisa mengirim berkas, status berkas ${nonPerjadinStore.singleResponse.status}`, {
      position: toast.POSITION.TOP_CENTER,
      type: 'error',
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function deleteData() {
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await nonPerjadinStore.destroy(deleteId.value)
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
    deleteDialog.value = false
    router.push({
      name: 'non-perjadin-list',
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
}

function openSelesai() {
  selesaiDialog.value = true
}
function openConfirm() {
  confirmDialog.value = true
}

async function onSelesai() {
  nonPerjadinStore.$patch((state) => {
    state.updateData.status = 'SELESAI'
    state.updateData.catatan = 'Transaksi selesai'
  })

  selesaiDialog.value = false
  const toastId = toast.loading('Data sedang dikirim...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  const success = await nonPerjadinStore.updateStatus()
  if (success.status) {
    toast.update(toastId, {
      render: 'Transaksi telah selesai !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 3000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(toastId)
    await nonPerjadinStore.show(id.value)
  } else {
    toast.update(toastId, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

async function toSpb() {
  let resolvedRoute = router.resolve({
    name: 'non-perjadin-spb',
    params: { id: nonPerjadinStore.singleResponse.id },
  })

  window.open(resolvedRoute.href, '_blank')
}

async function sendData() {
  if (nonPerjadinStore.updateData.status == '' || nonPerjadinStore.updateData.status == null) {
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
    const success = await nonPerjadinStore.updateStatus(deleteId.value)
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
      await nonPerjadinStore.show(id.value)
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

async function update() {
  confirmDialog.value = false
  const id = toast.loading('Pengusulan belanja non perjalan dinas sedang di perbaharui...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await nonPerjadinStore.update()
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
    nonPerjadinStore.resetFormMain()
    isEditAll.value = false
  } else {
    toast.update(id, {
      render: success.message,
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

function fileChange(event) {
  let b = []
  event.forEach((element, index) => {
    b.push(element.file)
  })
  if (nonPerjadinStore.isDetail == true) {
    nonPerjadinStore.$patch((state) => {
      state.singleResponse.newLampiran = b
    })
  } else {
    nonPerjadinStore.$patch((state) => {
      state.singleResponse.lampiran = b
    })
  }
}

function penerimaReset() {
  nonPerjadinStore.$patch((state) => {
    state.singleResponse.penerima = null
    state.singleResponse.nip_penerima = null
  })
}

const totalSingleSudahRealisasi = computed(() => {
  // Use reduce to accumulate the total_realisasi from the detail array of each record
  return nonPerjadinStore.singleResponse.mak?.detail
    ?.filter((x) => {
      return x.kegiatan_id !== nonPerjadinStore.singleResponse.id
    })
    .reduce((total, item) => {
      return total + item.total_realisasi
    }, 0)
})
const totalSingleBelumRealisasi = computed(() => {
  // Use reduce to accumulate the total_realisasi from the detail array of each record
  return nonPerjadinStore.singleResponse.mak?.detail
    ?.filter((x) => {
      return x.kegiatan_id !== nonPerjadinStore.singleResponse.id
    })
    .reduce((total, item) => {
      return total + item.total_anggaran
    }, 0)
})

const sisaAnggaran = computed(() => {
  return nonPerjadinStore.singleResponse.mak.anggaran - (totalSingleBelumRealisasi.value + totalSingleSudahRealisasi.value)
})

const estimasiSisaAnggaran = computed(() => {
  return sisaAnggaran.value - nonPerjadinStore.singleResponse.total_anggaran
})

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  nonPerjadinStore.$patch((state) => {
    state.isDetail = true
  })
  await nonPerjadinStore.show(id.value)
})
</script>
