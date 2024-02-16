import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    listPermintaanUser: useStorage('UMUM', {
      bmn: [],
      persediaan: [],
      tempat: [],
      agenda: [],
    }),
    searchTerm: null,
  }),
  actions: {
    updateBmn(item) {
      this.listPermintaanUser.bmn.push({
        id: item.id,
        tipe: 'BMN',
        tiket: item.tiket,
        created_at: item.created_at,
      })
    },
    updatePersediaan(item) {
      this.listPermintaanUser.persediaan.push({
        id: item.id,
        tipe: 'PERSEDIAAN',
        tiket: item.tiket,
        created_at: item.created_at,
      })
    },
    updateBookingTempat(item) {
      this.listPermintaanUser.tempat.push({
        id: item.id,
        tipe: 'TEMPAT',
        tanggal: item.tanggal,
        ruangan: item.ruangan,
        kegiatan: item.kegiatan,
        jam_mulai: item.jam_mulai,
        jam_akhir: item.jam_akhir,
      })
    },
    async getStatusPermintaanPersediaan(tiket) {
      try {
        const response = await axiosIns.get(`/api/permintaan-persediaan/get-status/${tiket}`)
        console.info(response.data)
        return response.data
      } catch (error) {
        return 'error'
      }
    },
    async getStatusPermintaanLayananBmn(tiket) {
      try {
        const response = await axiosIns.get(`/api/permintaan-layanan-bmn/get-status/${tiket}`)
        console.info(response.data)
        return response.data
      } catch (error) {
        return 'error'
      }
    },
    bmnDelete(id) {
      const index = this.listPermintaanUser.bmn.findIndex((i) => i.id == id)
      this.listPermintaanUser.bmn.splice(index, 1)
    },
    persediaanDelete(id) {
      const index = this.listPermintaanUser.persediaan.findIndex((i) => i.id == id)
      this.listPermintaanUser.persediaan.splice(index, 1)
    },
    getStatus() {
      this.mergedArray.forEach(async (e) => {
        let status = null
        if (e.tipe == 'BMN') {
          status = await this.getStatusPermintaanLayananBmn(e.tiket)
          if (status == 'delete') {
            this.bmnDelete(e.id)
          } else {
            e.status = status
          }
        } else {
          status = await this.getStatusPermintaanPersediaan(e.tiket)

          if (status == 'delete') {
            this.persediaanDelete(e.id)
          } else {
            e.status = status
          }
        }
      })
    },
  },
  getters: {
    mergedArray(state) {
      const mergedArray = state.listPermintaanUser.bmn.concat(state.listPermintaanUser.persediaan)
      // Jika search term tidak kosong, lakukan filter berdasarkan nomor tiket
      if (state.searchTerm) {
        const filteredArray = mergedArray.filter((item) => {
          return item.tiket.toLowerCase().includes(state.searchTerm.toLowerCase())
        })
        // Mengurutkan array hasil filter berdasarkan created_at
        const sortedArray = filteredArray.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at)
        })

        return sortedArray
      }

      // Jika search term kosong, langsung mengurutkan array berdasarkan created_at
      const sortedArray = mergedArray.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })

      return sortedArray
    },
    items(state) {
      let newArray = []

      return state.mergedArray
    },
  },
})
