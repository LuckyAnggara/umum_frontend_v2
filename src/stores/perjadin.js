/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'
import { getLastDayOfMonth } from '@/services/helper'

export const usePerjadinStore = defineStore('perjadinStore', {
  state: () => ({
    responses: null,
    singleResponse: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    newPesawat: {
      keterangan: null,
      biaya: 0,
    },
    newDarat: {
      keterangan: null,
      biaya: 0,
    },
    newRepresentatif: {
      keterangan: null,
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
      peran: '-',
      hotel: [],
      uang_harian: [],
      pesawat: [],
      darat: [],
      representatif: [],
    },
    form: {
      no_st: null,
      tanggal_st: null,
      tanggal_awal: null,
      tanggal_akhir: null,
      tempat_kegiatan: null,
      nama_kegiatan: null,
      mak_id: null,
      total_anggaran: 0,
      detail: [],
    },
    filter: {
      date: moment().format('YYYY-MM-DD'),
      currentLimit: 10,
      month: null,
      year: null,
      searchQuery: 1,
      page: '',
    },
  }),
  getters: {
    validNip(state) {
      return false
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

    getTotalPesawat(state) {
      if (state.newPegawai.pesawat.length > 0) {
        return state.newPegawai.pesawat.reduce((accumulator, pesawat) => {
          return accumulator + pesawat.biaya
        }, 0)
      }
      return 0
    },
    getTotalDarat(state) {
      if (state.newPegawai.darat.length > 0) {
        return state.newPegawai.darat.reduce((accumulator, darat) => {
          return accumulator + darat.biaya
        }, 0)
      }
      return 0
    },
    getTotalRepresentatif(state) {
      if (state.newPegawai.rep.length > 0) {
        return state.newPegawai.rep.reduce((accumulator, rep) => {
          return accumulator + rep.biaya
        }, 0)
      }
      return 0
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
          `/api/agenda?query=${this.form.pimpinan}${this.dateQuery}${this.adminQuery}`
        )
        this.responses = response.data
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
    tambahPesawat() {
      const pesawat = { ...this.newPesawat }
      this.newPegawai.pesawat.push(pesawat)
      this.newPesawat.keterangan = null
      this.newPesawat.biaya = 0
    },
    deletePesawat(index) {
      this.newPegawai.pesawat.splice(index, 1)
    },
    tambahDarat() {
      const darat = { ...this.newDarat }
      this.newPegawai.darat.push(darat)
      this.newPesawat.keterangan = null
      this.newPesawat.biaya = 0
    },
    deleteDarat(index) {
      this.newPegawai.darat.splice(index, 1)
    },
    tambahRep() {
      const rep = { ...this.newRepresentatif }
      this.newPegawai.representatif.push(rep)
      this.newPesawat.keterangan = null
      this.newPesawat.biaya = 0
    },
    deleteRep(index) {
      this.newPegawai.representatif.splice(index, 1)
    },
    resetForm() {
      this.newPegawai = {
        nip: null,
        nama: null,
        jabatan: null,
        unit: null,
        pangkat: null,
        tanggal_awal: null,
        tanggal_akhir: null,
        peran: '-',
        hotel: [],
        uang_harian: [],
        pesawat: [],
        darat: [],
        representatif: [],
      }
    },
    async searchSimpeg() {
      this.isSearching = true
      try {
        const response = await axiosIns.get(
          `/api/get-pegawai?nip=${this.newPegawai.nip}`
        )
        const data = response.data.data
        console.info(data)
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
    setDataPegawaiLapkin(item) {
      this.newPegawai.nama = item.name
      this.newPegawai.unit = item.unit?.name
      this.newPegawai.jabatan = item.jabatan?.name
      this.newPegawai.pangkat =
        item.pangkat?.pangkat + ' - ' + item.pangkat?.ruang
    },
  },
})
