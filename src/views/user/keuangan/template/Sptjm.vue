<template>
  <div class="bg-gray-100 p-5 font-sans min-h-dvh">
    <template v-if="perjadinDetailStore.singleResponse == null">
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
      <div class="no-print mb-6 mx-auto max-w-3xl flex flex-col">
        <button onclick="window.print()" class="w-fit text-right bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Print</button>
      </div>

      <div id="print-container">
        <div class="print-area mx-auto bg-white p-8 max-w-3xl">
          <div class="container mx-auto p-8 font-sans">
            <!-- Header Section -->
            <div class="flex justify-between mb-6">
              <div class="flex items-start">
                <img src="https://placehold.co/20x20.png" alt="Logo" class="h-20 w-auto mr-4" />
                <div class="text-sm">
                  <p class="font-bold">KEMENTERIAN HUKUM DAN HAK ASASI MANUSIA</p>
                  <p class="font-bold">REPUBLIK INDONESIA</p>
                  <p class="font-bold">INSPEKTORAT JENDERAL</p>
                  <p>JI. H.R. Rasuna Said Kav. X-6 No. 8, Kuningan,</p>
                  <p>Jakarta Selatan 12940, P.O. Box 3489, Telepon/Faksimili 021-5252975</p>
                  <p>
                    Laman: <a href="http://www.itjen.kemenkumham.go.id" class="underline">http://www.itjen.kemenkumham.go.id</a>, Email:
                    <a href="mailto:itjen@kemenkumham.go.id" class="underline">itjen@kemenkumham.go.id</a>
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <input type="checkbox" name="check" id="checkbox" class="border-2 border-black h-4 w-4" />
              </div>
            </div>
            <!-- Main Content -->
            <div class="text-center">
              <h2 class="text-xl font-bold mb-6 uppercase tracking-wide">SURAT PERNYATAAN TANGGUNG JAWAB MUTLAK</h2>
            </div>
            <div class="mb-6">
              <p>Yang bertanda tangan di bawah ini:</p>
              <div class="ml-8">
                <p>
                  Nama <span class="ml-1">:</span> <span class="font-semibold">{{ name }}</span>
                </p>
                <p>NIP <span class="ml-2">:</span> {{ nip }}</p>
                <p>
                  Jabatan <span class="ml-1">:</span> <span class="font-semibold">{{ jabatan }}</span>
                </p>
              </div>
            </div>

            <div class="mb-6">
              <p>Menyatakan dengan sesungguhnya bahwa:</p>
              <ol class="list-decimal list-inside ml-8">
                <li>
                  Sehubungan dengan Surat <span class="font-semibold">Tugas</span> Inspektur Jenderal Nomor: ITJ-KP.04.01-1879 tanggal 28 Oktober 2024, maka
                  saya menyatakan dengan sesungguhnya benar telah menjalankan tugas perjalanan dinas dimaksud;
                </li>
                <li>
                  Apabila dikemudian hari terdapat kesalahan dan/atau kelebihan atas pembayaran Surat Perintah Perjalanan Dinas (SPPD) kegiatan tersebut,
                  sebagian atau seluruhnya, kami bertanggungjawab dan bersedia menyetorkan atas kesalahan dan/atau kelebihan pembayaran tersebut ke Kas Negara.
                </li>
              </ol>
            </div>

            <p>Demikian pernyataan ini saya buat dengan sebenar-benarnya.</p>

            <!-- Signature Section -->
            <div class="mt-8 flex justify-end">
              <div>
                <p class="mb-4">Yang membuat pernyataan,</p>
                <div class="text-center">
                  <p class="font-semibold">{{ name }}</p>
                  <p>NIP {{ nip }}</p>
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
import { useMainStore } from '@/stores/main'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { IDRCurrency, terbilang } from '@/utilities/formatter'
import { ref } from 'vue'

const mainStore = useMainStore()
const perjadinDetailStore = usePerjadinDetailStore()
const route = useRoute()
const name = ref('Ika Yusanti')
const nip = ref('197212041999032001')
const jabatan = ref('Sekretaris Inspektorat Jenderal')

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
