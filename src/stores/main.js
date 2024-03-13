import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    tahunOptions: [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026],
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
    form: {
      nip: '1',
      password: '123456',
    },
    isLoading: false,
  }),
})
