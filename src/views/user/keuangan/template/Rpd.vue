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
          <h3 class="mb-3 mt-6 text-center text-xl font-bold">
            RINCIAN BIAYA PERJALANAN DINAS
          </h3>
          <div class="flex justify-start space-x-12 mt-4">
            <div>
              <p>Lampiran SPD Nomor</p>
              <p>Tanggal</p>
            </div>
            <div>
              <p>
                : ITJ.1-KU.03.02-{{
                  perjadinDetailStore.singleResponse.no_sppd
                }}
              </p>
              <p>
                :
                {{
                  $moment(
                    perjadinDetailStore.singleResponse.tanggal_sppd
                  ).format('DD MMMM YYYY')
                }}
              </p>
            </div>
          </div>
          <div class="mt-4">
            <table
              class="table-auto w-full border-collapse border border-black text-sm"
            >
              <thead>
                <tr>
                  <th class="border border-black px-2 py-1">NO.</th>
                  <th class="border border-black px-2 py-1">PERINCIAN BIAYA</th>
                  <th class="border border-black px-2 py-1">JUMLAH</th>
                  <th class="border border-black px-2 py-1">KETERANGAN</th>
                </tr>
              </thead>
              <tbody>
                <!-- Rows -->
                <tr
                  v-if="perjadinDetailStore.singleResponse.transport.length > 0"
                >
                  <td
                    class="border border-black text-center px-2 py-1 font-semibold"
                    colspan="2"
                  >
                    TRANSPORTASI
                  </td>
                  <td class="border border-black px-2 py-1"></td>
                  <td class="border border-black px-2 py-1"></td>
                </tr>
                <tr
                  v-for="(item, index) in perjadinDetailStore.singleResponse
                    .transport"
                  :key="index"
                >
                  <td class="border border-black text-center px-2 py-1">
                    {{ no_urut++ }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    <div class="flex flex-col">
                      <span class="font-semibold">{{ item.tipe }}</span>
                      <span> {{ item.keterangan }}</span>
                    </div>
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{ IDRCurrency.format(item.realisasi_biaya) }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{ item.notes }}
                  </td>
                </tr>
                <tr
                  v-if="
                    perjadinDetailStore.singleResponse.uang_harian.length > 0
                  "
                >
                  <td
                    class="border border-black text-center px-2 py-1 font-semibold"
                    colspan="2"
                  >
                    UANG HARIAN
                  </td>
                  <td class="border border-black px-2 py-1"></td>
                  <td class="border border-black px-2 py-1"></td>
                </tr>
                <tr
                  v-for="(item, index) in perjadinDetailStore.singleResponse
                    .uang_harian"
                  :key="index"
                >
                  <td class="border border-black text-center px-2 py-1">
                    {{ no_urut++ }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    <span
                      >selama {{ item.realisasi_hari }} hari x
                      {{ IDRCurrency.format(item.realisasi_biaya) }}</span
                    >
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{
                      IDRCurrency.format(
                        item.realisasi_hari * item.realisasi_biaya
                      )
                    }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{ item.notes }}
                  </td>
                </tr>
                <tr v-if="perjadinDetailStore.singleResponse.hotel.length > 0">
                  <td
                    class="border border-black text-center px-2 py-1 font-semibold"
                    colspan="2"
                  >
                    PENGINAPAN
                  </td>
                  <td class="border border-black px-2 py-1"></td>
                  <td class="border border-black px-2 py-1"></td>
                </tr>
                <tr
                  v-for="(item, index) in perjadinDetailStore.singleResponse
                    .hotel"
                  :key="index"
                >
                  <td class="border border-black text-center px-2 py-1">
                    {{ no_urut++ }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    <span
                      >selama {{ item.realisasi_hari }} hari x
                      {{ IDRCurrency.format(item.realisasi_biaya) }}</span
                    >
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{
                      IDRCurrency.format(
                        item.realisasi_hari * item.realisasi_biaya
                      )
                    }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{ item.notes }}
                  </td>
                </tr>

                <tr
                  v-if="
                    perjadinDetailStore.singleResponse.representatif.length > 0
                  "
                >
                  <td
                    class="border border-black text-center px-2 py-1 font-semibold"
                    colspan="2"
                  >
                    REPRESENTATIF
                  </td>
                  <td class="border border-black px-2 py-1"></td>
                  <td class="border border-black px-2 py-1"></td>
                </tr>
                <tr
                  v-for="(item, index) in perjadinDetailStore.singleResponse
                    .representatif"
                  :key="index"
                >
                  <td class="border border-black text-center px-2 py-1">
                    {{ no_urut++ }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    <span
                      >selama {{ item.realisasi_hari }} hari x
                      {{ IDRCurrency.format(item.realisasi_biaya) }}</span
                    >
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{
                      IDRCurrency.format(
                        item.realisasi_hari * item.realisasi_biaya
                      )
                    }}
                  </td>
                  <td class="border border-black px-2 py-1">
                    {{ item.notes }}
                  </td>
                </tr>

                <!-- Total -->
                <tr>
                  <td
                    colspan="2"
                    class="border border-black px-2 py-1 text-right font-bold"
                  >
                    JUMLAH :
                  </td>
                  <td class="border border-black px-2 py-1 font-bold">
                    {{
                      IDRCurrency.format(
                        perjadinDetailStore.totalDetailRealisasiBiaya
                      )
                    }}
                  </td>
                  <td class="border border-black px-2 py-1"></td>
                </tr>
                <tr>
                  <td colspan="4" class="px-2 py-1">
                    Terbilang:
                    <span class="font-bold">
                      {{
                        terbilang(perjadinDetailStore.totalDetailRealisasiBiaya)
                      }}
                      Rupiah
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer Section -->
          <div class="mt-8 flex justify-between text-sm text-start border-b-2">
            <div class="flex flex-col justify-between">
              <div>
                <p>Telah dibayar sejumlah</p>
                <p class="font-semibold">
                  {{
                    IDRCurrency.format(
                      perjadinDetailStore.totalDetailRealisasiBiaya
                    )
                  }}
                </p>
              </div>
              <div>
                <p class="mt-4">Bendahara Pengeluaran</p>
                <p class="mt-12">
                  {{
                    perjadinDetailStore.singleResponse.bendahara.nama.toUpperCase()
                  }}
                </p>
                <p>
                  NIP {{ perjadinDetailStore.singleResponse.bendahara.nip }}
                </p>
              </div>
            </div>
            <div class="flex flex-col justify-between">
              <div>
                <p>{{ $moment().format('DD MMMM YYYY') }}</p>
                <p>Telah menerima jumlah uang sebesar</p>
                <p class="font-semibold">
                  {{ IDRCurrency.format(perjadinDetailStore.totalDetailBiaya) }}
                </p>
              </div>
              <div>
                <p class="mt-4">Yang Menerima</p>
                <p class="mt-12">
                  {{ perjadinDetailStore.singleResponse.nama.toUpperCase() }}
                </p>
                <p>NIP {{ perjadinDetailStore.singleResponse.nip }}</p>
              </div>
            </div>
          </div>

          <!-- Calculation Section -->
          <div class="mt-8 text-sm">
            <p class="text-center font-bold">PERHITUNGAN SPD RAMPUNG</p>
            <div class="flex flex-row justify-between mt-2">
              <div class="flex flex-col w-2/3">
                <p>Ditentukan sejumlah</p>
                <p>Yang telah dibayar semula</p>
                <p>Sisa kurang/lebih</p>
              </div>
              <div class="flex flex-col w-1/3">
                <span class="font-bold">
                  {{
                    IDRCurrency.format(
                      perjadinDetailStore.totalDetailRealisasiBiaya
                    )
                  }}
                </span>

                <span class="font-bold border-b-2">
                  {{ IDRCurrency.format(perjadinDetailStore.totalDetailBiaya) }}
                </span>

                <span class="font-bold">
                  {{
                    IDRCurrency.format(
                      perjadinDetailStore.totalDetailBiaya -
                        perjadinDetailStore.totalDetailRealisasiBiaya
                    )
                  }}
                </span>
              </div>
            </div>
            <div class="mt-6 flex flex-row justify-between">
              <div class="flex flex-col w-2/3"></div>
              <div class="flex flex-col w-1/3 text-start">
                <p>Pejabat Pembuat Komitmen</p>
                <p class="mt-12">
                  {{
                    perjadinDetailStore.singleResponse.ppk.nama.toUpperCase()
                  }}
                </p>
                <p>
                  NIP {{ perjadinDetailStore.singleResponse.bendahara.nip }}
                </p>
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
import { computed, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'

const perjadinDetailStore = usePerjadinDetailStore()
const route = useRoute()
const no_urut = reactive(1)

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
