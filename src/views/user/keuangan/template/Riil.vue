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
        <div class="print-area mx-auto bg-white py-8 px-12 max-w-3xl">
          <h3 class="mb-3 mt-6 text-center text-xl font-bold">
            DAFTAR PENGELUARAN RIIL
          </h3>
          <!-- Personal Information Section -->
          <div class="mt-4">
            <p>Yang bertandatangan di bawah ini:</p>
            <div class="flex justify-start space-x-12 mt-4">
              <div>
                <p>Nama</p>
                <p>NIP</p>
                <p>Jabatan</p>
              </div>
              <div>
                <p>: {{ perjadinDetailStore.singleResponse.nama }}</p>
                <p>: {{ perjadinDetailStore.singleResponse.nip }}</p>
                <p>: {{ perjadinDetailStore.singleResponse.jabatan }}</p>
              </div>
            </div>

            <p class="mt-4 text-justify">
              Berdasarkan Surat Perjalanan Dinas (SPD) Nomor: ITJ.1-KU.03.02-{{
                perjadinDetailStore.singleResponse.no_sppd
              }}
              tanggal
              {{
                $moment(perjadinDetailStore.singleResponse.tanggal_sppd).format(
                  'DD MMMM YYYY'
                )
              }}, dengan ini kami menyatakan dengan sesungguhnya bahwa:
            </p>

            <!-- Explanation Section -->
            <div
              class="flex flex-row justify-start text-start items-start space-x-3"
            >
              <span> 1. </span>
              <span class="text-justify">
                Biaya transport pegawai dan/atau biaya hotel di bawah ini yang
                tidak dapat diperoleh bukti-bukti pengeluarannya,
                meliputi:</span
              >
            </div>

            <div class="mt-4">
              <table
                class="table-auto w-full border-collapse border border-black"
              >
                <thead>
                  <tr>
                    <th class="border border-black px-2 py-1 text-center">
                      No.
                    </th>
                    <th class="border border-black px-2 py-1 text-center">
                      Uraian
                    </th>
                    <th class="border border-black px-2 py-1 text-center">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="uh.length > 0">
                    <tr v-for="(item, index) in uh" :key="index">
                      <td class="border border-black text-center px-2 py-1">
                        {{ no_urut++ }}
                      </td>
                      <td class="border border-black px-2 py-1">
                        Uang Harian Perjalanan Dinas sebesar
                        {{ IDRCurrency.format(item.realisasi_biaya) }} x
                        {{ item.realisasi_hari }} hari
                      </td>
                      <td class="border border-black text-right px-2 py-1">
                        {{
                          IDRCurrency.format(
                            item.realisasi_biaya * item.realisasi_hari
                          )
                        }}
                      </td>
                    </tr>
                  </template>
                  <template v-if="transport.length > 0">
                    <tr v-for="(item, index) in transport" :key="index">
                      <td class="border border-black text-center px-2 py-1">
                        {{ no_urut++ }}
                      </td>
                      <td class="border border-black px-2 py-1">
                        Transport {{ item.tipe }} untuk Perjalanan Dinas sebesar
                        {{ IDRCurrency.format(item.realisasi_biaya) }}
                      </td>
                      <td class="border border-black text-right px-2 py-1">
                        {{ IDRCurrency.format(item.realisasi_biaya) }}
                      </td>
                    </tr>
                  </template>
                  <template v-if="hotel.length > 0">
                    <tr v-for="(item, index) in hotel" :key="index">
                      <td class="border border-black text-center px-2 py-1">
                        {{ no_urut++ }}
                      </td>
                      <td class="border border-black px-2 py-1">
                        Penginapan untuk Perjalanan Dinas sebesar
                        {{ IDRCurrency.format(item.realisasi_biaya) }} x
                        {{ item.realisasi_hari }} hari
                      </td>
                      <td class="border border-black text-right px-2 py-1">
                        {{
                          IDRCurrency.format(
                            item.realisasi_biaya * item.realisasi_hari
                          )
                        }}
                      </td>
                    </tr>
                  </template>
                  <template v-if="representatif.length > 0">
                    <tr v-for="(item, index) in representatif" :key="index">
                      <td class="border border-black text-center px-2 py-1">
                        {{ no_urut++ }}
                      </td>
                      <td class="border border-black px-2 py-1">
                        Representatif Perjalanan Dinas sebesar
                        {{ IDRCurrency.format(item.realisasi_biaya) }} x
                        {{ item.realisasi_hari }} hari
                      </td>
                      <td class="border border-black text-right px-2 py-1">
                        {{
                          IDRCurrency.format(
                            item.realisasi_biaya * item.realisasi_hari
                          )
                        }}
                      </td>
                    </tr>
                  </template>

                  <tr>
                    <td
                      colspan="2"
                      class="border border-black px-2 py-1 text-right font-bold"
                    >
                      Jumlah
                    </td>
                    <td
                      class="border border-black text-right px-2 py-1 font-bold"
                    >
                      {{ IDRCurrency.format(totalRiil) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="mt-4 flex flex-row justify-start text-start items-start space-x-3"
            >
              <span> 2. </span>
              <span class="text-justify">
                Jumlah uang tersebut pada angka 1 di atas benar-benar
                dikeluarkan untuk pelaksanaan Perjalanan Dinas dimaksud dan
                apabila di kemudian hari terdapat kelebihan atas pembayaran,
                kami bersedia untuk menyetor ke Kas Negara.</span
              >
            </div>
          </div>
          <!-- Signatures Section -->
          <div class="mt-10">
            <div class="flex justify-between">
              <!-- Left side -->
              <div class="flex flex-col">
                <p>Mengetahui/Menyetujui,</p>
                <p>Pejabat Pembuat Komitmen,</p>
                <p class="mt-12">
                  {{
                    perjadinDetailStore.singleResponse.ppk.nama.toUpperCase()
                  }}
                </p>
                <p>NIP {{ perjadinDetailStore.singleResponse.ppk.nip }}</p>
              </div>
              <!-- Right side -->
              <div class="flex flex-col text-center">
                <p>Jakarta, {{ $moment().format('DD MMMM YYYY') }}</p>
                <p>Pelaksana SPD,</p>
                <p class="mt-12">
                  {{ perjadinDetailStore.singleResponse.nama.toUpperCase() }}
                </p>
                <p>NIP {{ perjadinDetailStore.singleResponse.nip }}</p>
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
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'
import { reactive } from 'vue'

const perjadinDetailStore = usePerjadinDetailStore()
const route = useRoute()
const no_urut = reactive(1)

const id = computed(() => {
  return route.params.id ?? null
})

const uh = computed(() => {
  return perjadinDetailStore.singleResponse.uang_harian.filter(
    (x) => x.bukti == false
  )
})

const transport = computed(() => {
  return perjadinDetailStore.singleResponse.transport.filter(
    (x) => x.bukti == false
  )
})

const representatif = computed(() => {
  return perjadinDetailStore.singleResponse.representatif.filter(
    (x) => x.bukti == false
  )
})

const hotel = computed(() => {
  return perjadinDetailStore.singleResponse.hotel.filter(
    (x) => x.bukti == false
  )
})

const totalRiil = computed(() => {
  const sumBiayaHari = (items) =>
    items.reduce(
      (total, item) => total + item.realisasi_hari * item.realisasi_biaya,
      0
    )
  const sumBiaya = (items) =>
    items.reduce((total, item) => total + item.realisasi_biaya, 0)

  const totalHotel = sumBiayaHari(hotel.value || [])
  const totalUangHarian = sumBiayaHari(uh.value || [])
  const totalTransport = sumBiaya(transport.value || [])
  const totalRepresentatif = sumBiayaHari(representatif.value || [])
  return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
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
    padding: 10mm;
    page-break-after: always;
  }

  .no-print {
    display: none;
  }
}
</style>
