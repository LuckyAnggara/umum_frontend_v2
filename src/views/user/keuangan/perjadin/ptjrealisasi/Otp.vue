<template>
  <div class="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
    <header class="mb-8">
      <h1 class="text-2xl font-bold mb-1">Verification</h1>
      <p class="text-[15px] text-slate-500">Masukan PIN 6-Digit untuk membuka Pertanggung Jawaban.</p>
    </header>
    <div class="p-4">
      <div class="flex items-center justify-center gap-3">
        <input
          v-for="(digit, index) in digits"
          :key="index"
          type="text"
          class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          pattern="\d*"
          maxlength="1"
          @input="handleInput(index, $event)"
          @keydown="handleKeyDown(index, $event)"
          @focus="handleFocus($event)"
          @paste="handlePaste($event)"
          :ref="(el) => (inputRefs[index] = el)"
        />
      </div>
      <div class="mx-auto mt-4 grid">
        <button
          @click="handleSubmit"
          type="button"
          class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Submit
        </button>
      </div>

      <!-- <form>
                  <div class="mb-5">
                    <label class="font-medium text-gray-700 dark:text-gray-200">Password</label>
                    <div class="flex items-center mt-2 mb-3 rounded-3 bg-slate-50/50 dark:bg-transparent">
                      <span
                        class="flex items-center px-4 py-2 text-gray-500 border border-r-0 border-gray-100 rounded rounded-r-none dark:border-zinc-600"
                        id="basic-addon3"
                      >
                        <LockClosedIcon class="h-5" />
                      </span>
                      <input
                        type="password"
                        class="w-full border-gray-100 rounded rounded-l-none placeholder:text-14 bg-slate-50/50 text-14 focus:ring-0 dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-200"
                        placeholder="Enter Password"
                        aria-label="Enter Password"
                        aria-describedby="basic-addon3"
                      />
                    </div>
                  </div>

                  <div class="grid">
                    <button class="rounded-md py-2 text-white border-transparent btn bg-blue-500 hover:bg-blue-600 text-16" type="submit">Unlock</button>
                  </div>
                </form> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCodeToken } from '@/stores/codeToken'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const emit = defineEmits(['locked'])

const route = useRoute()

const codeTokenStore = useCodeToken()

const digits = ref(Array(6).fill(''))
const inputRefs = ref([])

const handleKeyDown = (index, e) => {
  if (!/^[0-9]{1}$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Tab' && !e.metaKey) {
    e.preventDefault()
  }

  if (e.key === 'Delete' || e.key === 'Backspace') {
    if (index > 0) {
      digits.value[index - 1] = ''
      inputRefs.value[index - 1].focus()
    }
  }
}

const handleInput = (index, e) => {
  if (e.target.value) {
    digits.value[index] = e.target.value
    if (index < digits.value.length - 1) {
      inputRefs.value[index + 1].focus()
    }
  }
}

const handleFocus = (e) => {
  e.target.select()
}

const handlePaste = (e) => {
  e.preventDefault()
  const text = e.clipboardData.getData('text')
  if (!new RegExp(`^[0-9]{${digits.value.length}}$`).test(text)) {
    return
  }
  const textDigits = text.split('')
  digits.value = textDigits
  inputRefs.value[digits.value.length - 1].focus()
}

const perjadinId = computed(() => {
  return route.params.id ?? null
})

async function handleSubmit() {
  codeTokenStore.formValidate.token = digits.value.join('')
  codeTokenStore.formValidate.id = perjadinId.value

  const id = toast.loading('Validate token...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await codeTokenStore.validationToken()

  if (success.status == true) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    toast.done(id)
    emit('locked', true)
  } else {
    toast.update(id, {
      render: success.message,
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 2000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
}
</script>
