/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const useNonPerjadinStore = defineStore('nonPerjadinStore', {
  state: () => ({
    responses: null,
    singleResponse: null,
    singleDetail: null,
    originalSingleResponse: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isDestroyLoading: false,
    isDetail: false,
    form: {
      tahun_anggaran: moment().format('YYYY'),
      uraian: null,
      total_anggaran: 0,
      mak: {
        anggaran: 0,
      },
      nip_penerima: null,
      penerima: null,
      bendahara: null,
      ppk: null,
      catatan: null,
      lampiran: [],
    },
    updateData: {
      status: '',
      catatan: '',
    },
    deleteLampiran: [],
    updateIndex: 0,
    filter: {
      currentUnit: 0,
      currentStatus: '',
      date: [],
      currentLimit: 25,
      searchQuery: '',
      tanggalTransaksi: null,
      page: '',
    },
  }),
  getters: {
    isFormFill(state) {
      if (
        state.form.tahun_anggaran == null ||
        state.form.tahun_anggaran == '' ||
        state.form.tanggal_transaksi == '' ||
        state.form.tanggal_transaksi == '' ||
        state.form.uraian == null ||
        state.form.uraian == '' ||
        state.form.total_anggaran == null ||
        state.form.total_anggaran == '' ||
        state.form.nip_penerima == null ||
        state.form.nip_penerima == '' ||
        state.form.penerima == null ||
        state.form.penerima == '' ||
        state.form.bendahara == null ||
        state.form.bendahara == '' ||
        state.form.ppk == '' ||
        state.form.ppk == '' ||
        state.form.mak == null ||
        state.form.mak == ''
      ) {
        return false
      } else {
        return true
      }
    },
    items(state) {
      return state.responses?.data ?? []
    },
    editDetail(state) {
      const list1 = JSON.stringify(state.singleResponse?.detail)
      const list2 = JSON.stringify(state.originalSingleResponse?.detail)
      if (list1 == list2) {
        return false
      }
      return true
    },
    editLampiran(state) {},
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
    tanggalTransaksiQuery(state) {
      if (state.filter.tanggalTransaksi == null) {
        return ''
      }
      return '&date=' + state.filter.tanggalTransaksi
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
    statusQuery(state) {
      if (state.filter.currentStatus == '' || state.filter.currentStatus == null) {
        return ''
      }
      return '&status=' + state.filter.currentStatus
    },
    pageQuery(state) {
      if (state.filter.page == '' || state.filter.page == null) {
        return ''
      }
      return '&page=' + state.filter.page
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
          `/api/keuangan/non-perjadin?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}${this.tanggalTransaksiQuery}${this.unitQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    resetFormMain() {
      this.form = {
        tahun_anggaran: moment().format('YYYY'),
        uraian: null,
        total_anggaran: 0,
        mak: {
          anggaran: 0,
        },
        nip_penerima: null,
        penerima: null,
        bendahara: null,
        ppk: null,
        lampiran: [],
      }
    },
    destroyLampiran(index, item) {
      this.deleteLampiran.push(item)
      this.singleResponse.lampiran.splice(index, 1)
      return { status: true, message: 'Data berhasil dihapus!' }
    },
    async searchLapkin() {
      this.isSearching = true
      try {
        const response = await axiosIns.get(`/api/get-pegawai?nip=${this.form.nip_penerima}`)
        const data = response.data.data

        this.setPenerima(data)
      } catch (error) {
        alert(error.message)
      } finally {
        this.isSearching = false
      }
      return false
    },
    setPenerima(item) {
      if (item.dari_lapkin) {
        this.form.penerima = item.name
      } else {
        this.form.penerima = item.name
      }
    },
    async store() {
      if (this.isFormFill == false) {
        return {
          status: false,
          data: null,
          message: 'Data belum lengkap',
        }
      }
      let formData = new FormData()
      if (this.form.lampiran) {
        this.form.lampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', this.form.lampiran.length)
      }
      formData.append('umum', JSON.stringify(this.form))
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/keuangan/non-perjadin`, formData, {
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
    async show(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/keuangan/non-perjadin/${id}`)
        this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponse = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async update() {
      let formData = new FormData()
      this.singleResponse.total_anggaran = this.getTotalAnggaran
      formData.append('_method', 'put')
      if (this.singleResponse?.newLampiran) {
        this.singleResponse?.newLampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', this.singleResponse?.newLampiran.length)
      }

      if (this.deleteLampiran.length > 0) {
        this.deleteLampiran.forEach((element, index) => {
          formData.append(`file_delete[${index}]`, element.id)
        })
        formData.append('jumlah_lampiran_delete', this.deleteLampiran.length)
      }
      formData.append('umum', JSON.stringify(this.singleResponse))
      formData.append('editDetail', JSON.stringify(this.editDetail))
      this.isUpdateLoading = true

      try {
        const response = await axiosIns.post(`/api/keuangan/perjadin/${this.singleResponse.id}`, formData)
        if (response.status == 200) {
          this.singleResponse = response.data.data
          this.deleteLampiran = []
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
        this.isUpdateLoading = false
      }
    },
    async updateStatus(id) {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(`/api/keuangan/non-perjadin/update-status/${id}`, this.updateData)
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
        this.isUpdateLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      try {
        const response = await axiosIns.delete(`/api/keuangan/non-perjadin/${id}`)
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
    cancelEdit() {
      this.singleResponse = JSON.parse(JSON.stringify(this.originalSingleResponse))
    },
  },
})
