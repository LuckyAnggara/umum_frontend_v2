import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    tahunOptions: [2023, 2024, 2025, 2026, 2027, 2028],
    bulanOptions: [
      {
        id: '01',
        label: 'Januari',
      },
      {
        id: '02',
        label: 'Februari',
      },
      {
        id: '03',
        label: 'Maret',
      },
      {
        id: '04',
        label: 'April',
      },
      {
        id: '05',
        label: 'Mei',
      },
      {
        id: '06',
        label: 'Juni',
      },
      {
        id: '07',
        label: 'Juli',
      },
      {
        id: '08',
        label: 'Agustus',
      },
      {
        id: '09',
        label: 'September',
      },
      {
        id: '10',
        label: 'Oktober',
      },
      {
        id: '11',
        label: 'November',
      },
      {
        id: '12',
        label: 'Desember',
      },
    ],
    limitOptions: [
      {
        value: '10',
        label: '10',
      },
      {
        value: '25',
        label: '25',
      },
      {
        value: '50',
        label: '50',
      },
      {
        value: '100',
        label: '100',
      },
      {
        value: '1000000',
        label: 'Semua',
      },
    ],
    statusOptions: [
      {
        value: 'ORDER',
        label: 'ORDER',
      },
      {
        value: 'PROCESS',
        label: 'PROCESS',
      },
      {
        value: 'SUCCESS',
        label: 'SUCCESS',
      },
      {
        value: 'REJECTED',
        label: 'REJECTED',
      },
      {
        value: '',
        label: 'SEMUA',
      },
    ],
    ruangOptions: [
      {
        id: '1',
        label: 'AUDITORIUM',
      },
      {
        id: '2',
        label: 'RUANG RAPAT INSPEKTUR JENDERAL',
      },
      {
        id: '3',
        label: 'RUANG RAPAT SEKRETARIS INSPEKTORAT JENDERAL',
      },
    ],
    pimpinanOptions: [
      {
        id: '1',
        label: 'INSPEKTUR JENDERAL',
      },
      {
        id: '2',
        label: 'SEKRETARIS INSPEKTORAT JENDERAL',
      },
      {
        id: '3',
        label: 'INSPEKTUR WILAYAH I',
      },
      {
        id: '4',
        label: 'INSPEKTUR WILAYAH II',
      },
      {
        id: '5',
        label: 'INSPEKTUR WILAYAH III',
      },
      {
        id: '6',
        label: 'INSPEKTUR WILAYAH IV',
      },
      {
        id: '7',
        label: 'INSPEKTUR WILAYAH V',
      },
      {
        id: '8',
        label: 'INSPEKTUR WILAYAH VI',
      },
    ],
    bendaharaOptions: [
      {
        id: '1',
        nama: 'Emmania Novada Sudarno',
        nip: '199011202015032004',
      },
    ],
    ppkOptions: [
      {
        id: '1',
        nama: 'Baneriama',
        nip: '197306231994032001',
      },
      {
        id: '2',
        nama: 'Lusi Handayani',
        nip: '198601112009122008',
      },
    ],
    unitOptions: [
      'Inspektur Jenderal',
      'Inspektorat Wilayah I',
      'Inspektorat Wilayah II',
      'Inspektorat Wilayah III',
      'Inspektorat Wilayah IV',
      'Inspektorat Wilayah V',
      'Inspektorat Wilayah VI',
      'Bagian Program dan Pelaporan',
      'Bagian Umum',
      'Kelompok Sumber Daya Manusia',
      'Kelompok Keuangan',
      'Kelompok Humas dan Sistem Informasi Pengawasan',
    ],
    peranOptions: [
      '-',
      'ANGGOTA',
      'KETUA TIM',
      'PENGENDALI TEKNIS',
      'PENGENDALI MUTU',
    ],
    form: {
      nip: '1',
      password: '123456',
    },
    isLoading: false,
  }),
})
