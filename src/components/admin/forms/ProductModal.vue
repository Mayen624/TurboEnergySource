<template>
    <div
      :id='id'
      class="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden"
      role="dialog"
      tabindex="-1"
      aria-labelledby="hs-slide-down-animation-modal-label"
    >
      <div
        class="hs-overlay-animation-target m-3 mt-0 opacity-0 transition-all ease-out hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 sm:mx-auto sm:w-full sm:max-w-lg"
      >
        <div
          class="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70"
        >
          <div
            class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700"
          >
            <h3
              id="hs-slide-down-animation-modal-label"
              class="font-bold text-gray-800 dark:text-white"
            >
              {{ modalTitle }}
            </h3>
            <button
              type="button"
              class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
              aria-label="Close"
              :data-hs-overlay="`#${id}`"
            >
              <span class="sr-only">Close</span>
              <svg
                class="size-4 shrink-0"
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
          <div class="overflow-y-auto p-4">
            <!-- Hire Us -->
            <div
              class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
            >
              <div class="mx-auto max-w-xl">
                <!-- Form -->
                <form id="ActionsForm" enctype="application/json">
                  <div class="grid gap-4 lg:gap-6">
                    <!-- Grid -->
                    <div
                      class="grid grid-cols-1 gap-4"
                    >
                      <div>
                        <label
                          for="hs-firstname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Titulo:
                        </label>
                        <input
                          type="text"
                          name="title"
                          v-model="title"
                          required=""
                          id="title"
                          class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </div>

                      <div>
                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Descripción corta:
                        </label>
                        <input 
                            type="text" 
                            name="description" 
                            id="description"
                            class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        >
                      </div>

                      <div>
                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Introducción:
                        </label>
                        
                        <TextArea
                          id="introduction"
                          name="introduction"
                        />

                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Imagen del producto:
                        </label>

                        <UploadFileInput  selectFileText="Seleccione una imagen"/>
                      </div>
                         
                      <div>

                        <div class="flex">
                            <input
                                id="hasSpecification" 
                                name="hasSpecification"
                                type="checkbox" 
                                class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" 
                            >
                            <label for="hs-default-checkbox" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">¿Tiene especificaciónes?</label>
                            <input
                                id="hasBluePrints" 
                                name="hasBluePrints"
                                type="checkbox" 
                                class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800 ml-5" 
                            >
                            <label for="hs-default-checkbox" class="text-sm text-gray-500 ms-3 dark:text-neutral-400">¿Tiene planos o diseño?</label>
                        </div>
                        
                      </div>

                      <div id="descripcion-detallada">

                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Titulo de descripción detallada:
                        </label>
                        <input
                          type="text"
                          name="longDescriptionTitle"
                          v-model="longDescriptionTitle"
                          required=""
                          id="longDescriptionTitle"
                          class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />

                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Descripción de descripción detallada:
                        </label>
                        <TextArea
                          id="longDescriptionSubTitle"
                          name="longDescriptionSubTitle  "
                        />
                      </div>

                    </div>
                  </div>
                  <!-- End Grid -->
                </form>
                <!-- End Form -->
              </div>
            </div>
            <!-- End Hire Us -->
          </div>
          <div
            class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700"
          >
            <button
              type="button"
              class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              :data-hs-overlay="`#${id}`"
            >
              Cerrar
            </button>
            <button
              type="button"
              @click="saveNewAction"
              class="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import TextArea from '@/components/ui/forms/input/TextArea.vue';
  import UploadFileInput from '@/components/ui/forms/input/UploadFileInput.vue';
  import {successToast, errorToast} from '@/utils/notify.ts'
  import { getCookie } from '@/utils/functions.ts';
  import {addAction} from '@/API/pushData.ts';

  export default {
    name: 'ProductModal',
    components: {
        TextArea,
        UploadFileInput
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

      };
    },
    mounted() {

    },
    methods: {
      async saveNewAction(){
        event.preventDefault();
        let form = document.getElementById('ActionsForm');
        let formData = new FormData(form);

        const data = {
          name: formData.get('name'),
          description: formData.get('description'),
        };

        const res = await addAction(data, getCookie('authToken'));
        
        if(res.errors){
          const concatenatedErrorMessages = res.errors.join(', <br/>');
          return errorToast('Solucionar los siguientes errores: ', concatenatedErrorMessages, 10000, false, false);
        }else if(res.success){
          form.reset();
          successToast('Exito!', res.success);
          setTimeout(() => {
            location.reload();  
          }, 3500);
        }
      },
    },
  };
  </script>

