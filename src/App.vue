<script setup>
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import LayoutUser from '@/layouts/LayoutUser.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Unauthorised from '@/views/pages/Unauthorised.vue'

const authStore = useAuthStore()

const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'layout-auth') return LayoutAuth
  if (route.meta.layout === 'layout-user' && authStore.user?.role == 'USER') return LayoutUser
  return LayoutGuest
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
