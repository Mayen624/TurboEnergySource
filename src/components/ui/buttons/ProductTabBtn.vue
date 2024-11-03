<template>
    <!-- Tab button element -->
    <button
      type="button"
      :class="[BUTTON_CLASS, { 'active bg-neutral-100 hover:border-transparent dark:bg-white/[.05]': first }]"
      :id="id"
      :data-target="dataTab"
      role="tab"
    >
      <!-- Tab text -->
      <span
        :class="[HEADING_CLASS, { 'text-orange-400 dark:text-orange-300': first, INACTIVE_HEADING_CLASS }]"
      >
        {{ title }}
      </span>
    </button>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      id: {
        type: String,
        required: true,
      },
      dataTab: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      first: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      // Define constants for styling classes
      const BUTTON_CLASS =
        'flex w-full justify-center rounded-xl border border-transparent p-3 outline-none ring-zinc-500 transition duration-300 hover:bg-neutral-100 focus-visible:ring dark:ring-zinc-200 dark:hover:bg-neutral-700 dark:focus:outline-none md:p-5';
  
      const HEADING_CLASS = 'block text-center font-bold';
      const INACTIVE_HEADING_CLASS = 'text-neutral-800 dark:text-neutral-200';
  
      return {
        BUTTON_CLASS,
        HEADING_CLASS,
        INACTIVE_HEADING_CLASS,
        ...props,
      };
    },
  });
</script>
  