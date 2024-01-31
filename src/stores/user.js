import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    listPermintaanUser: useStorage('UMUM', {
      bmn: [],
      persediaan: [],
    }),
    searchTerm: null,
  }),
  actions: {
    updateBmn(item) {
      this.listPermintaanUser.bmn.push({
        id: item.id,
        tiket: item.tiket,
        created_at: item.created_at,
      })
    },
    updatePersediaan(item) {
      console.info(item)
      this.listPermintaanUser.persediaan.push({
        id: item.id,
        tiket: item.tiket,
        created_at: item.created_at,
      })
    },
    async getStatusPermintaanPersediaan(tiket) {
      try {
        const response = await axiosIns.get(
          `/api/permintaan-persediaan/get-status/${tiket}`
        )
        console.info(response.data)
        return response.data
      } catch (error) {
        return 'error'
      }
    },
    async getStatusPermintaanLayananBmn(tiket) {
      try {
        const response = await axiosIns.get(
          `/api/permintaan-layanan-bmn/get-status/${tiket}`
        )
        console.info(response.data)
        return response.data
      } catch (error) {
        return 'error'
      }
    },
  },
  getters: {
    bmn(state) {
      state.listPermintaanUser.bmn.forEach((e) => {
        e.tipe = 'BMN'
      })
      return state.listPermintaanUser.bmn
    },
    persediaan(state) {
      state.listPermintaanUser.persediaan.forEach((e) => {
        e.tipe = 'PERSEDIAAN'
      })
      return state.listPermintaanUser.persediaan
    },
    mergedArray(state) {
      const mergedArray = state.bmn.concat(state.persediaan)
      // Jika search term tidak kosong, lakukan filter berdasarkan nomor tiket
      if (state.searchTerm) {
        const filteredArray = mergedArray.filter((item) => {
          return item.tiket
            .toLowerCase()
            .includes(state.searchTerm.toLowerCase())
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
      state.mergedArray.forEach(async (e) => {
        let status = null
        if (e.tipe == 'BMN') {
          status = await this.getStatusPermintaanLayananBmn(e.tiket)
        } else {
          status = await this.getStatusPermintaanPersediaan(e.tiket)
        }
        e.status = status
      })
      return state.mergedArray
    },
  },
})
