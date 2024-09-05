<template>
  <div class="bg-gray-100 p-5 font-sans">
    <template v-if="perjadinDetailStore.singleResponse == null">
      <span>Getting Data !!</span>
    </template>
    <template v-else>
      <div class="print-area mx-auto max-w-3xl bg-white p-8">
        <div class="flex flex-row justify-between border-b">
          <div class="mb-8 text-left flex flex-col">
            <p class="text-md font-bold uppercase">Inspektorat Jenderal</p>
            <p class="text-md font-semibold">Kementerian Hukum dan HAM</p>
          </div>
          <div class="w-72 flex-col text-xs">
            <div class="mb-1 flex">
              <p class="w-5/12 font-semibold">No</p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">0001</p>
            </div>
            <div class="mb-1 flex">
              <p class="w-5/12 font-semibold">Kode MAK</p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">1563.EBD.965.051.A.521111</p>
            </div>
            <div class="mb-1 flex">
              <p class="w-5/12 font-semibold">Tahun Anggaran</p>
              <p class="w-1/12">:</p>
              <p class="w-6/12">2024</p>
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
                $moment(perjadinDetailStore.singleResponse.tanggal_sppd).format(
                  'DD MMMM YYYY'
                )
              }}
            </p>
          </div>
          <div class="mb-1 flex">
            <p class="flex w-4/12 flex-row justify-between font-semibold">
              <span>Guna Pembayaran</span><span>:</span>
            </p>
            <p class="ml-1 w-8/12 text-justify">
              Kegiatan {{ perjadinStore.singleResponse.nama_kegiatan }} di
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
              <p class="flex w-4/12 flex-row justify-between font-semibold">
                <span>Transport</span><span>:</span>
              </p>
              <ul class="list-decimal ml-1 w-8/12">
                <li class="flex flex-row">
                  1.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">Darat - </span>
                      <span> Taxi Bandara</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 3.500.000</span
                    >
                  </div>
                </li>
                <li class="flex flex-row">
                  2.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">Udara - </span>
                      <span> Pesawat</span>
                    </div>

                    <span class="text-gray-900 text-right"
                      >: Rp. 3.500.000</span
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
                <li class="flex flex-row">
                  1.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">3 Hari x </span>
                      <span> Rp. 700.000</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 3.500.000</span
                    >
                  </div>
                </li>
                <li class="flex flex-row">
                  2.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">3 Hari x </span>
                      <span> Rp. 700.000</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 3.500.000</span
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
                <li class="flex flex-row">
                  1.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">3 Hari x </span>
                      <span> Rp. 700.000</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 3.500.000</span
                    >
                  </div>
                </li>
                <li class="flex flex-row">
                  2.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">3 Hari x </span>
                      <span> Rp. 700.000</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 3.500.000</span
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
                <li class="flex flex-row">
                  1.
                  <div class="ml-1 flex space-x-2 flex-row w-64">
                    <div class="w-2/3">
                      <span class="text-gray-900">3 Hari x </span>
                      <span> Rp. 100.000</span>
                    </div>

                    <span class="text-gray-900 w-32 text-right"
                      >: Rp. 300.000</span
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
              <span>Rp. 7.500.000</span>
            </p>
          </div>
          <div>
            <p>Tanggal Pembukuan:</p>
          </div>
        </div>

        <div class="mb-3 border p-2 text-left text-xs">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div></div>
            <div></div>
            <div class="text-left">
              <p>Jakarta, 24 Agustus 2024</p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4 text-center">
            <div class="flex flex-col justify-between">
              <p class="font-semibold">Bendahara Pengeluaran</p>
              <div>
                <p class="mt-12">Emmania Novada Sudarno</p>
                <p>NIP 199011202015032004</p>
              </div>
            </div>
            <div>
              <div class="flex flex-col justify-between">
                <div>
                  <p>a.n Kuasa Pengguna Anggaran</p>
                  <p class="font-semibold">Pejabat Pembuat Komitmen</p>
                </div>
                <div>
                  <p class="mt-12">Baneriama</p>
                  <p>NIP 197306231994032001</p>
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
}
</style>
