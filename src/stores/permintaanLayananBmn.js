/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { toast } from 'vue3-toastify'
import moment from 'moment'

export const usePermintaanLayananBmn = defineStore('permintaanLayananBmn', {
  state: () => ({
    responses: null,
    tiketToShow: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isShowLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    objectStore: {},
    isDestroyLoading: false,
    doneForm: {
      name: null,
      tanggalPenerimaan: moment().format('DD MMMM YYYY'),
      image: null,
      status: 'DONE',
      no_wa: null,
    },
    selectAll: true,
    form: {
      nup: null,
      jenis_layanan: 'Perbaikan',
      catatan: null,
      nip: null,
      nama_peminta: null,
      unit: null,
    },
    filter: {
      date: null,
      currentLimit: 10,
      searchQuery: '',
      status: '',
      page: '',
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
    to(state) {
      return state.responses?.to
    },
    total(state) {
      return state.responses?.total
    },
    statusQuery(state) {
      if (state.filter.status == 0 || state.filter.status == null) {
        return ''
      }
      return '&status=' + state.filter.status
    },
    dateQuery(state) {
      if (state.filter.date == '' || state.filter.date == null) {
        return ''
      }
      return '&date=' + state.filter.date
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
          `/api/permintaan-layanan-bmn?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store(nup) {
      this.form.nup = nup
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/permintaan-layanan-bmn`, this.form)
        if (response.status == 200) {
          this.clearForm()
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
    async show(id = '') {
      this.isShowLoading = true
      try {
        const response = await axiosIns.get(`/api/permintaan-layanan-bmn/${id}`)
        this.setCurrentData(response.data.data)
      } catch (error) {
        alert(error)
      }
      this.isShowLoading = false
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/permintaan-layanan-bmn/${id}`)
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
    async update({ status = 'APPROVE' }) {
      let form = {
        status: status,
        detail: this.singleResponses.detail,
      }
      try {
        const response = await axiosIns.patch(`/api/permintaan-layanan-bmn/${this.singleResponses.id}`, form)
        if (response.status == 200) {
          this.setCurrentData(response.data.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async updateDone() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(`/api/permintaan-layanan-bmn/done/${this.singleResponses.id}`, this.doneForm)
        if (response.status == 200) {
          this.setCurrentData(response.data.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async updateUndo() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(`/api/permintaan-layanan-bmn/undo/${this.singleResponses.id}`)
        if (response.status == 200) {
          this.setCurrentData(response.data.data)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    setDataPegawai(item) {
      this.form.nama_peminta = item.name
      this.form.unit = item.unit?.name
    },
    setCurrentData(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    clearForm() {
      this.form = {
        nup: null,
        jenis_layanan: 'Perbaikan',
        catatan: null,
        nip: null,
        nama_peminta: null,
        unit: null,
      }
    },
  },
})
