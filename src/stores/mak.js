import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'
import { useRound } from '@vueuse/math'

export const useMakStore = defineStore('mak', {
  state: () => ({
    isLoading: false,
    responses: null,
    singleResponse: null,
    originalSingleResponse: null,
    filter: {
      currentUnit: 0,
      currentStatus: '',
      currentLimit: 1000000,
      searchQuery: '',
      tahun: moment().format('YYYY'),
    },
  }),
  getters: {
    capaianRealisasi(state) {
      return (
        ((state.totalSudahRealisasi + state.totalBelumRealisasi) /
          state.totalAnggaran) *
        100
      ).toFixed(2)
    },
    sudahRealisasiPerMak: (state) => (id) => {
      // Find the parent item (mak_id) with the given id
      const parentItem = state.items.find((item) => item.id === id)

      // If no parent item is found or there are no details, return 0
      if (!parentItem || !parentItem.detail || parentItem.detail.length === 0) {
        return 0
      }

      // Sum the total_realisasi from the details array for the matched parent item
      const total = parentItem.detail
        .filter((i) => i.status_realisasi == 'SUDAH')
        .reduce((sum, detail) => {
          return sum + detail.total_realisasi
        }, 0)

      return total
    },
    belumRealisasiPerMak: (state) => (id) => {
      // Find the parent item (mak_id) with the given id
      const parentItem = state.items.find((item) => item.id === id)

      // If no parent item is found or there are no details, return 0
      if (!parentItem || !parentItem.detail || parentItem.detail.length === 0) {
        return 0
      }

      // Sum the total_realisasi from the details array for the matched parent item
      const total = parentItem.detail
        .filter((i) => i.status_realisasi == 'BELUM')
        .reduce((sum, detail) => {
          return sum + detail.total_anggaran
        }, 0)

      return total
    },
    totalAnggaran(state) {
      // Use reduce to accumulate the total_realisasi from the detail array of each record
      return state.items.reduce((total, item) => {
        return total + item.anggaran
      }, 0)
    },
    totalBelumRealisasi(state) {
      // Use reduce to accumulate the total_realisasi from the detail array of each record
      return state.items.reduce((total, item) => {
        // Sum total_realisasi from detail array for each item
        const detailRealisasi = item.detail
          .filter((i) => i.status_realisasi == 'BELUM')
          .reduce((sum, detail) => sum + detail.total_anggaran, 0)
        return total + detailRealisasi
      }, 0)
    },
    totalSudahRealisasi(state) {
      // Use reduce to accumulate the total_realisasi from the detail array of each record
      return state.items.reduce((total, item) => {
        // Sum total_realisasi from detail array for each item
        const detailRealisasi = item.detail
          .filter((i) => i.status_realisasi == 'SUDAH')
          .reduce((sum, detail) => sum + detail.total_realisasi, 0)
        return total + detailRealisasi
      }, 0)
    },
    totalSingleAnggaran(state) {
      // Use reduce to accumulate the total_realisasi from the detail array of each record
      return state.singleResponse.detail.reduce((total, item) => {
        return total + item.total_anggaran
      }, 0)
    },
    totalSingleSudahRealisasi(state) {
      // Use reduce to accumulate the total_realisasi from the detail array of each record
      return state.singleResponse.detail.reduce((total, item) => {
        return total + item.total_realisasi
      }, 0)
    },

    items(state) {
      return state.responses?.data ?? []
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page)
    },
    lastPage(state) {
      return state.responses?.last_page
    },
    from(state) {
      return state.responses?.from
    },
    to(state) {
      return state.responses?.to
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
    unitQuery(state) {
      if (state.filter.currentUnit == 0 || state.filter.currentUnit == null) {
        return ''
      }
      return '&unit=' + state.filter.currentUnit
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/mak?limit=${this.filter.currentLimit}&tahun=${this.filter.tahun}${this.searchQuery}${this.unitQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async show(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/keuangan/mak/${id}`)
        this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponse = JSON.parse(
          JSON.stringify(response.data.data)
        )
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    filterSingleResponse() {
      if (this.filter.currentStatus == '') {
        this.singleResponse = JSON.parse(
          JSON.stringify(this.originalSingleResponse)
        )
      } else {
        this.singleResponse.detail = this.originalSingleResponse.detail.filter(
          (x) => x.status_realisasi == this.filter.currentStatus
        )
      }
    },
  },
})
