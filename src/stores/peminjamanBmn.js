/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { toast } from 'vue3-toastify'
import moment from 'moment'

export const usePeminjamanBmn = defineStore('peminjamanBmn', {
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
    },
    selectAll: true,
    form: {
      nup: null,
      jenis_layanan: 'Peminjaman',
      tanggal_pengembalian: null,
      catatan: null,
      detail: [],
      nip: null,
      nama: null,
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
          `/api/peminjaman-bmn?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}`
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
        const response = await axiosIns.post(`/api/peminjaman-bmn`, this.form)
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
        return {
          status: false,
          data: null,
        }
      } finally {
        this.isStoreLoading = false
      }
    },
    async show(id = '') {
      this.isShowLoading = true
      try {
        const response = await axiosIns.get(`/api/peminjaman-bmn/${id}`)
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
        const response = await axiosIns.delete(`/api/peminjaman-bmn/${id}`)
        if (response.status == 200) {
          const index = this.items.findIndex((item) => item.id === id)
          this.responses.data.splice(index, 1)
          return true
        } else {
          return false
        }
      } catch (error) {
      } finally {
        this.isDestroyLoading = false
      }
    },
    async update({ status = 'APPROVE' }) {
      let form = {
        status: status,
        detail: this.singleResponses,
      }
      try {
        const response = await axiosIns.patch(
          `/api/peminjaman-bmn/${this.singleResponses.id}`,
          form
        )
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
        // const response = await axiosIns.put(`/api/peminjaman-bmn/done/${this.singleResponses.id}`, this.doneForm) versi lama
        //  versi detail peminjaman bmn
        const response = await axiosIns.put(
          `/api/peminjaman-bmn/done/${this.singleResponses.id}`,
          this.doneForm
        )
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
        const response = await axiosIns.put(
          `/api/peminjaman-bmn/undo/${this.singleResponses.id}`
        )
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
    addCart(item) {
      if (!this.checkItem(item.id)) {
        this.form.detail.push(item)
        toast.success(`${item.nama} ditambahkan`, {
          autoClose: 1000,
          position: toast.POSITION.BOTTOM_CENTER,
        })
      } else {
        toast.error(`${item.nama} sudah ada`, {
          autoClose: 1500,
          position: toast.POSITION.BOTTOM_CENTER,
        })
      }
    },
    checkItem(id) {
      const b = this.form.detail.find((e) => e.id == id)
      if (b) {
        return true
      }
      return false
    },
    removeCart(index) {
      this.form.detail.splice(index, 1)
    },
    clearCart() {
      this.form.detail = []
    },
    setDataPegawai(item) {
      this.form.nama = item.name
      this.form.unit = item.unit?.name
    },
    setCurrentData(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    clearForm() {
      this.form = {
        nup: null,
        layanan: 'Peminjaman',
        tanggal_pengembalian: new Date(),
        catatan: null,
        nip: null,
        nama: null,
        unit: null,
      }
    },
  },
})
