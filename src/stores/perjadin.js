/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import moment from 'moment'

export const usePerjadinStore = defineStore('perjadinStore', {
  state: () => ({
    responses: null,
    singleResponse: null,
    singleDetail: null,
    originalSingleResponse: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    isDetail: false,
    newTransport: {
      keterangan: null,
      tipe: 'DARAT',
      biaya: 0,
    },
    newRepresentatif: {
      keterangan: null,
      hari: 0,
      biaya: 0,
    },
    newUangHarian: {
      keterangan: null,
      hari: 0,
      biaya: 0,
    },
    newHotel: {
      keterangan: null,
      hari: 0,
      biaya: 0,
    },
    newPegawai: {
      nip: null,
      nama: null,
      jabatan: null,
      pangkat: null,
      unit: null,
      tanggal_awal: null,
      tanggal_akhir: null,
      jumlah_hari: 0,
      peran: '-',
      hotel: [],
      uang_harian: [],
      transport: [],
      representatif: [],
    },
    form: {
      tahun_anggaran: moment().format('YYYY'),
      no_st: null,
      tanggal_st: null,
      tanggal_awal: null,
      tanggal_akhir: null,
      tempat_kegiatan: null,
      nama_kegiatan: null,
      mak: null,
      detail: [],
      lampiran: [],
    },
    updateData: {
      status: '',
      catatan: '',
      ppk: '',
      bendahara: '',
    },
    deleteLampiran: [],
    updateIndex: 0,
    filter: {
      currentStatus: '',
      date: [],
      currentLimit: 25,
      searchQuery: '',
      page: '',
    },
  }),
  getters: {
    totalBiaya: (state) => (nip) => {
      const pegawai = state.form.detail.find((p) => p.nip === nip)
      if (!pegawai) return 0
      const sumBiayaHari = (items) => items.reduce((total, item) => total + item.hari * item.biaya, 0)
      const sumBiaya = (items) => items.reduce((total, item) => total + item.biaya, 0)
      const totalHotel = sumBiayaHari(pegawai.hotel || [])
      const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
      const totalTransport = sumBiaya(pegawai.transport || [])
      const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
      return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
    },
    kategoriTransport: (state) => (index) => {
      const pegawai = state.form.detail[index]
      if (!pegawai)
        return {
          darat: [],
          laut: [],
          udara: [],
          taksi: [],
          lainnya: [],
        }
      return {
        darat: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'darat'),
        laut: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'laut'),
        udara: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'udara'),
        taksi: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'taksi'),
        lainnya: pegawai.transport.filter((item) => {
          const tipe = item.tipe.toLowerCase()
          return tipe !== 'darat' && tipe !== 'laut' && tipe !== 'udara' && tipe !== 'taksi'
        }),
      }
    },
    kategoriTransportDetail: (state) => (id) => {
      const pegawai = state.singleResponse.detail.find((p) => p.id == id)
      if (!pegawai)
        return {
          darat: [],
          laut: [],
          udara: [],
          taksi: [],
          lainnya: [],
        }
      return {
        darat: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'darat'),
        laut: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'laut'),
        udara: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'udara'),
        taksi: pegawai.transport.filter((item) => item.tipe.toLowerCase() == 'taksi'),
        lainnya: pegawai.transport.filter((item) => {
          const tipe = item.tipe.toLowerCase()
          return tipe !== 'darat' && tipe !== 'laut' && tipe !== 'udara' && tipe !== 'taksi'
        }),
      }
    },
    totalDetailBiaya: (state) => (nip) => {
      const pegawai = state.singleResponse.detail.find((p) => p.nip === nip)
      if (!pegawai) return 0

      const sumBiayaHari = (items) => items.reduce((total, item) => total + item.hari * item.biaya, 0)
      const sumBiaya = (items) => items.reduce((total, item) => total + item.biaya, 0)

      const totalHotel = sumBiayaHari(pegawai.hotel || [])
      const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
      const totalTransport = sumBiaya(pegawai.transport || [])
      const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
      return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
    },
    totalDetailBiayaRealisasi: (state) => (nip) => {
      const pegawai = state.singleResponse.detail.find((p) => p.nip === nip)
      if (!pegawai) return 0

      const sumBiayaHari = (items) => items.reduce((total, item) => total + item.realisasi_hari * item.realisasi_biaya, 0)
      const sumBiaya = (items) => items.reduce((total, item) => total + item.realisasi_biaya, 0)

      const totalHotel = sumBiayaHari(pegawai.hotel || [])
      const totalUangHarian = sumBiayaHari(pegawai.uang_harian || [])
      const totalTransport = sumBiaya(pegawai.transport || [])
      const totalRepresentatif = sumBiayaHari(pegawai.representatif || [])
      return totalHotel + totalUangHarian + totalTransport + totalRepresentatif
    },
    getTotalAnggaran(state) {
      return state.form.detail.reduce((total, pegawai) => {
        const totalHotel = pegawai.hotel.reduce((sum, item) => sum + item.hari * item.biaya, 0)
        const totalUangHarian = pegawai.uang_harian.reduce((sum, item) => sum + item.hari * item.biaya, 0)
        const totalTransport = pegawai.transport.reduce((sum, item) => sum + item.biaya, 0)
        const totalRepresentatif = pegawai.representatif.reduce((sum, item) => sum + (item.hari || 1) * item.biaya, 0)

        return total + totalHotel + totalUangHarian + totalTransport + totalRepresentatif
      }, 0)
    },
    getTotalAnggaranDetail(state) {
      return state.singleResponse.detail.reduce((total, pegawai) => {
        const totalHotel = pegawai.hotel.reduce((sum, item) => sum + item.hari * item.biaya, 0)
        const totalUangHarian = pegawai.uang_harian.reduce((sum, item) => sum + item.hari * item.biaya, 0)
        const totalTransport = pegawai.transport.reduce((sum, item) => sum + item.biaya, 0)
        const totalRepresentatif = pegawai.representatif.reduce((sum, item) => sum + (item.hari || 1) * item.biaya, 0)

        return total + totalHotel + totalUangHarian + totalTransport + totalRepresentatif
      }, 0)
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

      if (state.singleDetail.uang_harian.length > 0) {
        uh = state.singleDetail.uang_harian.reduce((accumulator, x) => {
          return accumulator + x?.hari * x?.biaya
        }, 0)
        uh_real = state.singleDetail.uang_harian.reduce((accumulator, x) => {
          return accumulator + x?.realisasi_hari * x?.realisasi_biaya
        }, 0)
      }
      if (state.singleDetail.hotel.length > 0) {
        hotel = state.singleDetail.hotel.reduce((accumulator, x) => {
          return accumulator + x?.hari * x?.biaya
        }, 0)
        hotel_real = state.singleDetail.hotel.reduce((accumulator, x) => {
          return accumulator + x?.realisasi_hari * x?.realisasi_biaya
        }, 0)
      }
      if (state.singleDetail.transport.length > 0) {
        transport = state.singleDetail.transport.reduce((accumulator, x) => {
          return accumulator + x?.biaya
        }, 0)
        transport_real = state.singleDetail.transport.reduce((accumulator, x) => {
          return accumulator + x.realisasi_biaya
        }, 0)
      }
      if (state.singleDetail.representatif.length > 0) {
        representatif = state.singleDetail.transport.reduce((accumulator, x) => {
          return accumulator + x?.biaya
        }, 0)
        representatif_real = state.singleDetail.representatif.reduce((accumulator, x) => {
          return accumulator + x.realisasi_biaya
        }, 0)
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
    isFormFill(state) {
      if (
        state.form.tahun_anggaran == null ||
        state.form.tahun_anggaran == '' ||
        state.form.no_st == null ||
        state.form.no_st == '' ||
        state.form.tanggal_st == null ||
        state.form.tanggal_st == '' ||
        state.form.tanggal_awal == null ||
        state.form.tanggal_awal == '' ||
        state.form.tanggal_akhir == null ||
        state.form.tanggal_akhir == '' ||
        state.form.nama_kegiatan == null ||
        state.form.nama_kegiatan == '' ||
        state.form.mak == null ||
        state.form.mak == '' ||
        state.form.detail.length == 0
      ) {
        return false
      } else {
        return true
      }
    },
    validateForm(state) {
      if (
        state.newPegawai.nip == null ||
        state.newPegawai.nip == '' ||
        state.newPegawai.nama == null ||
        state.newPegawai.nama == '' ||
        state.newPegawai.jabatan == null ||
        state.newPegawai.jabatan == '' ||
        state.newPegawai.unit == null ||
        state.newPegawai.unit == '' ||
        state.newPegawai.pangkat == null ||
        state.newPegawai.pangkat == '' ||
        state.newPegawai.tanggal_awal == null ||
        state.newPegawai.tanggal_awal == '' ||
        state.newPegawai.tanggal_akhir == null ||
        state.newPegawai.tanggal_akhir == ''
      ) {
        return false
      } else {
        return true
      }
    },
    items(state) {
      return state.responses?.data ?? []
    },
    getTotalHotel(state) {
      if (state.newPegawai.hotel.length > 0) {
        const hari = state.newPegawai.hotel.reduce((accumulator, hotel) => {
          return accumulator + hotel.hari
        }, 0)
        const biaya = state.newPegawai.hotel.reduce((accumulator, hotel) => {
          return accumulator + hotel.hari * hotel.biaya
        }, 0)

        return {
          hari: hari,
          biaya: biaya,
        }
      }
      return {
        hari: 0,
        biaya: 0,
      }
    },
    getTotalUH(state) {
      if (state.newPegawai.uang_harian.length > 0) {
        const hari = state.newPegawai.uang_harian.reduce((accumulator, uh) => {
          return accumulator + uh.hari
        }, 0)
        const biaya = state.newPegawai.uang_harian.reduce((accumulator, uh) => {
          return accumulator + uh.hari * uh.biaya
        }, 0)

        return {
          hari: hari,
          biaya: biaya,
        }
      }
      return {
        hari: 0,
        biaya: 0,
      }
    },
    getTotalTransport(state) {
      if (state.newPegawai.transport.length > 0) {
        return state.newPegawai.transport.reduce((accumulator, transport) => {
          return accumulator + transport.biaya
        }, 0)
      }
      return 0
    },
    getTotalRepresentatif(state) {
      if (state.newPegawai.representatif.length > 0) {
        const hari = state.newPegawai.representatif.reduce((accumulator, rep) => {
          return accumulator + rep.hari
        }, 0)
        const biaya = state.newPegawai.representatif.reduce((accumulator, rep) => {
          return accumulator + rep.hari * rep.biaya
        }, 0)

        return {
          hari: hari,
          biaya: biaya,
        }
      }
      return {
        hari: 0,
        biaya: 0,
      }
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
      return '&start-date=' + state.filter.date[0] + '&end-date=' + state.filter.date[1]
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
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(
          `/api/keuangan/perjadin?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    tambahHotel() {
      const hotelCopy = { ...this.newHotel }
      this.newPegawai.hotel.push(hotelCopy)
      this.newHotel.keterangan = null
      this.newHotel.hari = 0
      this.newHotel.biaya = 0
    },
    deleteHotel(index) {
      this.newPegawai.hotel.splice(index, 1)
    },
    tambahUH() {
      const uangHarian = { ...this.newUangHarian }
      this.newPegawai.uang_harian.push(uangHarian)
      this.newUangHarian.keterangan = null
      this.newUangHarian.hari = 0
      this.newUangHarian.biaya = 0
    },
    deleteUH(index) {
      this.newPegawai.uang_harian.splice(index, 1)
    },
    // tambahPesawat() {
    //   const pesawat = { ...this.newPesawat }
    //   this.newPegawai.pesawat.push(pesawat)
    //   this.newPesawat.keterangan = null
    //   this.newPesawat.biaya = 0
    // },
    // deletePesawat(index) {
    //   this.newPegawai.pesawat.splice(index, 1)
    // },
    // tambahDarat() {
    //   const darat = { ...this.newDarat }
    //   this.newPegawai.darat.push(darat)
    //   this.newDarat.keterangan = null
    //   this.newDarat.biaya = 0
    // },
    // deleteDarat(index) {
    //   this.newPegawai.darat.splice(index, 1)
    // },
    tambahTransport() {
      const transport = { ...this.newTransport }
      this.newPegawai.transport.push(transport)
      this.newTransport.keterangan = null
      this.newTransport.tipe = 'DARAT'
      this.newTransport.biaya = 0
    },
    deleteTransport(index) {
      this.newPegawai.transport.splice(index, 1)
    },
    tambahRep() {
      const rep = { ...this.newRepresentatif }
      this.newPegawai.representatif.push(rep)
      this.newRepresentatif.keterangan = null
      this.newRepresentatif.hari = 0
      this.newRepresentatif.biaya = 0
    },
    deleteRep(index) {
      this.newPegawai.representatif.splice(index, 1)
    },
    resetFormMain() {
      this.form = {
        tahun_anggaran: moment().format('YYYY'),
        no_st: null,
        tanggal_st: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        tempat_kegiatan: null,
        nama_kegiatan: null,
        mak: null,
        detail: [],
        lampiran: [],
      }
    },
    resetFormPegawai() {
      this.newPegawai = {
        nip: null,
        nama: null,
        jabatan: null,
        unit: null,
        pangkat: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        jumlah_hari: 0,
        peran: '-',
        hotel: [],
        uang_harian: [],
        pesawat: [],
        darat: [],
        representatif: [],
        transport: [],
      }
    },
    async tambahPegawai() {
      if (!this.validateForm) {
        return { status: false, message: 'Data belum lengkap!' }
      }
      if (this.isDetail == false) {
        const findSame = this.form.detail.some((x) => x.nip === this.newPegawai.nip)
        return findSame
          ? { status: false, message: 'NIP telah ada' }
          : (this.form.detail.push(this.newPegawai), { status: true, message: 'Pegawai baru berhasil ditambahkan' })
      } else {
        const findSame = this.singleResponse.detail.some((x) => x.nip === this.newPegawai.nip)
        return findSame
          ? { status: false, message: 'NIP telah ada' }
          : (this.singleResponse.detail.push(this.newPegawai), { status: true, message: 'Pegawai baru berhasil ditambahkan' })
      }
    },
    async updatePegawai() {
      if (!this.validateForm) {
        return { status: false, message: 'Data belum lengkap!' }
      }
      if (this.isDetail == false) {
        this.form.detail.splice(this.updateIndex, 1)
        this.form.detail.push(this.newPegawai)
      } else {
        this.singleResponse.detail.splice(this.updateIndex, 1)
        this.singleResponse.detail.push(this.newPegawai)
      }
      return { status: true, message: 'Data berhasil di update!' }
    },
    deletePegawai() {
      this.isDetail == false ? this.form.detail.splice(this.updateIndex, 1) : this.singleResponse.detail.splice(this.updateIndex, 1)
      return { status: true, message: 'Data berhasil dihapus!' }
    },
    destroyLampiran(index, item) {
      this.deleteLampiran.push(item)
      this.singleResponse.lampiran.splice(index, 1)
      return { status: true, message: 'Data berhasil dihapus!' }
    },
    async searchSimpeg() {
      this.isSearching = true
      try {
        const response = await axiosIns.get(`/api/get-pegawai?nip=${this.newPegawai.nip}`)
        const data = response.data.data
        if (data.hasil == '2') {
          this.newPegawai = {
            nama: data.nama,
            jabatan: data.jabatan,
            pangkat: data.pangkat,
            unit: data.unit,
          }
        } else {
          alert('aaa')
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.isSearching = false
      }
      return false
    },
    async searchLapkin() {
      this.isSearching = true
      try {
        const response = await axiosIns.get(`/api/get-pegawai?nip=${this.newPegawai.nip}`)
        const data = response.data.data
        this.setDataPegawaiLapkin(data)
      } catch (error) {
        alert(error.message)
      } finally {
        this.isSearching = false
      }
      return false
    },
    setDataPegawaiLapkin(item) {
      if (item.dari_lapkin) {
        this.newPegawai.nama = item.name
        this.newPegawai.unit = item.unit?.name
        this.newPegawai.jabatan = item.jabatan?.name
        this.newPegawai.pangkat = item.pangkat?.pangkat + ' - ' + item.pangkat?.ruang
      } else {
        this.newPegawai.nama = item.name
        this.newPegawai.unit = item.unit
        this.newPegawai.jabatan = item.jabatan
        this.newPegawai.pangkat = item.pangkat
      }
    },
    async store() {
      if (!this.isFormFill) {
        return {
          status: true,
          data: 'Data belum lengkap',
        }
      }
      let formData = new FormData()
      this.form.total_anggaran = this.getTotalAnggaran
      if (this.form.lampiran) {
        this.form.lampiran.forEach((element, index) => {
          formData.append(`file[${index}]`, element)
        })
        formData.append('jumlah_lampiran', this.form.lampiran.length)
      }
      formData.append('umum', JSON.stringify(this.form))
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/keuangan/perjadin`, formData, {
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
        const response = await axiosIns.get(`/api/keuangan/perjadin/${id}`)
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
        const response = await axiosIns.put(`/api/keuangan/perjadin/update-status/${id}`, this.updateData)
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
        const response = await axiosIns.delete(`/api/keuangan/perjadin/${id}`)
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

// {"no_st":"ITJ.1.2.3.4.5.","tanggal_st":"2024-09-03T16:58:00.000","tanggal_awal":"2024-09-03T16:58:00.000","tanggal_akhir":"2024-09-06T16:58:00.000","tempat_kegiatan":"BPSDM","nama_kegiatan":"Evaluasi WBK / WBBM","mak_id":1,"detail":[{"nip":"111111111","nama":"LUCKY ANGGARA, S.E.","jabatan":"ANALIS PERENCANAAN, EVALUASI, DAN PELAPORAN","pangkat":"IIIb - Penata Muda Tingkat 1","unit":"Bagian Program dan Pelaporan - Sekretariat Inspektorat Jenderal","tanggal_awal":"2024-09-03T09:55:00.000Z","tanggal_akhir":"2024-09-05T09:55:00.000Z","jumlah_hari":0,"peran":"-","hotel":[{"keterangan":"Hotel","hari":1,"biaya":500000}],"uang_harian":[{"keterangan":null,"hari":5,"biaya":430000}],"transport":[],"representatif":[]},{"nip":"199207152019011001","nama":"LUCKY ANGGARA, S.E.","jabatan":"ANALIS PERENCANAAN, EVALUASI, DAN PELAPORAN","pangkat":"IIIb - Penata Muda Tingkat 1","unit":"Bagian Program dan Pelaporan - Sekretariat Inspektorat Jenderal","tanggal_awal":"2024-09-03T09:55:00.000Z","tanggal_akhir":"2024-09-05T09:55:00.000Z","jumlah_hari":0,"peran":"-","hotel":[{"keterangan":"Hotel","hari":1,"biaya":500000}],"uang_harian":[],"transport":[{"keterangan":"Taksi Bandara","tipe":"DARAT","biaya":512000},{"keterangan":"Pesawat","tipe":"UDARA","biaya":2400000}],"representatif":[]}],"lampiran":["[object File]"],"total_anggaran":0}
