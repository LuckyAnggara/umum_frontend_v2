<template>
  <div class="pa-4 text-center">
    <v-dialog :model-value="openDialog" max-width="600" persistent>
      <!-- <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="text-none font-weight-regular" prepend-icon="mdi-account" text="Edit Profile" variant="tonal" v-bind="activatorProps"></v-btn>
      </template> -->

      <v-card title="Cari Data Pegawai">
        <v-card-text>
          <v-container>
            <v-col>
              <v-text-field
                :loading="loading"
                append-inner-icon="mdi-magnify"
                density="compact"
                label="Nomor Induk Pegawai"
                hide-details
                single-line
                @click:append-inner="onClick"
              >
              </v-text-field>
            </v-col>

            <v-col>
              <v-text-field density="compact" label="Nama Kegiatan"></v-text-field>
            </v-col>
          </v-container>
          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="emit('close')"></v-btn>

          <v-btn color="primary" text="Save" variant="tonal" @click="emit('close')"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup>
const props = defineProps({
  openDialog: {
    type: Boolean,
    default: false,
  },
})

const loading = false
function onClick() {
  console.info('aa')
}
const emit = defineEmits(['close'])
</script>
