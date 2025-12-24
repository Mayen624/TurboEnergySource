<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <!-- Header with Save Button -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
          Editar Página de Contacto
        </h1>
        <p class="mt-2 text-neutral-600 dark:text-neutral-400">
          Edita el contenido de la página de contacto directamente en el formulario.
        </p>
      </div>
      <button
        @click="saveChanges"
        :disabled="saving"
        class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-600 text-white disabled:opacity-50 disabled:pointer-events-none"
      >
        <svg v-if="saving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ saving ? 'Guardando...' : 'Guardar Cambios' }}
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <svg class="animate-spin h-8 w-8 text-orange-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Contact Section Editor (Inline Form with same design) -->
    <section v-else class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
      <div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div class="mx-auto max-w-2xl lg:max-w-5xl">
          <!-- Title and Subtitle (Editable) -->
          <div class="text-center space-y-4">
            <input
              type="text"
              v-model="formData.title"
              class="w-full text-center text-balance text-2xl font-bold tracking-tight text-neutral-800 dark:text-neutral-200 md:text-4xl md:leading-tight bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
              placeholder="Título"
            />
            <textarea
              v-model="formData.subTitle"
              rows="2"
              class="w-full text-center text-pretty text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-4 py-2 focus:outline-none focus:border-orange-500 resize-none"
              placeholder="Subtítulo"
            ></textarea>
          </div>

          <div class="mt-12 grid items-start gap-6 lg:grid-cols-2 lg:gap-16">
            <!-- Left Side - Form (Not Editable) -->
            <div class="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8 bg-neutral-50 dark:bg-neutral-900/50">
              <h2 class="mb-8 text-xl font-bold text-neutral-700 dark:text-neutral-300">
                Formulario de Contacto
              </h2>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">
                (El formulario no es editable desde aquí)
              </p>
            </div>

            <!-- Right Side - Contact Blocks (Editable) -->
            <div class="divide-y divide-neutral-300 dark:divide-neutral-700">
              <!-- Block 1: Base de conocimientos -->
              <div class="flex gap-x-5 py-6">
                <svg class="mt-1 size-6 shrink-0 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                <div class="grow">
                  <input
                    type="text"
                    v-model="formData.knowledgeBase.heading"
                    class="w-full text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 mb-2"
                    placeholder="Título"
                  />
                  <textarea
                    v-model="formData.knowledgeBase.content"
                    rows="2"
                    class="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 resize-none mb-2"
                    placeholder="Contenido"
                  ></textarea>
                  <input
                    type="text"
                    v-model="formData.knowledgeBase.linkTitle"
                    class="w-full text-sm font-medium text-orange-600 dark:text-orange-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                    placeholder="Texto del enlace"
                  />
                </div>
              </div>

              <!-- Block 2: FAQ -->
              <div class="flex gap-x-5 py-6">
                <svg class="mt-1 size-6 shrink-0 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                </svg>
                <div class="grow">
                  <input
                    type="text"
                    v-model="formData.faq.heading"
                    class="w-full text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 mb-2"
                    placeholder="Título"
                  />
                  <textarea
                    v-model="formData.faq.content"
                    rows="2"
                    class="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 resize-none mb-2"
                    placeholder="Contenido"
                  ></textarea>
                  <input
                    type="text"
                    v-model="formData.faq.linkTitle"
                    class="w-full text-sm font-medium text-orange-600 dark:text-orange-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                    placeholder="Texto del enlace"
                  />
                </div>
              </div>

              <!-- Block 3: Visite nuestras oficinas -->
              <div class="flex gap-x-5 py-6">
                <svg class="mt-1 size-6 shrink-0 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div class="grow">
                  <input
                    type="text"
                    v-model="formData.office.heading"
                    class="w-full text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 mb-2"
                    placeholder="Título"
                  />
                  <input
                    type="text"
                    v-model="formData.office.content"
                    class="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 mb-2"
                    placeholder="Nombre de la oficina"
                  />
                  <input
                    type="text"
                    v-model="formData.office.address"
                    class="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                    placeholder="Dirección"
                  />
                </div>
              </div>

              <!-- Block 4: Email -->
              <div class="flex gap-x-5 py-6">
                <svg class="mt-1 size-6 shrink-0 text-neutral-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"></path>
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
                </svg>
                <div class="grow">
                  <input
                    type="text"
                    v-model="formData.email.heading"
                    class="w-full text-base font-semibold text-neutral-800 dark:text-neutral-200 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 mb-2"
                    placeholder="Título"
                  />
                  <textarea
                    v-model="formData.email.content"
                    rows="2"
                    class="w-full text-sm text-neutral-600 dark:text-neutral-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500 resize-none mb-2"
                    placeholder="Contenido"
                  ></textarea>
                  <input
                    type="email"
                    v-model="formData.email.emailAddress"
                    class="w-full text-sm font-medium text-orange-600 dark:text-orange-400 bg-transparent border border-dashed border-neutral-300 dark:border-neutral-600 rounded px-2 py-1 focus:outline-none focus:border-orange-500"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success/Error Messages -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      Cambios guardados exitosamente
    </div>

    <div
      v-if="error"
      class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getContactPage } from '@/API/fetchData';
import { updateContactPage } from '@/API/pushData';

const saving = ref(false);
const loading = ref(true);
const showSuccess = ref(false);
const error = ref('');

// Form data structure matching ContactSection
const formData = ref({
  title: '',
  subTitle: '',
  knowledgeBase: {
    heading: '',
    content: '',
    linkTitle: ''
  },
  faq: {
    heading: '',
    content: '',
    linkTitle: ''
  },
  office: {
    heading: '',
    content: '',
    address: ''
  },
  email: {
    heading: '',
    content: '',
    emailAddress: ''
  }
});

// Load contact page data on mount
onMounted(async () => {
  try {
    const data = await getContactPage();
    if (data && !data.error) {
      formData.value = {
        title: data.title || '',
        subTitle: data.subTitle || '',
        knowledgeBase: {
          heading: data.knowledgeBase?.heading || '',
          content: data.knowledgeBase?.content || '',
          linkTitle: data.knowledgeBase?.linkTitle || ''
        },
        faq: {
          heading: data.faq?.heading || '',
          content: data.faq?.content || '',
          linkTitle: data.faq?.linkTitle || ''
        },
        office: {
          heading: data.office?.heading || '',
          content: data.office?.content || '',
          address: data.office?.address || ''
        },
        email: {
          heading: data.email?.heading || '',
          content: data.email?.content || '',
          emailAddress: data.email?.emailAddress || ''
        }
      };
    }
  } catch (err) {
    console.error('Error loading contact page:', err);
    error.value = 'Error al cargar el contenido';
  } finally {
    loading.value = false;
  }
});

const saveChanges = async () => {
  saving.value = true;
  error.value = '';

  try {
    const response = await updateContactPage(formData.value);

    if (response.error) {
      error.value = response.error || 'Error al guardar los cambios';
      setTimeout(() => {
        error.value = '';
      }, 5000);
      return;
    }

    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);
  } catch (err) {
    error.value = 'Error al guardar los cambios';
    setTimeout(() => {
      error.value = '';
    }, 5000);
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}
</style>
