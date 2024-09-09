/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinDetailStore = defineStore('perjadinDetailStore', {
  state: () => ({
    isUpdateLoading: false,
    deleteLampiran: [],
    isLoading: false,
    responses: null,
    singleResponse: null,
    originalSingleResponse: null,
  }),
  getters: {
    totalDetailBiaya(state) {
      const pegawai = state.singleResponse
      if (!pegawai) return 0
      const sumBiayaHari = (items) =>
        items.reduce((total, item) => total + item.hari * item.biaya, 0)
      const sumBiaya = (items) =>
        items.reduce((total, item) => total + item.biaya, 0)

      const totalHotel = sumBiayaHari(pegawai.hotel || [])
      const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
      const totalTransport = sumBiaya(pegawai.transport || [])
      const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
      return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
    },
  },
  actions: {
    async show(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/perjadin-detail/${id}`
        )
        this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponse = JSON.parse(
          JSON.stringify(response.data.data)
        )
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    // async update(item) {
    //   this.isUpdateLoading = true
    //   try {
    //     const response = await axiosIns.put(
    //       `/api/keuangan/perjadin-detail/${item.id}`,
    //       item
    //     )
    //     if (response.status == 200) {
    //       return {
    //         status: true,
    //         data: response.data.data,
    //       }
    //     } else {
    //       return {
    //         status: false,
    //         data: null,
    //       }
    //     }
    //   } catch (error) {
    //     alert(error)
    //   } finally {
    //     this.isUpdateLoading = false
    //   }
    // },
    async update() {
      let formData = new FormData()
      formData.append('_method', 'put')
      if (this.singleResponse?.newLampiran) {
        this.singleResponse?.newLampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append(
          'jumlah_lampiran',
          this.singleResponse?.newLampiran.length
        )
      }
      formData.append('umum', JSON.stringify(this.singleResponse))
      this.isUpdateLoading = true

      try {
        const response = await axiosIns.post(
          `/api/keuangan/perjadin-detail/${this.singleResponse.id}`,
          formData
        )
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
  },
})
