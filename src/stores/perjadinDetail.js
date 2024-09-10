/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinDetailStore = defineStore('perjadinDetailStore', {
  state: () => ({
    isUpdateLoading: false,
    isStoreLoading: false,
    lampiran: [],
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
    getTotal(state) {
      let uh = 0
      let hotel = 0
      let transport = 0
      let representatif = 0
      let uh_real = 0
      let hotel_real = 0
      let transport_real = 0
      let representatif_real = 0

      if (state.singleResponse.uang_harian.length > 0) {
        uh = state.singleResponse.uang_harian.reduce((accumulator, x) => {
          return accumulator + x?.hari * x?.biaya
        }, 0)
        uh_real = state.singleResponse.uang_harian.reduce((accumulator, x) => {
          return accumulator + x?.realisasi_hari * x?.realisasi_biaya
        }, 0)
      }
      if (state.singleResponse.hotel.length > 0) {
        hotel = state.singleResponse.hotel.reduce((accumulator, x) => {
          return accumulator + x?.hari * x?.biaya
        }, 0)
        hotel_real = state.singleResponse.hotel.reduce((accumulator, x) => {
          return accumulator + x?.realisasi_hari * x?.realisasi_biaya
        }, 0)
      }
      if (state.singleResponse.transport.length > 0) {
        transport = state.singleResponse.transport.reduce((accumulator, x) => {
          return accumulator + x?.biaya
        }, 0)
        transport_real = state.singleResponse.transport.reduce(
          (accumulator, x) => {
            return accumulator + x.realisasi_biaya
          },
          0
        )
      }
      if (state.singleResponse.representatif.length > 0) {
        representatif = state.singleResponse.transport.reduce(
          (accumulator, x) => {
            return accumulator + x?.biaya
          },
          0
        )
        representatif_real = state.singleResponse.representatif.reduce(
          (accumulator, x) => {
            return accumulator + x.realisasi_biaya
          },
          0
        )
      }

      return {
        uh: uh,
        hotel: hotel,
        transport: transport,
        uh_real: uh_real,
        hotel_real: hotel_real,
        transport_real: transport_real,
        representatif: representatif,
        representatif_real: representatif_real,
      }
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
    tambahUH() {
      this.singleResponse.uang_harian.push({
        keterangan: null,
        hari: 0,
        biaya: 0,
        realisasi_biaya: 0,
        realisasi_hari: 0,
        notes: null,
      })
    },
    tambahHotel() {
      this.singleResponse.hotel.push({
        keterangan: null,
        hari: 0,
        biaya: 0,
        realisasi_biaya: 0,
        realisasi_hari: 0,
        notes: null,
      })
    },
    tambahRep() {
      this.singleResponse.representatif.push({
        keterangan: null,
        hari: 0,
        biaya: 0,
        realisasi_biaya: 0,
        realisasi_hari: 0,
        notes: null,
      })
    },
    tambahTransport() {
      this.singleResponse.transport.push({
        keterangan: null,
        tipe: 'DARAT',
        biaya: 0,
        realisasi_biaya: 0,
        notes: null,
      })
    },
    deleteUH(index) {
      this.singleResponse.uang_harian.splice(index, 1)
    },
    deleteHotel(index) {
      this.singleResponse.hotel.splice(index, 1)
    },
    deleteTransport(index) {
      this.singleResponse.transport.splice(index, 1)
    },
    deleteRep(index) {
      this.singleResponse.representatif.splice(index, 1)
    },
    reset() {
      this.singleResponse = JSON.parse(
        JSON.stringify(this.originalSingleResponse)
      )
    },
    async store() {
      let formData = new FormData()
      if (this.lampiran) {
        this.lampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', this.lampiran.length)
      }
      formData.append('umum', JSON.stringify(this.singleResponse))
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(
          `/api/keuangan/perjadin-detail`,
          formData,
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
