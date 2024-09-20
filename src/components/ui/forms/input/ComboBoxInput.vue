<template>
    <div class="relative">
      <!-- Select field -->
      <div class="relative">
        <select
          :id="id"
          :name="name"
          class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 py-3 px-4 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          :value="selectedValue"
          @change="onChange"
          aria-label="Select an option"
        >
          <option class="rounded-lg"
            v-for="option in options"
            :key="option.idValue"
            :value="option.idValue"
          >
            {{ option.textValue }}
          </option>
        </select>
        <div class="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
          <svg
            class="size-3.5 shrink-0 text-gray-500 dark:text-neutral-500"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m7 15 5 5 5-5"></path>
            <path d="m7 9 5-5 5 5"></path>
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ComboBoxInput',
    props: {
      options: {
        type: Array,
        required: true
      },
      selectedValue: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      }
    },
    methods: {
      onChange(event) {
        this.$emit('update:selectedValue', event.target.value);
      }
    }
  };
  </script>
  