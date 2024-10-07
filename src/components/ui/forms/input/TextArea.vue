<template>
  <div class="">
    <textarea
      :id="id"
      :name="name"
      class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      required
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rows: {
      type: String,
      default: "0"
    },
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ''
    }
  }
};
</script>
