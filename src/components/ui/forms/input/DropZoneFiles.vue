<template>
  <div class="max-w-full">
    <div
      id="file-upload-container"
      class="relative block w-full cursor-pointer appearance-none rounded-lg border-2 border-dashed border-gray-300 bg-white px-3 py-8 text-center hover:border-gray-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
    >
      <div class="dz-message flex flex-col items-center">
        <svg
          class="size-10 text-gray-400 dark:text-gray-600"
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
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 1 1 0 9h-1"></path>
          <path d="M12 12v9"></path>
          <path d="m16 16-4-4-4 4"></path>
        </svg>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span class="font-semibold">Haz clic para subir</span> o arrastra y suelta
        </p>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Solo imágenes (máximo 2 archivos, 2MB cada uno)
        </p>
      </div>
    </div>

    <!-- Preview de imágenes -->
    <div v-if="previewImages.length > 0" class="mt-4 grid gap-3 sm:grid-cols-2">
      <div v-for="(image, index) in previewImages" :key="index" class="relative">
        <img
          :src="image.preview"
          class="h-32 w-full rounded-lg object-cover"
          alt="Preview"
        />
        <button
          @click="removeImage(index)"
          class="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full bg-gray-800/50 text-white hover:bg-gray-800/75"
        >
          <span class="sr-only">Eliminar</span>
          <svg
            class="size-4"
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
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { successToast, errorToast } from '@/utils/notify.ts';

export default {
  name: "DropZoneFiles",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      previewImages: [],
      dropzone: null,
      isProcessingFile: false
    };
  },
  mounted() {
    this.initDropzone();
  },
  methods: {
    initDropzone() {
      this.dropzone = new Dropzone("#file-upload-container", {
        url: "/fake-url",
        autoProcessQueue: false,
        addRemoveLinks: false,
        maxFiles: 2,
        maxFilesize: 2,
        acceptedFiles: "image/*",
        previewsContainer: false,
        clickable: true,
        accept: (file, done) => {
          // Validación inicial de cantidad de archivos
          if (this.previewImages.length >= 2) {
            done("Solo puedes subir hasta 2 imágenes.");
            return;
          }
          done();
        }
      });

      // Configurar eventos
      this.dropzone.on("addedfile", this.handleAddedFile);
      this.dropzone.on("error", this.handleError);
      
      // Prevenir drop nativo cuando ya hay 2 imágenes
      const dropzoneElement = document.getElementById("file-upload-container");
      dropzoneElement.addEventListener("dragover", (e) => {
        if (this.previewImages.length >= 2) {
          e.preventDefault();
          return false;
        }
      });
    },

    async handleAddedFile(file) {
      // Evitar procesamiento múltiple
      if (this.isProcessingFile) return;
      this.isProcessingFile = true;

      try {
        // Verificar límite estricto
        if (this.previewImages.length >= 2) {
          this.dropzone.removeFile(file);
          errorToast('¡Error!', 'Solo puedes subir hasta 2 imágenes.', 10000, false, false);
          return;
        }

        // Procesar archivo solo si estamos bajo el límite
        const reader = new FileReader();
        reader.onload = (e) => {
          if (this.previewImages.length < 2) {
            this.previewImages.push({
              file: file,
              preview: e.target.result,
            });
            
            // Emitir actualización
            const files = this.previewImages.map(item => item.file);
            this.$emit("update:modelValue", files);
          } else {
            this.dropzone.removeFile(file);
            errorToast('¡Error!', 'Solo puedes subir hasta 2 imágenes.', 10000, false, false);
          }
        };
        reader.readAsDataURL(file);

      } catch (error) {
        console.error('Error processing file:', error);
        errorToast('¡Error!', 'Error al procesar el archivo.', 10000, false, false);
        this.dropzone.removeFile(file);
      } finally {
        this.isProcessingFile = false;
      }
    },

    removeImage(index) {
      const removedFile = this.previewImages[index].file;
      this.dropzone.removeFile(removedFile);
      this.previewImages.splice(index, 1);
      
      // Emitir archivos actualizados
      const files = this.previewImages.map(item => item.file);
      this.$emit("update:modelValue", files);
    },

    handleError(file, message) {
      errorToast('¡Error!', message, 10000, false, false);
      this.dropzone.removeFile(file);
    }
  },
  beforeUnmount() {
    if (this.dropzone) {
      this.dropzone.destroy();
    }
  },
};
</script>