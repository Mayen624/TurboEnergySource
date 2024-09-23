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
                <form id="UserEditForm" enctype="application/json">
                  <div class="grid gap-4 lg:gap-6">
                    <input id="id" type="hidden" name="id" readonly>
                    <!-- Grid -->
                    <div
                      class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
                    >
                      <div>
                        <label
                          for="hs-firstname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Nombre:
                        </label>
                        <input
                          type="text"
                          name="name"
                          v-model="name"
                          required=""
                          id="nameEdit"
                          class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </div>
  
                      <div>
                        <label
                          for="hs-lastname-hire-us-2"
                          class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                        >
                          Correo:
                        </label>
                        <input
                          type="text"
                          name="email"
                          v-model="email"
                          required=""
                          id="emailEdit"
                          class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        />
                      </div>
                    </div> 
                    <!-- End Grid -->
  
                    <div>
                      <label
                        for="hs-work-email-hire-us-2"
                        class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Contraseña:
                      </label>
                      <PasswordInput
                        label=""
                        :forgot="false"
                        id="passwordEdit"
                        defaultClass="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      />
                    </div>
  
                    <!-- Grid -->
                    <div>
                      <label
                        for="hs-work-email-hire-us-2"
                        class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Rol:
                      </label>
                      <ComboBoxInput
                        :options="comboOptions"
                        :value="selectedOption"
                        name="idRole"
                        id="idRoleEdit"
                      />
                    </div>
                    <!-- End Grid -->
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
              @click=""
              class="bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Actualizar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import UploadFileInput from '@/components/ui/forms/input/UploadFileInput.vue';
  import ComboBoxInput from '@/components/ui/forms/input/ComboBoxInput.vue';
  import PasswordInput from '@/components/ui/forms/input/PasswordInput.vue';
  import { fetchDataForRoleComboBox } from '@/API/comboBoxDataAdapted.ts';
  import {successToast, errorToast} from '@/utils/notify.ts'
  import { getCookie } from '@/utils/functions.ts';
  import {addUser} from '@/API/pushData.ts';
  
  export default {
    name: 'UserEditModal',
    components: {
      UploadFileInput,
      ComboBoxInput,
      PasswordInput
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
        comboOptions: [],
        selectedOption: null
      };
    },
    mounted() {
      this.setComboBoxData();
    },
    methods: {
      async setComboBoxData(){
        const token = getCookie('authToken');
        this.comboOptions = await fetchDataForRoleComboBox(token);
      },
      getDataToUpdate(){

      },
      async updateUser(idData){
        //open modal & set data with request
      }
    },
  };
  </script>

  