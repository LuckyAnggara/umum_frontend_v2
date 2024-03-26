<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12 bg-white rounded-xl py-8">
      <!-- Start coding here -->
      <!-- <form action="#">
        <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
          <div class="sm:col-span-2">
            <img
              class="w-60 h-60 rounded-2xl border"
              src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
              alt="Large avatar"
            />
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Avatar</label>
          </div>
          <div class="w-full">
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
            <input
              type="text"
              name="brand"
              id="brand"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value="Apple"
              placeholder="Product brand"
              required=""
            />
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button
            type="submit"
            class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Change
          </button>
        </div>
      </form> -->

      <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 class="text-2xl font-bold sm:text-xl">Profile Picture</h2>

        <div class="grid max-w-2xl mx-auto mt-4">
          <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />

            <div class="flex flex-col space-y-5 sm:ml-8">
              <button
                type="button"
                class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
              >
                Change picture
              </button>
              <button
                type="button"
                class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
              >
                Delete picture
              </button>
            </div>
          </div>

          <div class="items-center mt-8 sm:mt-14 text-[#202142]">
            <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div class="w-full">
                <label for="first_name" class="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Nama</label>
                <input
                  v-model="authStore.user.name"
                  type="text"
                  class="border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  placeholder="Your first name"
                  value="Jane"
                  required
                />
              </div>
            </div>

            <div class="flex justify-start">
              <button
                @click="save()"
                type="submit"
                class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Simpan
              </button>
            </div>

            <div class="flex justify-start mt-4">
              <button
                @click="passwordDialog = true"
                type="button"
                class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Ganti Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PasswordDialog :show="passwordDialog" @close="passwordDialog = !passwordDialog" @submit="passwordChange()" :canSubmit="true">
      <template #title>
        <h1 class="font-bold">Ganti Password</h1>
      </template>

      <template #content>
        <div class="mb-3 mt-6">
          <label for="old_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Lama*</label>
          <input
            type="password"
            id="old_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="*******"
            required
          />
        </div>

        <div class="mb-6">
          <label for="new_password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password Baru*</label>
          <input
            type="password"
            id="new_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="******"
            required
          />
        </div>
      </template>
    </PasswordDialog>
  </section>
</template>

<script setup>
import { inject, ref } from 'vue'
import PasswordDialog from '@/components/Dialog.vue'
import { useAuthStore } from '@/stores/auth'

const swal = inject('$swal')

function passwordChange() {}

function save() {
  // approveDialog.value = true
  swal.fire({
    title: 'Simpan ?',
    text: 'Data akan di simpan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Simpan!',
    cancelButtonText: 'Batal!',
    showLoaderOnConfirm: true,
    reverseButtons: true,
    preConfirm: async () => {
      const result = await authStore.update()
      if (result) {
        swal.fire({
          title: 'Approved!',
          text: 'Perminjaman di Setujui.',
          icon: 'success',
        })
      } else {
        swal.fire({
          title: 'Oopss',
          text: 'Error',
          icon: 'error',
        })
      }
    },
    allowOutsideClick: () => !authStore.isUpdateLoading,
    backdrop: true,
  })
}

const authStore = useAuthStore()
const passwordDialog = ref(false)
</script>
