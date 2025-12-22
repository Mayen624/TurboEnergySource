<template>
  <div class="flex flex-col space-y-4">
    <!-- Table -->
    <div class="-m-1.5 overflow-x-auto">
      <div class="inline-block min-w-full p-1.5 align-middle">
        <div
          class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <!-- Header -->
          <div
            class="grid gap-3 border-b border-gray-200 px-6 py-4 dark:border-neutral-700">
            <div>
              <h2 class="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                {{ titleCard }}
              </h2>
              <p class="text-sm text-gray-600 dark:text-neutral-400">Total: {{ clients.length || 0 }} clientes aprobados</p>
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
                      title="Enviar Email (API)"
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </button>
                    <!-- WhatsApp Button (Pendiente) -->
                    <!--
                    <button
                      @click="openWhatsApp(contact)"
                      title="Contactar por WhatsApp"
                      type="button"
                      class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                    -->
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- End Table -->

          <!-- Footer - Paginación -->
          <div
            class="grid gap-3 border-t border-gray-200 px-6 py-4 dark:border-neutral-700 md:flex md:items-center md:justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-neutral-400">
                Mostrando página <span class="font-semibold text-gray-800 dark:text-neutral-200">{{ currentPage }}</span> de <span class="font-semibold text-gray-800 dark:text-neutral-200">{{ totalPages }}</span>
              </p>
            </div>
            <div>
              <div class="inline-flex gap-x-2">
                <button
                  :disabled="currentPage === 1"
                  @click="displayContact(currentPage - 1, limit)"
                  type="button"
                  class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                  <svg class="size-4 shrink-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  Prev
                </button>
                <button
                  :disabled="currentPage === totalPages"
                  @click="displayContact(currentPage + 1, limit)"
                  type="button"
                  class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
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
      @whatsapp-sent="handleWhatsAppSent"
    />
  </div>
</template>

<script>
  import { defineComponent, markRaw } from 'vue';
  import WarningAlert from '@components/ui/alerts/WarningAlert.vue';
  import ViewContactModal from '@components/admin/forms/ViewContactModal.vue';
  import AddNoteModal from '@components/admin/forms/AddNoteModal.vue';
  import ContactClientModal from '@components/admin/forms/ContactClientModal.vue';

  import { getApprovedContacts } from '@/API/fetchData';
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
        filterStatus: 'all',
        currentPage: 1,
        totalPages: 1,
        limit: 10
      };
    },
    mounted() {
      this.loadData();
      // Inicializar dropdowns de Preline después de montar
      this.$nextTick(() => {
        this.initPreline();
      });
    },
    updated() {
      // Re-inicializar dropdowns después de cada actualización
      this.$nextTick(() => {
        this.initPreline();
      });
    },
    methods: {
      async loadData() {
        await this.displayContact();
      },
      async displayContact(page = 1, limit = 10) {
        const response = await getApprovedContacts(page, limit);
        if (response.error) {
          console.error('Error loading approved contacts:', response.error);
          this.clients = [];
        } else {
          this.clients = response.contacts;
          this.currentPage = response.currentPage;
          this.totalPages = response.totalPages;
        }
        this.filteredClients = this.clients; // Mostrar todos los aprobados
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
          // Los dropdowns se re-inicializarán automáticamente en updated()
        }
      },
      initPreline() {
        // Inicializar componentes de Preline (dropdowns, overlays, etc.)
        if (window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
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
      openRoundCube(contact) {
        // URL de RoundCube con parámetros para prellenar el correo
        const roundcubeUrl = 'https://mail.mayencorp.com/rc/';

        // Construir parámetros para prellenar el correo
        const params = new URLSearchParams({
          _task: 'mail',
          _action: 'compose',
          _to: contact.email,
          _subject: `Seguimiento: ${contact.firstName} ${contact.lastName} - TurboEnergy`
        });

        // Abrir RoundCube en nueva pestaña
        window.open(`${roundcubeUrl}?${params.toString()}`, '_blank');
      },
      openWhatsApp(contact) {
        // Funcionalidad de WhatsApp (pendiente)
        // Limpiar el número de teléfono
        const cleanPhone = contact.phone.replace(/[\s\-\(\)]/g, '');
        const message = `Hola ${contact.firstName}, gracias por contactar a TurboEnergy.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
      },
      async handleEmailSent(contactId) {
        // Cambiar estado del contacto a "contactado" automáticamente
        if (contactId) {
          await this.updateStatus(contactId, 'contactado');
        }
        await this.loadData();
      },
      async handleWhatsAppSent(contactId) {
        // Cambiar estado del contacto a "contactado" automáticamente
        if (contactId) {
          await this.updateStatus(contactId, 'contactado');
        }
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
