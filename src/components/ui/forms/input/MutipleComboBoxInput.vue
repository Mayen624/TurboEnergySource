<template>
    <div class="relative">
      <!-- Campo select -->
      <div class="relative">
        <div
          style="height: 45px;"
          class="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
          @click="toggleDropdown"
        >
          <div class="flex flex-wrap gap-1">
            <span
              v-for="(option, index) in selectedOptions"
              :key="index"
              class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {{ option.textValue }}
              <button type="button" class="ml-1" @click.stop="removeOption(option)">
                &times;
              </button>
            </span>
          </div>
          <select
            :id="id"
            :name="name"
            multiple
            class="absolute inset-0 opacity-0"
            @change="onChange"
            aria-label="Select an option"
          >
            <option
              v-for="option in options"
              :key="option.idValue"
              :value="option.idValue"
              :selected="isSelected(option)"
            >
              {{ option.textValue }}
            </option>
          </select>
          <div class="absolute top-1/2 end-3 -translate-y-1/2">
            <svg
              class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500"
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
  
        <!-- Dropdown para las opciones múltiples -->
        <ul v-if="showDropdown" class="mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-neutral-900 dark:border-neutral-700">
          <li
            v-for="option in options"
            :key="option.idValue"
            class="py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200"
            @click.stop="toggleOption(option)"
          >
            <div class="flex justify-between items-center">
              <span>{{ option.textValue }}</span>
              <span v-if="isSelected(option)" class="shrink-0">
                <svg
                  class="size-3.5 text-blue-600 dark:text-blue-500"
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
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MultipleComboBoxInput',
    props: {
      options: {
        type: Array,
        required: true
      },
      modelValue: {
        type: Array,
        default: () => []
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
    data() {
      return {
        showDropdown: false,
        selectedOptions: []
      };
    },
    watch: {
      modelValue: {
        handler(newValue) {
          this.updateSelectedOptions(newValue);
        },
        immediate: true
      }
    },
    methods: {
      updateSelectedOptions(value) {
        this.selectedOptions = this.options.filter(option => value.includes(option.idValue));
      },
      toggleOption(option) {
        const index = this.selectedOptions.findIndex(o => o.idValue === option.idValue);
        if (index === -1) {
          this.selectedOptions.push(option);
        } else {
          this.selectedOptions.splice(index, 1);
        }
        this.emitChange();
      },
      isSelected(option) {
        return this.selectedOptions.some(o => o.idValue === option.idValue);
      },
      removeOption(option) {
        const index = this.selectedOptions.findIndex(o => o.idValue === option.idValue);
        if (index !== -1) {
          this.selectedOptions.splice(index, 1);
          this.emitChange();
        }
      },
      onChange(event) {
        const selectedValues = Array.from(event.target.selectedOptions).map(option => option.value);
        this.updateSelectedOptions(selectedValues);
        this.emitChange();
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;
      },
      emitChange() {
        const value = this.selectedOptions.map(o => o.idValue);
        this.$emit('update:modelValue', value);
      }
    }
  };
  </script>
  