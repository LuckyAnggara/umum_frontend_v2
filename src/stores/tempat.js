/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import moment from 'moment'

import axios from 'axios'

const toast = useToast()
export const useTempatStore = defineStore('tempat', {
  state: () => ({
    responses: null,
    singleResponse: null,
    isSearching: false,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    pesanDelete: null,
    form: {
      kegiatan: null,
      tanggal: null,
      ruangan: 1,
      jam_mulai: { hours: 8, minutes: 0, seconds: 0 },
      jam_akhir: { hours: 16, minutes: 0, seconds: 0 },
      nip: null,
      nama: null,
      unit: null,
    },
    filter: {
      date: [],
      currentLimit: 10,
      searchQuery: 1,
      page: '',
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    dataCalendar(state) {
      return state.items.map((event) => ({
        title: event.title,
        date: event.tanggal,
        start: event.start,
        end: event.end,
      }))
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
          `/api/tempat?query=${this.form.ruangan}${this.dateQuery}`
        )
        this.responses = response.data
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
        const response = await axiosIns.post(`/api/tempat`, this.form)
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
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/tempat/${id}`, {
          params: {
            pesan: this.pesanDelete,
          },
        })
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
    async kirimPesan() {
      const noWa = '6282116562811'

      const body = {
        device: '888662421399',
        phone: noWa,
        message: 'Your Message',
      }

      const res = await axios.post('https://api.alatwa.com/send/text', body, {
        headers: {
          'content-type': 'application/json',
          Authorization: 'fbec06eb35b86ac0184853a4fabcd747',
        },
      })

      console.info(res)

      // const response = await fetch(`https://api.alatwa.com/send/text`).then(
      //   (response) => {}
      // )
    },
    setDataPegawai(item) {
      this.form.nama = item.name
      this.form.unit = item.unit?.name
    },
    clearForm() {
      this.form = {
        kegiatan: null,
        tanggal: null,
        ruangan: 1,
        jam_mulai: { hours: 8, minutes: 0, seconds: 0 },
        jam_akhir: { hours: 16, minutes: 0, seconds: 0 },
        nip: null,
        nama: null,
        unit: null,
      }
    },
    setDataSingle(id) {
      this.singleResponse = this.items.find((x) => {
        return x.id == id
      })
    },
  },
})
