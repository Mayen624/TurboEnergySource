<template>
  <div id="uploadFile">
    <template v-if="selectedFile">
      <div class="flex items-center w-full">

      </div>
    </template>

    <button 
      type="button"
      class="relative flex w-full border overflow-hidden border-gray-200 shadow-sm rounded-lg text-sm focus:outline-none focus:z-10 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:border-neutral-600"
    >
      <span class="h-full py-3 px-4 bg-gray-100 text-nowrap dark:bg-neutral-800">{{ selectFileText }}</span>
      <span class="group grow flex overflow-hidden h-full py-3 px-4">
        <span v-if="!selectedFile">{{ noFileSelectDefaultText }}</span>
        <span v-else>{{ selectedFileName }}</span>
      </span>
      <input 
        ref="fileInput" 
        :name="name"
        type="file" 
        :id="id" 
        @change="handleFileSelect" 
        class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    selectFileText: {
      type: String,
      required: true,
    },
    noFileSelectDefaultText: {
      type: String,
      default: 'No hay archivos seleccionados',
    },
  },
  data() {
    return {
      selectedFile: null,
    };
  },
  computed: {
    selectedFileName() {
      return this.selectedFile ? this.selectedFile.name : '';
    },
    selectedFileExt() {
      return this.selectedFileName ? this.selectedFileName.split('.').pop() : '';
    },
  },
  methods: {
    handleFileSelect(event) {
      const files = event.target.files;
      if (files.length > 0) {
        this.selectedFile = files[0];
      } else {
        this.selectedFile = null;
      }
    },
  },
};
</script>
