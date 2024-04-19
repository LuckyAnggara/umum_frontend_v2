/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'
import { getLastDayOfMonth } from '@/services/helper'

export const useRateStore = defineStore('rate', {
  state: () => ({
    responses: null,
    popShow: false,
    form: {
      value: null,
      saran: null,
    },
    filter: {
      date: moment().format('YYYY-MM-DD'),
      month: null,
      year: null,
    },
  }),
  getters: {
    dateQuery(state) {
      if (state.form.tanggal == '' || state.form.tanggal == null) {
        return ''
      }
      return '&date=' + moment(state.form.tanggal).format('YYYY-MM-DD')
    },
    minMaxDate(state) {
      const maxDate = getLastDayOfMonth(state.filter.year, state.filter.month)
      if (state.filter.month == null && state.filter.year == null) {
        return null
      } else {
        return {
          min: state.filter.year + '-' + state.filter.month + '-01',
          max: state.filter.year + '-' + state.filter.month + '-' + maxDate,
        }
      }
    },
  },
  actions: {
    async store() {
      try {
        const response = await axiosIns.post(`/api/rate-layanan`, this.form)
        if (response.status == 200) {
          return {
            status: true,
            data: response.data.data,
          }
        } else {
          return {
            status: false,
            data: null,
          }
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isStoreLoading = false
      }
    },
  },
})
