<template>
  <div class="space-y-2">
    <!-- Dropzone Container -->
    <div
      :id="uploadId"
      class="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-lg p-6 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      :class="{ 'border-blue-500 dark:border-blue-500': isDragging }"
      @dragenter="isDragging = true"
      @dragleave="isDragging = false"
      @drop="isDragging = false">

      <div v-if="files.length === 0" class="py-8">
        <svg class="w-12 h-12 mx-auto text-gray-400 dark:text-neutral-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p class="text-sm text-gray-600 dark:text-neutral-400 mb-2">
          {{ selectFileText }}
        </p>
        <p class="text-xs text-gray-500 dark:text-neutral-500">
          Arrastra hasta {{ maxFiles }} imagen(es) o haz clic para seleccionar
        </p>
        <p class="text-xs text-gray-500 dark:text-neutral-500 mt-1">
          Formatos: JPG, PNG, WEBP (Máx. {{ maxFileSizeMB }}MB por imagen)
        </p>
      </div>

      <!-- Preview Grid -->
      <div v-else class="grid grid-cols-2 gap-4">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="relative group">
          <img
            :src="file.preview"
            class="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-neutral-700"
            :alt="`Preview ${index + 1}`">

          <!-- Remove Button -->
          <button
            type="button"
            @click.stop="removeFile(index)"
            class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- File Info -->
          <div class="mt-1 text-xs text-gray-600 dark:text-neutral-400 truncate">
            {{ file.name }}
          </div>
          <div class="text-xs text-gray-500 dark:text-neutral-500">
            {{ formatFileSize(file.size) }}
          </div>
        </div>

        <!-- Add More Button (if not at max) -->
        <div
          v-if="files.length < maxFiles"
          class="border-2 border-dashed border-gray-300 dark:border-neutral-700 rounded-lg flex items-center justify-center h-32 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
          @click="triggerFileInput">
          <div class="text-center">
            <svg class="w-8 h-8 mx-auto text-gray-400 dark:text-neutral-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <p class="text-xs text-gray-500 dark:text-neutral-500">Agregar otra</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input
      ref="fileInput"
      type="file"
      :accept="acceptedFormats"
      :multiple="maxFiles > 1"
      class="hidden"
      @change="handleFileInput">

    <!-- Error Message -->
    <p v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400 mt-2">
      {{ errorMessage }}
    </p>

    <!-- Info Text -->
    <p class="text-xs text-gray-500 dark:text-neutral-500">
      {{ files.length }} de {{ maxFiles }} imagen(es) seleccionada(s)
    </p>
  </div>
</template>

<script>
export default {
  name: 'MultipleImageUpload',
  props: {
    id: {
      type: String,
      required: true
    },
    selectFileText: {
      type: String,
      default: 'Selecciona imágenes'
    },
    maxFiles: {
      type: Number,
      default: 2
    },
    maxFileSizeMB: {
      type: Number,
      default: 5
    },
    initialFiles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      isDragging: false,
      errorMessage: '',
      acceptedFormats: 'image/jpeg,image/jpg,image/png,image/webp'
    };
  },
  computed: {
    uploadId() {
      return `upload-${this.id}`;
    },
    maxFileSizeBytes() {
      return this.maxFileSizeMB * 1024 * 1024;
    }
  },
  mounted() {
    this.setupDropzone();
    if (this.initialFiles && this.initialFiles.length > 0) {
      this.loadInitialFiles();
    }
  },
  methods: {
    setupDropzone() {
      const dropzoneElement = document.getElementById(this.uploadId);
      if (!dropzoneElement) return;

      dropzoneElement.addEventListener('click', (e) => {
        if (e.target === dropzoneElement || e.target.closest('.py-8')) {
          this.triggerFileInput();
        }
      });

      // Drag & Drop Events
      dropzoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      dropzoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const droppedFiles = Array.from(e.dataTransfer.files);
        this.processFiles(droppedFiles);
      });
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileInput(event) {
      const selectedFiles = Array.from(event.target.files);
      this.processFiles(selectedFiles);
      // Reset input
      event.target.value = '';
    },
    processFiles(newFiles) {
      this.errorMessage = '';

      // Filter only image files
      const imageFiles = newFiles.filter(file => {
        if (!file.type.startsWith('image/')) {
          this.errorMessage = 'Solo se permiten archivos de imagen';
          return false;
        }
        return true;
      });

      if (imageFiles.length === 0) return;

      // Check if adding these files exceeds max
      const remainingSlots = this.maxFiles - this.files.length;
      if (imageFiles.length > remainingSlots) {
        this.errorMessage = `Solo puedes agregar ${remainingSlots} imagen(es) más`;
        return;
      }

      // Validate each file
      for (const file of imageFiles) {
        if (file.size > this.maxFileSizeBytes) {
          this.errorMessage = `El archivo "${file.name}" excede el tamaño máximo de ${this.maxFileSizeMB}MB`;
          return;
        }
      }

      // Add files with previews
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.files.push({
            file: file,
            name: file.name,
            size: file.size,
            preview: e.target.result
          });
          this.emitFiles();
        };
        reader.readAsDataURL(file);
      });
    },
    removeFile(index) {
      this.files.splice(index, 1);
      this.errorMessage = '';
      this.emitFiles();
    },
    emitFiles() {
      const fileObjects = this.files.map(f => f.file);
      this.$emit('change', fileObjects);
      this.$emit('update:modelValue', fileObjects);
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },
    loadInitialFiles() {
      // Load initial files (for edit mode with existing images)
      this.initialFiles.forEach((fileUrl, index) => {
        this.files.push({
          file: null,
          name: `Imagen ${index + 1}`,
          size: 0,
          preview: fileUrl,
          isExisting: true
        });
      });
    },
    clearFiles() {
      this.files = [];
      this.errorMessage = '';
      this.emitFiles();
    }
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
