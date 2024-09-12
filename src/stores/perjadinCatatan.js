/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinCatatanStore = defineStore('perjadinCatatanStore', {
  state: () => ({
    isUpdateLoading: false,
    isStoreLoading: false,
    isLoading: false,
    responses: null,
    singleResponse: null,
    originalSingleResponse: null,
    form: {
      catatan: null,
      perjadin_detail_id: null,
    },
  }),
  getters: {
    sortedData(state) {
      // Sorting berdasarkan id atau created_at
      return state.responses.sort((a, b) => b.id - a.id)
    },
  },
  actions: {
    async show(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/keuangan/perjadin-detail/catatan/${id}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/keuangan/perjadin-detail/catatan/`, this.form)
        if (response.status == 200) {
          this.responses.push(response.data.data)
          this.form.catatan = null
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

    async update() {
      let formData = new FormData()
      formData.append('_method', 'put')
      if (this.singleResponse?.newLampiran) {
        this.singleResponse?.newLampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', this.singleResponse?.newLampiran.length)
      }
      formData.append('umum', JSON.stringify(this.singleResponse))
      this.isUpdateLoading = true

      try {
        const response = await axiosIns.post(`/api/keuangan/perjadin-detail/${this.singleResponse.id}`, formData)
        if (response.status == 200) {
          this.singleResponse = response.data.data
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

    destroyLampiran(item) {
      const index = this.singleResponse.lampiran.findIndex((x) => x.id == item.id)
      this.deleteLampiran.push(item)
      this.singleResponse.lampiran.splice(index, 1)
      return { status: true, message: 'Data berhasil dihapus!' }
    },
  },
})

// if (this.lampiran.uh.length > 0) {
//   this.lampiran.uh.forEach((element, index) => {
//     formData.append(`file_uh[${index}]`, element)
//   })
//   formData.append('jumlah_lampiran_uh', this.lampiran.uh.length)
// }
// if (this.lampiran.hotel.length > 0) {
//   this.lampiran.hotel.forEach((element, index) => {
//     formData.append(`file_hotel[${index}]`, element)
//   })
//   formData.append('jumlah_lampiran_hotel', this.lampiran.hotel.length)
// }
// if (this.lampiran.transport.length > 0) {
//   this.lampiran.transport.forEach((element, index) => {
//     formData.append(`file_transport[${index}]`, element)
//   })
//   formData.append('jumlah_lampiran_transport', this.lampiran.transport.length)
// }
// if (this.lampiran.rep.length > 0) {
//   this.lampiran.rep.forEach((element, index) => {
//     formData.append(`file_rep[${index}]`, element)
//   })
//   formData.append('jumlah_lampiran_rep', this.lampiran.rep.length)
// }
