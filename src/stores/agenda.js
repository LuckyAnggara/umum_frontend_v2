/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'
import { getLastDayOfMonth } from '@/services/helper'

export const useAgendaStore = defineStore('agenda', {
  state: () => ({
    responses: null,
    singleResponse: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    form: {
      kegiatan: null,
      tanggal: null,
      tempat: null,
      pimpinan: 1,
      jam_mulai: { hours: 8, minutes: 0, seconds: 0 },
      jam_akhir: { hours: 16, minutes: 0, seconds: 0 },
    },
    filter: {
      date: moment().format('YYYY-MM-DD'),
      currentLimit: 10,
      month: null,
      year: null,
      searchQuery: 1,
      page: '',
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    dataCalendar(state) {
      return state.items.map((event) => ({
        id: event.id,
        title: event.kegiatan,
        date: event.tanggal,
        start: event.start,
        end: event.end,
      }))
    },
    total(state) {
      return state.responses?.total
    },
    dateQuery(state) {
      if (state.form.tanggal == '' || state.form.tanggal == null) {
        return ''
      }
      return '&date=' + moment(state.form.tanggal).format('YYYY-MM-DD')
    },
    adminQuery(state) {
      if (state.minMaxDate == null) {
        return ''
      }
      return `&start-date=${state.minMaxDate.min}&end-date=${state.minMaxDate.max}`
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
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/agenda?query=${this.form.pimpinan}${this.dateQuery}${this.adminQuery}`)
        this.responses = response.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store({ uploadFile = null }) {
      let formData = new FormData()
      if (uploadFile) {
        uploadFile.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', uploadFile.length)
      }
      formData.append('kegiatan', this.form.kegiatan)
      formData.append('jam_akhir[hours]', this.form.jam_akhir.hours)
      formData.append('jam_akhir[minutes]', this.form.jam_akhir.minutes)
      formData.append('jam_akhir[seconds]', this.form.jam_akhir.seconds)
      formData.append('jam_mulai[hours]', this.form.jam_akhir.hours)
      formData.append('jam_mulai[minutes]', this.form.jam_akhir.minutes)
      formData.append('jam_mulai[seconds]', this.form.jam_akhir.seconds)
      formData.append('pimpinan', this.form.pimpinan)
      formData.append('tanggal', moment(this.form.tanggal).toString())
      formData.append('tempat', this.form.tempat)

      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/agenda`, uploadFile ? formData : this.form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
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
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/agenda/${id}`, {
          params: {
            pesan: this.pesanDelete,
          },
        })
        if (response.status == 200) {
          const index = this.items.findIndex((item) => item.id === id)
          this.responses.data.splice(index, 1)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isDestroyLoading = false
      }
    },

    setDataPegawai(item) {
      this.form.nama = item.name
      this.form.unit = item.unit?.name
    },
    clearForm() {
      this.form = {
        kegiatan: null,
        tanggal: null,
        tempat: null,
        pimpinan: 1,
        jam_mulai: { hours: 8, minutes: 0, seconds: 0 },
        jam_akhir: { hours: 16, minutes: 0, seconds: 0 },
      }
    },
    setDataSingle(id) {
      this.singleResponse = this.items.find((x) => {
        return x.id == id
      })
    },
  },
})
