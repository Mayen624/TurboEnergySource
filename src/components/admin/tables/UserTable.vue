<template>
  <div class="flex flex-col">
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <!-- Header -->
          <div class="grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                {{ titleCard }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-neutral-400"></p>
            </div>
            <div>
              <div class="inline-flex gap-x-2">
                <AddButton id="addBtnUser" triggerIdBtn="userModal" buttonText="Nuevo usuario" />
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
                      NOMBRE Y CORREO
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
              <tr v-if="users.length <= 0">
                <td colspan="7" class="px-6 py-3 text-center">
                  <WarningAlert title="Error al obtener registros:" subTitle="No hay datos disponibles" />
                </td>
              </tr>
              <tr v-for="(user, index) in users" :key="user._id">
                <td class="py-3 ps-6 dark:text-neutral-200">
                  {{ index + 1 }}
                </td>
                <td class="py-3 pe-6 ps-6">
                  <div class="flex items-center gap-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block size-[38px] rounded-full dark:text-neutral-200" viewBox="0 0 718 669"><path fill="currentColor" d="M646 516c47 26 74 70 71 115c-3 28-3 29-39 33c-23 3-163 5-307 5c-163 0-333-2-346-5c-48-13-22-102 43-143c50-33 152-82 179-88c38-8 43-31 1-106c-10-17-22-68-23-122c-2-86 16-145 91-173c14-5 30-8 45-8c50 0 97 28 116 69c27 55 16 199-13 251c-32 60-29 78 8 88c24 6 99 43 174 84"/></svg>
                    <div>
                      <span class="block text-sm font-semibold dark:text-neutral-200">
                        {{ user.name }}
                      </span>
                      <span class="block text-sm text-gray-500">
                        {{ user.email }}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <span :class="['py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full', user.enabled ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500' : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500']">
                    <svg v-if="user.enabled" class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </svg>
                    <svg v-else class="size-2.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                    </svg>
                    {{ user.enabled ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ new Date(user.createdAt).toLocaleDateString() }}
                  </span>
                </td>
                <td class="px-6 py-3">
                  <span class="text-sm text-gray-500">
                    {{ new Date(user.updatedAt).toLocaleDateString() }}
                  </span>
                </td>
                <td class="px-6 py-1.5">
                  <EditButton :id="user._id" :triggerIdBtn="`userEditModal-${user._id}`" />
                  <DisabledButton />
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End Table -->

          <!-- Footer -->
          <div class="grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-neutral-400">
                <span class="font-semibold text-gray-800 dark:text-neutral-200">12</span> results
              </p>
            </div>
            <div>
              <div class="inline-flex gap-x-2">
                <button type="button" class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  Prev
                </button>
                <button type="button" class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  Next
                  <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

  <UserModal id="userModal" modalTitle="Nuevo usuario" />
  <UserEditModal id="userEditModal" modalTitle="Actualizar usuario" />
</template>

<script>
  import { defineComponent } from 'vue';
  import AddButton from '@components/admin/buttons/AddButton.vue';
  import EditButton from '@components/admin/buttons/EditButton.vue';
  import DisabledButton from '@components/admin/buttons/DisabledButton.vue';
  import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
  import UserModal from '@components/admin/forms/UserModal.vue';
  import UserEditModal from '@components/admin/forms/UserEditModal.vue';
  import { getCookie } from '@/utils/functions.ts';
  import { getApiUrl } from "@/utils/utils";

  export default defineComponent({
    props: {
      titleCard: {type: String, required: true},
    },
    components: {
      AddButton,
      EditButton,
      DisabledButton,
      WarningAlert,
      UserModal,
      UserEditModal
    },
    data() {
      return {
        users: []
      };
    },
    mounted() {
      this.initEventSource();
    },
    methods: {
      initEventSource() {

        const token = getCookie('authToken');
        const eventSource = new EventSource(`${getApiUrl()}/v1/users/realtime_users?token=${encodeURIComponent(token)}`);

        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          this.users = data;
        };
      }
    }
  });
</script>

