<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        Visibilidad de Componentes
      </h2>
      <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Controla qué secciones se muestran en cada página de la landing page.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Home Page Section -->
      <div class="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Página Principal
        </h3>
        <div class="space-y-3">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="clientsSection"
              v-model="formData.homePage.clientsSection"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="clientsSection" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Sección de Clientes
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Muestra logotipos de clientes destacados</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="featuresGeneral"
              v-model="formData.homePage.featuresGeneral"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="featuresGeneral" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Features General
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Sección "About Us" con características generales</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="featuresNavs"
              v-model="formData.homePage.featuresNavs"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="featuresNavs" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Features con Navegación
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Componente con tabs para promoción de servicios</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="testimonialsSection"
              v-model="formData.homePage.testimonialsSection"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="testimonialsSection" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Testimonios
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Testimonios de clientes con estadísticas</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="pricingSection"
              v-model="formData.homePage.pricingSection"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="pricingSection" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Precios
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Sección de planes y precios</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="faq"
              v-model="formData.homePage.faq"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="faq" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Preguntas Frecuentes (FAQ)
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Sección de preguntas y respuestas frecuentes</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Products Page Section -->
      <div class="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          Página de Productos
        </h3>
        <div class="space-y-3">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="featuresStatsAlt"
              v-model="formData.productsPage.featuresStatsAlt"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="featuresStatsAlt" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Features Stats Alt
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Estadísticas y beneficios de productos</span>
            </label>
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              id="testimonialsSectionAlt"
              v-model="formData.productsPage.testimonialsSectionAlt"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="testimonialsSectionAlt" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Testimonios Alt
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Testimonios de clientes sobre productos</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Services Page Section -->
      <div class="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Página de Servicios
        </h3>
        <div class="space-y-3">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="featuresStats"
              v-model="formData.servicesPage.featuresStats"
              class="shrink-0 mt-0.5 border-neutral-300 rounded text-orange-600 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-orange-500 dark:checked:border-orange-500 dark:focus:ring-offset-neutral-800"
            />
            <label for="featuresStats" class="text-sm text-neutral-700 dark:text-neutral-300 ms-3">
              Features Stats
              <span class="text-xs text-neutral-500 dark:text-neutral-400 block">Estadísticas y números clave de servicios</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <button
          type="submit"
          :disabled="saving"
          class="py-3 px-6 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-orange-600 text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg v-if="saving" class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ saving ? 'Guardando...' : 'Guardar Configuración' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { updateSettings } from '@/API/pushData';

interface Props {
  settings: any;
  saving: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update']);

const formData = ref({
  homePage: {
    clientsSection: false,
    featuresGeneral: false,
    featuresNavs: false,
    testimonialsSection: false,
    pricingSection: false,
    faq: false
  },
  productsPage: {
    featuresStatsAlt: true,
    testimonialsSectionAlt: true
  },
  servicesPage: {
    featuresStats: true
  }
});

// Watch for settings changes
watch(() => props.settings, (newSettings) => {
  if (newSettings?.landing) {
    formData.value.homePage = { ...formData.value.homePage, ...newSettings.landing.homePage };
    formData.value.productsPage = { ...formData.value.productsPage, ...newSettings.landing.productsPage };
    formData.value.servicesPage = { ...formData.value.servicesPage, ...newSettings.landing.servicesPage };
  }
}, { immediate: true });

const handleSubmit = async () => {
  try {
    const response = await updateSettings({
      landing: {
        homePage: formData.value.homePage,
        productsPage: formData.value.productsPage,
        servicesPage: formData.value.servicesPage
      }
    });

    if (response.error) {
      emit('update', false, response.error);
    } else {
      emit('update', true);
    }
  } catch (error) {
    console.error('Error updating landing settings:', error);
    emit('update', false, 'Error al guardar la configuración de visibilidad');
  }
};
</script>
