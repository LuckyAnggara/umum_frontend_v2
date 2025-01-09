<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <template v-if="perjadinStore.singleResponse == null">
      <div class="w-full items-center justify-center flex min-h-lvh flex-col space-y-4">
        <svg class="w-12 h-12 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-gray-900"
          ></path>
        </svg>
        <span class="text-gray-500">Getting Data ...</span>
      </div>
    </template>
    <template v-else>
      <!-- Print Button -->
      <div class="no-print mb-6 mx-auto max-w-3xl flex flex-row space-x-2">
        <div>
          <button onclick="window.print()" class="w-fit flex space-x-2 text-right bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
            <PrinterIcon class="h-5" /> <span>Print</span>
          </button>
        </div>
      </div>

      <div v-for="(detail, index) in perjadinStore.singleResponse.detail" :key="index" id="print-container">
        <div class="page-break my-8"></div>
        <div class="print-area mx-auto bg-white px-8 py-12 max-w-3xl">
          <div class="flex flex-row justify-between border-b">
            <div class="mb-8 text-left flex flex-col">
              <p class="text-md font-bold uppercase">Inspektorat Jenderal</p>
              <p class="text-md font-semibold">Kementerian Hukum dan HAM</p>
            </div>
            <div class="w-72 flex-col text-xs">
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">No</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">-</p>
              </div>
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Kode MAK</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">
                  {{ perjadinStore.singleResponse.mak.kode_mak }}
                </p>
              </div>
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Tahun Anggaran</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">
                  {{ perjadinStore.singleResponse.tahun_anggaran }}
                </p>
              </div>
            </div>
          </div>

          <h3 class="mb-3 mt-6 text-center text-xl font-bold">KUITANSI</h3>

          <div class="mb-3 border p-2 text-left text-xs">
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Sudah Terima Dari</span><span>:</span></p>
              <p class="ml-1 w-8/12">Kuasa Pengguna Anggaran Inspektorat Jenderal</p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Uang Sebesar</span><span>:</span></p>
              <p class="ml-1 w-8/12">
                {{ IDRCurrency.format(totalDetailBiaya(detail)) }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Terbilang</span><span>:</span></p>
              <p class="ml-1 w-8/12">{{ terbilang(totalDetailBiaya(detail)) }} Rupiah</p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Berdasarkan SPPD Nomor</span><span>:</span></p>
              <p class="ml-1 w-8/12">ITJ.1-KU.03.02-{{ detail.no_sppd }}</p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Tanggal SPPD</span><span>:</span></p>
              <p class="ml-1 w-8/12">
                {{ $moment(detail.tanggal_sppd).format('DD MMMM YYYY') }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Guna Pembayaran</span><span>:</span></p>
              <p class="ml-1 w-8/12 text-justify">
                Kegiatan
                {{ perjadinStore.singleResponse.nama_kegiatan }} di
                {{ perjadinStore.singleResponse.tempat_kegiatan }}
              </p>
            </div>
          </div>

          <div class="mb-3 border p-2 text-left text-xs">
            <div class="mb-1 flex">
              <p class="w-4/12 border-b pb-2 font-semibold">
                <span>Dengan Rincian</span>
              </p>
            </div>
            <div class="flex flex-col space-y-1">
              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Penginapan</span><span>:</span></p>
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="pb-3 sm:pb-4"></li>
                </ul>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.hotel" :key="index">
                    <div class="">
                      <span v-if="detail.hotel.length > 1">•</span>

                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.hari * item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Uang Harian</span><span>:</span></p>

                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.uang_harian" :key="index">
                    <div class="">
                      <span v-if="detail.uang_harian.length > 1">•</span>

                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.hari * item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Pesawat</span><span>:</span></p>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.pesawat" :key="index">
                    <div class="">
                      <span v-if="detail.pesawat.length > 1">•</span>

                      <span> {{ item.keterangan }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Transport</span><span>:</span></p>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.transport" :key="index">
                    <div class="">
                      <span v-if="detail.transport.length > 1">•</span>
                      <span class="text-gray-900">{{ item.tipe }} - </span>
                      <span> {{ item.keterangan }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Taksi Jakarta</span><span>:</span></p>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.taksi_jakarta" :key="index">
                    <div class="">
                      <span v-if="detail.taksi_jakarta.length > 1">•</span>
                      <span> {{ item.keterangan }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Taksi Tujuan</span><span>:</span></p>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.taksi_tujuan" :key="index">
                    <div class="">
                      <span v-if="detail.taksi_tujuan.length > 1">•</span>
                      <span> {{ item.keterangan }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold"><span>Representatif</span><span>:</span></p>
                <ul class="list-disc ml-1 w-8/12">
                  <li class="flex flex-row w-full justify-between" v-for="(item, index) in detail.representatif" :key="index">
                    <div class="">
                      <span v-if="detail.representatif.length > 1">•</span>

                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold"> {{ IDRCurrency.format(item.hari * item.biaya) }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="my-2 flex">
              <p class="w-4/12 border-t pb-2 font-bold text-end pr-4">
                <span>Total</span>
              </p>
              <p class="w-8/12 border-t pb-2 font-bold text-right">
                <span> {{ IDRCurrency.format(totalDetailBiaya(detail)) }}</span>
              </p>
            </div>
            <div>
              <p>Tanggal Pembukuan :</p>
            </div>
          </div>

          <div class="mb-3 border p-2 text-left text-xs">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div></div>
              <div></div>
              <div class="text-center">
                <p>
                  Jakarta, <span class="text-white"> {{ $moment(detail.tanggal_sppd).format('DD MMMM YYYY') }} </span>
                </p>
                <!-- <p>Jakarta, {{ $moment(detail.tanggal_sppd).format('DD MMMM YYYY') }}</p> -->
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="flex flex-col justify-between">
                <p class="font-semibold">Bendahara Pengeluaran</p>
                <div>
                  <p class="mt-12">
                    {{ detail.bendahara.nama }}
                  </p>
                  <p>NIP {{ detail.bendahara.nip }}</p>
                </div>
              </div>
              <div>
                <div class="flex flex-col justify-between font-semibold">
                  <div>
                    <p>a.n Kuasa Pengguna Anggaran</p>
                    <p class="font-semibold">Pejabat Pembuat Komitmen</p>
                  </div>
                  <div>
                    <p class="mt-12">
                      {{ detail.ppk.nama }}
                    </p>
                    <p>NIP {{ detail.ppk.nip }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <p class="font-semibold">Penerima</p>
                <div>
                  <p class="mt-12">
                    {{ detail.nama }}
                  </p>
                  <p>NIP {{ detail.nip }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-break my-8"></div>

        <div class="print-area mx-auto bg-white p-8 max-w-3xl">
          <div class="flex flex-row justify-between">
            <div class="mb-8 text-left flex flex-col">
              <p class="text-md font-bold uppercase">Inspektorat Jenderal</p>
              <p class="text-md font-semibold">Kementerian Hukum dan HAM</p>
            </div>
            <div class="w-72 flex-col text-xs">
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Lembar Ke</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">-</p>
              </div>
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Kode No.</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12"></p>
              </div>
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Nomor</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">ITJ.1-KU.03.02-{{ detail.no_sppd }}</p>
              </div>
            </div>
          </div>

          <h3 class="mb-3 mt-2 text-center text-xl font-bold underline">SURAT PERJALANAN DINAS (SPD)</h3>
          <table class="table-auto border-collapse border border-gray-500 w-full text-xs">
            <tbody>
              <tr>
                <td class="border border-gray-500 p-1 text-center">1</td>
                <td class="border border-gray-500 p-1 w-1/3">Pejabat Pembuat Komitmen</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  {{ detail.ppk.nama }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center">2</td>
                <td class="border border-gray-500 p-1">Nama/NIP Pegawai yang Melaksanakan Perjalanan Dinas</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <div class="flex flex-col">
                    <span>{{ detail.nama }}</span
                    ><span>{{ detail.nip }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center" rowspan="3">3</td>
                <td class="border border-gray-500 p-1">a. Pangkat dan Golongan</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <span>{{ detail.pangkat }}</span>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">b. Jabatan/Instansi</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <span>{{ detail.jabatan }}</span>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">c. Tingkat Biaya Perjalanan Dinas</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <input type="text" id="small-input" class="w-full border-none text-xs" value="E" />
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center">4</td>
                <td class="border border-gray-500 p-1">Maksud Perjalanan Dinas</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <p class="ml-1 text-justify">
                    Kegiatan
                    {{ perjadinStore.singleResponse.nama_kegiatan }}
                    di
                    {{ perjadinStore.singleResponse.tempat_kegiatan }}
                  </p>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center">5</td>
                <td class="border border-gray-500 p-1">Alat Angkutan yang Dipergunakan</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <ul class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <!-- <li
              class="inline-flex items-center"
              v-for="(item, index) in transport(detail)"
              :key="index"
            >
              <span class="text-gray-900">{{ item.tipe }} / </span>
            </li> -->
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center" rowspan="2">6</td>
                <td class="border border-gray-500 p-1">a. Tempat Berangkat</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  <input type="text" id="small-input" class="w-full border-none text-xs" value="Jakarta" />
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">b. Tempat Tujuan</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  {{ perjadinStore.singleResponse.tempat_kegiatan }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center" rowspan="3">7</td>
                <td class="border border-gray-500 p-1">a. Lamanya Perjalanan Dinas</td>
                <td class="border border-gray-500 p-1" colspan="3">{{ detail.jumlah_hari }} Hari</td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">b. Tanggal Berangkat</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  {{ $moment(detail.tanggal_awal).format('DD MMMM YYYY') }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">c. Tanggal Harus Kembali/Tiba di Tempat Baru</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  {{ $moment(detail.tanggal_akhir).format('DD MMMM YYYY') }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center" rowspan="6">8</td>
                <td class="border border-gray-500 p-1">Pengikut: Nama</td>
                <td class="border border-gray-500 p-1">Tanggal Lahir</td>
                <td class="border border-gray-500 p-1">Keterangan</td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">1.</td>
                <td class="border border-gray-500 p-1"></td>
                <td class="border border-gray-500 p-1"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">2.</td>
                <td class="border border-gray-500 p-1"></td>
                <td class="border border-gray-500 p-1"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">3.</td>
                <td class="border border-gray-500 p-1"></td>
                <td class="border border-gray-500 p-1"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">4.</td>
                <td class="border border-gray-500 p-1"></td>
                <td class="border border-gray-500 p-1"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">5.</td>
                <td class="border border-gray-500 p-1"></td>
                <td class="border border-gray-500 p-1"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center">9</td>
                <td class="border border-gray-500 p-1">Pembebanan Anggaran</td>
                <td class="border border-gray-500 p-1" colspan="3"></td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center" rowspan="2"></td>
                <td class="border border-gray-500 p-1">a. Instansi</td>
                <td class="border border-gray-500 p-1" colspan="3">Inspektorat Jenderal Kementerian Hukum dan HAM</td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1">b. Akun</td>
                <td class="border border-gray-500 p-1" colspan="3">
                  {{ perjadinStore.singleResponse.mak.kode_mak }}
                </td>
              </tr>
              <tr>
                <td class="border border-gray-500 p-1 text-center">10</td>
                <td class="border border-gray-500 p-1">Keterangan lain-lain</td>
                <td class="border border-gray-500 p-1" colspan="3"></td>
              </tr>
            </tbody>
          </table>
          <small class="text-gray-700">*Coret yang tidak perlu</small>

          <div class="mb-3 p-2 text-left text-xs">
            <div class="flex justify-end text-start">
              <div class="flex flex-col justify-between">
                <p class="font-semibold w-60">Dikeluarkan di Jakarta</p>
                <p class="font-semibold w-60">
                  Tanggal
                  <span class="text-white">{{ $moment(detail.tanggal_sppd).format('DD MMMM YYYY') }}</span>
                </p>
                <div class="w-60">
                  <p class="mt-12">
                    {{ detail.ppk.nama }}
                  </p>
                  <p>NIP {{ detail.ppk.nip }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script setup>
import { usePerjadinStore } from '@/stores/perjadin'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'
import { PrinterIcon } from '@heroicons/vue/24/outline'

const perjadinStore = usePerjadinStore()
const route = useRoute()

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await perjadinStore.show(id.value)
})

function totalDetailBiaya(pegawai) {
  if (!pegawai) return 0
  const sumBiayaHari = (items) => items.reduce((total, item) => total + item.hari * item.biaya, 0)
  const sumBiaya = (items) => items.reduce((total, item) => total + item.biaya, 0)

  const totalHotel = sumBiayaHari(pegawai.hotel || [])
  const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
  const totalTransport = sumBiaya(pegawai.transport || [])
  const totalPesawat = sumBiaya(pegawai.pesawat || [])
  const totalTaksiJakarta = sumBiaya(pegawai.taksi_jakarta || [])
  const totalTaksiTujuan = sumBiaya(pegawai.taksi_tujuan || [])
  const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
  return totalHotel + totalUangHarian + totalTransport + totalPesawat + totalTaksiJakarta + totalTaksiTujuan + totalRepresentatif
}

function printThreeCopies() {
  // Clone the content 2 more times to create 3 total copies
  const printContainer = document.getElementById('print-container')
  const originalContent = printContainer.innerHTML

  // Add two more copies of the content
  printContainer.innerHTML += originalContent + originalContent

  // Trigger print dialog
  window.print()

  // After printing, restore the original content
  printContainer.innerHTML = originalContent
}
</script>

<style>
@media print {
  @page {
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .page-break {
    page-break-before: always; /* Forces a page break before this element */
  }

  .print-area {
    margin: 0;
    padding: 2mm;
    page-break-after: always;
  }

  .no-print {
    display: none;
  }
}
</style>
