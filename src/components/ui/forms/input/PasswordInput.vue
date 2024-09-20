<template>
    <div>
      <div class="flex items-center justify-between">
        <label :for="id" class="mb-2 block text-sm text-neutral-800 dark:text-neutral-200">
          {{ label }}
        </label>
        <button
          v-if="forgot"
          class="rounded-lg text-sm font-medium text-orange-400 decoration-2 outline-none ring-zinc-500 hover:underline focus-visible:ring dark:text-orange-400 dark:ring-zinc-200 dark:focus:outline-none dark:focus:ring-1"
          @click="forgotPassword"
        >
          Forgot password?
        </button>
      </div>
      <div class="relative">
        <input
          :type="showPassword ? 'text' : 'password'"
          :id="id"
          name="password"
          :class="defaultClass"
          required
          :aria-describedby="errorId"
        />
        <button
          type="button"
          @click="togglePassword"
          class="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
        >
          <svg
            class="shrink-0 size-3.5"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              v-if="!showPassword"
              d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
            ></path>
            <path
              v-if="!showPassword"
              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
            ></path>
            <path
              v-if="!showPassword"
              d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
            ></path>
            <line
              v-if="!showPassword"
              x1="2"
              x2="22"
              y1="2"
              y2="22"
            ></line>
            <path
              v-else
              d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
            ></path>
            <circle v-if="showPassword" cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Password',
      },
      forgot: {
        type: Boolean,
        default: false,
      },
      id: {
        type: String,
        default: 'password-input',
      },
      errorId: {
        type: String,
        default: null,
      },
      content: {
        type: String,
        default: '',
      },
      defaultClass: {
        type: String,
        default:
          'block w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 focus:border-neutral-200 focus:outline-none focus:ring focus:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700/30 dark:text-neutral-300 dark:focus:ring-1',
      },
    },
    data() {
      return {
        showPassword: false,
      };
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword;
      }
    },
  };
</script>
  