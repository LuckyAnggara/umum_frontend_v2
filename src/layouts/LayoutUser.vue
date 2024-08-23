<template>
  <v-layout class="rounded-md">
    <v-app-bar theme="dark" title="Layanan Keuangan">
      <v-btn @click="toggleTheme">toggle theme</v-btn>
    </v-app-bar>

    <v-navigation-drawer theme="dark" expand-on-hover rail>
      <v-list>
        <v-list-item :prepend-avatar="avatarImg" :title="authStore.user.name" :subtitle="authStore.user.nip"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav v-for="menu in listMenuUser" :key="menu.label">
        <v-list-item @click="toRoute(menu.to)" :prepend-icon="menu.icon" :title="menu.name"></v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-item @click="logout" :prepend-icon="ArrowLeftEndOnRectangleIcon" title="Logout"></v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center h-auto" style="min-height: 300px">
      <v-col>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>

        <!-- <router-view /> -->
      </v-col>
    </v-main>
  </v-layout>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { menuUser } from '@/router/menuUser'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/solid'
import { useAuthStore } from '@/stores/auth'
import avatarImg from '@/assets/avatar.png'

const listMenuUser = reactive(menuUser)
const authStore = useAuthStore()
const theme = useTheme()
const insideDrawer = ref(false)
const router = useRouter()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function toRoute(route) {
  router.push({ name: route })
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
    router.push({ name: 'dashboard-user' })
  }
}
</script>
