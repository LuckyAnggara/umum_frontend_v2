<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  targetId: {
    type: String,
    default: '',
    required: true,
  },
  isValue: {
    type: String,
    default: '',
    required: true,
  },
  label: {
    type: String,
    default: '',
    required: true,
  },
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const vModel = computed({
  get() {
    return props.modelValue
  },
  set(value: string) {
    emits('update:modelValue', value)
  },
})
</script>

<template>
  <div class="flex items-center">
    <input v-model="vModel" :value="isValue" :id="targetId" type="radio" />
    <label :for="targetId" class="ms-2">{{ label }}</label>
  </div>
</template>
