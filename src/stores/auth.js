import { defineStore } from 'pinia'
import { authClient, axiosIns } from '@/services/axios'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* User */
    user: null,
    responses: null,
    singleResponses: {
      nip: null,
      name: null,
      last_login: null,
    },
    validUsername: null,
    form: {
      nip: null,
      password: null,
      isAdmin: false,
    },
    formNew: {
      nip: null,
      name: null,
      password: null,
      role: 'USER',
    },
    isUpdateLoading: false,
    isStoreLoading: false,
    isGetLoading: false,
    isDestroyLoading: false,
    isLoading: false,
    filter: {
      currentLimit: 10,
    },
  }),
  getters: {
    role(state) {
      return state.user.role ?? ''
    },
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
    userData(state) {
      return state.user
    },
    guest() {
      const storageItem = window.localStorage.getItem('guest')
      if (!storageItem) return false
      if (storageItem === 'isGuest') return true
      if (storageItem === 'isNotGuest') return false
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
    pageQuery(state) {
      if (state.filter.page == '' || state.filter.page == null) {
        return ''
      }
      return '&page=' + state.filter.page
    },
  },
  actions: {
    async login() {
      try {
        this.isLoading = true
        const resp = await axiosIns.post('/api/login', this.form)
        if (resp.status == 201) {
          localStorage.setItem('token', resp.data.token)
          this.user = resp.data.user
          axiosIns.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${resp.data.token}`
          toast.success('Login sukses', {
            timeout: 3000,
          })
          return true
        }
      } catch (error) {
        console.info(error)
        toast.error(error.message, {
          timeout: 3000,
        })
        return false
      } finally {
        this.isLoading = false
      }
    },
    async update() {
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.patch(
          `/api/auth/user/${this.user.id}`,
          this.user
        )
        if (response.status == 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    async getData(page = '') {
      this.isGetLoading = true
      try {
        const response = await axiosIns.get(
          `/api/users?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isGetLoading = false
      }
      return false
    },
    async store({ uploadFile = null }) {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/users`, this.formNew, {})
        if (response.status == 200) {
          this.clearForm()
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isStoreLoading = false
      }
    },
    async getAuthUser() {
      try {
        const respo = await axiosIns.get(`/api/auth/user`)
        this.user = respo.data
        return respo.data
      } catch (error) {
      } finally {
        this.isLoading = false
      }
      return false
    },
    async cekUserName() {
      const response = await axiosIns.get(
        `/api/users/cek-username?query=${this.formNew.nip}`
      )
      this.validUsername = response.data
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/users/${id}`)
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
    async logout() {
      this.isLoading = true
      var route = 'login-user'
      try {
        const response = await axiosIns.post(`/api/logout`)
        if (response.status == 200) {
          this.user = null
          return {
            status: true,
          }
        } else {
          return {
            status: false,
          }
        }
      } catch (error) {
        return {
          status: false,
        }
      } finally {
        this.isLoading = false
      }
    },
    clearForm() {
      this.formNew.nip = null
      this.formNew.name = null
      this.formNew.unit = null
      this.formNew.role = 'USER'
      this.formNew.password = null
    },
    setCurrentUser(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
    },
    setDataNewAccount(item) {
      this.formNew.nip = item.nip
      this.formNew.name = item?.name
      this.formNew.unit = item.unit?.name
    },
  },
})
