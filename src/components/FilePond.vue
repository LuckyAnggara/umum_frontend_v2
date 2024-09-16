<template>
  <div id="app">
    <file-pond
      name="test"
      ref="input"
      :label-idle="`${label} <span class='filepond--label-action'>Browse</span>`"
      :allow-multiple="multiple"
      :accepted-file-types="type"
      @updatefiles="fileChange"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)
const input = ref(null)

const emit = defineEmits(['fileChange', 'filesChange', 'clear'])
const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Drop files here or ',
  },
  type: {
    type: String,
    default: 'image/jpeg, image/png',
  },
})

function fileChange() {
  let files = input.value.getFiles()
  if (props.multiple == true) {
    emit('fileChange', files)
  } else {
    emit('fileChange', files[0].file)
  }
}

function removeAll() {
  input.value.removeFiles()
}
</script>
