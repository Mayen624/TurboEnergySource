<template>
    <div
      :id='id'
      class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      role="dialog"
      tabindex="-1"
      aria-labelledby="add-note-modal-label"
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
              id="add-note-modal-label"
              class="font-bold text-gray-800 dark:text-white"
            >
              Agregar Nota de Seguimiento
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
              <form @submit.prevent="handleSubmit">
                <div class="space-y-4">
                  <div>
                    <label
                      for="note-content"
                      class="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Nota:
                    </label>
                    <textarea
                      id="note-content"
                      v-model="noteContent"
                      rows="6"
                      required
                      placeholder="Escribe una nota sobre este contacto..."
                      class="focus:border-blue-500 focus:ring-blue-500 block w-full rounded-lg border-gray-200 px-4 py-3 text-sm disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    ></textarea>
                    <p class="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                      Agrega detalles sobre la conversación, acuerdos, o próximos pasos.
                    </p>
                  </div>
                </div>
              </form>
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
              type="button"
              @click="handleSubmit"
              :disabled="!noteContent.trim() || submitting"
              class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              <span v-if="submitting">Guardando...</span>
              <span v-else>Guardar Nota</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { defineComponent } from 'vue';
  import { addContactNote } from '@/API/pushData';

  export default defineComponent({
    name: 'AddNoteModal',
    props: {
      id: {
        type: String,
        required: true,
        default: 'add-note-modal'
      }
    },
    data() {
      return {
        contactId: null,
        noteContent: '',
        submitting: false
      };
    },
    methods: {
      setContactId(id) {
        this.contactId = id;
      },
      async handleSubmit() {
        if (!this.noteContent.trim() || !this.contactId) return;

        this.submitting = true;
        try {
          const response = await addContactNote(this.contactId, {
            content: this.noteContent.trim()
          });

          if (response.success) {
            this.$emit('note-added');
            this.resetForm();
            // Cerrar modal usando Preline
            const modal = document.getElementById(this.id);
            if (modal && window.HSOverlay) {
              window.HSOverlay.close(modal);
            }
          }
        } catch (error) {
          console.error('Error adding note:', error);
        } finally {
          this.submitting = false;
        }
      },
      resetForm() {
        this.noteContent = '';
        this.contactId = null;
      }
    }
  });
  </script>
