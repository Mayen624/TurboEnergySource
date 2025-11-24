<template>
    <div class="relative" ref="comboboxContainer">
      <!-- Campo select -->
      <div class="relative">
        <div
          style="min-height: 45px;"
          class="hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-4 pe-9 flex flex-wrap gap-2 w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600"
          :class="{ 'ring-2 ring-blue-500 dark:ring-blue-600': showDropdown }"
          @click="toggleDropdown"
        >
          <!-- Placeholder cuando no hay selecciones -->
          <div v-if="selectedOptions.length === 0" class="text-gray-400 dark:text-neutral-500 py-1">
            Seleccionar opciones...
          </div>

          <!-- Modo contador: muestra número cuando hay 4 o más opciones -->
          <div v-else-if="selectedOptions.length >= 4" class="text-gray-800 dark:text-neutral-200 py-1 font-medium">
            {{ selectedOptions.length }} opciones seleccionadas
          </div>

          <!-- Modo badges: muestra tags individuales cuando hay menos de 4 -->
          <div v-else class="flex flex-wrap gap-1.5 py-0.5">
            <span
              v-for="option in selectedOptions"
              :key="option.idValue"
              class="inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            >
              <span>{{ option.textValue }}</span>
              <button
                type="button"
                class="inline-flex shrink-0 justify-center items-center size-4 rounded-full hover:bg-blue-200 focus:outline-none focus:bg-blue-200 dark:hover:bg-blue-800 dark:focus:bg-blue-800"
                @click.stop="removeOption(option)"
                aria-label="Remover opción"
              >
                <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </span>
          </div>

          <!-- Select nativo oculto (para form submission) -->
          <select
            :id="id"
            :name="name"
            multiple
            class="absolute inset-0 opacity-0 pointer-events-none"
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

          <!-- Icono dropdown -->
          <div class="absolute top-3 end-3 pointer-events-none">
            <svg
              class="shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 transition-transform duration-200"
              :class="{ 'rotate-180': showDropdown }"
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
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
        </div>

        <!-- Dropdown para las opciones múltiples -->
        <div
          v-if="showDropdown"
          class="absolute mt-2 z-50 w-full max-h-72 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg dark:bg-neutral-900 dark:border-neutral-700"
        >
          <!-- Campo de búsqueda -->
          <div class="p-2 border-b border-gray-200 dark:border-neutral-700" @click.stop>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Buscar..."
              class="block w-full text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 py-2 px-3"
              @click.stop
            />
          </div>

          <!-- Lista de opciones con scroll -->
          <div class="p-1 space-y-0.5 overflow-y-auto" style="max-height: 250px;">
            <div v-if="filteredOptions.length === 0" class="py-2 px-4 text-sm text-gray-500 dark:text-neutral-400 text-center">
              No se encontraron opciones
            </div>
            <div
              v-for="option in filteredOptions"
              :key="option.idValue"
              class="py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800 transition-colors"
              @click.stop="toggleOption(option)"
            >
              <div class="flex justify-between items-center w-full">
                <span>{{ option.textValue }}</span>
                <span v-if="isSelected(option)" class="shrink-0">
                  <svg
                    class="shrink-0 size-4 text-blue-600 dark:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
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
        selectedOptions: [],
        searchQuery: ''
      };
    },
    computed: {
      filteredOptions() {
        if (!this.searchQuery.trim()) {
          return this.options;
        }
        const query = this.searchQuery.toLowerCase();
        return this.options.filter(option =>
          option.textValue.toLowerCase().includes(query)
        );
      }
    },
    watch: {
      modelValue: {
        handler(newValue) {
          this.updateSelectedOptions(newValue);
        },
        immediate: true
      },
      options: {
        handler() {
          // Update selected options when options change
          this.updateSelectedOptions(this.modelValue);
        },
        deep: true
      }
    },
    mounted() {
      // Add click outside listener
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      // Remove click outside listener
      document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
      updateSelectedOptions(value) {
        if (!value || !Array.isArray(value)) {
          this.selectedOptions = [];
          return;
        }
        // Filter options based on modelValue
        this.selectedOptions = this.options.filter(option =>
          value.includes(option.idValue)
        );
      },
      toggleOption(option) {
        const index = this.selectedOptions.findIndex(o => o.idValue === option.idValue);
        if (index === -1) {
          // Add option
          this.selectedOptions = [...this.selectedOptions, option];
        } else {
          // Remove option
          this.selectedOptions = this.selectedOptions.filter(o => o.idValue !== option.idValue);
        }
        this.emitChange();
      },
      isSelected(option) {
        return this.selectedOptions.some(o => o.idValue === option.idValue);
      },
      removeOption(option) {
        this.selectedOptions = this.selectedOptions.filter(o => o.idValue !== option.idValue);
        this.emitChange();
      },
      toggleDropdown() {
        this.showDropdown = !this.showDropdown;

        // Si se abre el dropdown, focus en el input de búsqueda
        if (this.showDropdown) {
          this.$nextTick(() => {
            if (this.$refs.searchInput) {
              this.$refs.searchInput.focus();
            }
          });
        } else {
          // Si se cierra, limpiar la búsqueda
          this.searchQuery = '';
        }
      },
      handleClickOutside(event) {
        // Close dropdown if click is outside the component
        if (this.$refs.comboboxContainer && !this.$refs.comboboxContainer.contains(event.target)) {
          this.showDropdown = false;
          this.searchQuery = '';
        }
      },
      emitChange() {
        const value = this.selectedOptions.map(o => o.idValue);
        this.$emit('update:modelValue', value);
      }
    }
  };
  </script>
  