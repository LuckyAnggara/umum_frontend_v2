<template>
  <v-col class="d-flex justify-center">
    <div class="flex-wrap w-100">
      <v-card :loading="perjadinStore.isLoading" class="my-8" elevation="16" title="Pengajuan Perjalanan Dinas">
        <form @submit.prevent="submit()">
          <div class="pa-4">
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
              <v-tab :value="1">Umum</v-tab>
              <v-tab :value="2">Detail</v-tab>
              <v-tab :value="3">Lampiran</v-tab>
            </v-tabs>

            <v-window v-model="tab">
              <v-window-item :value="1">
                <v-container>
                  <v-text-field color="primary" v-model="perjadinStore.form.name" label="Nama Kegiatan" variant="outlined"></v-text-field>
                  <div class="d-flex flex-row space-x-5">
                    <v-text-field
                      color="primary"
                      v-model="perjadinStore.form.tanggal_pergi"
                      label="Tanggal Pergi"
                      type="date"
                      variant="outlined"
                    ></v-text-field>
                    <v-text-field
                      color="primary"
                      v-model="perjadinStore.form.tanggal_pulang"
                      label="Tanggal Pulang"
                      type="date"
                      variant="outlined"
                    ></v-text-field>
                  </div>
                  <v-text-field color="primary" v-model="perjadinStore.form.tempat" label="Nomor Surat Tugas" variant="outlined"></v-text-field>
                  <v-text-field
                    color="primary"
                    v-model="perjadinStore.form.tanggal_surat_tuga"
                    label="Tanggal Surat Tugas"
                    type="date"
                    variant="outlined"
                  ></v-text-field>
                  <v-text-field color="primary" v-model="perjadinStore.form.tempat" label="Tempat Kegiatan" variant="outlined"></v-text-field>
                </v-container>
              </v-window-item>
              <v-window-item :value="2">
                <v-container>
                  <v-text-field
                    placeholder="aaaaaaaaaaaaaaaa"
                    color="primary"
                    v-model="perjadinStore.form.tempat"
                    label="Mata Anggaran Kegiatan"
                    variant="outlined"
                  ></v-text-field>

                  <!-- <v-autocomplete
                    clearable
                    :loading="makStore.isLoading"
                    v-model="perjadinStore.form.mak_id"
                    label="Mata Anggaran Kegiatan"
                    color="primary"
                    variant="outlined"
                    item-value="id"
                    :item-props="autoCompleteItemProps"
                    :items="makStore.items"
                  ></v-autocomplete> -->

                  <v-col class="pa-0 ga-3 d-flex flex-column">
                    <v-sheet title="Rencana Anggaran Biaya" elevation="2" class="pa-4 rounded-lg">
                      <v-btn @click="perjadinStore.newDetailRab()" color="primary"> Tambah </v-btn>

                      <v-data-table-virtual class="mt-4" density="compact" :headers="rabHeaders" :items="perjadinStore.form.detail_rab" item-value="name">
                        <!-- <template v-slot:item.no="{ index, item }">
                          <span> {{ ++index }}</span>
                        </template>
                        <template v-slot:item.keterangan="{ item }">
                          <v-text-field color="primary" v-model="item.keterangan" variant="underlined"></v-text-field>
                        </template>
                        <template v-slot:item.jumlah="{ item }">
                          <v-text-field color="primary" type="number" v-model="item.jumlah" variant="underlined"></v-text-field>
                        </template>
                        <template v-slot:item.satuan="{ item }">
                          <v-select v-model="item.satuan" class="ma-2" variant="underlined" :items="appStore.satuanRkakl"></v-select>
                        </template>
                        <template v-slot:item.biaya="{ item }">
                          <v-text-field color="primary" type="number" prefix="IDR. " v-model="item.biaya" variant="underlined"></v-text-field>
                        </template>
                        <template v-slot:item.total="{ item }">
                          <span> {{ IDRCurrency.format(item.jumlah * item.biaya) }}</span>
                        </template>
                        <template v-slot:item.actions="{ item, index }">
                          <v-icon size="small" color="danger" @click="perjadinStore.removeDetailRab(index)"> mdi-close </v-icon>
                        </template> -->
                      </v-data-table-virtual>
                    </v-sheet>

                    <v-sheet title="Rencana Anggaran Biaya" class="pa-4 rounded-lg">
                      <div class="mb-6 w-50 flex-column" v-if="perjadinStore.form.mak_id">
                        <v-sheet class="">
                          <p class="font-weight-bold">
                            {{ makStore.getMakById(perjadinStore.form.mak_id).kode }}
                          </p>
                        </v-sheet>
                        <div class="d-flex justify-space-between">
                          <div>
                            <v-sheet class=""> <p class="font-italic">Pagu Anggaran</p></v-sheet>
                            <v-sheet class=""> <p class="font-italic">Realisasi</p></v-sheet>
                            <v-sheet class=""> <p class="font-italic font-weight-medium">Saldo yang tersedia</p></v-sheet>
                            <v-sheet class=""> <p class="font-italic">Saldo yang belum di Realisasi</p></v-sheet>
                            <v-sheet class=""> <p class="font-italic">Rencana Realisasi</p></v-sheet>
                          </div>
                          <div>
                            <v-sheet class="">
                              <p class="font-italic">
                                {{ IDRCurrency.format(makStore.getMakById(perjadinStore.form.mak_id).pagu) }}
                              </p></v-sheet
                            >
                            <v-sheet class=""> <p class="font-italic">Rp. 0</p></v-sheet>

                            <v-sheet class="">
                              <p class="font-italic font-weight-medium">
                                {{ IDRCurrency.format(makStore.getMakById(perjadinStore.form.mak_id).pagu - 0) }}
                              </p></v-sheet
                            >
                            <v-sheet class=""> <p class="font-italic">IDR 0</p></v-sheet>

                            <v-sheet class="">
                              <p class="font-italic">
                                {{ IDRCurrency.format(perjadinStore.totalAnggaranRencana ?? 0) }}
                              </p></v-sheet
                            >
                          </div>
                        </div>
                        <v-divider></v-divider>
                        <div class="d-flex justify-space-between">
                          <div>
                            <v-sheet class=""> <p class="font-italic font-weight-bold">Sisa Saldo</p></v-sheet>
                          </div>
                          <div>
                            <v-sheet class=""> <p class="font-italic font-weight-bold">IDR 0</p></v-sheet>
                          </div>
                        </div>
                      </div>
                    </v-sheet>
                  </v-col>
                </v-container>
              </v-window-item>
            </v-window>
          </div>

          <!-- <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="makStore.clearForm()" color="orange">
              Reset
              <v-icon icon="mdi-reload" end></v-icon>
            </v-btn>
            <div>
              <v-btn v-if="tab > 1" @click="tab--" color="primary">
                <v-icon icon="mdi-chevron-left" end></v-icon>
                Previous
              </v-btn>

              <v-btn v-if="tab === 1 || (tab === 2 && perjadinStore.form.mak_id)" @click="tab++" color="primary">
                Next
                <v-icon icon="mdi-chevron-right" end></v-icon>
              </v-btn>

              <v-btn v-if="tab == 3" type="submit" color="success">
                Submit
                <v-icon icon="mdi-chevron-right" end></v-icon>
              </v-btn>
            </div>
          </v-card-actions> -->
        </form>
      </v-card>

      <div class="text-center pa-4">
        <v-btn @click="dialog = true"> Open Dialog </v-btn>
      </div>
    </div>
  </v-col>
  <NewPegawaiModal :openDialog="dialog" @close="dialog = false" />
</template>

<script setup>
import { onMounted, watch, reactive, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { usePerjadinStore } from '@/stores/perjadin'
import { useDebounceFn } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { IDRCurrency } from '@/utilities/formatter'
import { onUnmounted } from 'vue'
import NewPegawaiModal from './dialog/DialogPegawai.vue'

const dialog = ref(false)
const router = useRouter()
const mainStore = useMainStore()
const perjadinStore = usePerjadinStore()
const tab = ref(1)
const rabHeaders = [
  {
    title: 'No',
    key: 'no',
    align: 'start',
    sortable: false,
    width: 50,
  },
  {
    title: 'Nama Pegawai',
    key: 'keterangan',
    align: 'start',
    sortable: false,
    width: 400,
  },
  {
    title: 'Jumlah',
    key: 'jumlah',
    align: 'start',
    sortable: false,
    width: 100,
  },
  {
    title: 'Satuan',
    key: 'satuan',
    align: 'start',
    sortable: false,
    width: 100,
  },
  {
    title: 'Biaya',
    key: 'biaya',
    align: 'start',
    sortable: false,
    width: 150,
  },
  {
    title: 'Total',
    key: 'total',
    align: 'start',
    sortable: false,
    width: 150,
  },
  {
    key: 'actions',
    width: 25,
  },
]

function autoCompleteItemProps(item) {
  return {
    title: item.kode,
    subtitle: item.name,
  }
}

async function submit() {
  if (await perjadinStore.store()) router.push({ name: 'login' })
}
onMounted(() => {})

onUnmounted(() => {})
</script>
