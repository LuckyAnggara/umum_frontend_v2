<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <!-- Header Section -->
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p><strong>Kegiatan:</strong> Pelaksanaan Pemantauan dan Evaluasi</p>
        <p>
          <strong>Maksud Perjalanan Dinas:</strong> Kegiatan Penguatan Melalui
          Sosialisasi Hasil Survei...
        </p>
      </div>
      <div>
        <p><strong>TA:</strong> 2024</p>
        <p><strong>MAK:</strong> 1569.E8D.953.051.A.524111</p>
      </div>
    </div>

    <!-- Excel Editor -->
    <vue-excel-editor v-model="data" :row-style="rowStyle" class="mt-6">
      <vue-excel-column field="no" label="No" type="number" width="50px" />
      <vue-excel-column field="name" label="Nama" type="string" width="150px" />
      <vue-excel-column field="gol" label="Gol" type="string" width="50px" />
      <vue-excel-column
        field="departure"
        label="Keberangkatan"
        type="string"
        width="120px"
      />
      <vue-excel-column
        field="destination"
        label="Tujuan"
        type="string"
        width="120px"
      />
      <vue-excel-column
        field="departure_date"
        label="Tanggal Berangkat"
        type="date"
        width="120px"
      />
      <vue-excel-column
        field="return_date"
        label="Tanggal Kembali"
        type="date"
        width="120px"
      />
      <vue-excel-column
        field="hotel_cost"
        label="Biaya Hotel"
        type="number"
        width="100px"
      />
      <vue-excel-column
        field="transport_land"
        label="Transport Darat"
        type="number"
        width="100px"
      />
      <vue-excel-column
        field="transport_air"
        label="Transport Udara"
        type="number"
        width="100px"
      />
      <vue-excel-column
        field="representative"
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
    </vue-excel-editor>

    <!-- Signature Section -->
    <div class="mt-8 text-right">
      <p>Jakarta, 27 Mei 2024</p>
      <p><strong>Kepala Bagian Program dan Pelaporan</strong></p>
      <p>Nanih Kusnani</p>
      <p>NIP 19721204 199903 2 001</p>
    </div>
  </div>
</template>

<script setup>
import { IDRCurrency, terbilang } from '@/utilities/formatter'
import { computed } from 'vue'
import { ref } from 'vue'

function rowStyle(row) {
  return { 'bg-gray-50': row.total > 5000000 }
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
const config = ref({
  readonly: true, // Atur false agar tabel bisa diedit
  columns: [
    { label: 'No', width: 50, field: 'no', autoFillWidth: true },
    { label: 'Jabatan', width: 200, field: 'jabatan' },
    { label: 'Gol', width: 100, field: 'gol' },
    {
      label: 'Keberangkatan',
      width: 300,
      field: 'keberangkatan',
      autoFillWidth: true,
    },
    { label: 'Tujuan', width: 150, field: 'tujuan' },
    { label: 'Berangkat', width: 100, field: 'berangkat' },
    { label: 'Kembali', width: 100, field: 'kembali' },
    { label: 'Jml Hari', width: 80, field: 'hari' },
    { label: 'Uang Harian (hr)', width: 150, field: 'uang_harian' },
    {
      label: 'Biaya Hotel (Rp)',
      width: 150,
      field: 'biaya_hotel',
    },
    { label: 'Udara', width: 100, field: 'udara' },
    { label: 'Darat', width: 100, field: 'darat' },
    { label: 'Taksi Jakarta', width: 150, field: 'taksi_jakarta' },
    { label: 'Taksi Provinsi', width: 150, field: 'taksi_provinsi' },
    { label: 'Representatif', width: 150, field: 'representatif' },
    { label: 'Total', width: 200, field: 'total', readonly: true },
  ],
})

const data = ref([
  {
    no: 1,
    name: 'Rifaldy Mahardika Putra',
    gol: 'III',
    departure: 'Jakarta',
    destination: 'Sumatera Barat',
    departure_date: '2024-05-28',
    return_date: '2024-05-31',
    hotel_cost: 380000,
    transport_land: 512000,
    transport_air: 2952000,
    representative: 300000,
    total: 5284400,
  },
  {
    no: 2,
    name: 'Lucky Anggara',
    gol: 'III',
    departure: 'Jakarta',
    destination: 'Sumatera Barat',
    departure_date: '2024-05-28',
    return_date: '2024-05-31',
    hotel_cost: 380000,
    transport_land: 512000,
    transport_air: 2952000,
    representative: 300000,
    total: 4984000,
  },
  {
    no: 3,
    name: 'Ivan Satria Nurrahman',
    gol: 'III',
    departure: 'Jakarta',
    destination: 'Sumatera Barat',
    departure_date: '2024-05-28',
    return_date: '2024-05-31',
    hotel_cost: 380000,
    transport_land: 512000,
    transport_air: 2952000,
    representative: 300000,
    total: 4984000,
  },
])
const totalCost = computed(() => {
  // Menghitung total dari semua total di tabel
  return data.value.reduce((acc, item) => acc + item.total, 0)
})
</script>

<style scoped>
/* Menambah margin ke container */
.container {
  max-width: 1200px;
}

/* Penyesuaian border dan padding untuk table */
.v-excel-editor {
  border: 1px solid #e5e7eb; /* Tailwind border-gray-300 */
  padding: 10px;
}

/* Bagian footer */
.footer-section {
  margin-top: 20px;
}
</style>
