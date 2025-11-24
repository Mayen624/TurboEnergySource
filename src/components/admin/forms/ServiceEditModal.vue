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
                          <label for="introduction"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Introducción:</label>
                          <TextArea v-model="mainContent.introduction" id="introduction" name="introduction" />
                        </div>

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
                          <label for="image" class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Imagen del servicio:</label>
                          <UploadFileInput id="uploadFile" name="img" @change="onFileChange" selectFileText="Seleccione una imagen" />
                          <p class="text-xs text-gray-500 mt-1">Deja vacío si no deseas cambiar la imagen actual</p>
                        </div>

                        <div id="descripcion-detallada">
                          <label for="longDescriptionTitle"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Titulo de descripción detallada:</label>
                          <input type="text" name="longDescriptionTitle" v-model="longDescription.longDescriptionTitle"
                            id="longDescriptionTitle"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />

                          <label for="longDescriptionSubTitle"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Descripción detallada:</label>
                          <TextArea v-model="longDescription.longDescriptionSubTitle" id="longDescriptionSubTitle"
                            name="longDescriptionSubTitle" />

                          <label for="btnTitle"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Titulo de boton:</label>
                          <input type="text" name="btnTitle" v-model="longDescription.btnTitle" id="btnTitle"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>

                        <div id="descriptionList-section">
                          <div v-for="(item, index) in descriptionList" :key="index" class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label :for="'title' + index"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                                Título {{ index + 1 }}:
                              </label>
                              <input type="text" :id="'title' + index" v-model="item.title" :name="'title' + index"
                                class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                            </div>
                            <div>
                              <label :for="'subTitle' + index"
                                class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                                Descripción del elemento {{ index + 1 }}:
                              </label>
                              <TextArea :id="'subTitle' + index" v-model="item.subTitle" :name="'subTitle' + index" />
                            </div>
                          </div>
                        </div>

                        <div class="flex">
                          <input id="hasSpecification" name="haveSpecification" v-model="haveSpecification"  :value="haveSpecification ? true : false" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                          <label for="hasSpecification" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">¿Tiene especificaciones?</label>
                          <input id="hasBluePrints" name="haveluePrints" v-model="haveluePrints"  :value="haveluePrints ? true : false" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 ml-5" />
                          <label for="hasBluePrints" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">¿Tiene planos o diseño?</label>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>

                <!-- Image Column (Preview) -->
                <div class="w-full">
                  <ProductPreviewCard :data="previewData" :haveSpecification="false" :haveluePrints="false" />
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
  import UploadFileInput from '@/components/ui/forms/input/UploadFileInput.vue';
  import ProductPreviewCard from '../cards/ProductPreviewCard.vue';
  import { successToast, errorToast } from '@/utils/notify.ts'
  import { getCookie } from '@/utils/functions.ts';
  import { updateService } from '@/API/pushData.ts';
  import { getApiUrl } from "@/utils/utils";

  export default {
    name: 'ServiceEditModal',
    components: {
      TextArea,
      UploadFileInput,
      ProductPreviewCard
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
        mainContent: {
          introduction: '',
          img: "",
        },
        haveSpecification: false,
        haveluePrints: false,
        tabs: [],
        longDescription: {
          longDescriptionTitle: '',
          longDescriptionSubTitle: '',
          btnTitle: "",
          btnURL: ""
        },
        descriptionList: [
        {
            title: '',
            subTitle: ''
          },
          {
            title: '',
            subTitle: ''
          },
          {
            title: '',
            subTitle: ''
          }
        ],
        specificationsLeft: [
          {
            title: 'Material',
            subTitle: 'Según requerimientos'
          },
          {
            title: 'Cantidad',
            subTitle: 'Según requerimientos'
          },
          {
            title: 'Tamaño',
            subTitle: 'Según requerimientos'
          }
        ],
        specificationTableData: [
          {
            feature: ["Especificacion", "Valor"],
            description: [
              ["Material", "Acero/Hierro/Aluminio"],
              ["Cantidad", "N/A"],
              ["Tamaño", "mm/m/in/ft"]
            ]
          }
        ],
        blueprints: "",
        slug: "",
        img: null
      };
    },
    computed: {
      previewData() {
        return {
          mainContent: this.mainContent,
          title: this.title,
          description: this.description,
          haveSpecification: this.haveSpecification,
          haveluePrints: this.haveluePrints,
          longDescription: this.longDescription,
          tabs : this.tabs,
          descriptionList : this.descriptionList,
          specificationsLeft: this.specificationsLeft,
          specificationTableData: this.specificationTableData,
          blueprints: this.blueprints,
          img: this.img
        };
      }
    },
    mounted() {
      this.previewData.longDescription.btnURL = '/contact';
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
          const csrfToken = localStorage.getItem('csrfToken');
          const response = await fetch(`${getApiUrl()}/v1/services/${id}`, {
            method: 'GET',
            headers: {
              'X-CSRF-Token': csrfToken || '',
            },
            credentials: 'include',
          });

          const data = await response.json();

          if (data.error) {
            errorToast('Error', data.error);
            return;
          }

          const service = data.service;

          // Cargar datos en el formulario
          this.title = service.title || '';
          this.description = service.description || '';
          this.mainContent.introduction = service.mainContent?.introduction || '';
          this.mainContent.img = service.mainContent?.img?.src || '';
          this.haveSpecification = service.haveSpecification || false;
          this.haveluePrints = service.haveluePrints || false;
          this.longDescription = service.longDescription || this.longDescription;
          this.descriptionList = service.descriptionList || this.descriptionList;

          // Establecer ID en input hidden
          document.getElementById('serviceId').value = service._id;

        } catch (error) {
          console.error('Error al cargar servicio:', error);
          errorToast('Error', 'Error al cargar datos del servicio');
        }
      },
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          // Crear URL temporal para la imagen seleccionada
          this.mainContent.img = URL.createObjectURL(file);
          this.img = file;
        }
      },
      async updateServiceData() {
        event.preventDefault();

        const data = this.previewData;
        const serviceId = document.getElementById('serviceId').value;

        // Si no se seleccionó nueva imagen, img será null
        const res = await updateService(serviceId, data, this.img || undefined);

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
    },
    watch: {
      haveSpecification() {
        this.$emit('update-preview-data', this.previewData);
      },
      haveluePrints() {
        this.$emit('update-preview-data', this.previewData);
      }
    },
  };
  </script>

