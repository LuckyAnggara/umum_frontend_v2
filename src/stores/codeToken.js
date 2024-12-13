/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'

export const useCodeToken = defineStore('codeToken', {
  state: () => ({
    isLoading: false,
    responses: null,
    master: null,
    detail: null,
    form: {
      expire_at: null,
    },
    formValidate: {
      id: null,
      token: null,
    },
  }),
  getters: {},
  actions: {
    async generateToken(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/api/keuangan/generate-token`, {
          id: id,
          expire_at: this.form.expire_at,
        })
        this.responses = response.data.data
        if (response.status == 200) {
          return {
            status: true,
            data: response.data.data,
          }
        } else {
          return {
            status: false,
            data: null,
            message: 'Cek kembali data',
          }
        }
      } catch (error) {
        return {
          status: false,
          data: null,
          message: error,
        }
      } finally {
        this.isLoading = false
      }
    },
    async validationToken() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/api/keuangan/validate-token`, this.formValidate)
        if (response.status == 200) {
          this.detail = response.data.data
          return {
            status: true,
            data: response.data.data,
          }
        } else if (response.status == 401) {
          return {
            status: false,
            message: 'Cek kembali Token dan Expire Date',
          }
        }
      } catch (error) {
        return {
          status: false,
          data: null,
          message: 'Cek kembali Token dan Expire Date',
        }
      } finally {
        this.isLoading = false
      }
    },
    async showMaster(id) {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/keuangan/perjadin/master/${id}`)
        console.info(response)
        if (response.status == 200) {
          this.master = response.data.data
          return {
            status: true,
            data: response.data.data,
          }
        } else if (response.status == 204) {
          this.master = false
          return {
            status: false,
            message: 'Link Expire',
          }
        }
      } catch (error) {
        return {
          status: false,
          data: null,
          message: 'Error',
        }
      } finally {
        this.isLoading = false
      }
    },
  },
})
