<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <template v-if="perjadinStore.singleResponse == null">
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
      <div class="p-4 bg-white rounded-lg text-sm">
        <div>
          <!-- Header Section -->
          <p class="text-xl font-bold text-center my-6">
            RENCANA ANGGARAN BIAYA PERJALANAN DINAS
          </p>
          <div class="flex flex-col justify-center items-right text-right mt-6">
            <div class="flex flex-row justify-between text-start">
              <div class="w-3/4 flex-col">
                <div class="mb-1 flex">
                  <p class="w-3/12 font-semibold">Nama Kegiatan</p>
                  <p class="w-1/12">:</p>
                  <p class="w-6/12">
                    {{ perjadinStore.singleResponse.nama_kegiatan }}
                  </p>
                </div>
                <!-- <div class="mb-1 flex">
                <p class="w-3/12 font-semibold">Maksud Perjalanan Dinas</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12"></p>
              </div> -->
                <div class="mb-1 flex">
                  <p class="w-3/12 font-semibold">Pembebanan Anggaran</p>
                  <p class="w-1/12">:</p>
                  <p class="w-6/12">
                    {{ perjadinStore.singleResponse.tahun_anggaran }}
                  </p>
                </div>
                <div class="mb-1 flex">
                  <p class="w-3/12 font-semibold">Mata Anggaran Kegiatan</p>
                  <p class="w-1/12">:</p>
                  <p class="w-6/12">
                    {{ perjadinStore.singleResponse.mak.kode_mak }}
                  </p>
                </div>
              </div>
            </div>
            <!-- Excel Editor -->
            <table
              class="min-w-full bg-white border-collapse border border-gray-400"
            >
              <thead class="">
                <tr class="bg-gray-200 text-center">
                  <th rowspan="2" class="border px-4 py-2">Nama</th>
                  <th rowspan="2" class="border px-4 py-2">Gol</th>
                  <th colspan="2" class="border px-4 py-2">Kota</th>
                  <th colspan="2" class="border px-4 py-2">Tanggal</th>
                  <th rowspan="2" class="border px-4 py-2">Jmlh Hari</th>
                  <th rowspan="2" class="border px-4 py-2">Uang Harian</th>
                  <th colspan="2" class="border px-4 py-2">
                    Biaya Hotel (hr/Rp)
                  </th>
                  <th colspan="5" class="border px-4 py-2">Biaya Transport</th>
                  <th rowspan="2" class="border px-4 py-2">Representatif</th>
                  <th rowspan="2" class="border px-4 py-2">Total</th>
                </tr>
                <tr class="bg-gray-200 text-center">
                  <!-- Kota -->
                  <th class="border px-4 py-2">Keberangkatan</th>
                  <th class="border px-4 py-2">Tujuan</th>
                  <!-- Tanggal -->
                  <th class="border px-4 py-2">Berangkat</th>
                  <th class="border px-4 py-2">Kembali</th>
                  <!-- Biaya Hotel -->
                  <th class="border px-4 py-2">Hr</th>
                  <th class="border px-4 py-2">Rp.</th>
                  <!-- Biaya Transport -->
                  <th class="border px-4 py-2">Udara</th>
                  <th class="border px-4 py-2">Laut</th>
                  <th class="border px-4 py-2">Darat</th>
                  <th class="border px-4 py-2">Taksi Jakarta</th>
                  <th class="border px-4 py-2">Taksi Provinsi</th>
                </tr>
              </thead>
              <tbody>
                <tr class="">
                  <td
                    colspan="16"
                    class="border px-4 py-2 font-semibold text-right"
                  >
                    Anggaran Kegiatan ini:
                  </td>
                  <td class="border px-4 py-2 font-semibold text-right">
                    {{
                      IDRCurrency.format(
                        perjadinStore.singleResponse.mak.anggaran
                      )
                    }}
                  </td>
                </tr>

                <tr
                  class="bg-gray-50"
                  v-for="(item, index) in mapData"
                  :key="index"
                >
                  <td class="border px-4 py-2">{{ item.nama }}</td>
                  <td class="border px-4 py-2">
                    {{ item.pangkat.toUpperCase() }}
                  </td>
                  <td class="border px-4 py-2">{{ item.keberangkatan }}</td>
                  <td class="border px-4 py-2">{{ item.tujuan }}</td>
                  <td class="border px-4 py-2">
                    {{ $moment(item.tanggal_awal).format('DD-MMM-YYYY') }}
                  </td>
                  <td class="border px-4 py-2">
                    {{ $moment(item.tanggal_akhir).format('DD-MMM-YYYY') }}
                  </td>
                  <td class="border px-4 py-2">{{ item.jumlah_hari }}</td>
                  <td class="border px-4 py-2">
                    {{ item.uang_harian }}
                  </td>
                  <td class="border px-4 py-2">{{ item.hari_hotel }}</td>
                  <td class="border px-4 py-2">
                    {{ item.hotel }}
                  </td>
                  <td class="border px-4 py-2">{{ item.transport_udara }}</td>
                  <td class="border px-4 py-2">{{ item.transport_laut }}</td>
                  <td class="border px-4 py-2">{{ item.transport_darat }}</td>
                  <td class="border px-4 py-2">{{ item.transport_taksi }}</td>
                  <td class="border px-4 py-2">{{ item.transport_taksi }}</td>
                  <td class="border px-4 py-2">{{ item.representatif }}</td>
                  <td class="border px-4 py-2 text-right">{{ item.total }}</td>
                </tr>

                <tr>
                  <td
                    colspan="16"
                    class="border px-4 py-2 text-right font-semibold"
                  >
                    Jumlah
                  </td>
                  <td class="border px-4 py-2 text-right font-semibold">
                    {{
                      IDRCurrency.format(perjadinStore.getTotalAnggaranDetail)
                    }}
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="16"
                    class="border px-4 py-2 text-right font-semibold"
                  >
                    Sisa Anggaran Setelah Kegiatan ini:
                  </td>
                  <td class="border px-4 py-2 text-right font-semibold">
                    {{
                      IDRCurrency.format(
                        perjadinStore.singleResponse.mak.anggaran -
                          perjadinStore.getTotalAnggaranDetail
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- <vue-excel-editor
              v-model="mapData"
              :row-style="rowStyle"
              class="mt-6"
              no-footer
              readonly
            >
              <vue-excel-column
                field="nama"
                label="Nama"
                type="string"
                autoFillWidth="true"
              />
              <vue-excel-column
                field="pangkat"
                label="Gol"
                type="string"
                width="50px"
              />
              <vue-excel-column
                field="keberangkatan"
                label="Keberangkatan"
                type="string"
                width="120px"
              />
              <vue-excel-column
                field="tujuan"
                label="Tujuan"
                type="string"
                width="120px"
              />
              <vue-excel-column
                field="tanggal_awal"
                label="Tanggal Berangkat"
                type="date"
                width="120px"
              />
              <vue-excel-column
                field="tanggal_akhir"
                label="Tanggal Kembali"
                type="date"
                width="120px"
              />
              <vue-excel-column
                field="jumlah_hari"
                label="Jumlah Hari"
                type="number"
                width="120px"
              />
              <vue-excel-column
                field="uang_harian"
                label="Uang Harian / Hari"
                type="number"
                width="120px"
              />
              <vue-excel-column
                field="hari_hotel"
                label="Jumlah Hari"
                type="number"
                width="120px"
              />
              <vue-excel-column
                field="hotel"
                label="Biaya Hotel / Hari"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="transport_udara"
                label="Transport Udara"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="transport_laut"
                label="Transport Laut"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="transport_darat"
                label="Transport Darat"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="transport_taksi"
                label="Taksi"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="representatif"
                label="Representatif"
                type="number"
                width="100px"
              />
              <vue-excel-column
                field="total"
                label="Total"
                type="number"
                width="120px"
              />
            </vue-excel-editor> -->
          </div>

          <!-- <div class="w-3/4 flex-col my-8">
            <div class="mb-1 flex">
              <p class="w-3/12 font-semibold">Sisa Anggaran</p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">
                {{
                  IDRCurrency.format(perjadinStore.singleResponse.mak.anggaran)
                }}
              </p>
            </div> -->
          <!-- <div class="mb-1 flex">
                <p class="w-3/12 font-semibold">Maksud Perjalanan Dinas</p>
                <p class="w-1/12">:</p>
                <p class="w-6/12"></p>
              </div> -->
          <!-- <div class="mb-1 flex">
              <p class="w-3/12 font-semibold">Anggaran Kegiatan Ini</p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">
                {{ IDRCurrency.format(perjadinStore.getTotalAnggaranDetail) }}
              </p>
            </div>
            <div class="mb-1 flex">
              <p class="w-3/12 font-semibold">
                Sisa Anggaran Setelah Kegiatan Ini
              </p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">
                {{
                  IDRCurrency.format(
                    perjadinStore.singleResponse.mak.anggaran -
                      perjadinStore.getTotalAnggaranDetail
                  )
                }}
              </p>
            </div> -->
          <!-- </div> -->
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { IDRCurrency, terbilang } from '@/utilities/formatter'
import { ref } from 'vue'
import { usePerjadinStore } from '@/stores/perjadin'
import { useMainStore } from '@/stores/main'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import moment from 'moment'

const mainStore = useMainStore()
const perjadinStore = usePerjadinStore()
const route = useRoute()

function rowStyle(row) {
  return { 'bg-gray-500': row.total > 5000000 }
}
function exportAsExcel() {
  const format = 'xlsx'
  const exportSelectedOnly = false
  const filename = 'test'
  rab.value.exportTable(format, exportSelectedOnly, filename)
}
function exportAsCsv() {
  const format = 'csv'
  const exportSelectedOnly = true
  const filename = 'test'
  rab.value.exportTable(format, exportSelectedOnly, filename)
}

const rab = ref(null)

const totalCost = computed(() => {
  // Menghitung total dari semua total di tabel
  return data.value.reduce((acc, item) => acc + item.total, 0)
})

const mapData = computed(() => {
  return perjadinStore.singleResponse.detail.map((item) => {
    const pangkat = item.pangkat.split(' - ')[0]
    // Menghitung total biaya hotel
    const hotelCost = item.hotel.reduce((total, h) => total + h.biaya, 0)
    const hotelCostTotal = item.hotel.reduce(
      (total, h) => total + h.biaya * h.hari,
      0
    )

    // Menghitung total biaya Representatif
    const representatif = item.representatif.reduce(
      (total, h) => total + r.biaya,
      0
    )
    const representatifTotal = item.representatif.reduce(
      (total, h) => total + r.biaya * r.hari,
      0
    )

    // Menghitung biaya transportasi berdasarkan tipe
    const transportUdara = item.transport
      .filter((t) => t.tipe === 'UDARA')
      .reduce((total, t) => total + t.biaya, 0)
    const transportLaut = item.transport
      .filter((t) => t.tipe === 'LAUT')
      .reduce((total, t) => total + t.biaya, 0)
    const transportDarat = item.transport
      .filter((t) => t.tipe === 'DARAT')
      .reduce((total, t) => total + t.biaya, 0)
    const transportTaksi = item.transport
      .filter((t) => t.tipe === 'TAKSI')
      .reduce((total, t) => total + t.biaya, 0)

    // Menghitung uang harian
    const dailyAllowance = item.uang_harian.reduce(
      (total, u) => total + u.biaya,
      0
    )
    const dailyAllowanceTotal = item.uang_harian.reduce(
      (total, u) => total + u.biaya * u.hari,
      0
    )

    // Menghitung total biaya
    const total =
      hotelCostTotal +
      transportUdara +
      transportLaut +
      transportDarat +
      transportTaksi +
      dailyAllowanceTotal +
      representatifTotal

    return {
      nama: item.nama,
      pangkat: pangkat,
      keberangkatan: 'Jakarta',
      tujuan: perjadinStore.singleResponse.provinsi.nama,
      tanggal_awal: moment(item.tanggal_awal).format('DD MMMM YYYY'),
      tanggal_akhir: moment(item.tanggal_akhir).format('DD MMMM YYYY'),
      jumlah_hari: item.uang_harian[0]?.hari || 0,
      uang_harian: IDRCurrency.format(dailyAllowance),
      hari_hotel: item.hotel[0]?.hari || 0,
      hotel: IDRCurrency.format(hotelCost),
      transport_udara: IDRCurrency.format(transportUdara),
      transport_laut: IDRCurrency.format(transportLaut),
      transport_darat: IDRCurrency.format(transportDarat),
      transport_taksi: IDRCurrency.format(transportTaksi),
      representatif: IDRCurrency.format(representatif), // Bisa diubah jika representatif ada datanya
      total: IDRCurrency.format(total),
    }
  })
})

const id = computed(() => {
  return route.params.id ?? null
})

onMounted(async () => {
  await perjadinStore.show(id.value)
})
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
