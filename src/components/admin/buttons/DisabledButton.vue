<template>
  <button type="button"
    class="m-1 hover:bg-red-600 focus:bg-red-600 inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-red-500 px-4 py-3 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-width="2"
        d="M18 12H6M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
    </svg>
  </button>
</template>
  
  <script>
    export default {
      name: 'DisabledButton',
    };
  </script>
  
  