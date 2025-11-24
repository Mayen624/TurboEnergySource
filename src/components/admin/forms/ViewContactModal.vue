<template>
    <div
      :id='id'
      class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabindex="-1"
      aria-labelledby="view-contact-modal-label"
    >
      <div
        class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-2xl sm:w-full m-3 h-[calc(100%-3.5rem)] sm:mx-auto"
      >
        <div
          class="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:border-neutral-700 dark:bg-neutral-800 dark:shadow-neutral-700/70"
        >
          <div
            class="flex items-center justify-between border-b px-4 py-3 dark:border-neutral-700"
          >
            <h3
              id="view-contact-modal-label"
              class="font-bold text-gray-800 dark:text-white"
            >
              Detalles del Contacto
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
            <div v-if="loading" class="flex justify-center items-center p-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <div v-else-if="contact" class="space-y-6">
              <!-- Información Personal -->
              <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  👤 Información Personal
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-sm text-gray-600 dark:text-neutral-400">Nombre Completo</p>
                    <p class="font-medium text-gray-800 dark:text-white">
                      {{ contact.firstName }} {{ contact.lastName }}
                    </p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-neutral-400">Email</p>
                    <p class="font-medium text-gray-800 dark:text-white">{{ contact.email }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-neutral-400">Teléfono</p>
                    <p class="font-medium text-gray-800 dark:text-white">{{ contact.phone }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600 dark:text-neutral-400">Fecha de Contacto</p>
                    <p class="font-medium text-gray-800 dark:text-white">
                      {{ formatDate(contact.createdAt) }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Detalles -->
              <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  💬 Detalles
                </h4>
                <p class="text-gray-700 dark:text-neutral-300">{{ contact.details }}</p>
              </div>

              <!-- Estado -->
              <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  🏷️ Estado Actual
                </h4>
                <span :class="getStatusClass(contact.status)" class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium">
                  {{ getStatusLabel(contact.status) }}
                </span>
                <p v-if="contact.lastContactDate" class="text-sm text-gray-600 dark:text-neutral-400 mt-2">
                  Último contacto: {{ formatDate(contact.lastContactDate) }}
                </p>
              </div>

              <!-- Notas -->
              <div class="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  📝 Notas de Seguimiento
                </h4>
                <div v-if="contact.notes && contact.notes.length > 0" class="space-y-3">
                  <div
                    v-for="(note, index) in contact.notes"
                    :key="index"
                    class="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3"
                  >
                    <div class="flex justify-between items-start mb-2">
                      <span class="text-xs font-medium text-blue-600 dark:text-blue-400">
                        {{ note.createdBy }}
                      </span>
                      <span class="text-xs text-gray-500 dark:text-neutral-500">
                        {{ formatDate(note.createdAt) }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-700 dark:text-neutral-300">{{ note.content }}</p>
                  </div>
                </div>
                <p v-else class="text-sm text-gray-500 dark:text-neutral-500 italic">
                  No hay notas de seguimiento.
                </p>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
            <button
              type="button"
              class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              :data-hs-overlay="`#${id}`"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { defineComponent } from 'vue';
  import { getContactById } from '@/API/fetchData';

  export default defineComponent({
    name: 'ViewContactModal',
    props: {
      id: {
        type: String,
        required: true,
        default: 'view-contact-modal'
      }
    },
    data() {
      return {
        contact: null,
        loading: false
      };
    },
    methods: {
      async loadContact(contactId) {
        this.loading = true;
        try {
          const response = await getContactById(contactId);
          if (response.contact) {
            this.contact = response.contact;
          }
        } catch (error) {
          console.error('Error loading contact:', error);
        } finally {
          this.loading = false;
        }
      },
      formatDate(date) {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
      getStatusLabel(status) {
        const labels = {
          'nuevo': 'Nuevo',
          'contactado': 'Contactado',
          'en_proceso': 'En Proceso',
          'cerrado_exitoso': 'Cerrado - Éxito',
          'cerrado_sin_interes': 'Cerrado - Sin Interés'
        };
        return labels[status] || status;
      },
      getStatusClass(status) {
        const classes = {
          'nuevo': 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500',
          'contactado': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500',
          'en_proceso': 'bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-500',
          'cerrado_exitoso': 'bg-purple-100 text-purple-800 dark:bg-purple-500/10 dark:text-purple-500',
          'cerrado_sin_interes': 'bg-gray-100 text-gray-800 dark:bg-gray-500/10 dark:text-gray-500'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
      }
    }
  });
  </script>
