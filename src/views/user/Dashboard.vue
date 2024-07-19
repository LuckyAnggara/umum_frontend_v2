<template>
  <van-nav-bar>
    <template #left>
      <van-image height="30" src="https://itjen.kemenkumham.go.id/wp-content/uploads/2022/02/logov2.png" />
    </template>
    <template #right>
      <van-image height="30" src="https://itjen.kemenkumham.go.id/wp-content/uploads/2022/02/itjen.png" />
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
          @click="router.push({ name: item.to })"
        />
      </van-cell-group>

      <van-cell-group inset title="Rating">
        <van-cell class="cursor-pointer" title="Nilai Layanan Umum" label="Berikan nilai dan masukan untuk perbaikan" icon="start-o" @click="popRateShow()" />
      </van-cell-group>

      <van-cell-group inset title="Admin">
        <van-cell class="cursor-pointer" title="Admin" label="Menuju Admin Dashboard" icon="apps-o" @click="router.push({ name: 'login' })" />
      </van-cell-group>
    </div>

    <div v-else>
      <div v-if="userStore.listPermintaanUser?.persediaan?.length > 0">
        <van-cell-group title="Persediaan" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.persediaan" :key="index" :title="item.tiket" @click="toDetail(item)">
            <template #value>
              <van-tag :type="item.status == 'REJECT' ? 'danger' : 'primary'" size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div v-if="userStore.listPermintaanUser?.bmn?.length > 0">
        <van-cell-group title="Layanan BMN" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.bmn" :title="item.tiket" :key="index" @click="toDetail(item)">
            <template #value>
              <van-tag size="large">{{ item.status }}</van-tag>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <div v-if="userStore.listPermintaanUser?.peminjamanbmn?.length > 0">
        <van-cell-group title="Peminjaman BMN" inset>
          <van-cell v-for="(item, index) in userStore.listPermintaanUser.peminjamanbmn" :title="item.tiket" :key="index" @click="toDetail(item)">
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
                  {{ moment(item?.tanggal).format('DD MMMM YYYY') }} ( {{ moment(item.jam_mulai).format('HH:mm') }} -
                  {{ moment(item?.jam_akhir).format('HH:mm') }})</span
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
  </div>
  <van-tabbar v-model="active">
    <van-tabbar-item name="menu" icon="apps-o">Menu</van-tabbar-item>
    <van-tabbar-item name="home" icon="orders-o">List</van-tabbar-item>
  </van-tabbar>

  <PopRate :show="rateStore.popShow" />
</template>

<script setup>
import { ref } from 'vue'

import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
import { useRateStore } from '@/stores/rate'
import PopRate from '@/components/PopRate.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import moment from 'moment'

const userStore = useUserStore()
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
  {
    label: 'Pertanggung Jawaban Kegiatan',
    to: 'user-ptj',
    desc: 'Layanan Pertanggung Jawaban Kegiatan',
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

onMounted(() => {
  userStore.initState()
  userStore.getStatus()
})
</script>
