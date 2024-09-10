<template>
  <div
    class="sm:mx-auto min-h-screen sm:w-full lg:w-1/3 md:w-1/2 overflow-y-scroll space-y-3 border-8 rounded-3xl bg-white shadow-2xl z-10"
  >
    <section v-if="activeMenu == 0">
      <Header v-model="activeMenu" />
      <div class="p-3 space-y-8 z-0 flex flex-col">
        <div>
          <h4 class="font-semibold mt-2">Layanan</h4>
          <div
            class="grid m-0 grid-cols-3 gap-2 overflow-y-scroll justify-center items-center w-full"
          >
            <button
              @click="goToRoute(menu)"
              class="relative flex flex-col justify-start bg-gray-200 bg-cover text-gray-800 overflow-hidden cursor-pointer lg:w-48 sm:w-96 object-cover object-center rounded-lg shadow-md h-24 my-2"
              v-for="(menu, index) in menus"
              :key="index"
            >
              <img
                :src="iconImage(menu.icon)"
                class="h-16 absolute bottom-0 left-4 opacity-85"
              />
              <p class="text-lg mt-1 text-center place-self-center text-black">
                {{ menu.label }}
              </p>
            </button>
            <button
              v-if="authStore.user?.role == 'ADMIN'"
              @click="goToRoute({ to: 'admin-dashboard' })"
              class="relative flex flex-col justify-start bg-gray-200 bg-cover text-gray-800 overflow-hidden cursor-pointer lg:w-48 sm:w-96 object-cover object-center rounded-lg shadow-md h-24 my-2"
            >
              <img
                :src="adminIcon"
                class="h-16 absolute bottom-0 left-4 opacity-85"
              />
              <p class="text-lg mt-1 text-center place-self-center text-black">
                Admin Area
              </p>
            </button>
          </div>
        </div>
        <div>
          <h4 class="font-semibold">Kegiatan Berlangsung</h4>
          <span class="text-gray-700 text-sm font-normal">
            {{ $moment().format('DD MMMM YYYY') }}</span
          >
          <div
            v-if="dashboardStore.userData.tempat.length > 0"
            class="grid m-0 grid-cols-2 gap-4 overflow-y-scroll overflow-x-auto justify-center items-start w-full max-h-96 min-h-96 rounded-md"
          >
            <div
              v-for="(tempat, index) in dashboardStore.userData.tempat"
              :key="index"
              class="relative flex flex-col justify-between bg-white bg-cover text-gray-800 overflow-hidden cursor-pointer w-full object-cover object-center rounded-lg shadow-md h-64 my-2"
              :style="backgroundImage(tempat.ruangan)"
            >
              <div
                class="absolute bg-gradient-to-t from-green-400 to-blue-400 opacity-50 inset-0 z-0"
              ></div>
              <div class="relative flex flex-row items-end h-72 w-full">
                <div class="p-6 rounded-lg flex flex-col w-full z-10">
                  <h4
                    class="mt-1 text-white text-xl font-semibold leading-tight truncate"
                  >
                    {{ tempat.kegiatan }}
                  </h4>
                  <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                      <h2
                        class="text-sm flex items-center text-gray-300 font-normal"
                      >
                        <MapPinIcon class="h-4 w-4 mr-1" />
                        {{
                          mainStore.ruangOptions.find((x) => {
                            return x.id == tempat.ruangan
                          }).label
                        }}
                      </h2>
                    </div>
                  </div>
                  <div class="flex pt-4 text-sm text-gray-300">
                    <div class="flex items-center mr-auto"></div>
                    <div class="flex items-center font-medium text-white">
                      <span class="text-gray-300 text-sm font-normal">
                        {{ $moment().format('DD MMMM YYYY') }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex h-96 justify-center text-center" v-else>
            <span
              class="my-auto text-xl text-gray-700"
              v-if="dashboardStore.isLoading"
              ><div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div></span
            >
            <span v-else class="my-auto text-xl text-gray-700"
              >Hari ini tidak ada kegiatan</span
            >
          </div>
        </div>
      </div>
    </section>
    <section v-else-if="activeMenu == 2">
      <Header v-model="activeMenu" />
      <Bookmark />
    </section>
    <section v-else-if="activeMenu == 3">
      <section v-if="authStore.user">
        <Profile />
      </section>
      <section v-else>
        <UserLogin />
      </section>
    </section>

    <Footer @menu="changeMenu" v-model="activeMenu"></Footer>
  </div>

  <TransitionRoot appear :show="bmnModalOpen" as="template">
    <Dialog as="div" @close="closeBmnModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Pilih layanan
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Pilih layanan BMN yang dihendaki ?
                </p>
              </div>

              <div class="mt-4 flex flex-row space-x-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="
                    goToRoute({
                      to: 'cari-peminjaman-bmn-dua',
                    })
                  "
                >
                  Peminjaman
                </button>

                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="
                    goToRoute({
                      to: 'service-bmn',
                    })
                  "
                >
                  Perbaikan
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <PopRate :show="rateStore.popShow" />
</template>
<style>
::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 0px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  outline: 1px solid transparent;
}
</style>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import { computed, ReactiveEffect } from 'vue'
import { MapPinIcon, StarIcon } from '@heroicons/vue/24/solid'
import Footer from './dashboard/component/Footer.vue'
import UserLogin from './dashboard/component/Login.vue'
import Profile from './dashboard/component/Profile.vue'
import Bookmark from './dashboard/component/Bookmark.vue'
import Header from './dashboard/component/Header.vue'

import auditorium from '@/assets/auditorium.jpg'
import rapatses from '@/assets/rapatses.jpg'
import pimpinanIcon from '@/assets/icon/pimpinan2.png'
import persediaanIcon from '@/assets/icon/persediaan.png'
import keuanganIcon from '@/assets/icon/keuangan.png'
import bmnIcon from '@/assets/icon/bmn.png'
import ruanganIcon from '@/assets/icon/ruangan.png'
import adminIcon from '@/assets/icon/pimpinan1.png'

import { useUserStore } from '@/stores/user'
import { useMainStore } from '@/stores/main'
import { useRateStore } from '@/stores/rate'
import { useAuthStore } from '@/stores/auth'
import PopRate from '@/components/PopRate.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import moment from 'moment'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { watch } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const userStore = useUserStore()
const authStore = useAuthStore()
const mainStore = useMainStore()
const rateStore = useRateStore()
const dashboardStore = useDashboardStore()

const router = useRouter()

const activeMenu = ref(0)

const bmnModalOpen = ref(false)
const menus = [
  {
    label: 'Agenda Pimpinan',
    to: 'booking-agenda',
    desc: 'Layanan Pengisian Agenda Pimpinan',
    icon: 'pimpinanIcon',
  },
  {
    label: 'Persediaan',
    to: 'permintaan-persediaan',
    desc: 'Layanan Persediaan',
    icon: 'persediaanIcon',
  },
  {
    label: 'Barang Milik Negara',
    to: 'service-bmn',
    desc: 'Layanan Barang Milik Negara',
    icon: 'bmnIcon',
  },
  // {
  //   label: 'Keuangan',
  //   to: 'keuangan-dashboard',
  //   desc: 'Layanan Keuangan',
  //   icon: 'keuanganIcon',
  // },
  {
    label: 'Ruangan',
    to: 'booking-tempat',
    desc: 'Layanan Peminjaman Ruangan',
    icon: 'ruanganIcon',
  },

  // {
  //   label: 'Pertanggung Jawaban Kegiatan',
  //   to: 'user-ptj',
  //   desc: 'Layanan Pertanggung Jawaban Kegiatan',
  //   icon: 'completed-o',
  // },
]

function closeBmnModal() {
  bmnModalOpen.value = false
}

function backgroundImage(ruangan) {
  if (ruangan == '1') return `background-image: url("${auditorium}");`
  else if (ruangan == '2') return `background-image: url("${auditorium}");`
  else if (ruangan == '3') return `background-image: url("${rapatses}");`
}

function iconImage(icon) {
  if (icon == 'pimpinanIcon') return pimpinanIcon
  else if (icon == 'persediaanIcon') return persediaanIcon
  else if (icon == 'bmnIcon') return bmnIcon
  else if (icon == 'keuanganIcon') return keuanganIcon
  else if (icon == 'ruanganIcon') return ruanganIcon
  else if (icon == 'pimpinanIcon') return pimpinanIcon
}

function goToRoute(item) {
  if (authStore.user) {
    if (item.label == 'Barang Milik Negara') {
      bmnModalOpen.value = true
    } else {
      router.push({ name: item.to })
    }
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

function changeMenu(index) {
  activeMenu.value = index
}

onMounted(() => {
  dashboardStore.getUserData()
})

watch(activeMenu, async (newValue, oldValue) => {
  if (newValue == 2) {
    userStore.getLayanan()
  }
})
</script>
