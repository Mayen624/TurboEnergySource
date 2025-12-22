<template>
    <div>
      <!-- Formulario -->
      <div :id='id'
        class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
        role="dialog" tabindex="-1" aria-labelledby="hs-slide-down-animation-modal-label">
        <div
          class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all max-w-[115rem] lg:w-full m-3 lg:mx-auto">
          <div
            class="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70">
            <div class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700">
              <h3 id="hs-slide-down-animation-modal-label" class="font-bold text-gray-800 dark:text-white">
                {{ modalTitle }}
              </h3>
              <button type="button"
                class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                aria-label="Close" :data-hs-overlay="`#${id}`">
                <span class="sr-only">Close</span>
                <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            </div>
            <div class="overflow-y-auto p-4 max-h-[80vh]">
              <div class="grid grid-cols-2 gap-8">
                <!-- Form Column -->
                <div class="w-full">
                  <form id="servicesEditForm" enctype="multipart/form-data">
                    <input id="serviceId" type="hidden" name="id" readonly>
                    <div class="grid gap-4 lg:gap-6">
                      <div class="grid grid-cols-1 gap-4">

                        <div>
                          <label for="title"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Titulo:</label>
                          <input type="text" name="title" v-model="title" id="title"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>

                        <div>
                          <label for="description"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Descripción corta:</label>
                          <input type="text" name="description" v-model="description" id="description"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>

                        <div>
                          <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Imágenes del servicio (máx. 2):</label>
                          <MultipleImageUpload
                            id="serviceEditImages"
                            @change="onFilesChange"
                            selectFileText="Selecciona hasta 2 imágenes"
                            :maxFiles="2"
                            :maxFileSizeMB="5"
                            :initialFiles="existingImageUrls" />
                          <p class="text-xs text-gray-500 mt-1">Deja vacío si no deseas cambiar las imágenes actuales</p>
                        </div>

                        <!-- Configuración de posición y botón -->
                        <div class="border-t pt-4 mt-4">
                          <h4 class="mb-3 text-sm font-semibold text-gray-700 dark:text-white">Configuración de la sección</h4>

                          <div class="flex gap-4 mb-4">
                            <div class="flex items-center">
                              <input id="isRightSection" name="isRightSection" v-model="isRightSection" type="checkbox"
                                class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                              <label for="isRightSection" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                                Mostrar texto a la izquierda (RightSection)
                              </label>
                            </div>
                          </div>

                          <div class="flex items-center mb-3">
                            <input id="singleEdit" name="single" v-model="single" type="checkbox"
                              class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                            <label for="singleEdit" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                              Mostrar solo 1 imagen (por defecto muestra 2)
                            </label>
                          </div>

                          <div class="flex items-center mb-3">
                            <input id="btnExists" name="btnExists" v-model="btnExists" type="checkbox"
                              class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                            <label for="btnExists" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                              ¿Agregar botón CTA en esta sección?
                            </label>
                          </div>

                          <div v-if="btnExists" class="grid grid-cols-2 gap-4 ml-6">
                            <div>
                              <label for="sectionBtnTitle"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Título del botón:</label>
                              <input type="text" name="sectionBtnTitle" v-model="sectionBtnTitle" id="sectionBtnTitle"
                                class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                            </div>
                            <div>
                              <label for="sectionBtnURL"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">URL del botón:</label>
                              <input type="text" name="sectionBtnURL" v-model="sectionBtnURL" id="sectionBtnURL"
                                class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400"
                                placeholder="/contact" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>

                <!-- Image Column (Preview) -->
                <div class="w-full">
                  <ServicePreviewCard :data="previewData" />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
              <button type="button" @click="updateServiceData" class="bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium text-white">
                Actualizar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


  <script>
  import TextArea from '@/components/ui/forms/input/TextArea.vue';
  import MultipleImageUpload from '@/components/ui/forms/input/MultipleImageUpload.vue';
  import ServicePreviewCard from '../cards/ServicePreviewCard.vue';
  import { successToast, errorToast } from '@/utils/notify.ts'
  import { getCookie } from '@/utils/functions.ts';
  import { updateService } from '@/API/pushData.ts';
  import { apiGet } from "@/utils/api";

  export default {
    name: 'ServiceEditModal',
    components: {
      TextArea,
      MultipleImageUpload,
      ServicePreviewCard
    },
    props: {
      id: {
        type: String,
        required: true
      },
      modalTitle: {
        type: String,
        required: true
      },
      serviceId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        title: '',
        description: '',
        images: [],
        existingImageUrls: [],
        isRightSection: false,
        single: false,
        btnExists: false,
        sectionBtnTitle: '',
        sectionBtnURL: '',
        imageFiles: []
      };
    },
    computed: {
      previewData() {
        return {
          title: this.title,
          description: this.description,
          images: this.images,
          isRightSection: this.isRightSection,
          single: this.single,
          btnExists: this.btnExists,
          btnTitle: this.sectionBtnTitle,
          btnURL: this.sectionBtnURL
        };
      }
    },
    watch: {
      serviceId: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.loadServiceData(newVal);
          }
        }
      }
    },
    methods: {
      async loadServiceData(id){
        try {
          const response = await apiGet(`/v1/services/${id}`);
          const data = await response.json();

          if (data.error) {
            errorToast('Error', data.error);
            return;
          }

          const service = data.service;

          // Cargar datos en el formulario
          this.title = service.title || '';
          this.description = service.description || '';

          // Cargar imágenes existentes
          if (service.images && Array.isArray(service.images)) {
            this.existingImageUrls = service.images.map(img => img.src);
            this.images = service.images.map(img => img.src);
          }

          this.isRightSection = service.isRightSection || false;
          this.single = service.single || false;
          this.btnExists = service.btnExists || false;
          this.sectionBtnTitle = service.btnTitle || '';
          this.sectionBtnURL = service.btnURL || '';

          // Establecer ID en input hidden
          document.getElementById('serviceId').value = service._id;

        } catch (error) {
          console.error('Error al cargar servicio:', error);
          errorToast('Error', 'Error al cargar datos del servicio');
        }
      },
      onFilesChange(files) {
        // Asegurarse de que files sea un array
        this.imageFiles = Array.isArray(files) ? files : [];
        // Crear URLs temporales para preview
        this.images = this.imageFiles.map(file => URL.createObjectURL(file));
      },
      async updateServiceData() {
        event.preventDefault();

        // Construir datos para enviar al backend
        const data = {
          title: this.title,
          description: this.description,
          images: this.imageFiles.length > 0
            ? this.imageFiles.map((file, index) => ({
                alt: this.title || `Imagen ${index + 1}`
              }))
            : [],
          isRightSection: this.isRightSection,
          single: this.single,
          btnExists: this.btnExists,
          btnTitle: this.sectionBtnTitle,
          btnURL: this.sectionBtnURL
        };

        const serviceId = document.getElementById('serviceId').value;

        // Si no se seleccionaron nuevas imágenes, enviar undefined
        const res = await updateService(serviceId, data, this.imageFiles.length > 0 ? this.imageFiles : undefined);

        if (res.errors) {
          const concatenatedErrorMessages = res.errors.join(', <br/>');
          return errorToast('Solucionar los siguientes errores: ', concatenatedErrorMessages, 10000, false, false);
        } else if(res.error){
          return errorToast('Error', res.error, 10000, true, false);
        } else if (res.success) {
          successToast('Exito!', res.success);
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }
    }
  };
  </script>

