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
    form: {
      nip: '1',
      password: '123456',
    },
    isLoading: false,
  }),
})
