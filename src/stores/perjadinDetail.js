/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinDetailStore = defineStore('perjadinDetailStore', {
  state: () => ({
    isLoading: null,
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
  },
})
