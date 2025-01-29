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
                  <form id="productsForm" enctype="multipart/form-data">
                    <div class="grid gap-4 lg:gap-6">
                      <div class="grid grid-cols-1 gap-4">
  
                        <div>
                          <label for="updatefor"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Actualizado por :</label>
                          <TextArea v-model="mainContent.updatefor" id="updatefor" name="updatefor" />
                        </div>
                          
                        <div>
                          <label for="title"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Titulo :</label>
                          <input type="text" name="titulo" v-model="titulo" id="title"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>


                        <div>
                          <label for="createdby"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Creado por:</label>
                          <input type="text" name="createdby" v-model="createdby" id="createdby"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>
  
                        <div>
                          <label for="description"
                            class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Descripción :</label>
                          <input type="text" name="description" v-model="description" id="description"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400" />
                        </div>

                        <div>
                          <DropZoneFiles v-model="DropZoneFiles"/>
                        </div>
  
                        <div>
                          <label for="image" class="mb-2 block text-sm font-medium text-gray-700 dark:text-white">Imagen del producto:</label>
                          <UploadFileInput id="uploadFile" name="img" @change="onFileChange" selectFileText="Seleccione una imagen" />
                        </div>
                        <div class="flex">
                          <input id="hasSpecification" name="haveSpecification" v-model="haveSpecification"  :value="haveSpecification ? true : false" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700" />
                          <label for="hasSpecification" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">enabled</label>
                          <input id="hasBluePrints" name="haveluePrints" v-model="haveluePrints"  :value="haveluePrints ? true : false" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 ml-5" />
                          <label for="hasBluePrints" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">disabled</label>
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
              <button type="button" @click="saveNewProduct" class="bg-blue-600 hover:bg-blue-700 inline-flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium text-white">
                Guardar cambios
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
  import ServicePreviewCard from '../cards/ServicePreviewCard.vue';
  import { successToast, errorToast } from '@/utils/notify.ts'
  import DropZoneFiles from '@/components/ui/forms/input/DropZoneFiles.vue';
  import { getCookie } from '@/utils/functions.ts';
import { title } from 'node:process';
  
  
  export default {
    name: 'ServiceModal',
    components: {
      TextArea,
      UploadFileInput,
      ServicePreviewCard,
      DropZoneFiles,
     
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
    },
    data() {
      return {
        createdby: '',
        title: '',
        description: '',
        mainContent: {
        updatefor: '',
          img: "",
        },
        haveSpecification: false,
        haveluePrints: false,
        tabs: [],
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
        img: ''
      };
    },
    computed: {
      previewData() {
        return {
          mainContent: this.mainContent,
          createdby: this.createdby,
          title: this.title,
          description: this.description,
          updatefor: this.mainContent.updatefor,
          haveSpecification: this.haveSpecification,
          haveluePrints: this.haveluePrints,
          
          tabs : this.tabs,
          descriptionList : this.descriptionList,
          specificationsLeft: this.specificationsLeft,
          specificationTableData: this.specificationTableData,
          blueprints: this.blueprints,
          img: this.img
        };
      }
    },
    
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          // Crear URL temporal para la imagen seleccionada
          this.mainContent.img = URL.createObjectURL(file);
          this.img = file;
        }else{
          this.mainContent.img = null;
        }
      },
      async saveNewProduct() {
        event.preventDefault();
  
        const data = this.previewData;
        const token = getCookie('authToken');
        const res = await addProduct(data, this.img ,token);
  
  
        if (res.errors) {
          const concatenatedErrorMessages = res.errors.join(', <br/>');
          return errorToast('Solucionar los siguientes errores: ', concatenatedErrorMessages, 10000, false, false);
        } else if(res.error){
          return errorToast('Error', res.error, 10000, true, false);
        } else if (res.success) {
          successToast('Exito!', res.success);
          setTimeout(() => {
            location.reload();
          }, 6000);
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
  