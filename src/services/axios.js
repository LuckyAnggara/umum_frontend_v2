import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'

export const axiosIns = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'http://172.27.19.111:8000',
})

export const authClient = axios.create({
  // baseURL: 'https://de.bbmakmur.com',
  // baseURL: 'https://seru.itjenkumham.id/backend',
  baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'http://192.168.16.128:8000',
  withCredentials: true, // required to handle the CSRF token
})

export const axiosPegawai = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'http://192.168.16.128:8000',
})

axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  } else {
  }
  return config
})

export default axiosIns
