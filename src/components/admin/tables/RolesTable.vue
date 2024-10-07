<template>
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="inline-block min-w-full p-1.5 align-middle">
          <div
            class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <!-- Header -->
            <div
              class="grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  {{ titleCard }}
                </h2>
                <p class="text-sm text-gray-600 dark:text-neutral-400"></p>
              </div>
              <div>
                <div class="inline-flex gap-x-2">
                  <AddButton id="addBtnRole" triggerIdBtn="roleModal" buttonText="Nuevo rol" />
                </div>
              </div>
            </div>
            <!-- End Header -->
  
            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  <th scope="col" class="py-3 ps-6 text-start dark:text-neutral-200">#</th>
                  <th scope="col" class="py-3 pe-6 ps-6 text-start lg:ps-3 xl:ps-0">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        NOMBRE
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        DESCRIPCION
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        ESTADO
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        CREADO EN
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        ACTUALIZADO EN
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        ACCIONES
                      </span>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3 text-end"></th>
                </tr>
              </thead>
  
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr v-if="roles.length <= 0">
                  <td colspan="7" class="px-6 py-3 text-center">
                    <WarningAlert title="Error al obtener registros:" subTitle="No hay datos disponibles" />
                  </td>
                </tr>
                <tr v-for="(rol, index) in roles" :key="rol._id">
                  <td class="py-3 ps-6 dark:text-neutral-200">
                    {{ index + 1 }}
                  </td>
                  <td class="py-3 pe-6 ps-6">
                    <div class="flex items-center gap-x-3">
                        <span class="block text-sm font-semibold dark:text-neutral-200">
                          {{ rol.name }}
                        </span>
                    </div>
                  </td>
                  <td class="px-6 py-3">
                    <span class="text-sm text-gray-500">
                      {{ rol.description }}
                    </span>
                  </td>
                  <td class="px-6 py-3">
                    <span
                      :class="['py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full', rol.enabled ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500' : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500']">
                      <svg v-if="rol.enabled" class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                      <svg v-else class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" viewBox="0 0 16 16">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                      </svg>
                      {{ rol.enabled ? 'Activo' : 'Inactivo' }}
                    </span>
                  </td>
                  <td class="px-6 py-3">
                    <span class="text-sm text-gray-500">
                      {{ new Date(rol.createdAt).toLocaleDateString() }}
                    </span>
                  </td>
                  <td class="px-6 py-3">
                    <span class="text-sm text-gray-500">
                      {{ new Date(rol.updatedAt).toLocaleDateString() }}
                    </span>
                  </td>
                  <td class="px-6 py-1.5">
                    <button :title="rol.enabled ? 'Desactivar' : 'Activar'" type="button" @click="disabledAndEnabledRole(rol._id, !rol.enabled)"
                      :class="[
                        'm-1 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                        rol.enabled ? 'bg-red-500 hover:bg-red-600 focus:bg-red-600' :'bg-green-500 hover:bg-green-600 focus:bg-green-600'
                      ]">
                      <svg v-if="rol.enabled" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" stroke-width="2"
                          d="M18 12H6M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20">
                        <path fill="currentColor"
                          d="M1.818 1.364a.455.455 0 0 0-.454.454v16.364c0 .25.203.454.454.454h16.364a.455.455 0 0 0 .454-.454V1.818a.455.455 0 0 0-.454-.454zM18.182 0C19.186 0 20 .814 20 1.818v16.364A1.82 1.82 0 0 1 18.182 20H1.818A1.82 1.82 0 0 1 0 18.182V1.818C0 .814.814 0 1.818 0zm-7.884 4.91a.68.68 0 0 0-.682.682L9.615 9.3H5.909a.68.68 0 0 0-.674.581l-.008.1c0 .378.306.683.682.683l3.706-.001v3.707c0 .343.253.626.582.675l.1.007a.68.68 0 0 0 .682-.682v-3.707h3.707a.68.68 0 0 0 .675-.58l.007-.101a.68.68 0 0 0-.682-.682H10.98V5.592a.68.68 0 0 0-.58-.674Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End Table -->
  
            <!-- Footer -->
            <div
              class="grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
              <div>
                <p class="text-sm text-gray-600 dark:text-neutral-400">
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">12</span> results
                </p>
              </div>
              <div>
                <div class="inline-flex gap-x-2">
                  <button type="button"
                    class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    Prev
                  </button>
                  <button type="button"
                    class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                    Next
                    <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <!-- End Footer -->
          </div>
        </div>
      </div>
    </div>
  
    <RoleModal id="roleModal" modalTitle="Nuevo role" />
  </template>
  
  <script>
    import { defineComponent } from 'vue';
    import AddButton from '@components/admin/buttons/AddButton.vue';
    import EditButton from '@components/admin/buttons/EditButton.vue';
    import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
    import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
    import RoleModal from '@components/admin/forms/RoleModal.vue';
    import UserEditModal from '@components/admin/forms/UserEditModal.vue';
    import {successToast, errorToast} from '@utils/notify.ts'
    import {enabledOrDisabledRole} from '@/API/pushData.ts'
    import { getCookie } from '@/utils/functions.ts';
    import { getApiUrl } from "@/utils/utils";
    import {getRoles} from "@/API/fetchData.ts";
  
    export default defineComponent({
      props: {
        titleCard: {type: String, required: true},
      },
      components: {
        AddButton,
        EditButton,
        DisabledButton,
        WarningAlert,
        RoleModal,
      },
      data() {
        return {
          roles: []
        };
      },
      mounted() {
        this.displayRoles();
      },
      methods: {
        async displayRoles() {
          const token = getCookie('authToken');
          
          const roles = await getRoles(token);
          this.roles = roles;
        
        },
        async disabledAndEnabledRole(id, enabled){
          const token = getCookie('authToken');
  
          if(!id){
              errorToast('¡Error!', 'Registro no valido')
          }else{
            const res = await enabledOrDisabledRole(id, enabled, token);
              
            if(res.error){
              errorToast('¡Error!', res.error);
            }else if(res.success){
              successToast('¡Exito!', res.success);
            }
          }
          
          setTimeout(() => {
            location.reload();  
          }, 4000);
        }
      }
    });
  </script>
  
  