<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar theme="dark" title="Application bar">
      <v-btn @click="toggleTheme">toggle theme</v-btn>
    </v-app-bar>

    <v-navigation-drawer theme="dark" expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
          title="User"
          subtitle="199207152019011001"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav v-for="menu in listMenuUser" :key="menu.label">
        <v-list-item @click="toRoute(menu.to)" :prepend-icon="menu.icon" :title="menu.name"></v-list-item>
      </v-list>
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

import { menuUser } from '@/router/menuUser'

const listMenuUser = reactive(menuUser)

const theme = useTheme()
const insideDrawer = ref(false)
const router = useRouter()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function toRoute(route) {
  router.push({ name: route })
}
</script>
