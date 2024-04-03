/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'

const toast = useToast()
export const useArsipStore = defineStore('arsip', {
  state: () => ({
    responses: null,
    singleResponse: {
      nomor_surat: null,
      tanggal_surat: null,
      klasifikasi: null,
      pencipta_arsip: null,
      pengolah_arsip: null,
      tingkat_perkembangan: null,
      jumlah: null,
      uraian: null,
      lokasi: null,
      lemari: null,
      rak: null,
      no_box: null,
      no_folder: null,
      jenis_media: null,
      lampiran: [],
    },
    deleteLampiran: [],
    originalSingleResponses: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    form: {
      nomor_surat: null,
      tanggal_surat: null,
      klasifikasi: null,
      pencipta_arsip: null,
      pengolah_arsip: null,
      tingkat_perkembangan: null,
      jumlah: null,
      uraian: null,
      lokasi: null,
      lemari: null,
      rak: null,
      no_box: null,
      no_folder: null,
      jenis_media: null,
      lampiran: [],
    },
    filter: {
      date: [],
      tingkat_perkembangan: null,
      pencipta_arsip: null,
      currentLimit: 10,
      searchQuery: null,
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
      if (state.form.tanggal == '' || state.form.tanggal == null) {
        return ''
      }
      return '&date=' + moment(state.form.tanggal).format('YYYY-MM-DD')
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '?query=' + state.filter.searchQuery
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/arsip?${this.searchQuery}${this.dateQuery}`)
        this.responses = response.data.data
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
      formData.append('update', 'false')
      formData.append('jumlah_lampiran', uploadFile.length)
      formData.append('nomor_surat', this.form.nomor_surat)
      formData.append('tanggal_surat', this.form.tanggal_surat)
      formData.append('klasifikasi', this.form.klasifikasi)
      formData.append('pencipta_arsip', this.form.pencipta_arsip)
      formData.append('pengolah_arsip', this.form.pengolah_arsip)
      formData.append('tingkat_perkembangan', this.form.tingkat_perkembangan)
      formData.append('jumlah', this.form.jumlah)
      formData.append('uraian', this.form.uraian)
      formData.append('lokasi', this.form.lokasi)
      formData.append('lemari', this.form.lemari)
      formData.append('rak', this.form.rak)
      formData.append('no_box', this.form.no_box)
      formData.append('no_folder', this.form.no_folder)
      formData.append('jenis_media', this.form.jenis_media)

      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/arsip`, uploadFile ? formData : this.form, {
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
    async update({ uploadFile = null }) {
      let formData = new FormData()
      formData.append('_method', 'put')
      if (uploadFile != null) {
        uploadFile.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', uploadFile.length)
      }
      if (this.deleteLampiran.length > 0) {
        this.deleteLampiran.forEach((element, index) => {
          formData.append(`file_delete[${index}]`, element.id)
        })
        formData.append('jumlah_lampiran_delete', this.deleteLampiran.length)
      }

      formData.append('nomor_surat', this.singleResponse.nomor_surat)
      formData.append('tanggal_surat', this.singleResponse.tanggal_surat)
      formData.append('klasifikasi', this.singleResponse.klasifikasi)
      formData.append('pencipta_arsip', this.singleResponse.pencipta_arsip)
      formData.append('pengolah_arsip', this.singleResponse.pengolah_arsip)
      formData.append('tingkat_perkembangan', this.singleResponse.tingkat_perkembangan)
      formData.append('jumlah', this.singleResponse.jumlah)
      formData.append('uraian', this.singleResponse.uraian)
      formData.append('lokasi', this.singleResponse.lokasi)
      formData.append('lemari', this.singleResponse.lemari)
      formData.append('rak', this.singleResponse.rak)
      formData.append('no_box', this.singleResponse.no_box)
      formData.append('no_folder', this.singleResponse.no_folder)
      formData.append('jenis_media', this.singleResponse.jenis_media)

      this.isUpdateLoading = true

      try {
        const response = await axiosIns.post(`/api/arsip/${this.singleResponse.id}`, formData)
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

    async show(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/arsip/${id}`)
        this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/arsip/${id}`)
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
    async download(id) {
      try {
        const response = await axiosIns
          .get(`/arsip-lampiran-download/${id}`, {
            responseType: 'arraybuffer',
          })
          .then((response) => {
            console.log(response)

            let blob = new Blob([response.data], {
              type: 'application/pdf',
            })

            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = label
            link.click()
          })
      } catch (error) {
        alert(error.message)
      }
    },
    resetForm() {
      this.form = {
        nomor_surat: null,
        tanggal_surat: null,
        klasifikasi: null,
        pencipta_arsip: null,
        pengolah_arsip: null,
        tingkat_perkembangan: null,
        jumlah: null,
        uraian: null,
        lokasi: null,
        lemari: null,
        rak: null,
        no_box: null,
        no_folder: null,
        jenis_media: null,
      }
    },
    resetData() {
      this.singleResponse = JSON.parse(JSON.stringify(this.originalSingleResponses))
    },
  },
})
