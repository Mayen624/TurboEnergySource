<template>
  <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
    <!-- Title -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
        Configuración del Sistema
      </h1>
      <p class="mt-2 text-neutral-600 dark:text-neutral-400">
        Administra la configuración general del sistema y la visibilidad de componentes de la landing page.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>

    <!-- Settings Panel -->
    <div v-else class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg">
      <!-- Tabs Navigation -->
      <div class="border-b border-neutral-200 dark:border-neutral-700">
        <nav class="flex space-x-2 px-6" aria-label="Tabs" role="tablist">
          <button
            type="button"
            :class="[
              'py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm font-medium whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
              activeTab === 'system'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400'
            ]"
            @click="activeTab = 'system'"
            role="tab"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Sistema
          </button>
          <button
            type="button"
            :class="[
              'py-4 px-1 inline-flex items-center gap-x-2 border-b-2 text-sm font-medium whitespace-nowrap focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
              activeTab === 'landing'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-neutral-500 hover:text-orange-600 dark:text-neutral-400 dark:hover:text-orange-400'
            ]"
            @click="activeTab = 'landing'"
            role="tab"
          >
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Landing Page
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- System Tab -->
        <div v-show="activeTab === 'system'" role="tabpanel">
          <SystemTab :settings="settings" @update="handleUpdate" :saving="saving" />
        </div>

        <!-- Landing Tab -->
        <div v-show="activeTab === 'landing'" role="tabpanel">
          <LandingTab :settings="settings" @update="handleUpdate" :saving="saving" />
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div
      v-if="showSuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in-up"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
      Configuración guardada exitosamente
    </div>

    <!-- Error Message -->
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
import { getSettings } from '@/API/fetchData';
import SystemTab from './settings/SystemTab.vue';
import LandingTab from './settings/LandingTab.vue';

const activeTab = ref('system');
const settings = ref<any>(null);
const loading = ref(true);
const saving = ref(false);
const showSuccess = ref(false);
const error = ref('');

onMounted(async () => {
  try {
    const response = await getSettings();
    if (response.error) {
      error.value = 'Error cargando configuración';
      console.error('Error loading settings:', response.error);
    } else {
      settings.value = response;
    }
  } catch (err) {
    error.value = 'Error cargando configuración';
    console.error('Error fetching settings:', err);
  } finally {
    loading.value = false;
  }
});

const handleUpdate = (success: boolean, errorMessage?: string) => {
  saving.value = false;

  if (success) {
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 3000);

    // Reload settings
    getSettings().then(response => {
      if (!response.error) {
        settings.value = response;
      }
    });
  } else {
    error.value = errorMessage || 'Error guardando configuración';
    setTimeout(() => {
      error.value = '';
    }, 5000);
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
