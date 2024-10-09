<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <template v-if="nonPerjadinStore.singleResponse == null">
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
      <div class="no-print mb-6 mx-auto max-w-6xl flex flex-col">
        <button onclick="window.print()" class="w-fit text-right bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Print</button>
      </div>

      <div id="print-container flex flex-col space-y-2">
        <!-- Atas -->
        <div class="max-w-8xl mx-auto p-6 bg-white rounded-lg">
          <!-- Header Section -->
          <div class="text-center">
            <h1 class="font-bold text-xl">KEMENTERIAN HUKUM DAN HAM</h1>
            <h2 class="text-lg">INSPEKTORAT JENDERAL</h2>
            <h3 class="mt-2 font-semibold underline">SURAT PERINTAH BAYAR</h3>
            <p class="text-sm">Tanggal: {{ data.created_at }}</p>
            <p class="text-sm">Nomor: {{ data.nomor_transaksi }}</p>
          </div>

          <!-- Body Section -->
          <div class="mt-4 text-justify">
            <div class="border p-4">
              <p class="text-justify">
                Saya yang bertanda tangan di bawah ini selaku Pejabat Pembuat Komitmen Memerintahkan Bendahara Pengeluaran agar melakukan pembayaran sejumlah:
              </p>
              <p class="text-left font-bold text-lg">{{ IDRCurrency.format(data.total_anggaran) }}</p>
              <p class="text-left italic">({{ terbilang(data.total_anggaran).toUpperCase() + ' RUPIAH' }} )</p>
            </div>
            <div class="border p-4">
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Kepada</span><span>:</span></p>
                <p class="ml-1 w-9/12">Kuasa Pengguna Anggaran Inspektorat Jenderal</p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Untuk Pembayaran</span><span>:</span></p>
                <p class="ml-1 w-9/12">
                  {{ data.uraian }}
                </p>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Atas Dasar</span><span>:</span></p>
                <ul class="list-disc pl-6">
                  <li>Kuitansi/bukti pembelian</li>
                  <li>Nota/bukti penerimaan barang/jasa</li>
                  <li>Bukti Lainnya</li>
                </ul>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Dibebankan Pada</span><span>:</span></p>
                <p class="ml-1 w-9/12">
                  {{ data.mak.kode_mak }}
                </p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Kegiatan, Output, MAK</span><span>:</span></p>
                <p class="ml-1 w-9/12">
                  {{ data.mak.keterangan }}
                </p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Kode</span><span>:</span></p>
                <p class="ml-1 w-9/12">
                  {{ data.mak.kode_mak }}
                </p>
              </div>
            </div>

            <!-- Approval Section -->
            <div class="border p-4">
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p>Setuju/Lunas dibayar, tanggal:</p>
                  <p>Diterima tanggal:</p>

                  <p></p>
                </div>
                <div class="mt-2 flex flex-row justify-between">
                  <div class="flex flex-col justify-end text-center">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Bendahara Pengeluaran</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.bendahara.nama.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.bendahara.nip }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-end">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Penerima Uang / Uang Muka Kerja</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.penerima.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.nip_penerima }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col justify-end">
                    <div class="flex flex-col">
                      <span>a.n Kuasa Pengguna Anggaran</span>
                      <span>Pejabat Pembuat Komitmen</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.ppk.nama.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.ppk.nip }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="my-4 flex flex-row justify-center items-center spacex-5">
          <ScissorsIcon class="h-6" />
          <div class="border-b-2 w-full border-dotted"></div>
        </div>

        <!-- Bawah -->
        <div class="max-w-8xl mx-auto p-6 bg-white rounded-lg">
          <!-- Header Section -->
          <div class="text-center">
            <h1 class="font-bold text-xl">KEMENTERIAN HUKUM DAN HAM</h1>
            <h2 class="text-lg">INSPEKTORAT JENDERAL</h2>
            <h3 class="mt-2 font-semibold underline">LEMBAR VALIDASI</h3>
          </div>

          <!-- Body Section -->
          <div class="mt-4 text-justify">
            <div class="border p-4">
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>No Urut Transaksi</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ data.nomor_transaksi }}</p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Tanggal Surat Perintah Bayar</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ data.created_at }}</p>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Jumlah Pembayaran</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ IDRCurrency.format(data.total_anggaran) }}</p>
              </div>

              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Nama Penerima Pembayaran</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ data.penerima.toUpperCase() }}</p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Untuk Pembayaran</span><span>:</span></p>
                <p class="ml-1 w-9/12">
                  {{ data.uraian }}
                </p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>MAK/Kode Kegiatan</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ data.mak.kode_mak }}</p>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-3/12 flex-row justify-between font-semibold"><span>Uraian MAK/Kode Kegiatan</span><span>:</span></p>
                <p class="ml-1 w-9/12">{{ data.mak.keterangan }}</p>
              </div>
            </div>

            <!-- Approval Section -->
            <div class="border p-4">
              <div class="flex flex-col">
                <div class="flex flex-row justify-between">
                  <p>Setuju/Lunas dibayar, tanggal:</p>
                  <p>Diterima tanggal:</p>

                  <p></p>
                </div>
                <div class="mt-2 flex flex-row justify-between">
                  <div class="flex flex-col justify-end text-center">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Bendahara Pengeluaran</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.bendahara.nama.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.bendahara.nip }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-end">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Penerima Uang / Uang Muka Kerja</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.penerima.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.nip_penerima }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col justify-end">
                    <div class="flex flex-col">
                      <span>a.n Kuasa Pengguna Anggaran</span>
                      <span>Pejabat Pembuat Komitmen</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.ppk.nama.toUpperCase() }}</p>
                      <p class="text-center text-sm">NIP {{ data.ppk.nip }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Approval Section -->
            <div class="border p-4">
              <div class="flex flex-col">
                <div class="mt-2 flex flex-row justify-between">
                  <div class="flex flex-col justify-end text-center">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Pembuat SPB</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">{{ data.user.name }}</p>
                      <p class="text-center text-sm">NIP {{ data.user.nip }}</p>
                    </div>
                  </div>
                  <div class="flex flex-col justify-end text-center">
                    <div class="flex flex-col">
                      <p></p>
                      <span>Verfikator</span>
                    </div>
                    <div class="mt-12">
                      <p class="text-center">.</p>
                      <p class="text-center text-sm">(................................................)</p>
                    </div>
                  </div>
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
import { ScissorsIcon } from '@heroicons/vue/24/outline'

import { useNonPerjadinStore } from '@/stores/nonPerjadin'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'

const nonPerjadinStore = useNonPerjadinStore()
const route = useRoute()
const data = computed(() => {
  return nonPerjadinStore.singleResponse
})

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await nonPerjadinStore.show(id.value)
})

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
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .print-area {
    margin: 0;
    padding: 1mm;
    page-break-after: always;
  }

  .no-print {
    display: none;
  }
}
</style>
