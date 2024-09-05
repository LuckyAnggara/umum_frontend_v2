import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const useMakStore = defineStore('mak', {
  state: () => ({
    isLoading: false,
    responses: null,
    filter: {
      currentLimit: 5,
      searchQuery: '',
      tahun: moment().format('YYYY'),
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/mak?limit=${this.filter.currentLimit}&tahun=${this.filter.tahun}${this.searchQuery}`
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
