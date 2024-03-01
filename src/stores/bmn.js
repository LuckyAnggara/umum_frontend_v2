/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import { shallowRef } from 'vue'
import moment from 'moment'

const toast = useToast()
export const useBmnStore = defineStore('bmn', {
  state: () => ({
    validNup: null,
    notFound: false,
    nup: null,
    typeSewa: ['semua', 'tersedia', 'tidak tersedia', 'di pinjam'],
    responses: null,
    singleResponses: {
      nama: null,
      satuan: null,
      saldo: 0,
      image: null,
    },
    originalSingleResponses: {
      nama: null,
      satuan: null,
      saldo: 0,
      image: null,
    },
    singleResponsesPermintaan: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isDestroyLoading: false,
    userData: null,
    upload: {
      file: null,
    },
    form: {
      nup: null,
      nama: null,
      ruangan: null,
      penanggung_jawab: null,
      catatan: null,
      tahun_perolehan: moment().format('YYYY'),
    },
    filter: {
      sewa: 'semua',
      date: [],
      currentLimit: 10,
      searchQuery: '',
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
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return ''
      }
      return '&start-date=' + state.filter.date[0] + '&end-date=' + state.filter.date[1]
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
    sewaQuery(state) {
      if (state.filter.sewa == null || state.filter.sewa == 'semua') {
        return ''
      }
      return `&sewa=${state.filter.sewa}`
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/bmn?limit=${this.filter.currentLimit}${this.pageQuery}${this.sewaQuery}${this.searchQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async getDataUser(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/bmn/get?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async showNup(nup = '') {
      this.isSearching = true
      this.notFound = false
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/bmn/show-nup/${nup}`)
        if (response.data.data == null) {
          this.notFound = true
        } else {
          this.isSearching = false
        }

        this.setCurrentDataBmn(response.data.data)
      } catch (error) {}
      this.isLoading = false
    },

    async store({ uploadFile = null }) {
      // if (uploadFile !== null) {
      let formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('nup', this.form.nup)
      formData.append('nama', this.form.nama)
      formData.append('ruangan', this.form.ruangan)
      formData.append('penanggung_jawab', this.form.penanggung_jawab)
      formData.append('catatan', this.form.catatan)
      formData.append('tahun_perolehan', this.form.tahun_perolehan)
      // }
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/bmn`, uploadFile ? formData : this.form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status == 200) {
          this.clearForm()
          return true
        } else {
          return false
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
        const response = await axiosIns.delete(`/api/bmn/${id}`)
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
    show(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    async update({ uploadFile = null }) {
      let formData = new FormData()
      formData.append('_method', 'put')
      formData.append('file', uploadFile)
      formData.append('nup', this.singleResponses.nup)
      formData.append('nama', this.singleResponses.nama)
      formData.append('ruangan', this.singleResponses.ruangan)
      formData.append('penanggung_jawab', this.singleResponses.penanggung_jawab)
      formData.append('catatan', this.singleResponses.catatan)
      formData.append('tahun_perolehan', this.singleResponses.tahun_perolehan)
      // }
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(`/api/bmn/${this.singleResponses.id}`, formData)
        if (response.status == 200) {
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
    clearForm() {
      this.form = {
        nup: null,
        nama: null,
        ruangan: null,
        penanggung_jawab: null,
        catatan: null,
        tahun_perolehan: moment().format('YYYY'),
      }
    },
    async cekNup() {
      const response = await axiosIns.get(`/api/bmn/cek-nup?query=${this.form.nup}`)
      this.validNup = response.data
    },
    setCurrentData(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    setCurrentDataBmn(item) {
      this.singleResponsesPermintaan = JSON.parse(JSON.stringify(item))
    },
  },
})
