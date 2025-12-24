<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <!-- Header with Save Button -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
          Editar Página Sobre Nosotros
        </h1>
        <p class="mt-2 text-neutral-600 dark:text-neutral-400">
          Edita el contenido de la página "Sobre Nosotros" directamente en el formulario.
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

    <!-- Editor Content -->
    <div v-else class="space-y-8">
      <!-- Section 1: Quiénes Somos -->
      <section class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-neutral-800">1</span>
          Quiénes Somos
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Título de la sección</label>
            <input
              type="text"
              v-model="formData.quienesSomos.title"
              class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Párrafo 1</label>
            <textarea
              v-model="formData.quienesSomos.paragraph1"
              rows="3"
              class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Párrafo 2</label>
            <textarea
              v-model="formData.quienesSomos.paragraph2"
              rows="3"
              class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Puntos destacados (4 máximo)</label>
            <div class="grid grid-cols-2 gap-3">
              <input
                v-for="(highlight, index) in formData.quienesSomos.highlights"
                :key="index"
                type="text"
                v-model="highlight.text"
                class="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                :placeholder="`Punto ${index + 1}`"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Section 2: Misión y Visión -->
      <section class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-neutral-800">2</span>
          Misión y Visión
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Título de sección</label>
              <input
                type="text"
                v-model="formData.misionVision.sectionTitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subtítulo de sección</label>
              <input
                type="text"
                v-model="formData.misionVision.sectionSubtitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6 mt-4">
            <!-- Misión -->
            <div class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <h3 class="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Misión</h3>
              <div class="space-y-3">
                <input
                  type="text"
                  v-model="formData.misionVision.mision.title"
                  class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                  placeholder="Título"
                />
                <textarea
                  v-model="formData.misionVision.mision.content"
                  rows="4"
                  class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none text-sm"
                  placeholder="Contenido"
                ></textarea>
              </div>
            </div>

            <!-- Visión -->
            <div class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg">
              <h3 class="font-semibold text-neutral-800 dark:text-neutral-200 mb-3">Visión</h3>
              <div class="space-y-3">
                <input
                  type="text"
                  v-model="formData.misionVision.vision.title"
                  class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                  placeholder="Título"
                />
                <textarea
                  v-model="formData.misionVision.vision.content"
                  rows="4"
                  class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none text-sm"
                  placeholder="Contenido"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Compromisos -->
      <section class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-neutral-800">3</span>
          Nuestros Compromisos
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Título de sección</label>
              <input
                type="text"
                v-model="formData.compromisos.sectionTitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subtítulo de sección</label>
              <input
                type="text"
                v-model="formData.compromisos.sectionSubtitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mt-4">
            <div
              v-for="(item, index) in formData.compromisos.items"
              :key="index"
              class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
            >
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Compromiso {{ index + 1 }}</span>
              </div>
              <input
                type="text"
                v-model="item.title"
                class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm mb-2"
                placeholder="Título"
              />
              <textarea
                v-model="item.description"
                rows="2"
                class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none text-sm"
                placeholder="Descripción"
              ></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 4: Política de Calidad -->
      <section class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-neutral-800">4</span>
          Política de Calidad
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Etiqueta (Badge)</label>
              <input
                type="text"
                v-model="formData.politicaCalidad.badgeText"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Título</label>
              <input
                type="text"
                v-model="formData.politicaCalidad.title"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Descripción</label>
            <textarea
              v-model="formData.politicaCalidad.description"
              rows="3"
              class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Puntos de la política</label>
            <div class="space-y-2">
              <div v-for="(point, index) in formData.politicaCalidad.points" :key="index" class="flex items-center gap-2">
                <svg class="h-5 w-5 text-yellow-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  type="text"
                  v-model="point.text"
                  class="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm"
                  :placeholder="`Punto ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Estadísticas</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div v-for="(stat, index) in formData.politicaCalidad.stats" :key="index" class="p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg text-center">
                <input
                  type="text"
                  v-model="stat.value"
                  class="w-full px-2 py-1 border border-neutral-300 dark:border-neutral-600 rounded bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-lg font-bold text-center mb-1"
                  placeholder="Valor"
                />
                <input
                  type="text"
                  v-model="stat.label"
                  class="w-full px-2 py-1 border border-neutral-300 dark:border-neutral-600 rounded bg-neutral-50 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 focus:outline-none focus:border-orange-500 text-xs text-center"
                  placeholder="Etiqueta"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Por qué Elegirnos -->
      <section class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 flex items-center gap-2">
          <span class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-neutral-800">5</span>
          ¿Por qué Elegirnos?
        </h2>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Título de sección</label>
              <input
                type="text"
                v-model="formData.porQueElegirnos.sectionTitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Subtítulo de sección</label>
              <input
                type="text"
                v-model="formData.porQueElegirnos.sectionSubtitle"
                class="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4 mt-4">
            <div
              v-for="(reason, index) in formData.porQueElegirnos.reasons"
              :key="index"
              class="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
            >
              <div class="flex items-center gap-2 mb-3">
                <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <svg class="h-4 w-4 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Razón {{ index + 1 }}</span>
              </div>
              <input
                type="text"
                v-model="reason.title"
                class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 text-sm mb-2"
                placeholder="Título"
              />
              <textarea
                v-model="reason.description"
                rows="3"
                class="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-orange-500 resize-none text-sm"
                placeholder="Descripción"
              ></textarea>
            </div>
          </div>
        </div>
      </section>
    </div>

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
import { getAboutPage } from '@/API/fetchData';
import { updateAboutPage } from '@/API/pushData';

const saving = ref(false);
const loading = ref(true);
const showSuccess = ref(false);
const error = ref('');

// Form data structure matching AboutPage model
const formData = ref({
  quienesSomos: {
    title: '',
    paragraph1: '',
    paragraph2: '',
    highlights: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    ]
  },
  misionVision: {
    sectionTitle: '',
    sectionSubtitle: '',
    mision: {
      title: '',
      content: ''
    },
    vision: {
      title: '',
      content: ''
    }
  },
  compromisos: {
    sectionTitle: '',
    sectionSubtitle: '',
    items: [
      { title: '', description: '', icon: 'shield' },
      { title: '', description: '', icon: 'clock' },
      { title: '', description: '', icon: 'users' },
      { title: '', description: '', icon: 'bolt' }
    ]
  },
  politicaCalidad: {
    badgeText: '',
    title: '',
    description: '',
    points: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    ],
    stats: [
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' },
      { value: '', label: '' }
    ]
  },
  porQueElegirnos: {
    sectionTitle: '',
    sectionSubtitle: '',
    reasons: [
      { title: '', description: '', icon: 'tools' },
      { title: '', description: '', icon: 'education' },
      { title: '', description: '', icon: 'badge' }
    ]
  }
});

// Load about page data on mount
onMounted(async () => {
  try {
    const data = await getAboutPage();
    if (data && !data.error) {
      // Populate form with data from API
      formData.value = {
        quienesSomos: {
          title: data.quienesSomos?.title || '',
          paragraph1: data.quienesSomos?.paragraph1 || '',
          paragraph2: data.quienesSomos?.paragraph2 || '',
          highlights: data.quienesSomos?.highlights?.length
            ? data.quienesSomos.highlights
            : [{ text: '' }, { text: '' }, { text: '' }, { text: '' }]
        },
        misionVision: {
          sectionTitle: data.misionVision?.sectionTitle || '',
          sectionSubtitle: data.misionVision?.sectionSubtitle || '',
          mision: {
            title: data.misionVision?.mision?.title || '',
            content: data.misionVision?.mision?.content || ''
          },
          vision: {
            title: data.misionVision?.vision?.title || '',
            content: data.misionVision?.vision?.content || ''
          }
        },
        compromisos: {
          sectionTitle: data.compromisos?.sectionTitle || '',
          sectionSubtitle: data.compromisos?.sectionSubtitle || '',
          items: data.compromisos?.items?.length
            ? data.compromisos.items
            : [
                { title: '', description: '', icon: 'shield' },
                { title: '', description: '', icon: 'clock' },
                { title: '', description: '', icon: 'users' },
                { title: '', description: '', icon: 'bolt' }
              ]
        },
        politicaCalidad: {
          badgeText: data.politicaCalidad?.badgeText || '',
          title: data.politicaCalidad?.title || '',
          description: data.politicaCalidad?.description || '',
          points: data.politicaCalidad?.points?.length
            ? data.politicaCalidad.points
            : [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
          stats: data.politicaCalidad?.stats?.length
            ? data.politicaCalidad.stats
            : [{ value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }, { value: '', label: '' }]
        },
        porQueElegirnos: {
          sectionTitle: data.porQueElegirnos?.sectionTitle || '',
          sectionSubtitle: data.porQueElegirnos?.sectionSubtitle || '',
          reasons: data.porQueElegirnos?.reasons?.length
            ? data.porQueElegirnos.reasons
            : [
                { title: '', description: '', icon: 'tools' },
                { title: '', description: '', icon: 'education' },
                { title: '', description: '', icon: 'badge' }
              ]
        }
      };
    }
  } catch (err) {
    console.error('Error loading about page:', err);
    error.value = 'Error al cargar el contenido';
  } finally {
    loading.value = false;
  }
});

const saveChanges = async () => {
  saving.value = true;
  error.value = '';

  try {
    const response = await updateAboutPage(formData.value);

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
