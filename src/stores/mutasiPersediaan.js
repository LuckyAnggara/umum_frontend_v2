/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import { shallowRef } from 'vue'

const toast = useToast()
export const useMutasiPersediaanStore = defineStore('mutasiPersediaan', {
  state: () => ({
    item: {
      id: null,
    },
    responses: null,
    singleResponses: {},
    originalSingleResponses: {},
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    form: {
      id: null,
      jumlah: 0,
      tipe: 'DEBIT',
      catatan: null,
    },
    filter: {
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
      return (
        '&start-date=' +
        state.filter.date[0] +
        '&end-date=' +
        state.filter.date[1]
      )
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
    saldoAkhir(state) {
      if (state.form.tipe == 'DEBIT') {
        return parseFloat(state.item.saldo) + parseFloat(state.form.jumlah ?? 0)
      } else {
        return parseFloat(state.item.saldo) - parseFloat(state.form.jumlah ?? 0)
      }
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/persediaan/mutasi?limit=${this.filter.currentLimit}&id=${this.item.id}${this.pageQuery}${this.searchQuery}${this.dateQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    show(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    async store() {
      this.form.id = this.item.id
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(
          `/api/persediaan/mutasi`,
          this.form
        )
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
    clearForm() {
      this.form = {
        id: null,
        jumlah: 0,
        tipe: 'DEBIT',
        catatan: null,
      }
    },
  },
})
