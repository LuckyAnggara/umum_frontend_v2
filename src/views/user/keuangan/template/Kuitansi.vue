<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <template v-if="perjadinDetailStore.singleResponse == null">
      <div
        class="w-full items-center justify-center flex min-h-lvh flex-col space-y-4"
      >
        <svg
          class="w-12 h-12 text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
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
      <div class="no-print mb-6 mx-auto max-w-3xl flex flex-col">
        <button
          onclick="window.print()"
          class="w-fit text-right bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Print
        </button>
      </div>

      <div id="print-container">
        <div class="print-area mx-auto bg-white p-8 max-w-3xl">
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
                  {{ perjadinDetailStore.singleResponse.master.mak.kode_mak }}
                </p>
              </div>
              <div class="mb-1 flex">
                <p class="w-5/12 font-semibold">Tahun Anggaran</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12">
                  {{ perjadinDetailStore.singleResponse.master.tahun_anggaran }}
                </p>
              </div>
            </div>
          </div>

          <h3 class="mb-3 mt-6 text-center text-xl font-bold">KUITANSI</h3>

          <div class="mb-3 border p-2 text-left text-xs">
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Sudah Terima Dari</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12">
                Kuasa Pengguna Anggaran Inspektorat Jenderal
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Uang Sebesar</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12">
                {{ IDRCurrency.format(perjadinDetailStore.totalDetailBiaya) }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Terbilang</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12">
                {{ terbilang(perjadinDetailStore.totalDetailBiaya) }} Rupiah
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Berdasarkan SPPD Nomor</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12">
                ITJ.1-KU.03.02-{{ perjadinDetailStore.singleResponse.no_sppd }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Tanggal SPPD</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12">
                {{
                  $moment(
                    perjadinDetailStore.singleResponse.tanggal_sppd
                  ).format('DD MMMM YYYY')
                }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Guna Pembayaran</span><span>:</span>
              </p>
              <p class="ml-1 w-8/12 text-justify">
                Kegiatan
                {{ perjadinDetailStore.singleResponse.master.nama_kegiatan }} di
                {{ perjadinDetailStore.singleResponse.master.tempat_kegiatan }}
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
                <p class="flex w-4/12 flex-row justify-between font-semibold">
                  <span>Transport</span><span>:</span>
                </p>
                <ul class="list-decimal ml-1 w-8/12">
                  <li
                    class="flex flex-row w-full justify-between"
                    v-for="(item, index) in perjadinDetailStore.singleResponse
                      .transport"
                    :key="index"
                  >
                    <div class="">
                      {{ index + 1 }}.
                      <span class="text-gray-900">{{ item.tipe }} - </span>
                      <span> {{ item.keterangan }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold">
                        {{ IDRCurrency.format(item.biaya) }}</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold">
                  <span>Penginapan</span><span>:</span>
                </p>
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li class="pb-3 sm:pb-4"></li>
                </ul>
                <ul class="list-decimal ml-1 w-8/12">
                  <li
                    class="flex flex-row w-full justify-between"
                    v-for="(item, index) in perjadinDetailStore.singleResponse
                      .hotel"
                    :key="index"
                  >
                    <div class="">
                      {{ index + 1 }}.
                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold">
                        {{ IDRCurrency.format(item.hari * item.biaya) }}</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold">
                  <span>Uang Harian</span><span>:</span>
                </p>

                <ul class="list-decimal ml-1 w-8/12">
                  <li
                    class="flex flex-row w-full justify-between"
                    v-for="(item, index) in perjadinDetailStore.singleResponse
                      .uang_harian"
                    :key="index"
                  >
                    <div class="">
                      {{ index + 1 }}.
                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold">
                        {{ IDRCurrency.format(item.hari * item.biaya) }}</span
                      >
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mb-1 flex">
                <p class="flex w-4/12 flex-row justify-between font-semibold">
                  <span>Representatif</span><span>:</span>
                </p>
                <ul class="list-decimal ml-1 w-8/12">
                  <li
                    class="flex flex-row w-full justify-between"
                    v-for="(item, index) in perjadinDetailStore.singleResponse
                      .representatif"
                    :key="index"
                  >
                    <div class="">
                      {{ index + 1 }}.
                      <span class="text-gray-900">{{ item.hari }} Hari x </span>
                      <span> {{ IDRCurrency.format(item.biaya) }}</span>
                    </div>
                    <div class="ml-1 flex flex-row justify-between">
                      <span class="text-gray-900 w-32 text-right font-semibold">
                        {{ IDRCurrency.format(item.hari * item.biaya) }}</span
                      >
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
                <span>
                  {{
                    IDRCurrency.format(perjadinDetailStore.totalDetailBiaya)
                  }}</span
                >
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
                <p>Jakarta, {{ $moment().format('DD MMMM YYYY') }}</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 text-center">
              <div class="flex flex-col justify-between">
                <p class="font-semibold">Bendahara Pengeluaran</p>
                <div>
                  <p class="mt-12">
                    {{ perjadinDetailStore.singleResponse.bendahara.nama }}
                  </p>
                  <p>
                    NIP {{ perjadinDetailStore.singleResponse.bendahara.nip }}
                  </p>
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
                      {{ perjadinDetailStore.singleResponse.ppk.nama }}
                    </p>
                    <p>NIP {{ perjadinDetailStore.singleResponse.ppk.nip }}</p>
                  </div>
                </div>
              </div>
              <div class="flex flex-col justify-between">
                <p class="font-semibold">Penerima</p>
                <div>
                  <p class="mt-12">
                    {{ perjadinDetailStore.singleResponse.nama }}
                  </p>
                  <p>NIP {{ perjadinDetailStore.singleResponse.nip }}</p>
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
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'

const perjadinDetailStore = usePerjadinDetailStore()
const route = useRoute()

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await perjadinDetailStore.show(id.value)
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
    padding: 2mm;
    page-break-after: always;
  }

  .no-print {
    display: none;
  }
}
</style>
