<template>
  <div
    :id='id'
    class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="contact-client-modal-label"
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
            id="contact-client-modal-label"
            class="font-bold text-gray-800 dark:text-white"
          >
            Contactar Cliente
          </h3>
          <button
            type="button"
            class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
            aria-label="Close"
            :data-hs-overlay="`#${id}`"
            @click="resetForm"
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
          <div class="mx-auto max-w-xl">
            <!-- Contact Info Display -->
            <div v-if="contactData" class="mb-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
              <h4 class="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Información del Cliente
              </h4>
              <div class="space-y-1 text-sm">
                <p class="text-gray-600 dark:text-neutral-400">
                  <span class="font-medium">Nombre:</span> {{ contactData.firstName }} {{ contactData.lastName }}
                </p>
                <p class="text-gray-600 dark:text-neutral-400">
                  <span class="font-medium">Email:</span> {{ contactData.email }}
                </p>
                <p class="text-gray-600 dark:text-neutral-400">
                  <span class="font-medium">Teléfono:</span> {{ contactData.phone }}
                </p>
              </div>
            </div>

            <!-- Contact Method Selection -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Método de Contacto:
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  @click="selectMethod('email')"
                  :class="[
                    'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                    selectedMethod === 'email'
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-blue-400'
                  ]"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span class="font-medium">Email</span>
                </button>
                <button
                  @click="selectMethod('whatsapp')"
                  :class="[
                    'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                    selectedMethod === 'whatsapp'
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-green-400'
                  ]"
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span class="font-medium">WhatsApp</span>
                </button>
              </div>
            </div>

            <!-- Email Form -->
            <div v-if="selectedMethod === 'email'" class="space-y-4">
              <div>
                <label
                  for="email-subject"
                  class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Asunto:
                </label>
                <input
                  id="email-subject"
                  v-model="emailSubject"
                  type="text"
                  required
                  placeholder="Asunto del correo"
                  class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
              <div>
                <label
                  for="email-message"
                  class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Mensaje:
                </label>
                <textarea
                  id="email-message"
                  v-model="emailMessage"
                  rows="8"
                  required
                  placeholder="Escribe tu mensaje aquí..."
                  class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ></textarea>
              </div>
            </div>

            <!-- WhatsApp Form -->
            <div v-if="selectedMethod === 'whatsapp'" class="space-y-4">
              <div>
                <label
                  for="whatsapp-message"
                  class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Mensaje de WhatsApp:
                </label>
                <textarea
                  id="whatsapp-message"
                  v-model="whatsappMessage"
                  rows="8"
                  required
                  placeholder="Escribe tu mensaje para WhatsApp..."
                  class="focus:border-green-500 focus:ring-green-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                ></textarea>
                <p class="mt-2 text-xs text-gray-500 dark:text-neutral-500">
                  Se abrirá WhatsApp Web con este mensaje pre-escrito.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3 dark:border-neutral-700">
          <button
            type="button"
            class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            :data-hs-overlay="`#${id}`"
            @click="resetForm"
          >
            Cancelar
          </button>
          <button
            v-if="selectedMethod === 'email'"
            type="button"
            @click="sendEmail"
            :disabled="!emailSubject || !emailMessage || sending"
            class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <svg v-if="!sending" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <span v-if="sending">Enviando...</span>
            <span v-else>Enviar Email</span>
          </button>
          <button
            v-if="selectedMethod === 'whatsapp'"
            type="button"
            @click="openWhatsApp"
            :disabled="!whatsappMessage"
            class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:bg-green-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Abrir WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { sendClientEmail } from '@/API/pushData';
import { successToast, errorToast } from '@/utils/notify.ts';

export default defineComponent({
  name: 'ContactClientModal',
  props: {
    id: {
      type: String,
      required: true,
      default: 'contact-client-modal'
    }
  },
  data() {
    return {
      contactData: null,
      selectedMethod: 'email',
      emailSubject: '',
      emailMessage: '',
      whatsappMessage: '',
      sending: false
    };
  },
  methods: {
    setContactData(contact) {
      this.contactData = contact;
      // Pre-fill some data
      this.emailSubject = `Re: ${contact.firstName} ${contact.lastName} - TurboEnergy`;
      this.emailMessage = `Hola ${contact.firstName},\n\nGracias por contactarnos. `;
      this.whatsappMessage = `Hola ${contact.firstName}, gracias por contactar a TurboEnergy. `;
    },
    selectMethod(method) {
      this.selectedMethod = method;
    },
    async sendEmail() {
      if (!this.emailSubject.trim() || !this.emailMessage.trim()) return;

      this.sending = true;
      try {
        console.log('🔵 [Frontend] Enviando email...');
        const response = await sendClientEmail({
          to: this.contactData.email,
          toName: `${this.contactData.firstName} ${this.contactData.lastName}`,
          subject: this.emailSubject,
          message: this.emailMessage,
          contactId: this.contactData._id
        });

        console.log('🔵 [Frontend] Respuesta recibida:', response);

        if (response.success) {
          console.log('✅ [Frontend] Mostrando toast de éxito');
          await successToast('¡Email enviado!', 'El email fue enviado exitosamente al cliente.');
          this.$emit('email-sent');
          this.resetForm();
          // Cerrar modal
          const modal = document.getElementById(this.id);
          if (modal && window.HSOverlay) {
            window.HSOverlay.close(modal);
          }
        } else {
          console.error('❌ [Frontend] Mostrando toast de error:', response.error);
          await errorToast('Error al enviar', response.error || 'Error desconocido al enviar el email.');
        }
      } catch (error) {
        console.error('❌ [Frontend] Exception al enviar email:', error);
        await errorToast('Error', 'No se pudo enviar el email. Por favor intenta de nuevo.');
      } finally {
        this.sending = false;
      }
    },
    openWhatsApp() {
      if (!this.whatsappMessage.trim() || !this.contactData) return;

      // Limpiar el número de teléfono (eliminar espacios, guiones, paréntesis)
      const cleanPhone = this.contactData.phone.replace(/[\s\-\(\)]/g, '');

      // Codificar el mensaje para URL
      const encodedMessage = encodeURIComponent(this.whatsappMessage);

      // Construir URL de WhatsApp Web
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

      // Abrir en nueva ventana
      window.open(whatsappUrl, '_blank');

      // Cerrar modal
      this.resetForm();
      const modal = document.getElementById(this.id);
      if (modal && window.HSOverlay) {
        window.HSOverlay.close(modal);
      }
    },
    resetForm() {
      this.selectedMethod = 'email';
      this.emailSubject = '';
      this.emailMessage = '';
      this.whatsappMessage = '';
      this.contactData = null;
    }
  }
});
</script>
