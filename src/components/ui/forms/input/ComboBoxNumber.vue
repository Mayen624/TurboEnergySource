<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [10, 30, 50],
  },
});

const emit = defineEmits();

const selectedOption = ref(props.options[0]);  // Seleccionamos el primer valor como predeterminado

const onChange = () => {
  emit("update:modelValue", selectedOption.value);  // Emitir el valor seleccionado
};
</script>

<template>
  <div class="relative">
    <select
      v-model="selectedOption"
      class="w-full px-3 py-2 border rounded-md text-sm text-gray-800 dark:bg-neutral-800 dark:text-neutral-200 dark:border-neutral-700 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      @change="onChange"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option"
        class="rounded-md"
      >
        {{ option }}
      </option>
    </select>
    <div class="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
      <svg
        class="size-3.5 shrink-0 text-gray-500 dark:text-neutral-400"
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
</template>
