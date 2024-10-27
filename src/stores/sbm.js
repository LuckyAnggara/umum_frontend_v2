import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'
import { useRound } from '@vueuse/math'

export const useSbmStore = defineStore('sbmStore', {
  state: () => ({
    isLoading: false,
    isDetailLoading: false,
    responses: null,
    responseNominatif: null,
    singleResponse: null,
    originalSingleResponse: null,
    form: {
      biaya: null,
      dearah: null,
      tahun: moment().format('YYYY'),
      nilai: null,
      satuan: null,
    },
    filter: {
      page: 0,
      currentLimit: 50,
      searchQuery: '',
      tahun: moment().format('YYYY'),
    },
  }),
  getters: {
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
    total(state) {
      return state.responses?.total
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
    pageQuery(state) {
      if (state.filter.page == '' || state.filter.page == null) {
        return ''
      }
      return '&page=' + state.filter.page
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/sbm?limit=${this.filter.currentLimit}${this.pageQuery}&tahun=${this.filter.tahun}${this.searchQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
  },
})
