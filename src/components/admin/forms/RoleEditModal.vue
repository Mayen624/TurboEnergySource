<template>
    <div
      :id='id'
      class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabindex="-1"
      aria-labelledby="hs-slide-down-animation-modal-label"
    >
      <div
        class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 h-[calc(100%-3.5rem)] sm:mx-auto"
      >
        <div
          class="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70"
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
                <form id="RolesEditForm" enctype="application/json">
                  <div class="grid gap-4 lg:gap-6">
                    <input id="roleId" type="hidden" name="id" readonly>
                    <!-- Grid -->
                    <div
                      class="grid grid-cols-1 gap-4"
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
                          Descripción:
                        </label>
                        <TextArea
                          id="descriptionEdit"
                          name="description"
                          v-model="description"
                        />
                      </div>
                      <div>
                      <label
                        for="hs-work-email-hire-us-2"
                        class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                      >
                        Acciónes:
                      </label>
                      <MultipleComboBoxInput
                        :options="comboOptions"
                        v-model="selectedOptions"
                        name="actions"
                        id="select-actions-edit"
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
              @click="updateRoleData"
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
import MultipleComboBoxInput from '@/components/ui/forms/input/MutipleComboBoxInput.vue';
import { fetchDataForActionsComboBox } from '@/API/comboBoxDataAdapted.ts';
import TextArea from '@/components/ui/forms/input/TextArea.vue';
import {successToast, errorToast} from '@/utils/notify.ts'
import { getCookie } from '@/utils/functions.ts';
import {updateRole} from '@/API/pushData.ts';
import { getApiUrl } from "@/utils/utils";

export default {
  name: 'RoleEditModal',
  components: {
    TextArea,
    MultipleComboBoxInput
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
    roleId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      comboOptions: [],
      selectedOptions: [],
      name: '',
      description: ''
    };
  },
  mounted() {
    this.setComboBoxData();
  },
  watch: {
    roleId: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadRoleData(newVal);
        }
      }
    }
  },
  methods: {
    async setComboBoxData(){
      this.comboOptions = await fetchDataForActionsComboBox();
    },
    async loadRoleData(id){
      try {
        const csrfToken = localStorage.getItem('csrfToken');
        const response = await fetch(`${getApiUrl()}/v1/roles/${id}`, {
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

        // Cargar datos en el formulario
        this.name = data.role.name;
        this.description = data.role.description;

        // Cargar acciones seleccionadas (asumiendo que el backend devuelve un array de IDs)
        if (data.role.actions && Array.isArray(data.role.actions)) {
          this.selectedOptions = data.role.actions.map(action =>
            typeof action === 'object' ? action._id : action
          );
        }

        // Establecer valores en input hidden
        document.getElementById('roleId').value = data.role._id;

      } catch (error) {
        console.error('Error al cargar rol:', error);
        errorToast('Error', 'Error al cargar datos del rol');
      }
    },
    async updateRoleData(){
      event.preventDefault();

      const data = {
        name: this.name,
        description: this.description.trim(),
        actions: this.selectedOptions
      };

      const roleId = document.getElementById('roleId').value;
      const res = await updateRole(roleId, data);

      if(res.errors){
        const concatenatedErrorMessages = res.errors.join(', <br/>');
        return errorToast('Solucionar los siguientes errores: ', concatenatedErrorMessages, 10000, false, false);
      }else if(res.error){
        return errorToast('¡Error!', res.error);
      }else if(res.success){
        successToast('Exito!', res.success);
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    }
  },
};
</script>
