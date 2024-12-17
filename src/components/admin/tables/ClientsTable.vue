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
                      APELLIDO
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      TELÉFONO
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      CORREO ELECTRÓNICO
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      DETALLES
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
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
              <tr v-if="clients.length <= 0">
                <td colspan="9" class="px-6 py-3 text-center">
                  <WarningAlert title="Error al obtener registros:" subTitle="No hay datos disponibles" />
                </td>
              </tr>
              <tr v-for="(contact, index) in clients" :key="contact._id">
                <td class="py-3 ps-6 dark:text-neutral-200">
                  {{ index + 1 }}
                </td>
                <td class="py-3 pe-6 ps-6">
                  <div class="flex items-center gap-x-3">
                    <span class="block text-sm font-semibold dark:text-neutral-200">
                      {{ contact.firstName }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ contact.lastName }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ contact.phone }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ contact.email }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ contact.details }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ new Date(contact.createdAt).toLocaleDateString() }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ new Date(contact.updatedAt).toLocaleDateString() }}
                  </span>
                </td>
                <td class="px-6 py-1.5">
                  <button :title="contact.enabled ? 'Desactivar' : 'Activar'" type="button"
                    @click="disabledAndEnabledAction(contact._id, !contact.enabled)" :class="[
                      'm-1 inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50',
                      contact.enabled ? 'bg-red-500 hover:bg-red-600 focus:bg-red-600' : 'bg-green-500 hover:bg-green-600 focus:bg-green-600'
                    ]">
                    <svg v-if="contact.enabled" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                      viewBox="0 0 24 24">
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


</template>
  
  <script>
    import { defineComponent } from 'vue';
    import AddButton from '@components/admin/buttons/AddButton.vue';
    import EditButton from '@components/admin/buttons/EditButton.vue';
    import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
    import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
    
    import UserEditModal from '@components/admin/forms/UserEditModal.vue';
    
    import { sendContactForm } from '@/API/pushData.ts';
    import { getCookie } from '@/utils/functions.ts';
    import { getApiUrl } from "@/utils/utils";
    import { getContacts } from '@/API/fetchData';
import ContactSection from '@/components/sections/misc/ContactSection.astro';

  
    export default defineComponent({
      props: {
        titleCard: {type: String, required: true},
      },
      components: {
        AddButton,
        EditButton,
        DisabledButton,
        WarningAlert,
       
        UserEditModal
      },
      data() {
        return {
          clients: []
        };
      },
      mounted() {
        this.displayContact();
      },
      methods: {
        async displayContact() {
          const token = getCookie('authToken');
          
          const clients = await getContacts(token);
          this.clients= clients;
        
          console.log(this.clients);
        }
        
        
      }
    });
  </script>
  
  