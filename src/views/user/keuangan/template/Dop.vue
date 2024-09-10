<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <!-- <template >
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
    </template> -->
      <!-- Print Button -->
      <div class="no-print mb-6 mx-auto max-w-3xl flex flex-col">
        <button onclick="window.print()" class="w-fit text-right bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Print</button>
      </div>

      <div id="print-container">
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
                <!-- <p class="w-6/12">ITJ.1-KU.03.02-{{ perjadinDetailStore.singleResponse.no_sppd }}</p> -->
              </div>
            </div>
          </div>

          <h3 class="mb-3 mt-2 text-center text-xl font-bold underline">SURAT PERJALANAN DINAS (SPD)</h3>
   <div class="border border-black p-4">
        <table class="w-full border-collapse border border-black text-sm">
            <tr>
                <td class="border border-black p-2" rowspan="2">I</td>
                <td class="border border-black p-2" colspan="2">Berangkat dari</td>
                <td class="border border-black p-2" colspan="2">Ke</td>
                <td class="border border-black p-2">Pada Tanggal</td>
                <td class="border border-black p-2" colspan="2">Kepala</td>
            </tr>
            <tr>
                <td class="border border-black p-2" colspan="2">Tempat Kedudukan</td>
                <td class="border border-black p-2" colspan="2">...</td>
                <td class="border border-black p-2">...</td>
                <td class="border border-black p-2" colspan="2">...</td>
            </tr>
            <tr>
                <td class="border border-black p-2">II</td>
                <td class="border border-black p-2" colspan="2">Tiba di</td>
                <td class="border border-black p-2">...</td>
                <td class="border border-black p-2" colspan="2">Pada Tanggal</td>
                <td class="border border-black p-2">Kepala</td>
            </tr>
            <tr>
                <td class="border border-black p-2">III</td>
                <td class="border border-black p-2" colspan="2">Tiba di</td>
                <td class="border border-black p-2" colspan="2">...</td>
                <td class="border border-black p-2">Pada Tanggal</td>
                <td class="border border-black p-2">Kepala</td>
            </tr>
            <!-- Repeat similar rows for IV, V, VI -->
            <tr>
                <td class="border border-black p-2">VI</td>
                <td class="border border-black p-2" colspan="2">Tiba di (Tempat Kedudukan)</td>
                <td class="border border-black p-2">Pada Tanggal</td>
                <td class="border border-black p-2" colspan="2">...</td>
                <td class="border border-black p-2">Kepala</td>
            </tr>
            <tr>
                <td colspan="6" class="border border-black p-2">
                    <strong>VII. Catatan Lain-Lain</strong>
                </td>
            </tr>
            <tr>
                <td colspan="6" class="border border-black p-2">
                    <strong>VIII. PERHATIAN:</strong><br>
                    PPK yang menerbitkan SPD, pegawai yang melakukan perjalanan dinas...
                </td>
            </tr>
        </table>
    </div>
          <small class="text-gray-700">Coret yang tidak perlu</small>
<!-- 
          <div class="mb-3 p-2 text-left text-xs">
            <div class="flex justify-end text-start">
              <div class="flex flex-col justify-between">
                <p class="font-semibold w-60">Dikeluarkan di Jakarta</p>
                <p class="font-semibold w-60">Tanggal {{ perjadinDetailStore.singleResponse.master.tanggal_st }}</p>
                <div class="w-60">
                  <p class="mt-12">
                    {{ perjadinDetailStore.singleResponse.ppk.nama }}
                  </p>
                  <p>NIP {{ perjadinDetailStore.singleResponse.ppk.nip }}</p>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
  </div>
</template>
<script setup>
import { usePerjadinDetailStore } from '@/stores/perjadinDetail'
import { useMainStore } from '@/stores/main'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'

const mainStore = useMainStore()
const perjadinDetailStore = usePerjadinDetailStore()
const route = useRoute()

const id = computed(() => {
  return route.params.id ?? null
})

const transport = computed(() => {
  // Menggunakan reduce untuk menghasilkan array dengan tipe yang unik
  return perjadinDetailStore.singleResponse.transport.reduce((acc, current) => {
    const found = acc.find((item) => item.tipe === current.tipe)
    if (!found) {
      acc.push(current)
    }
    return acc
  }, [])
})

// onMounted(async () => {
//   await perjadinDetailStore.show(id.value)
// })

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

<!-- <table class="table-auto border border-collapse border-gray-500 w-full">
  <tbody>
    <tr>
      <td class="border border-gray-500 p-1 w-1/3">Pejabat Pembuat Komitmen</td>
      <td class="border border-gray-500 p-1">{{ perjadinDetailStore.singleResponse.ppk.nama }}</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Nama/NIP Pegawai yang Melaksanakan Perjalanan Dinas</td>
      <td class="border border-gray-500 p-1">
        <div class="flex flex-col">
          <span>{{ perjadinDetailStore.singleResponse.nama }}</span
          ><span>{{ perjadinDetailStore.singleResponse.nip }}</span>
        </div>
      </td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Pangkat dan golongan</td>
      <td class="border border-gray-500 p-1">a. IIIa / Penata Muda <br />b. Auditor Ahli Pertama</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Tingkat Biaya Perjalanan Dinas</td>
      <td class="border border-gray-500 p-1">c. E</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Maksud perjalanan dinas</td>
      <td class="border border-gray-500 p-1">
        Melaksanakan Kegiatan Reviu Peneyerapaan Anggaran dan Pengadaan Barang/Jasa (PAPBJ) Triwulan II Tahun Anggaran 2024 pada 11 (sebelas) Unit
        Eselon I dan Pusat di Lingk. Kemenkumham
      </td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Alat angkutan yang di pergunakan</td>
      <td class="border border-gray-500 p-1">Kereta Api/Mobil</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Tempat berangkat</td>
      <td class="border border-gray-500 p-1">a. Jakarta</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Tujuan</td>
      <td class="border border-gray-500 p-1">b. 11 UE I di Pusdatin di Lingk. Kemenkumham</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Lamanya perjalanan dinas</td>
      <td class="border border-gray-500 p-1">2 Hari</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Tanggal berangkat</td>
      <td class="border border-gray-500 p-1">a. 10 Juni 2024</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Tanggal harus kembali/Tiba di tempat baru</td>
      <td class="border border-gray-500 p-1">b. 11 Juni 2024</td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Pengikut</td>
      <td class="border border-gray-500 p-1">
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th class="border border-gray-500 p-1">Nama</th>
              <th class="border border-gray-500 p-1">Tanggal Lahir</th>
              <th class="border border-gray-500 p-1">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-500 p-1">-</td>
              <td class="border border-gray-500 p-1">-</td>
              <td class="border border-gray-500 p-1">-</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Pembebanan Anggaran</td>
      <td class="border border-gray-500 p-1">
        <p>a. Instansi: -</p>
        <p>b. Akun: -</p>
      </td>
    </tr>
    <tr>
      <td class="border border-gray-500 p-1">Keterangan lain-lain</td>
     <td class="border border-gray-500 p-1" colspan="3"></td>
    </tr>
  </tbody>
</table> -->
