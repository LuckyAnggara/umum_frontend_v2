/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    responses: null,
    isSearching: false,
    isLoading: false,
  }),
  getters: {
    items(state) {
      return state.responses ?? []
    },
    dateQuery() {
      return '&date=' + moment().format('YYYY-MM-DD')
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/dashboard?${this.dateQuery}`)
        this.responses = response.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
  },
})
