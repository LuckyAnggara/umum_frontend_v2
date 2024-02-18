/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'
const toast = useToast()

export const usePtjStore = defineStore('ptj', {
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
      nama_kegiatan: null,
      realisasi: 0,
      tanggal: null,
      nip: null,
      nama: null,
      unit: null,
      no_wa: null,
      lampiran: [],
    },
    filter: {
      date: [],
      currentLimit: 10,
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
        title: event.title,
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
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/ptj?query=${this.form.ruangan}${this.dateQuery}`
        )
        this.responses = response.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store({ uploadFile = null }) {
      // if (uploadFile !== null) {
      let formData = new FormData()
      uploadFile.forEach((element, index) => {
        formData.append(`file[${index}]`, element)
      })
      formData.append('jumlah_lampiran', uploadFile.length)
      formData.append('nama_kegiatan', this.form.nama_kegiatan)
      formData.append('realisasi', this.form.realisasi)
      formData.append('tanggal', this.form.tanggal)
      formData.append('nip', this.form.nip)
      formData.append('nama', this.form.nama)
      formData.append('unit', this.form.unit)
      formData.append('no_wa', this.form.no_wa)

      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(
          `/api/ptj`,
          uploadFile ? formData : this.form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
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
        const response = await axiosIns.delete(`/api/ptj/${id}`, {
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
        nama_kegiatan: null,
        realisasi: 0,
        tanggal: null,
        nip: null,
        nama: null,
        unit: null,
        no_wa: null,
        lampiran: [],
      }
    },
    setDataSingle(id) {
      this.singleResponse = this.items.find((x) => {
        return x.id == id
      })
    },
  },
})
