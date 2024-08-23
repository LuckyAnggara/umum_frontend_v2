<template>
  <van-nav-bar>
    <template #left>
      <van-image height="30" src="https://itjen.kemenkumham.go.id/wp-content/uploads/2022/02/logov2.png" />
    </template>
    <template #right>
      <!-- <van-image height="30" src="https://itjen.kemenkumham.go.id/wp-content/uploads/2022/02/itjen.png" /> -->
      <van-image height="30" :src="imageUrl" />
    </template>
  </van-nav-bar>
  <div class="p-4 bg-gray-200 h-screen mb-12">
    <div v-if="active == 'menu'">
      <van-cell-group inset title="User">
        <van-cell
          class="cursor-pointer"
          v-for="(item, index) in menu"
          :key="index"
          :title="item.label"
          :label="item.desc"
          :icon="item.icon"
          @click="goToRoute(item)"
        />
      </van-cell-group>

      <van-cell-group inset title="Rating">
        <van-cell class="cursor-pointer" title="Nilai Layanan Umum" label="Berikan nilai dan masukan untuk perbaikan" icon="start-o" @click="popRateShow()" />
      </van-cell-group>

      <van-cell-group inset title="Admin" v-if="!authStore.user">
        <van-cell class="cursor-pointer" title="Admin" label="Menuju Admin Dashboard" icon="apps-o" @click="router.push({ name: 'login-admin' })" />
      </van-cell-group>
    </div>

    <div v-else-if="active == 'list'">
      <div v-if="authStore.user"></div>

      <button
        @click="getDataExisting"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Refresh
      </button>
      <div v-if="userStore.listPermintaanUser?.persediaan?.length > 0">
        <van-cell-group title="Persediaan" inset>
          <van-cell
            class="cursor-pointer"
            v-for="(item, index) in userStore.listPermintaanUser.persediaan"
            :key="index"
            :title="item.tiket"
            @click="toDetail(item)"
          >
            <template #value>
              <van-tag :type="item.status == 'REJECT' ? 'danger' : 'primary'" size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-if="userStore.listPermintaanUser?.layananBmn?.length > 0">
        <van-cell-group title="Layanan BMN" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.layananBmn" :title="item.tiket" :key="index" @click="toDetail(item)">
            <template #value>
              <van-tag size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div v-if="userStore.listPermintaanUser?.peminjamanBmn?.length > 0">
        <van-cell-group title="Peminjaman BMN" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.peminjamanBmn" :title="item.tiket" :key="index" @click="toDetail(item)">
            <template #value>
              <van-tag size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div v-if="userStore.listPermintaanUser?.tempat?.length > 0">
        <van-cell-group title="Booking Ruangan" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.tempat" :title="item.kegiatan" :key="index" @click="toDetail(item)">
            <template #label>
              <div class="flex flex-col">
                <span> {{ getRuangan(item?.ruangan).label }}</span>
                <span>
                  {{ moment(item?.tanggal).format('DD MMMM YYYY') }} ( {{ moment(item.start).format('HH:mm') }} - {{ moment(item?.end).format('HH:mm') }})</span
                >
              </div>
            </template>
            <template #value>
              <van-tag :type="item.status == 'REJECT' ? 'danger' : 'primary'" size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <div v-else>
      <van-cell-group title="Log in" inset v-if="!authStore.user">
        <van-form @submit="login">
          <van-cell-group inset>
            <van-field
              v-model="authStore.form.nip"
              name="Username"
              label="NIP"
              placeholder="Username"
              :rules="[{ required: true, message: 'NIP is required' }]"
            />
            <van-field
              v-model="authStore.form.password"
              type="password"
              name="Password"
              label="Password"
              placeholder="Password"
              :rules="[{ required: true, message: 'Password is required' }]"
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit"> Submit </van-button>
          </div>
        </van-form>
      </van-cell-group>

      <div v-else class="flex flex-col space-y-2">
        <div class="bg-white overflow-hidden shadow rounded-lg border">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">User</h3>
          </div>
          <div class="border-t border-gray-200 px-4 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nomor Induk Pegawai</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ authStore.user.nip }}</dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ authStore.user.name }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <button
            @click="logout"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item name="menu" icon="apps-o">Menu</van-tabbar-item>
    <van-tabbar-item v-if="authStore.user" name="list" icon="orders-o">List</van-tabbar-item>
    <van-tabbar-item name="account" icon="user-o"><span v-if="authStore.user">Account</span><span v-else>Login</span></van-tabbar-item>
  </van-tabbar>

  <PopRate :show="rateStore.popShow" />
</template>

<script setup>
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
import { useRateStore } from '@/stores/rate'
import { useAuthStore } from '@/stores/auth'
import PopRate from '@/components/PopRate.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import moment from 'moment'
import imageUrl from '@/assets/logo_seru.png'
import { toast } from 'vue3-toastify'

const userStore = useUserStore()
const authStore = useAuthStore()
const mainStore = useMainStore()
const showPopRate = ref(false)
const rateStore = useRateStore()
const router = useRouter()
const active = ref('menu')
const show = ref(false)

const menu = [
  {
    label: 'Persediaan',
    to: 'permintaan-persediaan',
    desc: 'Layanan Persediaan',
    icon: 'description-o',
  },
  {
    label: 'Perbaikan BMN',
    to: 'service-bmn',
    desc: 'Layanan Barang Milik Negara',
    icon: 'desktop-o',
  },
  // {
  //   label: 'Pinjam BMN',
  //   to: 'cari-peminjaman-bmn',
  //   desc: 'Layanan Barang Milik Negara',
  //   icon: 'desktop-o',
  // },
  {
    label: 'Pinjam BMN',
    to: 'cari-peminjaman-bmn-dua',
    desc: 'Layanan Peminajaman Barang Milik Negara',
    icon: 'desktop-o',
  },
  // {
  //   label: 'Pinjam Mobil Dinas',
  //   to: 'cari-peminjaman-bmn',
  //   desc: 'Layanan Barang Milik Negara',
  //   icon: 'desktop-o',
  // },
  {
    label: 'Booking Ruangan',
    to: 'booking-tempat',
    desc: 'Layanan Peminjaman Ruangan',
    icon: 'wap-home-o',
  },
  // {
  //   label: 'Pertanggung Jawaban Kegiatan',
  //   to: 'user-ptj',
  //   desc: 'Layanan Pertanggung Jawaban Kegiatan',
  //   icon: 'completed-o',
  // },
  {
    label: 'Keuangan',
    to: 'user-dashboard',
    desc: 'Layanan Keuangan',
    icon: 'completed-o',
  },
  {
    label: 'Agenda Pimpinan',
    to: 'booking-agenda',
    desc: 'Layanan Pengisian Agenda Pimpinan',
    icon: 'manager-o',
  },
]

function popRateShow() {
  rateStore.popShow = true
}
function toDetail(item) {
  if (item.tipe == 'PERSEDIAAN') {
    router.push({
      name: 'output-permintaan-user',
      params: { tiket: item.tiket },
    })
  } else if (item.tipe == 'BMN') {
    router.push({
      name: 'output-permintaan-layanan-bmn',
      params: { tiket: item.tiket },
    })
  } else if (item.tipe == 'PEMINJAMAN BMN') {
    router.push({
      name: 'output-peminjaman-bmn',
      params: { tiket: item.tiket },
    })
  }
}

function getRuangan(id) {
  return mainStore.ruangOptions.find((x) => {
    return x.id == id
  })
}

const login = async () => {
  const id = toast.loading('Login...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await authStore.login()
  if (success) {
    toast.update(id, {
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
    authStore.$patch((state) => {
      state.form.nip = null
      state.form.password = null
    })
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}

const logout = async () => {
  const id = toast.loading('Logout...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await authStore.logout()
  if (success.status) {
    toast.update(id, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      type: 'success',
      isLoading: false,
    })
    toast.done(id)
    authStore.$patch((state) => {
      state.user = null
    })
    userStore.$patch((state) => {
      state.listPermintaanUser = null
    })
  }
}

function goToRoute(item) {
  if (authStore.user) {
    router.push({ name: item.to })
  } else {
    toast('User belum login', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      type: 'warning',
      isLoading: false,
    })
  }
}

function getDataExisting() {
  userStore.getLayanan()
}

onMounted(() => {
  authStore.$patch((state) => {
    state.form.isAdmin = false
  })
  // userStore.initState()
  // userStore.getStatus()
})
</script>
