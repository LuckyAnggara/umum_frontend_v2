<template>
  <!-- component -->
  <div
    class="sm:mx-auto sm:w-full lg:w-1/3 md:w-1/2 overflow-y-auto space-y-3 border-8 rounded-3xl bg-white shadow-2xl z-10"
  >
    <div class="flex items-center mt-4 ml-4">
      <button
        @click="toDashboard()"
        class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center"
      >
        <ArrowLeftIcon class="h-5" />
      </button>
      <h2 class="ml-2 font-semibold text-gray-800 text-xl">Agenda Pimpinan</h2>
      {{ weeks }}
    </div>
    <div class="min-h-screen">
      <div
        class="md:px-8 p-5 dark:bg-gray-800 bg-white rounded-t justify-start flex flex-col"
      >
        <div class="px-4 flex">
          <span
            tabindex="0"
            class="focus:outline-none text-base font-bold dark:text-gray-100 text-gray-800"
          >
            {{ currentDate.format('MMMM') }} {{ currentDate.format('YYYY') }}
          </span>
          <div class="flex items-center">
            <button
              aria-label="calendar backward"
              @click="changeMonth(-1)"
              class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-left"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button
              aria-label="calendar forward"
              @click="changeMonth(1)"
              class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-chevron-right"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>
        <div class="flex items-center justify-between pt-4 overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th v-for="(day, index) in days" :key="index">
                  <div class="w-full flex justify-center">
                    <p
                      class="text-base font-bold text-center text-gray-800 dark:text-gray-100"
                    >
                      {{ day }}
                    </p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in weeks" :key="index">
                <td v-for="(day, index) in week" :key="index">
                  <div
                    :class="[
                      'px-2 py-2 cursor-pointer flex w-full justify-center',
                      {
                        'bg-indigo-500 text-white rounded-full': isSelectedDay(
                          day.date
                        ),
                        'bg-green-500 text-white rounded-full': isCurrentDay(
                          day.date
                        ),
                      },
                    ]"
                    @click="selectDate(day.date)"
                  >
                    <p
                      class="text-base"
                      :class="{
                        'text-black':
                          !isSelectedDay(day.date) &&
                          !isCurrentDay(day.date) &&
                          day.isCurrentMonth,
                        'text-gray-400': !day.isCurrentMonth,
                        'font-medium': true,
                      }"
                    >
                      {{ day.date }}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b"
      >
        <div class="px-4">
          <div class="border-b pb-4 border-gray-400 border-dashed">
            <p
              class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300"
            >
              9:00 AM
            </p>
            <a
              tabindex="0"
              class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
              >Zoom call with design team</a
            >
            <p class="text-sm pt-2 leading-4 text-gray-600 dark:text-gray-300">
              Discussion on UX sprint and Wireframe review
            </p>
          </div>
          <div class="border-b pb-4 border-gray-400 border-dashed pt-5">
            <p
              class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300"
            >
              10:00 AM
            </p>
            <a
              tabindex="0"
              class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
              >Orientation session with new hires</a
            >
          </div>
          <div class="border-b pb-4 border-gray-400 border-dashed pt-5">
            <p
              class="text-xs font-light leading-3 text-gray-500 dark:text-gray-300"
            >
              9:00 AM
            </p>
            <a
              tabindex="0"
              class="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2"
              >Zoom call with design team</a
            >
            <p class="text-sm pt-2 leading-4 text-gray-600 dark:text-gray-300">
              Discussion on UX sprint and Wireframe review
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'
import { reactive, ref, computed, onMounted } from 'vue'

const currentDate = reactive(moment())
const selectedDate = ref(moment())
const weeks = ref([])

const days = computed(() => {
  return ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
})

function changeWeeks() {
  weeks.value = []
  const startOfMonth = currentDate.clone().startOf('month').startOf('week')
  const endOfMonth = currentDate.clone().endOf('month').endOf('week')
  const days = []
  let currentDay = startOfMonth.clone()

  while (currentDay.isBefore(endOfMonth, 'day')) {
    days.push({
      date: currentDay.date(),
      isCurrentMonth: currentDay.month() === currentDate.month(),
    })
    currentDay.add(1, 'day')
  }

  for (let i = 0; i < days.length; i += 7) {
    weeks.value.push(days.slice(i, i + 7))
  }
}

function changeMonth(offset) {
  currentDate.add(offset, 'months')

  if (!currentDate.isSame(selectedDate.value, 'month')) {
    selectedDate.value = currentDate.clone().startOf('month')
  }
  changeWeeks()
}

function selectDate(day) {
  const dayDate = currentDate.clone().date(day)
  selectedDate.value = dayDate
}

function isSelectedDay(day) {
  return (
    selectedDate.value &&
    currentDate.clone().date(day).isSame(selectedDate.value, 'day')
  )
}

function isCurrentDay(day) {
  return moment().isSame(currentDate.clone().date(day), 'day')
}

onMounted(() => {
  changeWeeks()
})
</script>
