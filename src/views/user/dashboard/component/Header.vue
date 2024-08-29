<template>
  <div
    class="sticky top-0 h-36 w-full rounded-b-3xl bg-center object-cover z-10 shadow-lg"
    style="
      background-image: url('https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80');
    "
  >
    <nav
      class="p-2 flex flex-grow relative justify-between z-10 items-center mx-auto h-18"
    >
      <img :src="imageUrl" class="h-6" />
      <div class="flex-initial">
        <div class="flex justify-end items-center relative">
          <div class="inline relative">
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton class="block flex-grow-0 flex-shrink-0">
                  <UserCircleIcon class="h-12 w-12 cursor-pointer" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="z-50 py-1 absolute right-0 mt-2 w-18 origin-top-right divide-y divide-gray-100 rounded-md bg-white opacity-75 dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                >
                  <div class="px-2 py-1">
                    <MenuItem
                      v-for="menu in profileMenu"
                      v-slot="{ active }"
                      :key="menu.label"
                    >
                      <button
                        @click="menu.function()"
                        :class="[
                          active
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-900 dark:text-white',
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                        ]"
                      >
                        {{ menu.label }}
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <button type="button" class="block flex-grow-0 flex-shrink-0">
              <span class="sr-only">Icon description</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="mt-3 px-3 rounded-lg flex flex-col w-full">
      <h3
        v-if="authStore.user"
        class="text-sm flex items-center text-gray-100 font-normal"
      >
        Selamat Datang
      </h3>
      <h4 class="text-white text-xl font-semibold leading-tight truncate">
        <span v-if="authStore.user">{{ authStore.user.name }}</span
        ><span v-else>Belum Login</span>
      </h4>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { UserCircleIcon } from '@heroicons/vue/24/solid'
import imageUrl from '@/assets/logo_seru.png'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '@/stores/auth'

const activeMenu = defineModel()
const authStore = useAuthStore()

const profileMenu = [
  authStore.user !== null
    ? {
        function: onLogout,
        label: 'Logout',
      }
    : {
        function: onLogin,
        label: 'Login',
      },
]

function onLogin() {
  activeMenu.value = 3
}

function onLogout() {
  logout()
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
    // router.push({ name: 'user-dashboard' })
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
</script>
