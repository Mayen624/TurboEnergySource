<template>
    <button
      type="button"
      :id="`#${id}`"
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-600 text-white focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="hs-slide-down-animation-modal"
      :data-hs-overlay="`#${triggerIdBtn}`"
    >
      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      {{ buttonText }}
    </button>
  </template>
  
<script>
  export default {
    name: 'AddButton',
    props: {
      id: {
        type: String,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      },
      triggerIdBtn: {
        type: String,
        required: true
      },
    }
  }
</script>
  
  