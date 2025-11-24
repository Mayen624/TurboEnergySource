<template>
  <div class="flex flex-col space-y-4">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-green-600 dark:text-green-400 uppercase">Nuevos</p>
            <p class="text-2xl font-bold text-green-700 dark:text-green-300">{{ stats.nuevo || 0 }}</p>
          </div>
          <div class="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
            <span class="text-2xl">🟢</span>
          </div>
        </div>
      </div>

      <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-yellow-600 dark:text-yellow-400 uppercase">Contactados</p>
            <p class="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{{ stats.contactado || 0 }}</p>
          </div>
          <div class="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center">
            <span class="text-2xl">🟡</span>
          </div>
        </div>
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase">En Proceso</p>
            <p class="text-2xl font-bold text-blue-700 dark:text-blue-300">{{ stats.en_proceso || 0 }}</p>
          </div>
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
            <span class="text-2xl">🔵</span>
          </div>
        </div>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase">Cerrados</p>
            <p class="text-2xl font-bold text-purple-700 dark:text-purple-300">{{ stats.cerrado_exitoso || 0 }}</p>
          </div>
          <div class="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
            <span class="text-2xl">✅</span>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase">Sin Interés</p>
            <p class="text-2xl font-bold text-gray-700 dark:text-gray-300">{{ stats.cerrado_sin_interes || 0 }}</p>
          </div>
          <div class="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span class="text-2xl">❌</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
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
              <p class="text-sm text-gray-600 dark:text-neutral-400">Total: {{ stats.total || 0 }} contactos</p>
            </div>

            <!-- Filter by Status -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600 dark:text-neutral-400">Filtrar:</label>
              <select
                v-model="filterStatus"
                @change="filterContacts"
                class="py-2 px-3 rounded-lg border border-gray-200 text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
              >
                <option value="all">Todos</option>
                <option value="nuevo">Nuevos</option>
                <option value="contactado">Contactados</option>
                <option value="en_proceso">En Proceso</option>
                <option value="cerrado_exitoso">Cerrados - Éxito</option>
                <option value="cerrado_sin_interes">Sin Interés</option>
              </select>
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
                      NOMBRE COMPLETO
                    </span>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3 text-start">
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                      CONTACTO
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
                      FECHA
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
              <tr v-if="filteredClients.length <= 0">
                <td colspan="6" class="px-6 py-3 text-center">
                  <WarningAlert title="Sin resultados" subTitle="No hay contactos con este filtro" />
                </td>
              </tr>
              <tr v-for="(contact, index) in filteredClients" :key="contact._id">
                <td class="py-3 ps-6 dark:text-neutral-200">
                  {{ index + 1 }}
                </td>
                <td class="py-3 pe-6 ps-6">
                  <div class="flex flex-col">
                    <span class="text-sm font-semibold dark:text-neutral-200">
                      {{ contact.firstName }} {{ contact.lastName }}
                    </span>
                    <span class="text-xs text-gray-500 dark:text-neutral-500">
                      {{ contact.email }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <div class="flex flex-col">
                    <span class="text-xs text-gray-500 dark:text-neutral-500">
                      {{ contact.phone }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <div class="hs-dropdown relative inline-flex">
                    <button
                      :id="`status-dropdown-${contact._id}`"
                      type="button"
                      :class="getStatusClass(contact.status)"
                      class="hs-dropdown-toggle inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer hover:opacity-80"
                    >
                      {{ getStatusLabel(contact.status) }}
                      <svg class="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <div
                      class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
                      :aria-labelledby="`status-dropdown-${contact._id}`"
                    >
                      <button
                        @click="updateStatus(contact._id, 'nuevo')"
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 w-full text-left"
                      >
                        🟢 Nuevo
                      </button>
                      <button
                        @click="updateStatus(contact._id, 'contactado')"
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 w-full text-left"
                      >
                        🟡 Contactado
                      </button>
                      <button
                        @click="updateStatus(contact._id, 'en_proceso')"
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 w-full text-left"
                      >
                        🔵 En Proceso
                      </button>
                      <button
                        @click="updateStatus(contact._id, 'cerrado_exitoso')"
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 w-full text-left"
                      >
                        ✅ Cerrado - Éxito
                      </button>
                      <button
                        @click="updateStatus(contact._id, 'cerrado_sin_interes')"
                        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 w-full text-left"
                      >
                        ❌ Sin Interés
                      </button>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-3">
                  <span class="text-xs text-gray-500 dark:text-neutral-500">
                    {{ formatDate(contact.createdAt) }}
                  </span>
                </td>
                <td class="px-6 py-1.5">
                  <div class="flex gap-1">
                    <button
                      @click="viewDetails(contact._id)"
                      title="Ver detalles"
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <button
                      @click="openNoteModal(contact._id)"
                      title="Agregar nota"
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      @click="openContactModal(contact)"
                      title="Contactar (Email/WhatsApp)"
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End Table -->
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ViewContactModal
      ref="viewContactModal"
      id="view-contact-modal"
    />
    <AddNoteModal
      ref="addNoteModal"
      id="add-note-modal"
      @note-added="handleNoteAdded"
    />
    <ContactClientModal
      ref="contactClientModal"
      id="contact-client-modal"
      @email-sent="handleEmailSent"
    />
  </div>
</template>

<script>
  import { defineComponent, markRaw } from 'vue';
  import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
  import ViewContactModal from '@components/admin/forms/ViewContactModal.vue';
  import AddNoteModal from '@components/admin/forms/AddNoteModal.vue';
  import ContactClientModal from '@components/admin/forms/ContactClientModal.vue';

  import { getContacts, getContactStats } from '@/API/fetchData';
  import { updateContactStatus } from '@/API/pushData';

  export default defineComponent({
    props: {
      titleCard: {type: String, required: true},
    },
    components: {
      WarningAlert,
      ViewContactModal: markRaw(ViewContactModal),
      AddNoteModal: markRaw(AddNoteModal),
      ContactClientModal: markRaw(ContactClientModal)
    },
    data() {
      return {
        clients: [],
        filteredClients: [],
        stats: {
          total: 0,
          nuevo: 0,
          contactado: 0,
          en_proceso: 0,
          cerrado_exitoso: 0,
          cerrado_sin_interes: 0
        },
        filterStatus: 'all'
      };
    },
    mounted() {
      this.loadData();
      // Inicializar dropdowns de Preline después de montar
      setTimeout(() => {
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      }, 100);
    },
    methods: {
      async loadData() {
        await Promise.all([
          this.displayContact(),
          this.loadStats()
        ]);
      },
      async displayContact() {
        const clients = await getContacts();
        this.clients = clients;
        this.filterContacts();
      },
      async loadStats() {
        const stats = await getContactStats();
        if (stats) {
          this.stats = stats;
        }
      },
      filterContacts() {
        if (this.filterStatus === 'all') {
          this.filteredClients = this.clients;
        } else {
          this.filteredClients = this.clients.filter(c => c.status === this.filterStatus);
        }
      },
      async updateStatus(contactId, newStatus) {
        const response = await updateContactStatus(contactId, newStatus);
        if (response.success) {
          await this.loadData();
          // Re-inicializar dropdowns
          setTimeout(() => {
            if (window.HSStaticMethods) {
              window.HSStaticMethods.autoInit();
            }
          }, 100);
        }
      },
      viewDetails(contactId) {
        const modal = this.$refs.viewContactModal;
        if (modal) {
          modal.loadContact(contactId);
          // Abrir modal usando Preline
          const modalElement = document.getElementById('view-contact-modal');
          if (modalElement && window.HSOverlay) {
            window.HSOverlay.open(modalElement);
          }
        }
      },
      openNoteModal(contactId) {
        const modal = this.$refs.addNoteModal;
        if (modal) {
          modal.setContactId(contactId);
          // Abrir modal usando Preline
          const modalElement = document.getElementById('add-note-modal');
          if (modalElement && window.HSOverlay) {
            window.HSOverlay.open(modalElement);
          }
        }
      },
      async handleNoteAdded() {
        await this.loadData();
      },
      openContactModal(contact) {
        const modal = this.$refs.contactClientModal;
        if (modal) {
          modal.setContactData(contact);
          // Abrir modal usando Preline
          const modalElement = document.getElementById('contact-client-modal');
          if (modalElement && window.HSOverlay) {
            window.HSOverlay.open(modalElement);
          }
        }
      },
      async handleEmailSent() {
        await this.loadData();
      },
      formatDate(date) {
        if (!date) return 'N/A';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      },
      getStatusLabel(status) {
        const labels = {
          'nuevo': 'Nuevo',
          'contactado': 'Contactado',
          'en_proceso': 'En Proceso',
          'cerrado_exitoso': 'Cerrado - Éxito',
          'cerrado_sin_interes': 'Sin Interés'
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
