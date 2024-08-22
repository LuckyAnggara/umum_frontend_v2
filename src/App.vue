<script setup>
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import LayoutUser from '@/layouts/LayoutUser.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const layout = computed(() => {
  if (route.meta.layout === 'layout-auth') return LayoutAuth
  if (route.meta.layout === 'layout-user') return LayoutUser
  return LayoutGuest
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
