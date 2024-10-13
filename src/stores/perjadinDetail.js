/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinDetailStore = defineStore('perjadinDetailStore', {
  state: () => ({
    responses: null,
    isUpdateLoading: false,
    isStoreLoading: false,
    lampiran: {
      uh: [],
      transport: [],
      hotel: [],
      rep: [],
      lainnya: [],
    },
    updateData: {
      status: '',
      catatan: '',
    },
    deleteLampiran: [],
    isLoading: false,
    responses: null,
    singleResponse: null,
    originalSingleResponse: null,
    filter: {
      currentUnit: 0,
      currentStatus: '',
      date: [],
      currentLimit: 25,
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
    statusQuery(state) {
      if (
        state.filter.currentStatus == '' ||
        state.filter.currentStatus == null
      ) {
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
    totalDetailBiayaPerItem: (state) => (id) => {
      const pegawai = state.items.find((p) => p.id == id)
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
    totalDetailRealisasiBiayaPerItem: (state) => (id) => {
      const pegawai = state.items.find((p) => p.id == id)
      if (!pegawai) return 0
      const sumBiayaHari = (items) =>
        items.reduce(
          (total, item) => total + item.realisasi_hari * item.realisasi_biaya,
          0
        )
      const sumBiaya = (items) =>
        items.reduce((total, item) => total + item.realisasi_biaya, 0)

      const totalHotel = sumBiayaHari(pegawai.hotel || [])
      const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
      const totalTransport = sumBiaya(pegawai.transport || [])
      const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
      return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
    },
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
    totalDetailRealisasiBiaya(state) {
      const pegawai = state.singleResponse
      if (!pegawai) return 0
      const sumBiayaHari = (items) =>
        items.reduce(
          (total, item) => total + item.realisasi_hari * item.realisasi_biaya,
          0
        )
      const sumBiaya = (items) =>
        items.reduce((total, item) => total + item.realisasi_biaya, 0)

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
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/perjadin-detail?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}${this.unitQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
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
    async downloadSptjm() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/download-sptjm/${this.singleResponse.id}`,
          {
            responseType: 'blob', // Tambahkan responseType di sini
          }
        )

        // Membuat URL blob dan link untuk mendownload file
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url

        // Opsional: Tentukan nama file download (misalnya 'file.pdf')
        link.setAttribute(
          'download',
          `sptjm_${this.singleResponse.no_sppd}.docx`
        )

        // Tambahkan link ke body dan klik untuk memicu download
        document.body.appendChild(link)
        link.click()

        // Hapus link setelah download selesai
        document.body.removeChild(link)
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
        bukti: false,
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
        bukti: false,
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
        bukti: false,
      })
    },
    tambahTransport() {
      this.singleResponse.transport.push({
        keterangan: null,
        tipe: 'DARAT',
        biaya: 0,
        realisasi_biaya: 0,
        notes: null,
        bukti: false,
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
      this.lampiranReset()
    },
    async store() {
      let formData = new FormData()

      // FETCHING LAMPIRAN
      this.lampiran.uh.forEach((element, index) => {
        formData.append(`file_uh[${index}]`, element)
      })
      formData.append('jumlah_lampiran_uh', this.lampiran.uh.length)
      this.lampiran.hotel.forEach((element, index) => {
        formData.append(`file_hotel[${index}]`, element)
      })
      formData.append('jumlah_lampiran_hotel', this.lampiran.hotel.length)
      this.lampiran.transport.forEach((element, index) => {
        formData.append(`file_transport[${index}]`, element)
      })
      formData.append(
        'jumlah_lampiran_transport',
        this.lampiran.transport.length
      )
      this.lampiran.rep.forEach((element, index) => {
        formData.append(`file_rep[${index}]`, element)
      })
      formData.append('jumlah_lampiran_rep', this.lampiran.rep.length)
      this.lampiran.lainnya.forEach((element, index) => {
        formData.append(`file_lainnya[${index}]`, element)
      })
      formData.append('jumlah_lampiran_lainnya', this.lampiran.lainnya.length)

      if (this.deleteLampiran.length > 0) {
        this.deleteLampiran.forEach((element, index) => {
          formData.append(`file_delete[${index}]`, element.id)
        })
        formData.append('jumlah_lampiran_delete', this.deleteLampiran.length)
      }

      //FETCHING DATA UMUM
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
          this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
          this.originalSingleResponse = JSON.parse(
            JSON.stringify(response.data.data)
          )
          this.lampiranReset()
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
    async updateStatus() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.put(
          `/api/keuangan/perjadin-detail/update-status/${this.singleResponse.id}`,
          this.updateData
        )
        if (response.status == 200) {
          this.singleResponse = JSON.parse(JSON.stringify(response.data.data))
          this.originalSingleResponse = JSON.parse(
            JSON.stringify(response.data.data)
          )
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
      const index = this.singleResponse.lampiran.findIndex(
        (x) => x.id == item.id
      )
      this.deleteLampiran.push(item)
      this.singleResponse.lampiran.splice(index, 1)
      return { status: true, message: 'Data berhasil dihapus!' }
    },

    lampiranReset() {
      this.deleteLampiran = []
      this.lampiran = {
        uh: [],
        transport: [],
        hotel: [],
        rep: [],
        lainnya: [],
      }
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
